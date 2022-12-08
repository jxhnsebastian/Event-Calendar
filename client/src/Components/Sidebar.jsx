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
} from '@chakra-ui/react';
import DatePicker from './DatePicker';
import dayjs from 'dayjs';
import { monthNo } from './DatePicker';
import Eventmaker from './Eventmaker';
import { getMonth, getWeek } from './DatePicker';

export default function Sidebar(props) {
  const today = dayjs().format('D-MMM-YYYY');
  const [istoday, setIstoday] = useState(true);

  {/* displays current week when today clicked */}
  function handleToday() {
    const month = getMonth();
    {
      month.map(w => {
        {
          w.map(d => {
            if (d.$D == dayjs().$D) {
              props.setweek(getWeek(w));
            }
          });
        }
      });
    }
  }

  const mNo = monthNo(props.month) + 1;
  const d = props.date_selected;
  const date =
    props.yr +
    '-' +
    (mNo < 10 ? '0' + mNo : mNo) +
    '-' +
    (d < 10 ? '0' + d : d);

  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      bg='white'
      borderRight='2px'
      borderColor='#D9DDDC'
      h={{ base: 'calc(100% - 70px)', lg: '100%' }}
      w={{ base: '60%', lg: '20%' }}
      position={{ base: 'absolute', lg: 'static' }}
      zIndex='1000'
    >
      <CloseButton
        ml='85%'
        mt='5px'
        _hover={{}}
        onClick={e => props.setSidebar(false)}
      />
      <Eventmaker date={date} setNewEvent={props.setNewEvent}/>
      <DatePicker
        date_selected={props.date_selected}
        setDaily={props.setDaily}
        setDate={props.setDate}
        setDay={props.setDay}
        setMonth={props.setMonth}
        setYr={props.setYr}
        setweek={props.setweek}
        istoday={istoday}
        setIstoday={setIstoday}
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
          onClick={e => {
            props.setDate(dayjs().format('D'));
            props.setDay(dayjs().format('dddd'));
            props.setMonth(dayjs().format('MMMM'));
            props.setYr(dayjs().format('YYYY'));
            setIstoday(true);
            handleToday();
          }}
        >
          Today
        </Button>
      </Tooltip>
    </Box>
  );
}
