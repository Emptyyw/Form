import React from 'react';
import App from './App';
import { createRoot } from 'react-dom/client';
import { MantineProvider, createTheme, type MantineColorsTuple } from '@mantine/core';
import '@mantine/core/styles.css';
import { ModalsProvider } from '@mantine/modals';

import './index.css';

const myColor: MantineColorsTuple = [
  '#f6eeff',
  '#e7daf7',
  '#cab1ea',
  '#ad86dd',
  '#9562d2',
  '#854bcb',
  '#7d3ec9',
  '#6b31b2',
  '#5f2aa0',
  '#52228d',
];

const theme = createTheme({
  fontFamily: 'Open Sans, sans-serif',
  primaryColor: 'myColor',
  colors: {
    myColor,
  },
});

createRoot(document.getElementById('root')!).render(
  <MantineProvider theme={theme}>
    <ModalsProvider>
      <App />
    </ModalsProvider>
  </MantineProvider>,
);
