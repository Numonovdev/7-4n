import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { http } from "../axios";
import { CartContext } from "../App";

function Details() {
  const { id } = useParams();
  const [data, setData] = useState(null); 
  const navigate = useNavigate();
  const[color, setColor]=useState()
  const[count, setCount]= useState(1)
  const {cart, setCart}= useContext(CartContext)
 
 useEffect(()=>{
  if(localStorage.getItem('cart')){
    setCart(JSON.parse(localStorage.getItem('cart')))
  }
 },[])
 
  useEffect(() => {
    http.get(`products/${id}`)
      .then(response => {
        setData(response.data.data);
        setColor(response.data.data.attributes.colors[0])
      })
      .catch(err => {
        console.log(err);
      });
  }, [id]); 

  function handleProducts(){
     navigate('/products')
  }

  
  function handleHome(){
    navigate('/')
 }


 function handleSetCart(e){
  e.preventDefault();


const dataData = {
  data: data,
  color: color,
  count: Number(count),
  id: data.id,
}


let copied = [...cart]

let isExist = copied.find(function(c){
  return c.id == dataData.id && c.color == dataData.color;
})

if(!isExist){

  copied =  [...cart,dataData]

} else{
  copied = copied.map((value)=>{
    if(value.id == dataData.id && value.color == dataData.color){
      value.count == Number(value.count)
      value.count += Number(dataData.count)
    }
    return value
  })
}

setCart(copied)
localStorage.setItem('cart', JSON.stringify(copied))
}
  if (!data) {
    return <div className="text-7xl text-center mx-auto container mt-20">Loading...</div>; // Ma'lumotlar yuklanayotganda
  }

  return (
    <div className="mt-20 flex flex-col w-full container mx-auto min-h-[100vh]">
      <div className="flex gap-2">
        <p className="cursor-pointer" onClick={handleHome}>Home</p>{">"}<p className="cursor-pointer" onClick={handleProducts}>products</p>
      </div>
      <div className="w-full mt-10 flex gap-16">
        <img src={data.attributes.image} className="w-[650px] h-[400px] rounded-xl" alt="" />
        <div className="flex flex-col font-bold w-[850px]">
          <h1 className="xl:text-5xl lg:text-4xl  md:text-3xl sm:text-2xl">{data.attributes.title}</h1> {/* Ma'lumotdan title olish */}
          <h2 className="xl:text-2xl lg:text-xl mt-5 md:text-lg sm:text-lg">{data.attributes.brand}</h2> {/* Ma'lumotdan brand olish */}
          <p className="xl:text-2xl lg:text-xl mt-5 md:text-lg sm:text-lg">${data.attributes.price}</p> {/* Ma'lumotdan narx olish */}
          <p className="xl:text-xl lg:text-lg mt-5 md:text-base sm:text-base">{data.attributes.description}</p> {/* Ma'lumotdan ta'rif olish */}
          <p className="xl:text-xl lg:text-lg mt-5 md:text-base sm:text-base">Colors</p>
          <div className="flex gap-5 items-center mt-3">
          {
            data.attributes.colors.length>0 && data.attributes.colors.map((colorProduct, index)=>{
            return(
            <span key={index} style={{backgroundColor: colorProduct,
            border: color == colorProduct ? '3px solid blue' : 'none'
            }} className="w-5 h-5 cursor-pointer rounded-full"
            onClick={()=>{setColor(colorProduct)}}></span>
            )})
          }

            {/* <div className="w-5 h-5 cursor-pointer bg-red-700 border-2 rounded-full border-pink-700"></div>
            <div className="w-5 h-5 cursor-pointer bg-green-700 border-2 rounded-full border-pink-700"></div>
            <div className="w-5 h-5 cursor-pointer bg-blue-700 border-2 rounded-full border-pink-700"></div> */}
          </div>
          <p className="xl:text-lg lg:text-lg mt-5 md:text-base sm:text-base">Amount</p>
          <select value={count} onChange={(e)=>{setCount(e.target.value)}} className=" mt-2 xl:w-1/2 p-2 py-3 rounded-xl bg-transparent border selectt">
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <button onClick={handleSetCart} className="btn btnn xl:w-1/5  mt-10">ADD TO BAG</button>
        </div>
      </div>
    </div>
  );
}

export default Details;
