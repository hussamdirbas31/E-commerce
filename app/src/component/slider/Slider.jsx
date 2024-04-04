import React from "react";
import Slider from "react-slick";

export default function SliderImage({Array}) {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
  };
  return (
    <div className=" w-[100%]  px-[2%] gap-5">
    <Slider {...settings}>
      {Array.map((item)=>{
        return <div className=""  >
          <div className=" ml-8  " >
          <img src={item.Image}  alt="" srcset="" />
          <h2 className=" flex flex-row  justify-center">{item.name}</h2>
          </div>
        </div>
      })}
    </Slider>
    </div>
  );
}