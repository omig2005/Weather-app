import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { setSearch } from "../redux/slice/SearchSlice";
import weatherlogo from './weather.gif';
export default function NavBar() {
  const [suggestions, setSuggestions] = useState([]);
  const [query, setQuery] = useState("");

  const dispatch = useDispatch();

  const fetchSuggestions = async (input) => {
    if (input.length < 4) return; // Avoid unnecessary API calls for short inputs

    const url = `https://api.openweathermap.org/geo/1.0/direct?q=${input}&limit=5&appid=a4f742aa0518ba42793659dc421d3b34`;

    try {
      const response = await fetch(url);
      const data = await response.json();

      console.log("suggestions---->" + data);
      setSuggestions(data); // Store suggestions in state
    } catch (error) {
      console.error("Error fetching city suggestions:", error);
    }
  };

  return (
    <nav className="   w-full h-30   top-0   transition-all duration-300     flex justify-between     flex-col lg:flex-row bg-blue-950">
      <div className="flex flex-row my-4">
        {/* <h3 className="text-2xl  mx-2 font-light text-white ">
          {new Date().toUTCString().slice(0, 16)}
        </h3> */}
        
            {/* <img src="" alt="wdcwdc" /> */}
          <img className='bg-blue-400  w-10 mx-3  lg:w-25 rounded-2xl'  src={weatherlogo} alt="loading"/>  
        
     
        <h2 className="text-4xl mx-2 font-bold text-white">Weather</h2>
      </div>

      <div className="py-3.5">
        <input
          value={query}
          onChange={(e) => {
            dispatch(setSearch(e.target.value));
            setQuery(e.target.value);
            // setSuggestions(e.target.value);
            fetchSuggestions(e.target.value);
          }}
          className="border  mx-3  lg:m-5 text-white  border-gray-400 outline-none rounded-lg "
          type="search"
          placeholder="   Search.."
          name="search"
          id=""
          autoComplete="on"
        />

        {query.length > 0 && suggestions.length > 2 && (
          <ul className="absolute w-50 bg-white border border-gray-400 rounded-md mt-1 max-h-48 overflow-y-auto">
            {suggestions.map((city, index) => (
              <li
                key={index}
                className="p-2 hover:bg-gray-200 cursor-pointer"
                onClick={() => {
                  dispatch(setSearch(city.name)); // Update Redux store
                  setQuery(city.name);
                  setSuggestions([]); // Hide suggestions
                }}
              >
                {city.name}, {city.country}
              </li>
            ))}
          </ul>
        )}
      </div>
    </nav>
  );
}
