// import React, { useState, useEffect } from 'react';
// import Image from 'next/image';
// import Header from '@/Component/Header';
// import Footer from '@/Component/Footer';
// import Link from 'next/link';
// import { useRouter } from 'next/router';
// import axios from 'axios';
// import { CommonVariables } from '@/Component/CommonVariable';

// const CountryEvents = (props) => {

//     return (
//         <>
//             <Header />
//             <div className="section page-banner-section">
//                 <div className="shape-2"></div>
//                 <div className="container">
//                     <div className="page-banner-wrap">
//                         <div className="row">
//                             <div className="col-lg-12">
//                                 <div className="page-banner text-center">
//                                     <h2 className="title text-capitalize">Country</h2>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             <div className="meeta-speaker-single section-padding">
//                 <div className="container">
//                     <div className="meeta-speaker-single-wrap">
//                         <div className="row">
//                             <div className="col-lg-4">
//                                 <div className="speaker-image-box text-center">
//                                     <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2751229.4358465755!2d10.706372000639105!3d47.66990149198523!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x476d079b259d2a7f%3A0x1012d47bdde4c1af!2sAustria!5e0!3m2!1sen!2sin!4v1712490257283!5m2!1sen!2sin" width="100%" height="450" style={{ border: "0", allowfullscreen: "", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}></iframe>
//                                 </div>
//                             </div>
//                             <div className="col-lg-8">
//                                 <div className="speaker-single-right">
//                                     <div className="speaker-single-info-wrap">
//                                         <div className="speaker-biography">
//                                             <h3 className="main-title">Country Intro</h3>
//                                             <p>Austria is a democratic republic and, therefore, run by a government of elected officials. The Chancellor is the head of the government and oversees the executive government and Parliament. Currently, the political system operates as the Second Republic based on the constitution of 1920.</p>
//                                         </div>
//                                         <div className="speaker-info">
//                                             <div className="row">
//                                                 <div className="col-md-7">
//                                                     <div className="speaker-info-desc">
//                                                         <h3 className="main-title">Event Information</h3>
//                                                         <p>Austria is a democratic republic and, therefore, run by a government of elected officials. The Chancellor is the head of the government and oversees the executive government and Parliament. Currently, the political system operates as the Second Republic based on the constitution of 1920.</p>
//                                                     </div>
//                                                 </div>
//                                                 <div className="col-md-5">
//                                                     <div className="speaker-info-list">
//                                                         <ul>
//                                                             <li>
//                                                                 <p className="title">Mobile Number:</p>
//                                                                 <p>001 2323 74684</p>
//                                                             </li>
//                                                             <li>
//                                                                 <p className="title">Email:</p>
//                                                                 <p>test@gmail.com</p>
//                                                             </li>
//                                                             <li>
//                                                                 <p className="title">Address :</p>
//                                                                 <p>PO Box 16122 Collins Street West Victoria 8007 Newyork</p>
//                                                             </li>
//                                                         </ul>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="meeta-event-featured">
//                                         <h3 className="main-title">Events</h3>
//                                         <div className="row">
//                                             <div className="col-md-4 col-sm-6">
//                                                 <div className="single-item">
//                                                     <div className="featured-img">
//                                                         <Link href="/event-single"><Image src="/assets/images/featured/featured-2.jpg" height={137} width={203} alt="" /></Link>
//                                                         <div className="top-meta">
//                                                             <span className="date"><span>25</span>Sept</span>
//                                                         </div>
//                                                     </div>
//                                                     <div className="featured-content">
//                                                         <span className="category color-1">Art & Craft</span>
//                                                         <h3 className="title"><Link href="/event-single">Designers, Web developers & Digital artists</Link></h3>
//                                                         <span className="meta"><i className="fas fa-map-marker-alt"></i> Sand diego, Canada</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4 col-sm-6">
//                                                 <div className="single-item">
//                                                     <div className="featured-img">
//                                                         <Link href="/event-single"><Image src="/assets/images/featured/featured-3.jpg" height={137} width={203} alt="" /></Link>
//                                                         <div className="top-meta">
//                                                             <span className="date"><span>25</span>Sept</span>
//                                                         </div>
//                                                     </div>
//                                                     <div className="featured-content">
//                                                         <span className="category color-2">Art & Craft</span>
//                                                         <h3 className="title"><Link href="/event-single">Designers, Web developers & Digital artists</Link></h3>
//                                                         <span className="meta"><i className="fas fa-map-marker-alt"></i> Sand diego, Canada</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                             <div className="col-md-4 col-sm-6">
//                                                 <div className="single-item">
//                                                     <div className="featured-img">
//                                                         <Link href="/event-single"><Image src="/assets/images/featured/featured-4.jpg" height={137} width={203} alt="" /></Link>
//                                                         <div className="top-meta">
//                                                             <span className="date"><span>25</span>Sept</span>
//                                                         </div>
//                                                     </div>
//                                                     <div className="featured-content">
//                                                         <span className="category color-3">Art & Craft</span>
//                                                         <h3 className="title"><Link href="/event-single">Designers, Web developers & Digital artists</Link></h3>
//                                                         <span className="meta"><i className="fas fa-map-marker-alt"></i> Sand diego, Canada</span>
//                                                     </div>
//                                                 </div>
//                                             </div>
//                                         </div>
//                                     </div>
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//             < Footer />
//         </>
//     )
// }

// export async function getStaticProps({ params }) {

//     const countryres = await axios.get(`${CommonVariables.API_URL}event/event_location`);
//     const countryData = countryres.data;
//     // Country Data
//     console.log("countryData", countryData);
    
//     const { country } = params || {};
//     const countryName = country.replace(/-/g, ' ');
//     console.log("countryName", countryName);
//     const stateres = await axios.get(`${CommonVariables.API_URL}event/event_location?country=${countryName}`);
//     const stateData = stateres.data;
//     // State Data
//     console.log("stateData", stateData);
    
//     const cityData = []; 
//     const stateNames = stateData.data.map(state => state.name);
//     (stateNames.map(async (stateName) => {
//         const cityres = await axios.get(`${CommonVariables.API_URL}event/event_location?country=${countryName}&state=${stateName}`);
//         cityData[stateName] = cityres.data; 
//         //City Data
//         console.log("cityData:", stateName, cityData[stateName]);
//     }));
    
//     return {
//         props: {
//             countryData: countryData ?? [],
//             country: country ?? [],
//             stateData: stateData ?? [],
//             cityData: cityData ?? [],
//         },
//         revalidate: 10,
//     };
    
// }

// export async function getStaticPaths() {
//     return {
//         paths: [],
//         fallback: true
//     };
// }

// export default CountryEvents

import React from 'react'

const country = () => {
  return (
    <div>
      Country
    </div>
  )
}

export default country
