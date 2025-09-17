import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom"
import { MdOutlineClear } from "react-icons/md";
import PriceRangeSlider from "./PriceSlider";
import { Range } from "react-range";

const FilterSection = () => {

    const [localValues, setLocalValues] = useState([0, 1000])
    const [searchParams , setSearchParams] = useSearchParams();
    const navigate = useNavigate();

    const [filters, setFilters] = useState({
        gender: '',
        color: [],
        size: [],
        material: [],
        minPrice: 50,
        maxPrice: 50000,
    })

    const [priceRange, setPriceRange] = useState([50, 50000]);
    const [selectedColor, setSelectedColor] = useState([]);
    const [selectedGender, setSelectedGender] = useState('');
    const [selectedSize, setSelectedSize] = useState([]);
    const [selectedMaterial, setSelectedMaterial] = useState([]);

    const gender = ['men', 'women'];
    const color = [
  "#0D0D0D", // Black
  "#FFFFFF", // White
  "#FFFFF0", // Ivory
  "#F5F5DC", // Beige
  "#E3BC9A", // Nude
  "#C19A6B", // Camel
  "#5C4033", // Brown
  "#3D2C1F", // Mocha
  "#36454F", // Charcoal
  "#BEBEBE", // Grey
  "#C0C0C0", // Silver
  "#D4AF37", // Gold
  "#000080", // Navy
  "#191970", // Midnight Blue
  "#87CEEB", // Sky Blue
  "#808000", // Olive
  "#F0E68C", // Khaki
  "#228B22", // Forest Green
  "#50C878", // Emerald
  "#800020", // Burgundy
  "#722F37", // Wine
  "#800000", // Maroon
  "#B22222", // Red
  "#B7410E", // Rust
  "#E2725B", // Terracotta
  "#FFA500", // Orange
  "#FFE5B4", // Peach
  "#FADADD", // Blush
  "#FFC0CB", // Rose
  "#FFB6C1", // Pink
  "#D8A39D", // Dusty Pink
  "#E0B0FF", // Mauve
  "#C8A2C8", // Lilac
  "#E6E6FA", // Lavender
  "#800080", // Purple
  "#FFDB58", // Mustard
  "#FFFF00", // Yellow
  "#FFFDD0", // Cream
  "#1560BD", // Denim Blue
  "#483C32", // Taupe
    ];
    const size = ["XS", "S", "M", "L", "XL", "XXL", "XXXL"];
    const material = [
      "Cotton",
      "Organic Cotton",
      "Linen",
      "Silk",
      "Satin",
      "Wool",
      "Cashmere",
      "Merino Wool",
      "Mohair",
      "Alpaca",
      "Leather",
      "Suede",
      "Denim",
      "Tweed",
      "Velvet",
      "Chiffon",
      "Georgette",
      "Jersey",
      "Viscose",
      "Rayon",
      "Modal",
      "Lyocell (TENCEL™)",
      "Polyester",
      "Nylon",
      "Acrylic",
      "Elastane (Spandex)",
      "Cupro",
      "Bamboo",
      "Hemp",
      "Lace",
      "Mesh",
    ];
    function getContrastColor(hex) {
      // Remove "#" if present
      hex = hex.replace("#", "");

      // Convert to RGB
      const r = parseInt(hex.substring(0, 2), 16);
      const g = parseInt(hex.substring(2, 4), 16);
      const b = parseInt(hex.substring(4, 6), 16);

      // Calculate brightness
      const brightness = (r * 299 + g * 587 + b * 114) / 1000;

      // Return black or white based on brightness
      return brightness > 150 ? "#36454F" : "#BEBEBE";
    }

      const toggleGender = (gender) => {
        setSelectedGender(gender);
        updateURLParams({
          gender: gender,
          color: selectedColor,
          size: selectedSize,
          material: selectedMaterial,
          minPrice: 50,
          maxPrice: 50000,
        });
      };

      const toggleColor = (color) => {
        const newSelectedColors = selectedColor.includes(color)? selectedColor.filter(c => c !== color): [...selectedColor, color]
        setSelectedColor(newSelectedColors);
        updateURLParams({
          gender: selectedGender,
          color: newSelectedColors,
          size: selectedSize,
          material: selectedMaterial,
          minPrice: 50,
          maxPrice: 50000,
        });
      };

      const toggleSize = (size) => {
        const newSelectedSizes = selectedSize.includes(size) ? selectedSize.filter(s=> s!==size) : [...selectedSize, size]
        setSelectedSize( newSelectedSizes);
        updateURLParams({
          gender: selectedGender,
          color: selectedColor,
          size: newSelectedSizes,
          material: selectedMaterial,
          minPrice: 50,
          maxPrice: 50000,
        });
      };

      const togglematerial = (material) => {
        const newSelectedMaterials = selectedMaterial.includes(material)? selectedMaterial.filter(m=>m!==material): [...selectedMaterial, material]
        setSelectedMaterial(newSelectedMaterials);
        updateURLParams({
          gender: selectedGender,
          color: selectedColor,
          size: selectedSize,
          material: newSelectedMaterials,
          minPrice: 50,
          maxPrice: 50000,
        });        
      };

     const clearAllSelectedColors= () =>{
      setSelectedColor([]);
      updateURLParams({
        gender: selectedGender,
        color: [],
        size: selectedSize,
        material: selectedMaterial,
        minPrice: 50,
        maxPrice: 50000,
      });
     }

     const clearAllSelectedMaterials= () =>{
      setSelectedMaterial([]);
      updateURLParams({
        gender: selectedGender,
        color: selectedColor,
        size: selectedSize,
        material: [],
        minPrice: 50,
        maxPrice: 50000,
      });
     }

      const updateURLParams = (newFilter)=>{
        const params = new URLSearchParams();

        Object.keys(newFilter).forEach((key)=>{
          if(Array.isArray(newFilter[key]) && newFilter[key].length > 0){
            params.append(key, newFilter[key].join(","))
          }else if(newFilter[key]){
            params.append(key, newFilter[key])
          }
        })
        setSearchParams(params)
        navigate(`?${params.toString()}`)
      }

     const togglePriceRange = (price) => {
      setPriceRange(price)
       updateURLParams({
         gender: selectedGender,
         color: selectedColor,
         size: selectedSize,
         material: selectedMaterial,
         minPrice: price[0],
         maxPrice: price[1],
       });
     };




useEffect(() => {
  const params = Object.fromEntries([...searchParams]);

  const genderFromURL = params.gender || "";
  const colorFromURL = params.color ? params.color.split(",") : [];
  const sizeFromURL = params.size ? params.size.split(",") : [];
  const materialFromURL = params.material ? params.material.split(",") : [];
  const minPrice = params.minPrice ? Number(params.minPrice) : 50;
  const maxPrice = params.maxPrice ? Number(params.maxPrice) : 50000;

  setFilters({
    gender: genderFromURL,
    color: colorFromURL,
    size: sizeFromURL,
    material: materialFromURL,
    minPrice,
    maxPrice,
  });

  setSelectedGender(genderFromURL);
  setSelectedColor(colorFromURL);
  setSelectedSize(sizeFromURL);
  setSelectedMaterial(materialFromURL);
  setPriceRange([minPrice, maxPrice]);
}, [searchParams]);


  return (
    <>
      <div>
        <p className="font-semibold mb-3 text-xl">Filter</p>
        {/* gender filter  */}
        <div className="mb-3">
          <label className="block mb-1 text-slate-600">Gender :</label>
          {gender.map((g) => (
            <div key={g} className="mb-1 flex items-center gap-2">
              <input
                type="radio"
                name="gender"
                value={g}
                checked={filters.gender === g}
                onChange={(e) => toggleGender(g, e)}
              />
              <span>{g}</span>
            </div>
          ))}
        </div>

        {/* color filter  */}
        <div className="mb-3">
            <label className="block mb-1 text-slate-600">Color :</label>
            <div className="flex justify-end -mt-3">
              <button
                onClick={clearAllSelectedColors}
                className="flex items-center text-red-500 font-semibold cursor-pointer transition-all duration-300 active:scale-90"
              >
                <span>clear all</span>
                <MdOutlineClear className="text-lg" />
              </button>
            </div>
          <div className="flex flex-wrap gap-2">
            {color.map((c) => {
              const isSelected = filters.color.includes(c);
              const borderColor = isSelected
                ? getContrastColor(c)
                : "transparent";

              return (
                <button
                  key={c}
                  onClick={(e) => toggleColor(c, e)}
                  name="color"
                  value={c}
                  className={`size-5 border hover:scale-110 cursor-pointer ${
                    filters.color.includes(c) ? "border-2 scale-110" : "border"
                  }`}
                  style={{
                    backgroundColor: c,
                    borderColor: borderColor,
                  }}
                ></button>
              );
            })}
          </div>
        </div>

        {/* size filter  */}
        <div className="mb-3">
          <label className="block mb-1 text-slate-600">Size :</label>
          <div className="flex flex-wrap gap-2">
            {size.map((s) => {
              return (
                <button
                  onClick={(e) => toggleSize(s, e)}
                  key={s}
                  name="size"
                  value={s}
                  className={`px-1 border cursor-pointer active:scale-90 transition-all duration-300 ${
                    filters.size.includes(s) ? "bg-black text-white" : ""
                  } `}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* material filter  */}
        <div className="mb-3">
          <label className="block mb-1 text-slate-600">Material :</label>
          <div className="flex justify-end -mt-3">
            <button
              onClick={clearAllSelectedMaterials}
              className="flex items-center text-red-500 font-semibold cursor-pointer transition-all duration-300 active:scale-90"
            >
              <span>clear all</span>
              <MdOutlineClear className="text-lg" />
            </button>
          </div>
          <div className=" gap-2">
            {material.map((m) => (
              <div key={m} className={`flex gap-2`}>
                <input
                  type="checkbox"
                  checked={filters.material.includes(m)}
                  name="material"
                  value={m}
                  onChange={(e) => togglematerial(m, e)}
                />
                <span>{m}</span>
              </div>
            ))}
          </div>
        </div>

        {/* price range  */}
        <div className="mb-3">
          <label className="block mb-3 text-slate-600">Price :</label>
          <Range
            label="Select your value"
            step={50}
            min={50}
            max={50000}
            values={priceRange}
            onChange={(values) => togglePriceRange(values)}
            renderTrack={({ props, children }) => (
              <div
                {...props}
                style={{
                  ...props.style,
                  height: "6px",
                  width: "100%",
                  borderRadius: "10px",
                  backgroundColor: "#ccc",
                }}
              >
                {children}
              </div>
            )}
            renderThumb={({ props }) => (
              <div
                {...props}
                key={props.key}
                style={{
                  ...props.style,
                  height: "12px",
                  width: "12px",
                  backgroundColor: "#000",
                  borderRadius: "50%",
                }}
              />
            )}
          />
          <div className="flex w-full justify-between items-center mt-5">
            <span>${priceRange[0]}</span>
            <span>${priceRange[1]}</span>
          </div>
        </div>
      </div>
    </>
  );
}

export default FilterSection