import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { http } from "../axios";

function Products() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedCompany, setSelectedCompany] = useState("all");
  const [priceRange, setPriceRange] = useState(1000);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const navigate = useNavigate();

  // ID bo'yicha mahsulotga o'tish
  function handleClickID(id) {
    navigate(`${id}`);
  }

  // API orqali ma'lumotlarni olish
  useEffect(() => {
    http.get("products")
      .then((res) => {
        console.log("Ma'lumotlar:", res.data.data); // Ma'lumotlarni tekshirish
        setData(res.data.data);
        setFilteredData(res.data.data); // Boshida barcha ma'lumotlarni yuklash
      })
      .catch((err) => {
        console.log("Xato:", err);
      });
  }, []);

  // Filtrlangan ma'lumotlarni yangilash
  useEffect(() => {
    let updatedData = data;

    // Qidiruv bo'yicha filtr
    if (search) {
      updatedData = updatedData.filter((item) =>
        item.attributes.title.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Kategoriya bo'yicha filtr
    if (selectedCategory !== "all") {
      updatedData = updatedData.filter(
        (item) => item.attributes.category === selectedCategory
      );
    }

    // Kompaniya bo'yicha filtr
    if (selectedCompany !== "all") {
      updatedData = updatedData.filter(
        (item) => item.attributes.company === selectedCompany
      );
    }

    // Narx bo'yicha filtr
    updatedData = updatedData.filter(
      (item) => item.attributes.price <= priceRange
    );

    setFilteredData(updatedData); // Filtrlash natijasini yangilash
  }, [search, selectedCategory, selectedCompany, priceRange, data]);

  return (
    <div className="container mx-auto flex pb-20 flex-col mt-10">
      <div className="w-full rounded-xl navbarr py-5 flex justify-evenly ">
        {/* Qidiruv */}
        <div className="w-1/5 flex flex-col">
          <p>Search Products</p>
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            type="text"
            className="mt-2 px-3 py-2 rounded-xl appp outline-none input-bordered w-full max-w-x"
          />
          <div className="mt-10">
            <div className="flex justify-between">
              <span>Select Price</span>
              <span>${priceRange}</span>
            </div>
            <input
              type="range"
              value={priceRange}
              onChange={(e) => setPriceRange(Number(e.target.value))}
              max="1000"
              className="range mt-2 range-primary"
            />
            <div className="flex justify-between">
              <span>0</span>
              <span>Max: $1000.00</span>
            </div>
          </div>
        </div>

        {/* Kategoriya */}
        <div className="w-1/5 flex flex-col">
          <p>Select Category</p>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            className="mt-2 px-3 py-2 rounded-xl appp outline-none input-bordered w-full max-w-x"
          >
            <option value="all">all</option>
            <option value="Tables">Tables</option>
            <option value="Chairs">Chairs</option>
            <option value="Kids">Kids</option>
            <option value="Sofas">Sofas</option>
            <option value="Beds">Beds</option>
          </select>
        </div>

        {/* Kompaniya */}
        <div className="w-1/5 flex flex-col">
          <p>Select Company</p>
          <select
            value={selectedCompany}
            onChange={(e) => setSelectedCompany(e.target.value)}
            className="mt-2 px-3 py-2 rounded-xl appp outline-none input-bordered w-full max-w-x"
          >
            <option value="all">all</option>
            <option value="ModenzA">ModenzA</option>
            <option value="Luxora">Luxora</option>
            <option value="Artifex">Artifex</option>
            <option value="Comfora">Comfora</option>
            <option value="Homestead">Homestead</option>
          </select>
        </div>
      </div>

      {/* Filtrlangan mahsulotlar ro'yxati */}
      <div>
        <div className="flex justify-between border-b bordercolor py-5 mt-10">
          <p>{filteredData.length} products</p>
          <div className="flex gap-3 xl:text-3xl md:text-2xl lg:texxt-xl sm:text-lg">
            <i className="cursor-pointer hover:text-pink-700 fa-solid fa-table-cells-large"></i>
            <i className="cursor-pointer hover:text-pink-700 fa-solid fa-bars"></i>
          </div>
        </div>
        <div className="w-full flex flex-wrap gap-10 mt-10 justify-around">
          {filteredData.length > 0 ? (
            filteredData.map((value, index) => (
        
                <div
                onClick={() => handleClickID(value.id)}
                key={index}
                className="flex shadow-xl cursor-pointer textt p-3 flex-col items-center w-1/4 font-bold rounded-xl gap-5"
              >
{                console.log("Ma'lumotlar:", value) }
                <img className="w-full h-[300px]" src={value.attributes.image} alt="" />
                <h1 className="textt xl:text-2xl lg:text-xl md:text-base sm:text-base">
                  {value.attributes.title}
                </h1>
                <p className="xl:text-xl lg:text-base md:text-sm sm:text-sm">
                  ${value.attributes.price}
                </p>
              </div>
            ))
          ) : (
            <p>No products found</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default Products;
