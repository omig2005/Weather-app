import React from "react";
// import logo from

function Slider({ sliderinfo }) {
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const today = new Date().toUTCString().slice(0, 3);

  console.log(today);
 
  const index = days.findIndex((day) => day === today);

  console.log(index + "Index");

  return (
    <div className="w-full ">
      <ul className="flex gap-7.5  overflow-x-scroll  ">
        {
          sliderinfo.slice(1,6).map((items, i)=> {
            const dayIndex = (index + i) % days.length;
         

            return (
              <li id="slider" className="slider123  p-2.5 rounded-2xl">
                <div>
                  <img
                    src={`https://openweathermap.org/img/wn/${items.weather[0].icon}@2x.png`}
                    alt="loading"
                  />
                </div>
                <p>{days[dayIndex]}</p>

                <div>Humi:{items.main.humidity}</div>

                <div> {items.main.temp}℃</div>
              </li>
            );
          })}
      </ul>
    </div>
  );
}

export default Slider;
