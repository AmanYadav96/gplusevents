import React from 'react'
import Link from 'next/link';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import secureLocalStorage  from 'react-secure-storage';
import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
import "react-country-state-city/dist/react-country-state-city.css";

const UpdateEvent = () => {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
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
            <PageHeader title={"Update Event"} />
            <div className="section login-register-section section-padding">
                <div className="container">
                    <div className="login-register-wrap">

                        <div className="row">
                            <div className="col-md-8">
                                <div className="login-register-box p-3">
                                    <div className="login-register-form">
                                        <div className="single-form mt-3">
                                            <label>Event Name</label>
                                            <input type="name" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Event Slug</label>
                                            <input type="name" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Contact Person Name</label>
                                            <input type="name" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Contact number</label>
                                            <input type="number" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Event Description</label>
                                            <textarea className="form-control"></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="login-register-box p-3">
                                    <h5>Event Venue</h5>
                                    <hr />
                                    <div className="row mb-3 mt-3">
                                        <div className="single-form">
                                            <label>Country</label>
                                            <CountrySelect
                                                onChange={(e) => {
                                                    setCountryid(e.id);
                                                }}
                                                placeHolder="Select Country"
                                            />
                                            <div className="mt-3">
                                                <label>State</label>
                                                <StateSelect
                                                    countryid={countryid}
                                                    onChange={(e) => {
                                                        setStateid(e.id);
                                                    }}
                                                    placeHolder="Select State"
                                                />
                                            </div>
                                            <div className="mt-3">
                                                <label>City</label>
                                                <CitySelect
                                                    countryid={countryid}
                                                    stateid={stateid}
                                                    onChange={(e) => {
                                                        console.log(e);
                                                    }}
                                                    placeHolder="Select City"
                                                />
                                            </div>
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Address</label>
                                            <input type="name" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="login-register-box p-3 mt-3">
                                    <h5>Ticket Price</h5>
                                    <hr />
                                    <input type="number" max='100' min='0' defaultValue={0} className="form-control" />
                                </div>
                                <div className="form-btn mt-5 text-end">
                                    <Link href="/add-image" className="btn-2">Next</Link>
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

export default UpdateEvent
