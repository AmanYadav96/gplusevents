import React from 'react';
import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';

const eventSingle = () => {
    return (
        <>
            <Header />
            <PageHeader title={"Event Details"} />
            <div className="meeta-event-single section-padding" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="meeta-event-single-wrap">
                        <div className="row">
                            <div className="col-lg-8">
                                <div className="event-single-content">
                                    <div className="meeta-video-section-2">
                                        <div className="video-img text-center" style={{ backgroundImage: ` url(assets/images/video-2.jpg)` }}>
                                            <div className="meeta-section-title-2 section-title-4">
                                                <h2 className="main-title">Digital Workshop <br /> Concert 2021</h2>
                                            </div>
                                            <a className="popup-video" href="https://www.youtube-nocookie.com/embed/Ga6RYejo6Hk"><i className="fas fa-play"></i></a>
                                        </div>
                                    </div>
                                    <p>We&apos;re inviting the top creatives in the tech industry from all over the world to come learn, grow, scrape their knees, try new things, to be vulnerable, epic adventures his is where you&apos;d put the event description. This is an example of a multi-day event. Great for Concert, music festivals, and other multi-day events.</p>

                                    <div className="meeta-pricing meeta-pricing-2 meeta-pricing-4 meeta-pricing-5">
                                        <div className="event-single-item">
                                            <h3 className="title">Get Your Tickets Now</h3>
                                        </div>
                                        <div className="row gy-5 justify-content-center meeta-pricing-row">
                                            <div className="col-lg-4 col-md-8">
                                                <div className="single-pricing color-1">
                                                    <div className="pricing-header">
                                                        <h3 className="price_title">Basic Pass</h3>
                                                        <div className="price">
                                                            <span><sup>$</sup>45</span>
                                                        </div>
                                                    </div>
                                                    <div className="pricing-body">
                                                        <ul>
                                                            <li>Back Row Seat</li>
                                                            <li>Free Lunch &amp; Snacks</li>
                                                            <li>Event Certificate</li>
                                                            <li>1 Workshop</li>
                                                        </ul>
                                                        <a className="btn" href="#">Book A Seat</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-8">
                                                <div className="single-pricing color-2">
                                                    <div className="pricing-header">
                                                        <h3 className="price_title">Standard Pass</h3>
                                                        <div className="price">
                                                            <span><sup>$</sup>65</span>
                                                        </div>
                                                    </div>
                                                    <div className="pricing-body">
                                                        <ul>
                                                            <li>Back Row Seat</li>
                                                            <li>Free Lunch &amp; Snacks</li>
                                                            <li>Event Certificate</li>
                                                            <li>1 Workshop</li>
                                                        </ul>
                                                        <a className="btn" href="#">Book A Seat</a>
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="col-lg-4 col-md-8">
                                                <div className="single-pricing color-3">
                                                    <div className="pricing-header">
                                                        <h3 className="price_title">Premium Pass</h3>
                                                        <div className="price">
                                                            <span><sup>$</sup>85</span>
                                                        </div>
                                                    </div>
                                                    <div className="pricing-body">
                                                        <ul>
                                                            <li>Back Row Seat</li>
                                                            <li>Free Lunch &amp; Snacks</li>
                                                            <li>Event Certificate</li>
                                                            <li>1 Workshop</li>
                                                        </ul>
                                                        <a className="btn btn-primary" href="#">Book A Seat</a>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>


                                    <div className="event-single-item">
                                        <h3 className="title">Event Speakers</h3>
                                        <div className="speakers-content-wrap">
                                            <div className="row">
                                                <div className="col-md-4 col-sm-6">
                                                    <div className="single-speker-3">
                                                        <div className="speker-img">
                                                            <a href="#"><Image src="/assets/images/speaker/speaker-7.jpg" height={325} width={263} alt="" /></a>
                                                            <div className="speker-content text-center">
                                                                <h3 className="name">Mike Fermalin</h3>
                                                                <span className="designation">Lead Speaker</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-6">
                                                    <div className="single-speker-3">
                                                        <div className="speker-img">
                                                            <a href="#"><Image src="/assets/images/speaker/speaker-8.jpg" height={325} width={263} alt="" /></a>
                                                            <div className="speker-content text-center">
                                                                <h3 className="name">Megan Fox</h3>
                                                                <span className="designation">Graphic Designer</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-md-4 col-sm-6">
                                                    <div className="single-speker-3">
                                                        <div className="speker-img">
                                                            <a href="#"><Image src="/assets/images/speaker/speaker-9.jpg" height={325} width={263} alt="" /></a>
                                                            <div className="speker-content text-center">
                                                                <h3 className="name">Joakim Ken</h3>
                                                                <span className="designation">Developer</span>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="event-single-item">
                                        <h3 className="title">Event Sponsor</h3>
                                        <div className="meeta-event-sponsors-3">
                                            <div className="meeta-sponsor-wrap">
                                                <div className="row">
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/logo-sm-1.png" height={48} width={135} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/logo-sm-2.png" height={44} width={134} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/logo-sm-3.png" height={43} width={132} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/logo-sm-4.png" height={44} width={134} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/logo-sm-5.png" height={43} width={134} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/logo-sm-6.png" height={28} width={134} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/logo-sm-7.png" height={37} width={134} alt="" /></a>
                                                        </div>
                                                    </div>
                                                    <div className="col-lg-3 col-sm-6">
                                                        <div className="meeta-sponsor-logo">
                                                            <a href="#"><Image src="/assets/images/brand-logo-1.png" height={59} width={87} alt="" /></a>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="event-single-sidebar">
                                    <div className="btn-price">
                                        <div className="price">
                                            <span><sup>$</sup>65</span>
                                        </div>
                                    </div>
                                    <div className="sidebar-item">
                                        <div className="event-details">
                                            <h3 className="sidebar-title">Details</h3>
                                            <ul>
                                                <li>
                                                    <h5 className="title">Start:</h5>
                                                    <p>September 10 @ 1:00 am</p>
                                                </li>
                                                <li>
                                                    <h5 className="title">End:</h5>
                                                    <p>September 13 @ 1:00 am</p>
                                                </li>
                                                <li>
                                                    <h5 className="title">Location :</h5>
                                                    <p>PO Box 16122 Collins Street West Victoria 8007 Newyork</p>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                    <div className="sidebar-item">
                                        <div className="event-map">
                                            <h3 className="sidebar-title">Location Map</h3>
                                            <div className="google-map">
                                                <iframe id="gmap_canvas" src="https://maps.google.com/maps?q=Mission%20District%2C%20San%20Francisco%2C%20CA%2C%20USA&amp;t=&amp;z=13&amp;ie=UTF8&amp;iwloc=&amp;output=embed"></iframe>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default eventSingle