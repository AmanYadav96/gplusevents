import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Fancybox from '@/Component/Fancybox';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CommonVariables } from '@/Component/CommonVariable';

const Gallery = () => {

    return (
        <>
            <div className="container">
                <div className="meeta-section-title text-center">
                    <h4 className="sub-title">Photo Gallery</h4>
                    <h2 className="main-title">Have A Look On</h2>
                </div>
                <Fancybox options={{
                    Carousel: {
                        infinite: false,
                    },
                }}
                >
                    <div className="row g-0">
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-gallery">
                                <div className="gallery-image">
                                    <Image src="/assets/images/gallery-1.jpg" height={250} width={380} alt="Gallery" />
                                </div>
                                <div className="gallery-content">
                                    <div className="gallery-content-wrap">
                                        <a data-fancybox="gallery" href="/assets/images/gallery-1.jpg" className="gallery-plus ">
                                            <span></span>
                                        </a>
                                        <h4 className="gallery-title"><a href="#">Developer Concert 2024</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-gallery">
                                <div className="gallery-image">
                                    <Image src="/assets/images/gallery-2.jpg" height={250} width={380} alt="" />
                                </div>
                                <div className="gallery-content">
                                    <div className="gallery-content-wrap">
                                        <a data-fancybox="gallery" href="/assets/images/gallery-2.jpg" className="gallery-plus ">
                                            <span></span>
                                        </a>
                                        <h4 className="gallery-title"><a href="#">Developer Concert 2024</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-gallery">
                                <div className="gallery-image">
                                    <Image src="/assets/images/gallery-3.jpg" height={250} width={380} alt="Gallery" />
                                </div>
                                <div className="gallery-content">
                                    <div className="gallery-content-wrap">
                                        <a data-fancybox="gallery" href="/assets/images/gallery-3.jpg" className="gallery-plus ">
                                            <span></span>
                                        </a>
                                        <h4 className="gallery-title"><a href="#">Developer Concert 2024</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-gallery">
                                <div className="gallery-image">
                                    <Image src="/assets/images/gallery-4.jpg" height={250} width={380} alt="Gallery" />
                                </div>
                                <div className="gallery-content">
                                    <div className="gallery-content-wrap">
                                        <a data-fancybox="gallery" href="/assets/images/gallery-4.jpg" className="gallery-plus ">
                                            <span></span>
                                        </a>
                                        <h4 className="gallery-title"><a href="#">Developer Concert 2024</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-gallery">
                                <div className="gallery-image">
                                    <Image src="/assets/images/gallery-5.jpg" height={250} width={380} alt="Gallery" />
                                </div>
                                <div className="gallery-content">
                                    <div className="gallery-content-wrap">
                                        <a data-fancybox="gallery" href="/assets/images/gallery-5.jpg" className="gallery-plus ">
                                            <span></span>
                                        </a>
                                        <h4 className="gallery-title"><a href="#">Developer Concert 2024</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="col-lg-4 col-sm-6">
                            <div className="single-gallery">
                                <div className="gallery-image">
                                    <Image src="/assets/images/gallery-6.jpg" height={250} width={380} alt="Gallery" />
                                </div>
                                <div className="gallery-content">
                                    <div className="gallery-content-wrap">
                                        <a data-fancybox="gallery" href="/assets/images/gallery-6.jpg" className="gallery-plus ">
                                            <span></span>
                                        </a>
                                        <h4 className="gallery-title"><a href="#">Developer Concert 2024</a></h4>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </Fancybox>
            </div>
        </>
    )
}
export default Gallery;
