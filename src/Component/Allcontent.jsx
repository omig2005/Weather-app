import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Spinner from "./Spinner";
import Slider from "./Slider";
function Allcontent() {
  const [weather1, setWeather1] = useState(null);
  const [sliderinfo, setSliderinfo] = useState([]);
  const search = useSelector((state) => state.search.search);
  const [main, setMain] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    if (search) {
      getData();
    }
  }, [search]);




  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date().toUTCString().slice(0, 3);

  console.log("Day"+today);
 
  const index = days.findIndex((day) => day === today);

  console.log(index + "Index");


// console.log(sliderinfo.);

  const getData = async () => {
    if (!search) return;
    const url1 = `https://api.openweathermap.org/data/2.5/forecast?q=${search}&appid=a4f742aa0518ba42793659dc421d3b34&units=metric`;
    //  search.length>0?
    const url=`https://api.openweathermap.org/data/2.5/weather?q=${search}&appid=a4f742aa0518ba42793659dc421d3b34`;
    setLoading(true);
    //  :setLoading(false);
    try {
      const response = await fetch(url);
      const data = await response.json();

      const response1 = await fetch(url1);
      const data1 = await response1.json();

      console.log(data1.list);
      setSliderinfo(data1.list);

      // if (data.cod === 200) {
      setLoading(false);
      setWeather1(data);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <>
      {loading && (
        <span
          className="
      flex 
      justify-center
      items-center 
     
        my-60"
        >
          {" "}
          <Spinner />
        </span>
      )}
      {weather1 && weather1.weather ? (
        <div
          id="card"
          className=" 
            transition-transform 
            shadow-2xl
            text-white  
             lg:m-10   
            flex  my-6  mx-11  w-75   lg:mx-89
            lg:w-200    h-150 flex-col   
            justify-center  
            
            items-center
           

            p-10 rounded-2xl gap-4"
        >
          <img
            className=" w-50 h-50   border-1 text-black rounded-2xl  active:scale-110 bg-gray-400  hover:scale-110 transition-transform"
            src={`https://openweathermap.org/img/wn/${weather1.weather[0].icon}@2x.png`}
            alt={weather1.weather[0].description}
          />
          <div className="">
            <h2 className="text-2xl">Day:  {days[index]}</h2>
            <h2 className="text-3xl  font-bold">
              {(weather1.main.temp - 273.5).toFixed(2)}℃
            </h2>
            <h1 className="font-bold text-3xl text-white">
              {weather1.weather[0].main}
            </h1>
            <p className="text-gray-50  font-bold hover:cursor-grab">
              {weather1.weather[0].description.toUpperCase() +
                " - The atmosphere in " +
                weather1.name}
            </p>
          </div>

          <Slider sliderinfo={sliderinfo} />
        </div>
      ) : (
        <p className="text-black  font-bold  my-30 flex justify-center">
          City not found. Try another city.
        </p>
      )}
    </>
  );
}

export default Allcontent;
