import React, { useState, createContext } from 'react';
import dayjs from 'dayjs';
import { propNames } from '@chakra-ui/styled-system';

export const GlobalContext = createContext();

export const GlobalProvider = (props) => {
  const [user, setUser] = useState('');
  const [online, setOnline] = useState(false);
  const [date_selected, setDate_selected] = useState(dayjs().format('D'));
  const [day_selected, setDay_selected] = useState(dayjs().format('dddd'));
  const [isDaily, setIsDaily] = useState(false);
  const [curr_month, setCurr_month] = useState(dayjs().format('MMMM'));
  const [curr_yr, setCurr_yr] = useState(dayjs().format('YYYY'));
  const [sidebar, setSidebar] = useState(true);
  const [week, setWeek] = useState([]);
  return(
    <GlobalContext.Provider value={{
        user,
        setUser,
        online,
        setOnline,
        date_selected,
        setDate_selected,
        day_selected,
        setDay_selected,
        isDaily,
        setIsDaily,
        curr_month,
        setCurr_month,
        curr_yr,
        setCurr_yr,
        sidebar,
        setSidebar,
        week,
        setWeek
    }}>
        {props.children}
    </GlobalContext.Provider>
  );
};
