import express from "express";
//import mongoose from "mongoose";
import cors from "cors";
import axios from "axios";

const app = express();
const port = 5000;

app.use(express.json());
app.use(cors());

app.post("/getWeek", (req, res) => {
  var data = req.body;
  console.log(data);

  var config = {
    method: "post",
    url: "http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block/get_blocks_by_merchant",
    headers: {
      "access-token":
        "MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ==",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log(response);
      res.send(response);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.post("/addEvent", (req, res) => {
  var data = JSON.stringify({
    merchant_id: "GR-JBXJEK",
    date: "2023-01-05",
    from_time: "11:00:00",
    to_time: "13:00:00",
    resources: 1,
    block_type: "PERSONAL",
  });

  var config = {
    method: "post",
    url: "http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block",
    headers: {
      "access-token":
        "MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ==",
      "Content-Type": "application/json",
    },
    data: data,
  };

  axios(config)
    .then(function (response) {
      console.log("fvdfvdfvcdf");
      console.log(JSON.parse(response.data));
      res.send(JSON.parse(response.data));
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.get("/delete", (req, res) => {
  var block_id = req.headers.block_id ;
  console.log(block_id);
  var config = {
    method: "delete",
    url: `http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block/${block_id}`,
    headers: {
      "Content-Type": "application/json",
      "access-token":
        "MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ==",
    },
  };

  axios(config)
    .then(function (response) {
      console.log(response.data.success);
      res.send(response.data.success);
    })
    .catch(function (error) {
      console.log(error);
    });
});

app.listen(port, () => {
  console.log(`Server: http://localhost:${port}`);
});
