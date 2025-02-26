import React from 'react'
import Link from 'next/link';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';

const Sponsorship = () => {
    return (
        <>
            <Header />
            <PageHeader title={"Book Sponsorship"} />
            <div className="section login-register-section section-padding">
                <div className="container">
                    <div className="login-register-wrap">
                        <div className="row">
                            <div className="col-md-8">
                                <div className="login-register-box p-3">
                                    <div className="login-register-form">
                                        <div className="single-form mt-3">
                                            <label>Event Sponsor{"\'"}s Name</label>
                                            <input type="name" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Name of Contact Person</label>
                                            <input type="name" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Title</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>E-mail</label>
                                            <input type="email" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Phone Number</label>
                                            <input type="number" className="form-control" />
                                        </div>
                                    </div>
                                </div>
                                <div className="login-register-box p-3 mt-3">
                                    <div className="login-register-form">
                                        <div className="single-form mt-3">
                                            <label>Event Name</label>
                                            <input type="name" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Event Date</label>
                                            <input type="date" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Title</label>
                                            <input type="text" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Please provide a high-resolution company logo for inclusion in event materials.</label>
                                            <input type="file" className="form-control" />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Additional Comments or Requests:</label>
                                            <textarea className="form-control" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="col-md-4">
                                <div className="login-register-box p-3">
                                    <h5>Address</h5>
                                    <hr />
                                    <div className="single-form mt-3">
                                        <label>Street Address</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="single-form mt-3">
                                        <label>Street Address Line 2</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="row mb-3 mt-3">
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>City</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>State</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3 mt-3">
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>Country</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>Pincode</label>
                                                <input type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="login-register-box p-3">
                                    <h5>Event Location</h5>
                                    <hr />
                                    <div className="single-form mt-3">
                                        <label>Street Address</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="single-form mt-3">
                                        <label>Street Address Line 2</label>
                                        <input type="text" className="form-control" />
                                    </div>
                                    <div className="row mb-3 mt-3">
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>City</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>State</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row mb-3 mt-3">
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>Country</label>
                                                <input type="text" className="form-control" />
                                            </div>
                                        </div>
                                        <div className="col-md-6">
                                            <div className="single-form">
                                                <label>Pincode</label>
                                                <input type="number" className="form-control" />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="form-btn mt-5 text-end">
                                    <Link href="/" className="btn-2">Submit</Link>
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

export default Sponsorship
