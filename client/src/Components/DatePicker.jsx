import React, { Fragment, useContext, useEffect, useState } from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  Button,
  IconButton,
  GridItem,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { ChevronLeftIcon, ChevronRightIcon } from '@chakra-ui/icons';

export default function DatePicker(props) {
  const [currentMonthIdx, setCurrentMonthIdx] = useState(dayjs().month());
  const [currentMonth, setCurrentMonth] = useState(getMonth());

  const [slct_month, setSlct_month] = useState(dayjs().format('MMMM'));

  useEffect(() => {
    setCurrentMonthIdx(dayjs().month());
  }, [dayjs().month()]);

  useEffect(() => {
    setCurrentMonth(getMonth(currentMonthIdx));
  }, [currentMonthIdx]);

  useEffect(() => {
    if (props.istoday == true) {
      setCurrentMonthIdx(dayjs().month());
      setSlct_month(dayjs().format('MMMM'));
    }
  }, [props.istoday]);

  function handlePrevMonth() {
    setCurrentMonthIdx(currentMonthIdx - 1);
    props.setIstoday(false);
    //props.setweek(getWeek(getMonth(currentMonthIdx - 1)[0]));   //jumps to last week of month
  }
  function handleNextMonth() {
    setCurrentMonthIdx(currentMonthIdx + 1);
    props.setIstoday(false);
    //props.setweek(getWeek(getMonth(currentMonthIdx + 1)[0]));   //jumps to first week of month
  }

  const month = dayjs(new Date(dayjs().year(), currentMonthIdx)).format('MMMM');
  const year = dayjs(new Date(dayjs().year(), currentMonthIdx)).format('YYYY');

  return (
    <Box w='80%'>
      {/*header*/}
      <Box
        w='100%'
        display='flex'
        justifyContent='space-between'
        alignItems='center'
      >
        <IconButton
          bg='white'
          borderRadius='30'
          onClick={handlePrevMonth}
          icon={<ChevronLeftIcon />}
        />
        <Text
          fontFamily='sans-serif'
          fontSize={{ base: '12px', sm: '18px' }}
          align='center'
        >
          {month}, {year}
        </Text>
        <IconButton
          bg='white'
          borderRadius='30'
          onClick={handleNextMonth}
          icon={<ChevronRightIcon />}
        />
      </Box>
      {/*day letters*/}
      <Grid templateColumns='repeat(7, 1fr)' gap={0}>
        {currentMonth[0].map((day, i) => (
          <GridItem w='100%'>
            <Text
              fontFamily='sans-serif'
              fontSize={{ base: '12px', sm: '15px' }}
              align='center'
            >
              {day.format('dd').charAt(0)}
            </Text>
          </GridItem>
        ))}
      </Grid>
      {/*date matrix*/}
      <Grid templateColumns='repeat(7, 1fr)' gap={{ base: '0', xl: '2' }}>
        {currentMonth.map((row, i) => (
          <Fragment key={i}>
            {row.map((day, inx) => (
              <Box align='center'>
                <Button
                  key={inx}
                  bg={
                    props.date_selected == day.format('D') &&
                    month == slct_month
                      ? '#4285F4'
                      : 'white'
                  }
                  _hover={{
                    bg:
                      props.date_selected == day.format('D') &&
                      month == slct_month
                        ? '#2684FC'
                        : 'blackAlpha.300',
                  }}
                  isDisabled={monthNo(month) == day.$M ? false : true}
                  w='25px'
                  pr='11px'
                  size='xs'
                  borderRadius='30'
                  onDoubleClick={e => {
                    props.setDaily(true);
                  }}
                  onClick={e => {
                    props.setDate(day.format('D'));
                    props.setDay(day.format('dddd'));
                    setSlct_month(day.format('MMMM'));
                    props.setMonth(month);
                    props.setYr(year);
                    props.setweek(getWeek(row));
                  }}
                >
                  <Text fontFamily='sans-serif'>{day.format('D')}</Text>
                </Button>
              </Box>
            ))}
          </Fragment>
        ))}
      </Grid>
    </Box>
  );
}

{ /* retunrs 7x5 matrix of days of the month */ }
export function getMonth(month = dayjs().month()) {
  month = Math.floor(month);
  const year = dayjs().year();
  const firstDayOfTheMonth = dayjs(new Date(year, month, 1)).day();
  let currentMonthCount = 0 - firstDayOfTheMonth;
  const daysMatrix = new Array(5).fill([]).map(() => {
    return new Array(7).fill(null).map(() => {
      currentMonthCount++;
      return dayjs(new Date(year, month, currentMonthCount));
    });
  });
  return daysMatrix;
}

{ /* returns week arrays in dateQ date day format */ }
export function getWeek(week) {
  var weekdays = [];
  //console.log(week);
  {
    week.map(day => {
      // if (day.$W == 0 || day.$W == 6) {
      // } else {
        //console.log(day);
        weekdays.push({
          dateQ: day.format('YYYY-MM-DD'),
          date: day.$D,
          day: dayjs(dayjs().day(day.$W)).format('dddd'),
        });
      // }
    });
  }
  //console.log(weekdays);
  return weekdays;
}

{/* returns month number 0-11 to text input */}
export function monthNo(m) {
  const months = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];
  var n = 0;
  for (let i = 0; i < 12; i++) {
    if (months[i] == m) return n;
    else n = n + 1;
  }
}
