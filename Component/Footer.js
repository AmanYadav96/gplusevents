import React from 'react'
import BackToTop from './BackToTop';
import Link from 'next/link';
import Image from 'next/image';

const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <>
            <div className="meeta-footer-section" style={{ backgroundImage: `url(/assets/images/bg/footer-bg.jpg)` }}>
                <div className="footer-widget text-center">
                    <div className="container">
                        <div className="footer-logo">
                            <Link href="/"><Image src="/assets/images/logo-2.png" alt="Logo" width={100} height={114} /></Link>
                        </div>
                        <div className="footer-newsletter">
                            <p>Join Gplus Events today and unlock the full potential of your events.<br />Welcome to a new era of event excellence.</p>
                            <div className="footer-newsletter-form">
                                <form action="#">
                                    <input type="text" placeholder="Your Email" />
                                    <button className="btn btn-3 btn-primary">Subscribe</button>
                                </form>
                            </div>
                        </div>
                        <div className="footer-widget-social">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-dribbble"></i></a>
                            <a href="#"><i className="fab fa-behance"></i></a>
                            <a href="#"><i className="fab fa-pinterest"></i></a>
                        </div>
                        <div className="footer-copyright">
                            <p><Link href='/terms-of-services'>Terms of Service</Link> | <Link href='/privacy-policy'>Privacy Policy</Link> | Copyright © {currentYear} Gplus Events. All rights reserved.</p>
                        </div>
                    </div>
                </div>
                <div className="progress-wrap">
                    <svg className="progress-circle svg-content" width="100%" height="100%" viewBox="-1 -1 102 102">
                        <path d="M50,1 a49,49 0 0,1 0,98 a49,49 0 0,1 0,-98" />
                    </svg>
                </div>
            </div>
            <BackToTop />
        </>
    )
}
export default Footer;
