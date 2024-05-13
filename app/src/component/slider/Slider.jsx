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
          slidesToShow: 3,
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
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      }
    ]
  };
  return (
    
      
      <Slider {...settings}>
        {Array.map((item) => {
          return (
            <div className="p-6 w-full overflow-hidden" key={item.id}>
              <div className=" grid grid-cols-1">
                <div className="flex justify-center">
                <img src={item.Image} className=" flex lg:max-h-[14rem] sm:max-h-[9rem]" alt="" />
                </div>
                
                <h2 className=" flex justify-center ">{item.name}</h2>
                </div>
            </div>
          );
        })}
      </Slider>

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