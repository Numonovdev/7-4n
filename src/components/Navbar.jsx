import { useContext, useEffect, useRef, useState } from 'react';
import { Link } from "react-router-dom"
import { CartContext, ThemeContext } from "../App"

function Navbar(){
  const {cart, setCart}= useContext(CartContext)
  const{theme, setTheme}= useContext(ThemeContext)
  const darkRef = useRef()
  const[count, setCount]= useState(0);

  useEffect(()=>{
    if(localStorage.getItem('endstart')){
        let copy = localStorage.getItem('endstart');
        darkRef.current.style.justifyContent=copy
    }

},[])

useEffect(()=>{
   let sum = 0
   cart.forEach(e => {
    sum += Number(e.count)
   });
   setCount(sum)
},[cart])

function handleClick(){
    if(theme=='light'){
         setTheme("dark")
         darkRef.current.style.justifyContent = 'end'
         localStorage.setItem('endstart', 'end')
        } else{
            setTheme("light")
            darkRef.current.style.justifyContent = 'start'
            localStorage.setItem('endstart', 'start')

    }
}


    return(
        <div className="w-full navbarr ">
          <div className="container mx-auto">
            <div className="navbar flex justify-between text-white ">
              <div className="flex ">
    <Link to={'/'} className="btn btn-active btn-secondary text-xl">C</Link>
              </div>

              <ul className="menu textt navbar-center flex menu-horizontal">
                  <li ><Link to={'/'} className="active ">Home</Link></li>
                  <li ><Link to={'/about'}>About</Link></li>
                  <li ><Link to={'/products'}>Products</Link></li>                
                  <li ><Link to={'/cart'}>Cart</Link></li>       
                  <li ><Link to={'/chackout'}>Chackout</Link></li>       
                  <li ><Link to={'/orders'}>Orders</Link></li>       
              </ul>

              <div className="flex gap-10">
              <div className="w-20 p-1 rounded-[25px] h-10 bgdark flex justify-start" ref={darkRef} onClick={handleClick}>
                    <div className="w-[40%] h-full bgdarkchild rounded-2xl"></div>
                </div>
    <div className="dropdown textt dropdown-end">
      <div tabIndex={count} role="button" className="btn btn-ghost btn-circle">
        <div className="indicator">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
          </svg>
          <span className="badge badge-sm indicator-item">{count}</span>
        </div>
      </div>
      <div
        tabIndex={0}
        className="card card-compact dropdown-content bg-base-100 z-[1] mt-3 w-52 shadow">
        <div className="card-body">
          <span className="text-lg font-bold">8 Items</span>
          <span className="text-info">Subtotal: $999</span>
          <div className="card-actions">
            <button className="btn btn-primary btn-block">View cart</button>
          </div>
        </div>
      </div>
    </div>
              </div>
            </div>
          </div>
        </div>
    )
}

export default Navbar