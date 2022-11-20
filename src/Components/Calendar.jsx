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
} from '@chakra-ui/react';
import { Eventreq } from './Eventreq';
import dayjs from 'dayjs';
import Eventdisplay from './Evendisplay';

export function Daily(props) {
  const times = [
    10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5,
    16.0, 16.5, 17.0,
  ];

  const [resp, setResp] = useState();
  const [events, setEvents] = useState([]);
  const [isdelete, setIsdelete] = useState();
  const [del_id, setDel_id] = useState();
  var blocks = [];

  useEffect(() => {
    //Eventreq(props.dateQ, 'fetch');
    setResp({
      success: true,
      error: null,
      data: {
        '2022-11-23': [
          {
            block_id: 40,
            merchant_id: 'GR-JBXJEK',
            resources: 1,
            from_time: '12:00:00',
            to_time: '14:00:00',
            block_type: 'BOOKING',
            date: '2022-11-23',
          },
          {
            block_id: 41,
            merchant_id: 'GR-JBXJEK',
            resources: 2,
            from_time: '14:30:00',
            to_time: '16:00:00',
            block_type: 'PERSONAL',
            date: '2022-11-23',
          },
        ],
        '2022-11-24': [
          {
            block_id: 42,
            merchant_id: 'GR-JBXJEK',
            resources: 1,
            from_time: '10:00:00',
            to_time: '14:00:00',
            block_type: 'BOOKING',
            date: '2022-11-24',
          },
          {
            block_id: 43,
            merchant_id: 'GR-JBXJEK',
            resources: 2,
            from_time: '12:30:00',
            to_time: '16:00:00',
            block_type: 'BOOKING',
            date: '2022-11-24',
          },
        ],
      },
    });
    console.log(props.s);
    console.log(props.isDaily);
    if (resp != null) {
      {
        resp.data[props.dateQ]?.map(b => {
          blocks.push({
            id: b.block_id,
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
            resources: b.resources,
            type: b.block_type,
            date: b.date,
          });
        });
      }
    }
    setEvents(blocks);
    setIsdelete(false);
  }, [props.s,isdelete]);

  useEffect(() => {
    if (isdelete == true) {
      alert(del_id);
      //Eventreq(del_id,'del')
    }
  }, [isdelete, del_id]);

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
        <Box display='flex' flexDirection='row' h='12'>
          <Text
            display={
              props.isDaily ? 'block' : props.displayTime ? 'block' : 'none'
            }
            fontSize={props.displayTime ? '10' : '13'}
            fontWeight='semi-bold'
            align='start'
            minW={props.displayTime ? '20px' : '40px'}
            mt='-2'
          >
            {Math.floor(time)} :{' '}
            {(time - Math.floor(time)) * 60 == 0 ? '00' : '30'}
          </Text>
          <Box
            w='100%'
            h='100%'
            _hover={{ bg: 'blackAlpha.100' }}
            border='1px'
            borderBottom='0px'
            borderColor='#D9DDDC'
            display='flex'
            justifyContent='center'
          >
            {events.map(b => (
              <Box
                w='70%'
                h={b.h}
                display={
                  Math.floor(time) +
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
                  bg={b.type == 'BOOKING' ? '#DB4437' : '#0F9D58'}
                  _hover={{ bg: b.type == 'BOOKING' ? '#D21404' : '#028A0F' }}
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
      <Grid templateColumns='repeat(5, 1fr)' gap={0}>
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
                        : 'blackAlpha.200',
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
              displayTime={wk.day == 'Monday' ? true : false}
              isDaily={false}
              s={props.date_selected}
            />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}
