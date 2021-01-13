import React, { useEffect } from 'react';
import ReactDOM from 'react-dom';
import axios from 'axios';

import Charts from './components/Charts';
import Navbar from './components/Navbar';
import useDarkMode from './hooks/useDarkMode';
import useLocalStorage from './hooks/useLocalStorage';

import './styles.scss';

const initialValue = [];

const App = () => {
  const [coinData, setCoinData] = useLocalStorage('data', initialValue);
  // The next line can also be accomplished with const [darkMode, setDarkMode] = useLocalStorage('dark', false) eliminating the need for a second custom hook.
  const [darkMode, setDarkMode] = useDarkMode();

  useEffect(() => {
    axios
      .get(
        'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=true',
      )
      .then((res) => setCoinData(res.data))
      .catch((err) => console.log(err));
    //eslint-disable-next-line
  }, []);
  return (
    <div className={darkMode ? 'dark-mode App' : 'App'}>
      <Navbar darkMode={darkMode} setDarkMode={setDarkMode} />
      <Charts coinData={coinData} />
    </div>
  );
};

const rootElement = document.getElementById('root');
ReactDOM.render(<App />, rootElement);
