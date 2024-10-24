import { useEffect, useState } from "react"
import Block from "../components/Block"
import { http } from "../axios"
import { useNavigate } from "react-router-dom";

function Home() {
    const [data, setData] = useState([]);
    const navigate = useNavigate();


function handleClickID(id){
    console.log(id)
    navigate(`products/${id}`)
}

    useEffect(() => {
        http.get("products?featured=true")
            .then(data => {
                setData(data.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])



    if (!data) {
        return <div className="text-7xl text-center mx-auto container mt-20">Loading...</div>; // Ma'lumotlar yuklanayotganda
      }

    return (
        <div className="flex textt flex-col container mx-auto xl:mt-28 pb-40 lg:mt-20 md:mt-10 sm:mt-5">
            <div className="flex">
                <div className="flex flex-col w-[50%] font-bold gap-10">
                    <h1 className="xl:text-7xl lg:text-6xl md:text-4xl sm:text-2xl">
                        We are changing the way people shop
                    </h1>
                    <p className="xl:text-xl lg:text-xl md:text-base sm:text-sm">
                        Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tempore repellat explicabo enim soluta temporibus asperiores aut obcaecati perferendis porro nobis.
                    </p>
                    <button className="btn btn-secondary xl:w-40 lg:w-30 md:w-20 sm:w-20 lg:text-sm md:text-sm">OUR PRODUCTS</button>
                </div>
            </div>
            <div className="flex flex-col mt-32 gap-5">
                <h1 className="xl:text-3xl md:text-2xl lg:text-xl sm:text-xl textt">Featured products</h1>
                <div className="w-full border bordercolor"></div>
                <div className="flex flex-wrap w-full gap-16 justify-center">
                    {
                        data.length && data.map(function (value, index) {
                            return (
                                // <Block handleClick={handleClickId} data={value} key={index}/>
                                <div  onClick={() => (handleClickID(value.id))} className="flex shadow-xl cursor-pointer textt p-3 flex-col items-center w-1/4 font-bold rounded-xl gap-5">
                                    <img className="w-full h-[300px]" src={value.attributes.image} alt="" />
                                    <h1 className="textt xl:text-2xl lg:text-xl md:text-base sm:text-base">{value.attributes.title}</h1>
                                    <p className="xl:text-xl lg:text-base md:text-sm sm:text-sm ">{value.attributes.price}</p>
                                </div>
                )
                        })
                    }
            </div>
        </div>
        </div >
    )
}

export default Home