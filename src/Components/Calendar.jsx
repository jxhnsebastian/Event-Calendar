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
} from '@chakra-ui/react';
import { Eventreq } from './Eventreq';

export function Daily(props) {
  const times = [
    10.0, 10.5, 11.0, 11.5, 12.0, 12.5, 13.0, 13.5, 14.0, 14.5, 15.0, 15.5,
    16.0, 16.5, 17.0,
  ];

  const isEvent = false;
  const isBooking = true;

  // useEffect(() => {
  //   Eventreq(props.dateQ, 'fetch');
  //   console.log("calendar : "+props.dateQ)
  // }, [props]);

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
            display={props.isDaily ? 'block' : 'none'}
            fontSize='13'
            fontWeight='semi-bold'
            align='start'
            minW='40px'
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
          >
            <Box
              display={isEvent ? 'block' : 'none'}
              bg={isBooking ? '#DB4437' : '#0F9D58'}
              w='100%'
              h='100%'
            ></Box>
          </Box>
        </Box>
      ))}
    </Box>
  );
}

export function Weekly(props) {

  return (
    <Box ml='5px' mt='5px'>
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
                  _hover={{ bg: props.date_selected == wk.date ? '#2684FC' : 'blackAlpha.200' }}
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
            <Daily dateQ={wk.dateQ} date={wk.date} day={wk.day} isDaily={false} />
          </GridItem>
        ))}
      </Grid>
    </Box>
  );
}

