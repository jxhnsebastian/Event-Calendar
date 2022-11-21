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
} from '@chakra-ui/icons';
import dayjs from 'dayjs';

export default function Eventmaker(props) {
  const [start, setStart] = useState('10:00:00');
  const [end, setEnd] = useState('17:00:00');
  const [resources, setResources] = useState('1');
  const [type, setType] = useState('');
  const [isB, setB] = useState(false);
  const [isP, setP] = useState(false);
  const [resp, setResp] = useState();
  const eventinfo = {
    merchant_id: 'GR-JBXJEK',
    date: props.date,
    from_time: start,
    to_time: end,
    resources: resources,
    block_type: type,
  };

  const slidermax =
    dayjs(props.date + ' ' + end).diff(
      dayjs(props.date + ' ' + start),
      'minutes'
    ) / 10;

  const toast = useToast();

  {/* event created / error toast message */}
  useEffect(() => {
    if (resp != null) {
      resp.success == true
        ? toast({
            title: 'Event Created',
            status: 'success',
            durstion: 10000,
            isClosable: true,
          })
        : toast({
            title: 'Error',
            description: resp.error.message,
            status: 'error',
            durstion: 10000,
            isClosable: true,
          });
    }
  }, [resp]);

  const handleSubmit = () => {
    const valid = Validity(eventinfo);
    if (valid.status == 'success') {
      var myHeaders = new Headers();
      myHeaders.append(
        'access-token',
        'MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ=='
      );
      myHeaders.append('Content-Type', 'application/json');
      myHeaders.append('Access-Control-Allow-Origin', '*');

      var raw = JSON.stringify(eventinfo);

      var requestOptions = {
        method: 'POST',
        headers: myHeaders,
        body: raw,
        redirect: 'follow',
      };
      fetch(
        'http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block',
        requestOptions
      )
        .then(response => response.json())
        .then(result => {
          //console.log(result);
          setResp(result);
        })
        .catch(error => console.log('error', error));
      setType('');
      setB(false);
      setP(false);
      onClose();
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
                //onChange={handleChange}
                isRequired
              />
            </ModalHeader>
          </Box>
          <ModalCloseButton
            onClick={() => {
              setB(false);
              setP(false);
              setType('');
            }}
          />
          <Box bg={isB ? '#DB4437' : isP ? '#0F9D58' : ''}>
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
                        isChecked={isB}
                        mr='15px'
                        colorScheme='red'
                        onChange={e => {
                          setType('BOOKING');
                          setB(true);
                          setP(false);
                        }}
                      >
                        Booking
                      </Checkbox>
                      <Checkbox
                        spacing='10px'
                        isChecked={isP}
                        mr='15px'
                        colorScheme='green'
                        onChange={e => {
                          setType('PERSONAL');
                          setP(true);
                          setB(false);
                        }}
                      >
                        Personal
                      </Checkbox>
                    </Box>
                  </Box>
                  {/* Slider */}
                  <Box display='flex' fontSize='20px' mt='25px' w='100%'>
                    <SettingsIcon color='blackAlpha.700' mr='50px' />
                    <Slider
                      min={0}
                      max={slidermax}
                      step={1}
                      onChange={val => setResources(val)}
                      defaultValue={1}
                    >
                      <SliderMark
                        value={resources}
                        textAlign='center'
                        bg='#4285F4'
                        fontSize='15px'
                        color='white'
                        mt='-29px'
                        ml='-12px'
                        w='25px'
                        borderRadius='20px'
                      >
                        {resources}
                      </SliderMark>
                      <SliderTrack>
                        <SliderFilledTrack />
                      </SliderTrack>
                      <SliderThumb />
                    </Slider>
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

{/* Event validity checker */}
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
    eventinfo.block_type != 'BOOKING' &&
    eventinfo.block_type != 'PERSONAL'
  )
    description = 'Please Choose Event Type';
  else if (eventinfo.resources == 0)
    description = 'Resources must be greater than 0';
  else status = 'success';
  return { status: status, description: description };
}
