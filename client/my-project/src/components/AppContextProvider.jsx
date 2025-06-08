import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';

const AppContext = createContext();
export const Global= () => useContext(AppContext);


const AppContextProvider = ({ children }) => {
 

  
  const [data, setData] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);
  const [loggedOut, setLoggedOut] = useState(false);

  const getData = async () => {
    axios.defaults.withCredentials=true
    try {
      const response = await axios.get('https://auth-mern-backend-blush.vercel.app/api/auth/data', {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true,
      });

      if (response.data.success) {
        setData(response.data);
       
        // toast.success('fetch  successfully');
      } else {
        // toast.error(response.data.error || 'Failed to fetch user data');
        
      }
    } catch (error) {
      console.error('Fetch error:', error);
      toast.error('Something went wrong while fetching user data');
      setData(null);
    }
  };

  useEffect(() => {
    getData()
  }, [data]);

  const value = {
    data,
    setData,
    loggedIn,
    setLoggedIn,
    loggedOut,
    setLoggedOut,
    getData,
    
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
};

export default AppContextProvider;
