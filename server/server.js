import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import * as dotenv from "dotenv";
import dayjs from "dayjs";

const app = express();
app.use(express.json());
app.use(cors());

if (process.env.NODE_ENV !== "production") {
  dotenv.config()
}

const PORT = process.env.PORT || 27017;
const CONNECTION_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017/calendar";


mongoose.set("strictQuery", true);
const { Schema } = mongoose;

const eventSchema = new Schema({
  user: String,
  labels: ["Work", "Personal", "Reminder"],
  events: [
    {
      id: Number,
      title: String,
      label: String,
      date: String,
      from_time: String,
      to_time: String,
      notes: String,
    },
  ],
});

const Event = mongoose.model("event", eventSchema);

const counterSchema = new Schema({
  id: String,
  seq: Number,
});

const Counter = mongoose.model("counter", counterSchema);

mongoose
  .connect(CONNECTION_URI)
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    throw err;
  });

app.get("/calendar", (req, res) => {
  Event.find().then((data) => {
    res.send(data);
  });
});

app.post("/calendar/getDay", (req, res) => {
  Event.findOne({ user: req.body.user }).then((data) => {
    var events = data.events.filter(function (doc) {
      return doc.date == req.body.date;
    });
    //console.log(events);
    res.send(events);
  });
});

app.post("/calendar/addEvent", (req, res) => {
  Counter.findOneAndUpdate(
    { id: "auto" },
    { $inc: { seq: 1 } },
    { new: true },
    (err, cd) => {
      let seqId;
      if (cd == null) {
        const newId = new Counter({ id: "auto", seq: 1 });
        newId.save();
        seqId = 1;
      } else {
        seqId = cd.seq;
      }
      //console.log(req.body);
      Event.updateOne(
        { user: req.body.user },
        {
          $push: {
            events: {
              id: seqId,
              title: req.body.title,
              label: req.body.label,
              date: req.body.date,
              from_time: req.body.from_time,
              to_time: req.body.to_time,
              notes: req.body.notes,
            },
          },
        },
        function (err, docs) {
          if (err) console.log(err);
          else {
            console.log("Event created");
            Event.findOne({ user: req.body.user }).then((data) => {
              var new_event = data.events.find(function (doc) {
                return doc.id == seqId;
              });
              //console.log(new_event);
              res.send({
                success: true,
                data: new_event
              });
            });
          }
        }
      );
    }
  );
});

app.post("/calendar/addUser", (req, res) => {
  const newUser = new Event({
    user: req.body.user,
    labels: ["Work", "Personal", "Reminder"],
    events: [],
  });
  newUser.save();
  res.send("user created");
});

app.post("/calendar/delete", (req, res) => {
  Event.updateOne(
    { user: req.body.user },
    { $pull: { events: { id: req.body.id } } },
    function (err, docs) {
      if (err) console.log(err);
      else res.send("success");
    }
  );
});

app.listen(PORT, () => {
  console.log(`Server: http://localhost:${PORT}`);
});
