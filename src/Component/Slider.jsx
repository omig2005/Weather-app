import React from "react";
// import logo from 

function Slider({sliderinfo}) {
  return (<div  className="w-full ">



<ul className="flex gap-7.5  overflow-x-scroll  ">

 { sliderinfo.map((items)=>
 
<li id="slider" className="slider123  p-2.5 rounded-2xl"  >
      <div>
        <img   src={`https://openweathermap.org/img/wn/${items.weather[0].icon}@2x.png`} alt="loading" />
      </div>
      <div>Humi:{items.main.humidity}</div>

      <div> {(items.main.temp)}℃</div>
  
</li>

 )

}
</ul>


    </div>
  );
}

export default Slider;
