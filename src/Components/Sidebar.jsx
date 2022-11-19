import { React, useState, useEffect } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
  Button,
  Slide,
  useDisclosure,
  Tooltip,
  CloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
} from '@chakra-ui/react';
import DatePicker from './DatePicker';

import dayjs from 'dayjs';
import { monthNo } from './DatePicker';
import Eventmaker from './Eventmaker';

export default function Sidebar(props) {
  // useEffect(() => {
  //   console.log("sidebar "+props.date_selected);
  // }, [props.date_selected]);

  const today = dayjs().format('D-MMM-YYYY');

  const mNo = monthNo(props.month) + 1;
  const d = props.date_selected;
  const date =
    props.yr + '-' + (mNo<10 ? '0'+mNo : mNo )+ '-' + (d < 10 ? '0'+d : d);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      bg='white'
      borderRight='2px'
      borderColor='#D9DDDC'
      h='100%'
      w={{ base: '60%', lg: '20%' }}
      position={{ base: 'absolute', lg: 'static' }}
    >
      <CloseButton
        ml='85%'
        mt='5px'
        _hover={{}}
        onClick={e => props.setSidebar(false)}
      />
      <Eventmaker date={date}/>
      <DatePicker
        date_selected={props.date_selected}
        setDaily={props.setDaily}
        setDate={props.setDate}
        setDay={props.setDay}
        setMonth={props.setMonth}
        setYr={props.setYr}
        setweek={props.setweek}
      />
      <Tooltip hasArrow placement='bottom' label={today}>
        <Button
          size={{ base: 'sm', md: 'md' }}
          my='10px'
          fontSize='25px'
          bg='white'
          border='2px'
          borderTopColor='#4285F4'
          borderRightColor='#DB4437'
          borderBottomColor='#F4B400'
          borderLeftColor='#0F9D58'
          _hover={{
            bg: '#4285F4',
            border: '0',
            color: 'white',
            boxShadow: 'lg',
          }}
        >
          Today
        </Button>
      </Tooltip>
    </Box>
  );
}