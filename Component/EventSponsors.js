// import React, { useEffect, useState } from 'react';
// import Image from "next/image";
// const OwlCarousel = dynamic(import("react-owl-carousel"), {
//     ssr: false,
// });
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';
// import dynamic from 'next/dynamic'
// const EventSponsors = (props) => {
//     // const [eventsponsor, setEventsponsor] = useState(props.type ? props.type : "")
//     // console.log("props", props);
//     // const backgroundImageUrl = props.type === 'index' ? 'url("/assets/images/event-bg-1.jpg")' : 'url("/assets/images/bg/sponsor-bg-2.jpg")';
//     // const className = props.type === 'index' ? 'meeta-event-sponsors section-padding' : 'meeta-event-sponsors-2 section-padding';
//     // const textColor = props.type=='index'? 'main-title text-white':'main-title';

//     return (
//         <>
//             <div className="meeta-event-sponsors section-padding" style={{ backgroundImage: ` url("assets/images/event-bg-1.jpg")` }}>
//                 <div className="container">
//                     <div className="meeta-section-title text-center">
//                         <h2 className="main-title text-white">Event Sponsors</h2>
//                     </div>
//                     <div className="meeta-sponsor-active">
//                         <div className="swiper">
//                             <OwlCarousel className='swiper-wrapper'
//                                 items={4}
//                                 loop={true}
//                                 nav={false}
//                                 margin={18}
//                                 autoplay={true}
//                                 autoplayTimeout={2000}
//                                 dots={true}
//                             >
//                                 {/* <div className="swiper-wrapper"> */}
//                                 <div className="swiper-slide">
//                                     <div className="meeta-sponsor-logo" style={{ width: 225 }}>
//                                         <Image src="/assets/images/sponsors-1.png" alt="" width={225}
//                                             height={85} />
//                                     </div>
//                                 </div>
//                                 <div className="swiper-slide">
//                                     <div className="meeta-sponsor-logo" style={{ width: 225 }}>
//                                         <Image src="/assets/images/sponsors-2.png" alt="" width={225}
//                                             height={85} />
//                                     </div>
//                                 </div>
//                                 <div className="swiper-slide">
//                                     <div className="meeta-sponsor-logo" style={{ width: 225 }}>
//                                         <Image src="/assets/images/sponsors-3.png" alt="" width={225}
//                                             height={85} />
//                                     </div>
//                                 </div>
//                                 <div className="swiper-slide">
//                                     <div className="meeta-sponsor-logo" style={{ width: 225 }}>
//                                         <Image src="/assets/images/sponsors-4.png" alt="" width={225}
//                                             height={85} />
//                                     </div>
//                                 </div>
//                                 {/* </div> */}
//                             </OwlCarousel>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </>
//     )
// }
// export default EventSponsors;
import React from 'react'

const EventSponsors = () => {
  return (
    <div>
      EventSponsors
    </div>
  )
}

export default EventSponsors

