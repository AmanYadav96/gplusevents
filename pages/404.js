import React, { useEffect } from 'react';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import Head from 'next/head';

const Page = () => {
    useEffect(() => {
        const randomNum = () => {
            return Math.floor(Math.random() * 9) + 1;
        };

        let loop1, loop2, loop3, time = 30, i = 0;

        loop3 = setInterval(() => {
            if (i > 40) {
                clearInterval(loop3);
                document.querySelector('.thirdDigit').textContent = 4;
            } else {
                document.querySelector('.thirdDigit').textContent = randomNum();
                i++;
            }
        }, time);

        loop2 = setInterval(() => {
            if (i > 80) {
                clearInterval(loop2);
                document.querySelector('.secondDigit').textContent = 0;
            } else {
                document.querySelector('.secondDigit').textContent = randomNum();
                i++;
            }
        }, time);

        loop1 = setInterval(() => {
            if (i > 100) {
                clearInterval(loop1);
                document.querySelector('.firstDigit').textContent = 4;
            } else {
                document.querySelector('.firstDigit').textContent = randomNum();
                i++;
            }
        }, time);

        return () => {
            clearInterval(loop1);
            clearInterval(loop2);
            clearInterval(loop3);
        };
    }, []);

    return (
        <>
            <Head>
                <title>Page Not Found</title>
            </Head>
            <Header />
            <PageHeader title={"Page Not Found"} />
            <div className="error">
                <div className="container-floud">
                    <div className="col-xs-12 ground-color text-center">
                        <div className="container-error-404">
                            <div className="clip"><div className="shadow"><span className="digit thirdDigit"></span></div></div>
                            <div className="clip"><div className="shadow"><span className="digit secondDigit"></span></div></div>
                            <div className="clip"><div className="shadow"><span className="digit firstDigit"></span></div></div>
                            <div className="msg">OH!<span className="triangle"></span></div>
                        </div>
                        <h2 className="h1">Sorry! Page not found</h2>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    );
};

export default Page;
