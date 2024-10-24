import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../axios";

function Products(){

    const[search, setSearch]=useState();
    const [data, setData] = useState([]);
    const navigate = useNavigate();


function handleClickID(id){
    console.log(id)
    navigate(`${id}`)
}

    useEffect(() => {
        http.get("products")
            .then(data => {
                setData(data.data.data)
            })
            .catch((err) => {
                console.log(err)
            })
    }, [])




    return(
        <div className="container mx-auto flex pb-20 flex-col mt-10">
            <div className="w-full rounded-xl navbarr py-5 flex justify-evenly ">
                <div className="w-1/5 flex flex-col">
                    <p>Search Products</p>
                    <input value={search}    type="text" className="mt-2 px-3 py-2 rounded-xl appp outline-none input-bordered w-full max-w-x" />
                    <div className="mt-10">
                        <div className="flex justify-between">
                        <span>Select Price</span>
                        <span>$1000.00</span>
                        </div>
                        <input type="range"  className="range mt-2 range-primary" />
                        <div className="flex justify-between">
                        <span>0</span>
                        <span>Max: $1000.00</span>
                    </div>
                    </div>
                </div>
                <div className="w-1/5 flex flex-col">
                    <p>Select Category</p>
                    <select className="mt-2 px-3 py-2 rounded-xl appp outline-none input-bordered w-full max-w-x">
                        <option value="all">all</option>
                        <option value="Tables">Tables</option>
                        <option value="Chairs">Chairs</option>
                        <option value="Kids">Kids</option>
                        <option value="Sofas">Sofas</option>
                        <option value="Beds">Beds</option>
                    </select>
                    
                    <div className="mt-10 flex flex-col items-center">
                        <div className="flex mt-5 justify-between">
                        <span>Fee Shipping</span>
                        </div>
                        <input type="checkbox"  className=" mt-2 checkbox checkbox-secondary" />
                    </div>
                </div>
                <div className="w-1/5 flex flex-col">
                    <p>Select Company</p>
                    <select className="mt-2 px-3 py-2 rounded-xl appp outline-none input-bordered w-full max-w-x">
                        <option value="all">all</option>
                        <option value="ModenzA">ModenzA</option>
                        <option value="Luxora">Luxora</option>
                        <option value="Artifex">Artifex</option>
                        <option value="Comfora">Comfora</option>
                        <option value="Homestead">Homestead</option>
                    </select>
                    
                    <div className="mt-10 flex flex-col items-center">
                        <button className="btn btn-secondary w-full">Search</button>
                    </div>
                </div>
                <div className="w-1/5 flex flex-col">
                    <p>Select Company</p>
                    <select className="mt-2 px-3 py-2 rounded-xl appp outline-none input-bordered w-full max-w-x">
                        <option value="a-z">a-z</option>
                        <option value="z-a">z-a</option>
                        <option value="high">high</option>
                        <option value="low">low</option>
                    </select>
                    
                    <div className="mt-10 flex flex-col items-center">
                        <button className="btn btn-secondary w-full">RESET</button>
                    </div>
                </div>
            </div>
            <div>
                <div className="flex justify-between border-b bordercolor py-5 mt-10">
                    <p>22 products</p>
                    <div className="flex gap-3 xl:text-3xl md:text-2xl lg:texxt-xl sm:text-lg">
                    <i  class="cursor-pointer hover:text-pink-700 fa-solid fa-table-cells-large"></i>
                    <i  class="cursor-pointer hover:text-pink-700 fa-solid fa-bars"></i>
                    </div>
                </div>
                <div className="w-full flex flex-wrap gap-10 mt-10 justify-around">
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

        
        </div>
        
    )
}

export default Products