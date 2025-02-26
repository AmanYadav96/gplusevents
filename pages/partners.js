import React from 'react';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import OurSpeakers from '@/Component/OurSpeakers';
import Head from 'next/head';

const Partners = () => {
    return (
        <>
            <Head>
                <title>G plus Events - Partners</title>
            </Head>
            <Header tab="partners" />
            <PageHeader title={"Partners"} />
            <div className="container mt-5 mb-5">
                <div className="meeta-section-title-2 text-center">
                    <h4 className="sub-title">National Promotors</h4>
                    <h2 className="main-title text-black">Our Promoters</h2>
                </div>
                <OurSpeakers />
            </div>
            <Footer />
        </>
    )
}

export default Partners