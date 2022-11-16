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
  IconButton,
  Tooltip,
} from '@chakra-ui/react';
import { Weekly } from './Calendar';
import { Daily } from './Calendar';
import Sidebar from './Sidebar';
import { HamburgerIcon } from '@chakra-ui/icons';

export default function Home() {
  const [date_selected, setDate_selected] = useState();
  const [day_selected, setDay_selected] = useState('');
  const [isDaily, setIsDaily] = useState(false);
  const [curr_month, setCurr_month] = useState('November');
  const [curr_yr, setCurr_yr] = useState('2022');
  const [sidebar, setSidebar] = useState(true);

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
        {sidebar && <Sidebar setSidebar={setSidebar} />}
        {/*calendar*/}
        <Box w={{ base : '100%', md : sidebar ? '80%' : '100%' }}>
          {isDaily && (
            <Box p='2'>
              <Daily date={date_selected} day={day_selected} isDaily={true} />
            </Box>
          )}
          {!isDaily && (
            <Weekly
              date_selected={date_selected}
              setDaily={setIsDaily}
              setDate={setDate_selected}
              setDay={setDay_selected}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
}
