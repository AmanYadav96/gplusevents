import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import Fancybox from '@/Component/Fancybox';
import { useRouter } from 'next/router';
import axios from 'axios';
import { CommonVariables } from '@/Component/CommonVariable';

const Video = () => {

    return (
        <>
            <div className="container">
                <div className="meeta-section-title text-center">
                    <h4 className="sub-title">Video Gallery</h4>
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
                                        <a data-fancybox="gallery" href="https://youtu.be/StE8nhHkEMI?si=1VAgYFkVq_Na5BAN" className="gallery-plus ">
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
                                        <a data-fancybox="gallery" href="https://youtu.be/M7ebX_7ay6o?si=5DLnNnl4943hyifq" className="gallery-plus ">
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
                                        <a data-fancybox="gallery" href="https://youtu.be/R-dXS5TI_dQ?si=Gqhd7EnNH9tvcnTf" className="gallery-plus ">
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
                                        <a data-fancybox="gallery" href="https://youtu.be/KbWbK2qRe7U?si=WNR8EuLbRC2QXCUW" className="gallery-plus ">
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
                                        <a data-fancybox="gallery" href="https://youtu.be/6E51wmh9f9g?si=tUB9E4i4l3_jMORt" className="gallery-plus ">
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
                                        <a data-fancybox="gallery" href="https://youtu.be/p0YJLN3nQoM?si=ixVZ4X4GU26dXKnC" className="gallery-plus ">
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
export default Video;
