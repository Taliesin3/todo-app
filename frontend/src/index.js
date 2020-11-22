// React imports
import React from 'react';
import ReactDOM from 'react-dom';
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles";
import { blue } from "@material-ui/core/colors";
import App from './components/App';

const theme = createMuiTheme({
  palette: {
    primary: blue,
  }
});

// Render React components
ReactDOM.render(
  <ThemeProvider theme={theme}>
    <App />
  </ThemeProvider>,
  document.getElementById('root')
);