import React from 'react'
import Image from 'next/image';
import Link from 'next/link';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import secureLocalStorage from 'react-secure-storage';
import { useRouter } from 'next/router';
import Head from 'next/head';

const ThankYou = () => {
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
            <Head>
                <title>ThankYou</title>
            </Head>
            <Header />
            <PageHeader title={"Thank You"} />
            <div className="section login-register-section section-padding">
                <div className="container">
                    <div className="login-register-wrap">
                        <div className="login-register-box p-3">
                            <div className="login-register-form">
                                <div className="single-form text-center">
                                    <Image src="/assets/images/thankyou.jpg" width={400} height={378} alt='Thankyou' />
                                    <h2 className="mt-3">Thank You!</h2>
                                    <p>Lorem Ipsum has been the industry{"\'"}s standard dummy<br />text ever since the 1500s.</p>
                                    <Link href="/event-list" className="btn-2 mt-4">Events List</Link>
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

export default ThankYou
