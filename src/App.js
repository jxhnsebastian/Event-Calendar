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
} from '@chakra-ui/react';
import { ColorModeSwitcher } from './ColorModeSwitcher';
import { Logo } from './Logo';
import Footer from './Components/Footer';
import Home from './Components/Home';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Box>
        <Home />
        <Footer />
      </Box>
    </ChakraProvider>
  );
}

export default App;
