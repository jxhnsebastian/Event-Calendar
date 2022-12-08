import { React, useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  GridItem,
  theme,
  Button,
  useToast,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import Eventdisplay from './Evendisplay';

export function Daily(props) {
  const times = [
    0.0, 0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 3.5, 4.0, 4.5, 5.0, 5.5, 6.0, 6.5, 7.0,
    7.5, 8.0, 8.5, 9.0, 9.5, 10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5,
    14.0, 14.5, 15.0, 15.5, 16.0, 16.5, 17.0, 17.5, 18.0, 18.5, 19.0, 19.5,
    20.0, 20.5, 21.0, 21.5, 22.0, 22.5, 23.0, 23.5,
  ];

  const [resp, setResp] = useState();
  const [events, setEvents] = useState([]);
  const [isdelete, setIsdelete] = useState();
  const [del_id, setDel_id] = useState();
  const [del_response, setDel_response] = useState();
  var blocks = [];

  useEffect(() => {
    
    var myHeaders = new Headers();
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      user: 'Nikhil',
      date: props.dateQ.toString(),
    });
    // console.log(raw);
    // console.log(typeof props.dateQ);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow',
    };

    fetch('https://event-calendar.onrender.com/calendar/getDay', requestOptions)
      .then(response => response.json())
      .then(result => {
        setResp(result);
        console.log(result);
      })
      .catch(error => console.log('error', error));
  }, [isdelete, props.s, props.newEvent]);

  {
    /* creating event block array and setting it to events */
  }
  useEffect(() => {
    if (resp != null) {
      {
        resp?.map(b => {
          blocks.push({
            id: b.id,
            start: b.from_time.substring(0, 5),
            end: b.to_time.substring(0, 5),
            h:
              (dayjs(props.dateQ + ' ' + b.to_time).diff(
                dayjs(props.dateQ + ' ' + b.from_time),
                'minutes'
              ) /
                30) *
                100 +
              '%',
            notes: b.notes,
            type: b.label,
            date: b.date,
          });
        });
      }
      setEvents(blocks);
      setIsdelete(false);
    }
  }, [resp]);

  {
    /* event delete request */
  }
  const toast = useToast();
  useEffect(() => {
    if (isdelete == true) {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify({
        user: 'Nikhil',
        id: del_id,
      });

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };

      fetch(`https://event-calendar.onrender.com/calendar/delete`, requestOptions)
        .then(response => response.text())
        .then(result => {
          setDel_response(result);
          console.log(result);
        })
        .catch(error => console.log('error', error));
    }
    setIsdelete(false);
  }, [isdelete, del_id]);

  useEffect(() => {
    if (del_response == 'success') {
      toast({
        title: `Event ${del_id} Deleted`,
        status: 'success',
        duration: 10000,
        isClosable: true,
      });
    }
  }, [del_response])

  

  return (
    <Box bg='white' w='100%'>
      {/* the date text*/}
      <Box display='flex' flexFlow='row wrap' ml='8' alignItems='center'>
        <Text
          display={props.isDaily ? 'block' : 'none'}
          fontSize={{ base: '40', sm: '50' }}
          fontWeight='semi-bold'
        >
          {props.date}
        </Text>
        <Text
          display={props.isDaily ? 'block' : 'none'}
          fontSize={{ base: '25', sm: '30' }}
          fontWeight='semi-bold'
          ml='2'
        >
          {props.day}
        </Text>
      </Box>
      {/* slot blocks */}
      {times.map(time => (
        <Box display='flex' flexDirection='row' h='35px'>
          <Text
            display={
              props.isDaily ? 'block' : props.displayTime ? 'block' : 'none'
            }
            fontSize={props.displayTime ? '10' : '10'}
            fontWeight='semi-bold'
            align='start'
            minW={{ base: '20px', md: '30px' }}
            mt='-4px'
            mr='1'
          >
            {Math.floor(time) < 10.0
              ? '0' + Math.floor(time)
              : Math.floor(time)}{' '}
            : {(time - Math.floor(time)) * 60 == 0 ? '00' : '30'}
          </Text>
          <Box
            w='100%'
            h='100%'
            _hover={{ bg: 'blackAlpha.100' }}
            border='1px'
            borderBottom='0px'
            borderRight='0px'
            borderColor='#D9DDDC'
            display='flex'
            justifyContent='center'
          >
            {events.map(b => (
              <Box
                w={{ base: '50%', md: '80%' }}
                mx='5px'
                h={b.h}
                display={
                  (Math.floor(time) < 10.0
                    ? '0' + Math.floor(time)
                    : Math.floor(time)) +
                    ':' +
                    ((time - Math.floor(time)) * 60 == 0 ? '00' : '30') ==
                  b.start
                    ? 'block'
                    : 'none'
                }
              >
                <Button
                  w='100%'
                  h='100%'
                  variant='unstyled'
                  bg={
                    b.type == 'Work'
                      ? '#DB4437'
                      : b.type == 'Personal'
                      ? '#0F9D58'
                      : '#4285F4'
                  }
                  _hover={{
                    bg:
                      b.type == 'Work'
                        ? '#D21404'
                        : b.type == 'Personal'
                        ? '#028A0F'
                        : '#0013DE',
                  }}
                  borderTopWidth='20px'
                  borderColor='blackAlpha.700'
                >
                  <Eventdisplay
                    data={b}
                    setDelete={setIsdelete}
                    setDel_id={setDel_id}
                  />
                </Button>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function Weekly(props) {
  return (
    <Box ml='5px' mt='5px' mr='5px'>
      <Grid templateColumns='repeat(7, 1fr)' gap={0}>
        {props.week.map(wk => (
          <GridItem w='100%' bg='white'>
            <Box display='flex' flexFlow='column wrap'>
              <Box
                w='70px'
                onClick={e => {
                  props.setDaily(true);
                  props.setDate(wk.date);
                  props.setDay(wk.day);
                }}
                _hover={{ cursor: 'pointer' }}
              >
                <Text
                  fontSize={{ base: '30', sm: '45' }}
                  maxW={{ base: '41', sm: '65' }}
                  borderRadius='50'
                  bg={props.date_selected == wk.date ? '#4285F4' : 'white'}
                  _hover={{
                    bg:
                      props.date_selected == wk.date
                        ? '#2684FC'
                        : 'blackAlpha.300',
                  }}
                  align='center'
                >
                  {wk.date}
                </Text>
              </Box>
              <Text
                mt={{ base: '-3', sm: '-4' }}
                ml='1'
                fontSize={{ base: '12', sm: '15' }}
                h='30'
              >
                {wk.day}
              </Text>
            </Box>
            <Daily
              dateQ={wk.dateQ}
              date={wk.date}
              day={wk.day}
              displayTime={wk.day == 'Sunday' ? true : false}
              isDaily={false}
              s={props.date_selected}
              newEvent={props.newEvent}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
