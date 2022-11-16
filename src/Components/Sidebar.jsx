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
  CloseButton,
} from '@chakra-ui/react';
import DatePicker from './DatePicker';

export default function Sidebar(props) {
  return (
    <Box
      display='flex'
      flexDirection='column'
      alignItems='center'
      bg='white'
      borderRight='2px'
      borderColor='#D9DDDC'
      h='100%'
      w={{base : '60%', md : '20%'}}
      position={{base : 'absolute', md : 'static'}}
    >
      <CloseButton
        ml='85%'
        mt='5px'
        _hover={{}}
        onClick={e => props.setSidebar(false)}
      />
      <Button
        size={{ base : 'sm', md : 'md'}}
        mt='50px'
        fontSize='25px'
        bg='white'
        border='1px'
        borderColor='#D9DDDC'
        _hover={{ bg: 'blackAlpha.100', boxShadow : 'lg' }}
        
      >
        Create
      </Button>
    </Box>
  );
}
