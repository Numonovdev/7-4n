import { useContext, useEffect, useState } from "react";
import { CartContext } from "../App";

function Cart() {
  const { cart, setCart } = useContext(CartContext);
  const [prices, setPrices] = useState(0);
  
  useEffect(() => {
    if (localStorage.getItem('cart')) {
      setCart(JSON.parse(localStorage.getItem('cart')));
    }
  }, [setCart]);

 function handleAmout(e, index){
    const newCart =[...cart]
   newCart[index.count] = e.targer.value
   setCart(newCart)
   localStorage.getItem('cart', JSON.stringify(newCart))
 }

 useEffect(() => {
    const totalPrice = cart.reduce((acc, value) => acc + value.data.attributes.price * value.count, 0);
    setPrices(totalPrice);
  }, [cart]);

  return (
    <div className="w-full container min-h-[95vh] mt-20 gap-10 mx-auto flex flex-col">
      <h1 className="text font-bold text-4xl">Shopping Cart</h1>
      <div className="w-full border h-1 btnn"></div>
      <div className="flex gap-10">
        <div className="flex flex-col gap-5 flex-1">
          {cart.length > 0 &&
            cart.map((value, index) => {
              return (
                
                <div key={index} className="flex w-full justify-between">
                {console.log(cart) /*company*/                }
                  <img src={value.data.attributes.image} className="w-52 h-52 rounded-lg" alt="Product Image" />
                  <div className="flex flex-col">
                    <h1>{value.data.attributes.category || "Chic Chain"}</h1>
                    <p>{value.data.attributes.company || "Luxora"}</p>
                    <p className="flex items-center gap-2">
                      Color: <div style={{ backgroundColor: value.color }} className="w-5 h-5 rounded-full"></div>
                    </p>
                  </div>
                  <div className="flex flex-col">
                    <h1>Amount</h1>
                    <select value={value.count} onChange={(e)=>{handleAmout(e,index)}}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                    </select>
                    <span className="text-pink-500">remove</span>
                  </div>
                  <span>${value.data.attributes.price || 339.99}</span>
                </div>
              );
            })}
        </div>
        <div className="navbarr p-10">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>$339.99</span>
          </div>
          <div className="flex justify-between">
            <span>Shipping</span>
            <span>$5.00</span>
          </div>
          <div className="flex justify-between">
            <span>Tax</span>
            <span>$34.00</span>
          </div>
          <div className="flex justify-between">
            <span>Order Total</span>
            <span>${prices}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Cart;
