import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  theme,
} from '@chakra-ui/react';

export default function Eventdisplay(props) {
  const eventresponse = {
    success: true,
    error: null,
    data: {
      '2022-11-25': [
        {
          block_id: 41,
          merchant_id: 'GR-JBXJEK',
          resources: 1,
          from_time: '11:00:00',
          to_time: '13:00:00',
          block_type: 'BOOKING',
          date: '2022-11-25',
        },
      ],
      '2022-11-23': [
        {
          block_id: 40,
          merchant_id: 'GR-JBXJEK',
          resources: 1,
          from_time: '12:00:00',
          to_time: '14:00:00',
          block_type: 'BOOKING',
          date: '2022-11-23',
        },
      ],
      '2022-11-22': [
        {
          block_id: 42,
          merchant_id: 'GR-JBXJEK',
          resources: 1,
          from_time: '11:00:00',
          to_time: '13:00:00',
          block_type: 'PERSONAL',
          date: '2022-11-22',
        },
      ],
    },
  };
}
