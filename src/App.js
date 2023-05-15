import {BrowserRouter} from 'react-router-dom'
import AppRouter from './component/AppRouter';
import { Context } from '.';
import { useContext, useEffect, useState } from 'react';
import jwtDecode from 'jwt-decode';


function App() {

  const [loading, setLoading] = useState(false)
  const {user} = useContext(Context)

  useEffect(() => {
    if(localStorage.getItem('token') != null){
      const userInfo = jwtDecode(localStorage.getItem('token'))
      user.setIsAuth(true)
      setLoading(true)
    }
    else{
      setLoading(true)
    }
  }, [user])
  if(loading === false){
    return(<h1>Загрузка</h1>)
  }
  console.log(user._isAuth)

  return (
    <BrowserRouter>
    <AppRouter />
    </BrowserRouter>
  );
}

export default App;
