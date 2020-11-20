import React from 'react';
import { render } from 'react-snapshot';
import './styles.css';
import App from './components/App';
//google analytics....
import ReactGA from 'react-ga';
ReactGA.initialize('UA-54091861-1');
ReactGA.pageview(window.location.pathname + window.location.search);
//end google analytics

render(
  <App/>,
  document.getElementById('root')
);