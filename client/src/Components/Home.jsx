import { React, useState, useEffect, createContext } from 'react';
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
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import dayjs from 'dayjs';
import { Weekly } from './Calendar';
import { Daily } from './Calendar';
import Sidebar from './Sidebar';
import { HamburgerIcon } from '@chakra-ui/icons';
import { getMonth, getWeek } from './DatePicker';
import { monthNo } from './DatePicker';

export default function Home() {
  const [date_selected, setDate_selected] = useState(dayjs().format('D'));
  const [day_selected, setDay_selected] = useState(dayjs().format('dddd'));
  const [isDaily, setIsDaily] = useState(false);
  const [curr_month, setCurr_month] = useState(dayjs().format('MMMM'));
  const [curr_yr, setCurr_yr] = useState(dayjs().format('YYYY'));
  const [sidebar, setSidebar] = useState(true);
  const [week, setWeek] = useState([]);

  {
    /* dateQ to send to function Daily to send request */
  }
  const mNo = monthNo(curr_month) + 1;
  const d = date_selected;
  const dateQ =
    curr_yr + '-' + (mNo < 10 ? '0' + mNo : mNo) + '-' + (d < 10 ? '0' + d : d);
  useEffect(() => {
    console.log('date : ' + dateQ);
  }, [date_selected]);

  {
    /* to display current week on loading */
  }
  useEffect(() => {
    const month = getMonth();
    {
      month.map(week => {
        {
          week.map(d => {
            if (d.$D == dayjs().$D) setWeek(getWeek(week));
          });
        }
      });
    }
  }, []);

  return (
    <Box display='flex' flexDirection='column' w='100%' h='100vh'>
      {/*header box */}
      <Box
        display='flex'
        flexDirection='row'
        alignItems='center'
        justifyContent='space-between'
        h='70px'
        w='100%'
        bg='blackAlpha.100'
      >
        {/* hamburger and calender */}
        <Box display='flex' alignItems='center' ml='5px' h='70px'>
          <Tooltip hasArrow placement='bottom-end' label='Create Event'>
            <IconButton
              size={{ base: 'xs', md: 'md' }}
              bg='white'
              _hover={{ bg: 'transparent' }}
              onClick={e => setSidebar(true)}
            >
              <HamburgerIcon />
            </IconButton>
          </Tooltip>
          <Text
            pl='5px'
            fontSize={{ base: '30px', sm: '50px' }}
            fontWeight='semi-bold'
            fontFamily='sans-serif'
          >
            Calendar
          </Text>
        </Box>
        {/*month yr and butons*/}
        <Box
          mr={{ base: '0px', md: '10px' }}
          w={{ base: '110px', md: '400px' }}
          display='flex'
          flexFlow='row wrap'
          alignItems='center'
        >
          <Text
            pr={{ base: '0px', md: '10px' }}
            fontSize={{ base: '12px', md: '30px' }}
            fontWeight='semi-bold'
            fontFamily='sans-serif'
          >
            {curr_month}, {curr_yr}
          </Text>
          <Box display='flex'>
            <Button
              colorScheme='blue'
              mr='4px'
              size={{ base: 'xs', md: 'md' }}
              onClick={e => setIsDaily(true)}
            >
              Daily
            </Button>
            <Button
              colorScheme='blue'
              mr='4px'
              size={{ base: 'xs', md: 'md' }}
              onClick={e => setIsDaily(false)}
            >
              Weekly
            </Button>
          </Box>
        </Box>
      </Box>
      <Box display='flex' flexGrow='1' w='100%' bg='white'>
        {/*sidebar*/}
        {sidebar && (
          <Sidebar
            setSidebar={setSidebar}
            date_selected={date_selected}
            setDaily={setIsDaily}
            setDate={setDate_selected}
            setDay={setDay_selected}
            setMonth={setCurr_month}
            month={curr_month}
            setYr={setCurr_yr}
            yr={curr_yr}
            setweek={setWeek}
          />
        )}
        {/*calendar*/}
        <Box w={{ base: '100%', lg: sidebar ? '80%' : '100%' }}>
          {isDaily && (
            <Box p='2'>
              <Daily
                dateQ={dateQ}
                date={date_selected}
                day={day_selected}
                isDaily={true}
                s={date_selected}
              />
            </Box>
          )}
          {!isDaily && (
            <Weekly
              date_selected={date_selected}
              setDaily={setIsDaily}
              setDate={setDate_selected}
              setDay={setDay_selected}
              week={week}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
