import React from 'react';
import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import EventSponsors from '@/Component/EventSponsors';
import Gallery from '@/Component/Gallery';
import Head from 'next/head';
// import dynamic from 'next/dynamic'
// const OwlCarousel = dynamic(import("react-owl-carousel"), {
//     ssr: false,
// });
// import 'owl.carousel/dist/assets/owl.carousel.css';
// import 'owl.carousel/dist/assets/owl.theme.default.css';

const About = () => {
    return (
        <>
            <Head>
                <title>G plus Events - About</title>
            </Head>
            <Header tab="about" />
            <PageHeader title={"About"} />
            <div className="meeta-about-section section-padding" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="row gy-5 align-items-center">
                        <div className="col-lg-12">
                            <div className="meeta-section-title-2 meeta-about-title p-0">
                                <h2 className="main-title">Welcome to GPlus Portal</h2>
                                <h3 className='mt-4'>Your Gateway to Uniting Promoters, Organizers, Artisans, and Celebrities!</h3>
                            </div>
                            <div className="meeta-about-content p-0">
                                <p>At GPlus, we{'\''}ve crafted a multidimensional platform unlike any other, designed to foster patronage and collaboration among a diverse array of talents and creatives. Our mission is clear: to blend innovativeness with advanced acoustics, placing the spotlight firmly on the best talents across various domains.</p>
                                <p className='mt-3'>GPlus stands out in the crowded events industry by offering a seamless experience for promoters, organizers, artisans, and celebrities alike. Whether you{'\''}re planning an intimate artisanal showcase or a grand celebrity concert, we provide the ultimate platform for event listing, ticketing, and promotion. Our commitment to excellence ensures that every event, regardless of scale, receives the attention and promotion it deserves.</p>
                            </div>
                            {/* <div className="mt-4">
                                <h3>Why Choose GPlus?</h3>
                            </div>
                            <div className="meeta-about-content p-0">
                                <p className='mt-3'><b>Comprehensive Event Solutions:</b> From listing your event to selling tickets and promoting it effectively, GPlus offers end-to-end solutions tailored to meet your needs. Our intuitive platform makes it easy to manage every aspect of your event from a single dashboard.</p>
                                <p className='mt-3'><b>Diverse Talent Showcase:</b> We pride ourselves on bringing together the best talents from around the globe. Whether you{'\''}re an emerging artisan looking to showcase your craft or a seasoned celebrity seeking to engage with your audience, GPlus provides a stage for everyone.</p>
                                <p className='mt-3'><b>Innovation and Acoustics:</b> Our platform leverages cutting-edge technology to ensure the highest quality acoustics and seamless event experiences. We embrace innovation to enhance every event, making it memorable and impactful.</p>
                                <p className='mt-3'><b>Ease of Operation:</b> With years of experience in the industry, GPlus understands the complexities involved in event management. We{'\''}ve streamlined our processes to offer users a hassle-free experience, allowing them to focus on what truly matters - creating extraordinary events.</p>
                                <p className='mt-3'><b>Trendsetting Events:</b> We stay ahead of the curve by showcasing events that are not just impressive but also set trends in the industry. Whether it{'\''}s the latest in music, art, or entertainment, GPlus is where you{'\''}ll find events that define the zeitgeist.</p>
                            </div> */}
                            <div className="mt-4">
                                <h3>Join the GPlus Community</h3>
                            </div>
                            <div className="meeta-about-content p-0">
                                <p className='mt-3'>Whether you{'\''}re an event organizer looking to expand your reach, an artisan seeking to connect with a broader audience, or a promoter aiming to elevate your event to new heights, GPlus welcomes you. Our community thrives on collaboration, creativity, and the pursuit of excellence in event management.</p>
                                <p className='mt-3'>Explore our platform today and discover how GPlus can transform your event experience. Together, let{'\''}s create moments that resonate and memories that last a lifetime. Join us on GPlus - where every event is a celebration of talent, innovation, and community.</p>
                            </div>
                            <div className="mt-4">
                                <h3>Contact Us</h3>
                            </div>
                            <div className="meeta-about-content p-0">
                                <p className='mb-0 mt-3'>Ready to get started or have questions? Reach out to our team today. We{'\''}re here to support your event journey every step of the way.</p>
                                <p className='mt-3'>Thank you for choosing GPlus - Where Events Meet Excellence.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="meeta-features-section section-padding">
                <Image className="shape-2" src="/assets/images/shape/shape-11.png" height={173} width={191} alt="" />
                <div className="container">
                    <div className="meeta-features-wrap">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="meeta-section-title-2">
                                    <h4 className="sub-title">Welcome to the</h4>
                                    <h2 className="main-title">About G Plus Events</h2>
                                </div>
                                <div className="feature-item feature-1">
                                    <div className="feature-icon">
                                        <Image src="/assets/images/feature-icon-1.png" height={91} width={88} alt="" />
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="title"><a href="#">Comprehensive Event Solutions</a></h3>
                                        <p>From listing your event to selling tickets and promoting it effectively, GPlus offers end-to-end solutions tailored to meet your needs. Our intuitive platform makes it easy to manage every aspect of your event from a single dashboard.</p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="feature-item feature-2">
                                    <div className="feature-icon">
                                        <Image src="/assets/images/feature-icon-2.png" height={91} width={88} alt="" />
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="title"><a href="#">Diverse Talent Showcase</a></h3>
                                        <p>We pride ourselves on bringing together the best talents from around the globe. Whether you{'\''}re an emerging artisan looking to showcase your craft or a seasoned celebrity seeking to engage with your audience, GPlus provides a stage for everyone.</p>
                                    </div>
                                </div>
                                <div className="feature-item feature-3">
                                    <div className="feature-icon">
                                        <Image src="/assets/images/feature-icon-3.png" height={91} width={84} alt="" />
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="title"><a href="#">Ease of Operation</a></h3>
                                        <p> With years of experience in the industry, GPlus understands the complexities involved in event management. We{'\''}ve streamlined our processes to offer users a hassle-free experience, allowing them to focus on what truly matters - creating extraordinary events. </p>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-4">
                                <div className="feature-item feature-4">
                                    <div className="feature-icon">
                                        <Image src="/assets/images/feature-icon-4.png" height={91} width={88} alt="" />
                                    </div>
                                    <div className="feature-content">
                                        <h3 className="title"><a href="#">Trendsetting Events</a></h3>
                                        <p>We stay ahead of the curve by showcasing events that are not just impressive but also set trends in the industry. Whether it{'\''}s the latest in music, art, or entertainment, GPlus is where you{'\''}ll find events that define the zeitgeist.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="meeta-gallery meeta-gallery-2 section-padding">
                <Gallery />
            </div> */}
            <Footer />
        </>
    )
}

export default About