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
import Home from './Components/Home';
import { GlobalProvider } from './context/GlobalContext';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <GlobalProvider>
      <Box>
        <Home />
      </Box>
      </GlobalProvider>
    </ChakraProvider>
  );
}

export default App;
