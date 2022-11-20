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

export default function Eventdisplay(props) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box w='100%' h='100%'>
      <Button w='100%' h='100%' variant='unstyled' onClick={onOpen}>
        {props.data.id}
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <Box w='100%' bg='blackAlpha.200'>
            <ModalHeader>Event Info</ModalHeader>
          </Box>
          <ModalCloseButton />
          <ModalBody>
            {/* Date */}
            <Box display='flex' alignItems='center' fontSize='18px' my='10px'>
              <CalendarIcon color='blackAlpha.700' mr='55px' />
              <Text fontFamily='sans-serif'>{props.data.date}</Text>
            </Box>
            {/* time */}
            <Box display='flex' alignItems='center' fontSize='20px' my='10px'>
              <TimeIcon color='blackAlpha.700' />
              <Box display='flex' ml='50px'>
                <Text>
                  {props.data.start.substring(0,2) < 12 ? props.data.start+' am' : props.data.start+' pm'} to {props.data.end.substring(0,2) < 12 ? props.data.end+' am' : props.data.end+' pm'}
                </Text>
              </Box>
            </Box>
            {/* type */}
            <Box display='flex' alignItems='center' fontSize='20px' my='10px'>
              <InfoOutlineIcon color='blackAlpha.700' />
              <Box display='flex' ml='50px'>
                <Text>
                  {props.data.type} 
                </Text>
              </Box>
            </Box>
            <Box display='flex' alignItems='center' fontSize='20px' my='10px'>
              <SettingsIcon color='blackAlpha.700' />
              <Box display='flex' ml='50px'>
                <Text>
                  {props.data.resources} 
                </Text>
              </Box>
            </Box>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            <Button _hover={{ bg: '#DB4437'}} onClick={e => {props.setDelete(true); props.setDel_id(props.data.id)}}>Delete Event</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
}
