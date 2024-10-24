import { createContext, useEffect, useState } from 'react';
import './App.css'
import Header from './pages/Header'
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import About from './pages/About'
import Products from './pages/Products'
import Cart from './pages/Cart'
import Home from './pages/Home'
import Details from './pages/Details';
import Register from './pages/Register';
import Login from './pages/Login';
import Chackout from './pages/Chackout';
import Orders from './pages/Orders';
import ErrorPage from './pages/ErrorPage';
import MainLayout from './layout/MainLayout';

export const ThemeContext = createContext();
export const CartContext = createContext();


function App() {
  const [theme, setTheme] = useState('light');
  const navigate = useNavigate();
  const [token, setToken] = useState(localStorage.getItem("token"))
  let params = useLocation();
  const[cart, setCart]= useState([]);


  


  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      setTheme(savedTheme);
    }

  }, []);


  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    localStorage.setItem('theme', theme);
  }, [theme]);


   function PrivateRoute({isAuth, children}){
        if(!isAuth){
          navigate('/login')
        }
       return children
  }
  useEffect(()=>{
    if(localStorage.getItem('token')){
      setToken(localStorage.getItem('token'))
    }else{
      if(!(location.pathname == '/' || location.pathname.includes('register') || location.pathname.includes('about') || location.pathname.includes('products') || location.pathname.includes('cart')))
      navigate('/login')
    }
  },[navigate])


  return (
    <CartContext.Provider value={{cart, setCart}}>

    <ThemeContext.Provider value={{ theme, setTheme }}>

    < div className='appp'>
    {/* <Header></Header> */}
      <Routes>
        <Route path='/' element={<MainLayout><Home/></MainLayout>}></Route>
        <Route path='/about' element={<MainLayout><About/></MainLayout>}></Route>
        <Route path='/products' element={<MainLayout><Products/></MainLayout>}></Route>
        <Route path='/cart' element={<MainLayout><Cart/></MainLayout>}></Route>
        <Route path='/products/:id' element={<MainLayout><Details/></MainLayout>}></Route>
        <Route path='/register' element={<Register/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        
        <Route path='/chackout' element={<PrivateRoute isAuth={!!token}><MainLayout><Chackout/></MainLayout></PrivateRoute>}></Route>
        <Route path='/orders' element={<PrivateRoute isAuth={!!token}><MainLayout><Orders/></MainLayout></PrivateRoute>}></Route>
        <Route path='*' element={<MainLayout><ErrorPage/></MainLayout>}></Route>
      </Routes>
    </div>
    </ThemeContext.Provider>
    </CartContext.Provider>

  )
}

export default App
