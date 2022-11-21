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

export function Fetchreq(date) {
  console.log('called');
  const [respdata, setRespdata] = useState();

  var myHeaders = new Headers();
  myHeaders.append(
    'access-token',
    'MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ=='
  );
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Allow-Origin', '*');

  var raw = JSON.stringify({
    merchant_id: 'GR-JBXJEK',
    from_date: date,
    to_date: date,
  });

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  fetch(
    'http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block/get_blocks_by_merchant',
    requestOptions
  )
    .then(response => response.json())
    .then(result => {
      setRespdata(result);
    })
    .catch(error => console.log('error', error));

  return respdata;
}

export function Addreq(data) {
  var myHeaders = new Headers();
  myHeaders.append(
    'access-token',
    'MzQ6dGVzdE1haWxAZ21haWwuY29tOkFkbWluOjM4ZDkzN2YxLTU1MGUtNDFmNy1iZTZiLTg1OGNkNzVjNGE4ZQ=='
  );
  myHeaders.append('Content-Type', 'application/json');
  myHeaders.append('Access-Control-Allow-Origin', '*');

  var raw = JSON.stringify(data);

  var requestOptions = {
    method: 'POST',
    headers: myHeaders,
    body: raw,
    redirect: 'follow',
  };

  useEffect(() => {
    fetch(
      'http://pawsensetest2-env.eba-rtpxdxih.ap-south-1.elasticbeanstalk.com/api/block',
      requestOptions
    )
      .then(response => response.text())
      .then(result => console.log(result))
      .catch(error => console.log('error', error));
  }, []);

  return 200;
}
