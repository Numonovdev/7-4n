

function Block(props,{handleClick}){
const{data}= props
// console.log(data.id)
    return(
        <div onClick={() => handleClick(data.id)} className="flex shadow-xl cursor-pointer textt p-3 flex-col items-center w-1/4 font-bold rounded-xl gap-5">
            <img className="w-full h-[300px]" src={data.attributes.image} alt="" />
            <h1 className="textt xl:text-2xl lg:text-xl md:text-base sm:text-base">{data.attributes.title}</h1>
            <p className="xl:text-xl lg:text-base md:text-sm sm:text-sm ">{data.attributes.price}</p>
        </div>
    )
}
export default Block