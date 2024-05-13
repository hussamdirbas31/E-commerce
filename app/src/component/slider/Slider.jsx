import React from "react";
import Slider from "react-slick";

export default function SliderImage({ Array }) {
  var settings = {
    infinite: false,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
        }
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    <div className="w-full px-2 gap-5">
      <Slider {...settings}>
        {Array.map((item) => {
          return (
            <div className="" key={item.id}>
              <div className="ml-8">
                <img src={item.Image} alt="" />
                <h2 className="flex flex-row justify-center">{item.name}</h2>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
}



// import React from "react";
// import Slider from "react-slick";

// export default function SliderImage({Array}) {
//   var settings = {
//     infinite: false,
//     speed: 500,
//     slidesToShow: 6,
//     slidesToScroll: 3,
//   };
//   return (
//     <div className=" w-[100%]  px-[2%] gap-5">
//     <Slider {...settings}>
//       {Array.map((item)=>{
//         return <div className="" key={item.id} >
//           <div className=" ml-8  " >
//           <img src={item.Image}  alt="" />
//           <h2 className=" flex flex-row  justify-center">{item.name}</h2>
//           </div>
//         </div>
//       })}
//     </Slider>
//     </div>
//   );
// }