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

export function Eventreq(data, req) {
  //console.log(data);
  //console.log(req);

  const [resdata, setResdata] = useState([]);

  if (req == 'add') {
    var myHeaders = new Headers();
    myHeaders.append(
      'access-token',
      'MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ=='
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify(data);

    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: JSON.stringify(data),
      mode: 'no-cors',
      redirect: 'follow',
    };

    fetch(
      'http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block',
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }

  if (req == 'fetch') {
    var from_date = data;
    var to_date = data;
    // {
    //   data.map(d => {
    //     if (d.day == 'Monday') from_date = d.dateQ;
    //     if (d.day == 'Friday') to_date = d.dateQ;
    //   });
    // }
    console.log(data);
    console.log('from date :' + from_date);
    console.log('to date :' + to_date);

    var myHeaders = new Headers();
    myHeaders.append(
      'access-token',
      'MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ=='
    );
    myHeaders.append('Content-Type', 'application/json');

    var raw = JSON.stringify({
      merchant_id: 'GR-JBXJEK',
      from_date: from_date,
      to_date: to_date,
    });
    console.log(raw);
    
    var requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      mode: 'no-cors',
      redirect: 'follow',
    };

    fetch(
      'http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block/get_blocks_by_merchant',
      requestOptions
    )
      .then(response => response.text())
      .then(result => {console.log(result);setResdata(result)})
      .catch(error => console.log('error', error));
   }

   
}
