import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import secureLocalStorage  from 'react-secure-storage';
import { useRouter } from 'next/router';

const ImageGallery = () => {
    const router = useRouter();

    /////////////////Userdata/////////////////////
    let userdata_res
    let token;
    if (typeof window !== "undefined") {
        const userdata = secureLocalStorage.getItem("userdata");
        userdata_res = userdata ? JSON.parse(userdata) : {};
        // console.log(userdata_res);
        token = userdata_res.token;

        if (!userdata_res.token) {
            router.push('/login')
            // console.log("Redirecting to login");
        }
    }
    //////////////////////////////////////////////////////

    return (
        <>
            <Header />
            <PageHeader title={"Event Image Gallery"} />
            <div className="section login-register-section section-padding">
                <div className="container">
                    <div className="login-register-wrap">
                        <div className="login-register-box p-3">
                            <div className="login-register-form">
                                <div className="single-form text-center">
                                    <input type="file" className="form-control" />
                                    <Image src="/assets/images/event-bg-1.jpg" alt="" width={332} height={175} />
                                </div>
                            </div>
                            <div className="form-btn mt-5">
                                <span>
                                    <Link className="btn btn-default float-start" href="#" style={{ marginRight: '30px' }}>Delete</Link>
                                    <Link href="#" className="btn-2">Add More</Link>
                                </span>
                            </div>
                        </div>
                        <div className="form-btn mt-5 float-start">
                            <span>
                                <Link className="btn btn-default float-start me-2" href="/add-video" style={{ marginRight: '10px' }}>Skip</Link>
                            </span>
                        </div>
                        <div className="form-btn mt-5 text-end">
                            <Link href="/add-event" className="btn-2" style={{ marginRight: '45px' }}>Back</Link>
                            <Link href="/add-video" className="btn-2">Next</Link>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default ImageGallery
