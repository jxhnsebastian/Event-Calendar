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
  Menu,
  MenuList,
  MenuItem,
  MenuButton,
  Checkbox,
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
  SliderMark,
  useToast,
} from '@chakra-ui/react';
import {
  AddIcon,
  ChevronDownIcon,
  TimeIcon,
  InfoOutlineIcon,
  SettingsIcon,
  CalendarIcon,
  EditIcon,
} from '@chakra-ui/icons';
import dayjs from 'dayjs';

export default function Eventmaker(props) {
  const [start, setStart] = useState('10:00:00');
  const [end, setEnd] = useState('17:00:00');
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [notes, setNotes] = useState('');
  const [isW, setW] = useState(false);
  const [isP, setP] = useState(false);
  const [isR, setR] = useState(false);
  const [resp, setResp] = useState();
  const eventinfo = {
    user: 'Nikhil',
    title: title,
    label: type,
    date: props.date,
    from_time: start,
    to_time: end,
    notes: notes,
  };

  const updateTitle = e => {
    setTitle(e.target.value);
  };

  const updateNotes = e => {
    setNotes(e.target.value);
  };

  const toast = useToast();
  {
    /* event created / error toast message */
  }
  useEffect(() => {
    if (resp != null) {
      resp.success == true
        ? toast({
            title: 'Event Created',
            status: 'success',
            duration: 10000,
            isClosable: true,
          })
        : toast({
            title: 'Error',
            description: resp.error.message,
            status: 'error',
            duration: 10000,
            isClosable: true,
          });
    }
  }, [resp]);

  props.setNewEvent(false);

  const handleSubmit = () => {
    
    const valid = Validity(eventinfo);
    if (valid.status == 'success') {
      var myHeaders = new Headers();
      myHeaders.append('Content-Type', 'application/json');

      var raw = JSON.stringify(eventinfo);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      fetch(
        'https://event-calendar.onrender.com/calendar/addEvent',
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          console.log(result);
          setResp(result);
        })
        .catch(error => console.log('error', error));
      setType('');
      setW(false);
      setR(false);
      setP(false);
      onClose();
      props.setNewEvent(true);
    } else {
      toast({
        title: 'Error',
        description: valid.description,
        status: valid.status,
        duration: 10000,
        isClosable: true,
      });
    }
  };

  const { isOpen, onOpen, onClose } = useDisclosure();
  const times = [
    '00:00:00',
    '00:30:00',
    '01:00:00',
    '01:30:00',
    '02:00:00',
    '02:30:00',
    '03:00:00',
    '03:30:00',
    '04:00:00',
    '04:30:00',
    '05:00:00',
    '05:30:00',
    '06:00:00',
    '06:30:00',
    '07:00:00',
    '07:30:00',
    '08:00:00',
    '08:30:00',
    '09:00:00',
    '09:30:00',
    '10:00:00',
    '10:30:00',
    '11:00:00',
    '11:30:00',
    '12:00:00',
    '12:30:00',
    '13:00:00',
    '13:30:00',
    '14:00:00',
    '14:30:00',
    '15:00:00',
    '15:30:00',
    '16:00:00',
    '16:30:00',
    '17:00:00',
    '17:30:00',
    '18:00:00',
    '18:30:00',
    '19:00:00',
    '19:30:00',
    '20:00:00',
    '20:30:00',
    '21:00:00',
    '21:30:00',
    '22:00:00',
    '22:30:00',
    '23:00:00',
    '23:30:00',
  ];

  return (
    <Box>
      <Button
        size={{ base: 'sm', md: 'md' }}
        onClick={onOpen}
        my='50px'
        fontSize='25px'
        leftIcon={<AddIcon />}
        bg='white'
        border='2px'
        borderRadius='20px'
        borderTopColor='#4285F4'
        borderRightColor='#DB4437'
        borderBottomColor='#F4B400'
        borderLeftColor='#0F9D58'
        _hover={{ bg: '#4285F4', border: '0', color: 'white', boxShadow: 'lg' }}
      >
        Create
      </Button>
      <Modal
        size={{ base: 'sm', md: 'xl' }}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
        scrollBehavior='inside'
      >
        <ModalOverlay />
        <ModalContent>
          <Box bg='blackAlpha.200'>
            <ModalHeader>
              <Input
                placeholder='Event Title'
                _placeholder={{ color: 'black' }}
                fontSize='20px'
                fontWeight='semi-bold'
                fontFamily='sans-serif'
                variant='unstyled'
                maxLength= '30'
                onChange={updateTitle}
                isRequired
              />
            </ModalHeader>
          </Box>
          <ModalCloseButton
            onClick={() => {
              setR(false);
              setW(false);
              setP(false);
              setType('');
            }}
          />
          <Box bg={isW ? '#DB4437' : isP ? '#0F9D58' : isR ? '#4285F4' : ''}>
            <ModalBody>
              <Box
                display='flex'
                flexDirection='column'
                alignItems='center'
                w='100%'
              >
                <Box>
                  {/* Date selected*/}
                  <Box
                    display='flex'
                    alignItems='center'
                    fontSize='18px'
                    my='10px'
                  >
                    <CalendarIcon color='blackAlpha.700' mr='55px' />
                    <Text fontFamily='sans-serif'>{props.date}</Text>
                  </Box>
                  {/* Time Duration */}
                  <Box display='flex' alignItems='center' fontSize='20px'>
                    <TimeIcon color='blackAlpha.700' />
                    <Box display='flex' ml='50px'>
                      <Menu>
                        <MenuButton
                          size='md'
                          as={Button}
                          rightIcon={<ChevronDownIcon />}
                        >
                          {start.substring(0, 5)}
                        </MenuButton>
                        <MenuList h='200px' overflow='scroll'>
                          {times.map(t => (
                            <MenuItem onClick={e => setStart(t)}>
                              <Text>{t.substring(0, 5)}</Text>
                            </MenuItem>
                          ))}
                        </MenuList>
                      </Menu>
                    </Box>
                    <Text mx='15px'>:</Text>
                    <Menu>
                      <MenuButton
                        size='md'
                        as={Button}
                        rightIcon={<ChevronDownIcon />}
                      >
                        {end.substring(0, 5)}
                      </MenuButton>
                      <MenuList h='200px' overflow='scroll'>
                        {times.map(t => (
                          <MenuItem onClick={e => setEnd(t)}>
                            <Text>{t.substring(0, 5)}</Text>
                          </MenuItem>
                        ))}
                      </MenuList>
                    </Menu>
                  </Box>
                  {/* Booking type */}
                  <Box
                    display='flex'
                    alignItems='center'
                    fontSize='20px'
                    w='80%'
                    my='10px'
                  >
                    <InfoOutlineIcon color='blackAlpha.700' />
                    <Box
                      display='flex'
                      ml='50px'
                      fontFamily='sans-serif'
                      fontWeight='semibold'
                    >
                      <Checkbox
                        spacing='10px'
                        isChecked={isR}
                        mr='15px'
                        colorScheme='blue'
                        onChange={e => {
                          setType('Reminder');
                          setR(true);
                          setW(false);
                          setP(false);
                        }}
                      >
                        Reminder
                      </Checkbox>
                      <Checkbox
                        spacing='10px'
                        isChecked={isW}
                        mr='15px'
                        colorScheme='red'
                        onChange={e => {
                          setType('Work');
                          setW(true);
                          setP(false);
                          setR(false);
                        }}
                      >
                        Work
                      </Checkbox>
                      <Checkbox
                        spacing='10px'
                        isChecked={isP}
                        mr='15px'
                        colorScheme='green'
                        onChange={e => {
                          setType('Personal');
                          setP(true);
                          setW(false);
                          setR(false);
                        }}
                      >
                        Personal
                      </Checkbox>
                    </Box>
                  </Box>
                  {/*notes*/}
                  <Box
                    display='flex'
                    alignItems='center'
                    fontSize='18px'
                    mb='20px'
                  >
                    <EditIcon color='blackAlpha.700' mr='55px' />
                    <Input
                      placeholder='Add Notes'
                      _placeholder={{ color: 'black' }}
                      fontFamily='sans-serif'
                      variant='unstyled'
                      maxLength= '50'
                      onChange={updateNotes}
                    />
                  </Box>
                </Box>
              </Box>
            </ModalBody>
            <ModalFooter>
              <Button
                type='submit'
                onClick={() => {
                  handleSubmit();
                }}
              >
                Submit
              </Button>
            </ModalFooter>
          </Box>
        </ModalContent>
      </Modal>
    </Box>
  );
}

{
  /* Event validity checker */
}
function Validity(eventinfo) {
  var isSameOrBefore = require('dayjs/plugin/isSameOrBefore');
  dayjs.extend(isSameOrBefore);
  const today = dayjs();
  var description = '';
  var status = 'error';
  if (
    dayjs().isAfter(dayjs(eventinfo.date)) &&
    dayjs().format('YYYY-MM-DD') != eventinfo.date
  )
    description = 'Selected date must be same as or after today';
  else if (
    dayjs(eventinfo.date + ' ' + eventinfo.to_time).isSameOrBefore(
      eventinfo.date + ' ' + eventinfo.from_time
    )
  )
    description = 'End time must be greater than Start time';
  else if (
    eventinfo.label != 'Work' &&
    eventinfo.label != 'Personal' &&
    eventinfo.label != 'Reminder'
  )
    description = 'Please Choose Event Type';
  else status = 'success';
  return { status: status, description: description };
}
