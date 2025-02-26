import React from 'react'
import axios from 'axios';
import Swal from 'sweetalert2';
import Head from 'next/head';
import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import secureLocalStorage from 'react-secure-storage';
import { CommonVariables } from '@/Component/CommonVariable';
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { Editor } from '@tinymce/tinymce-react';
import { Country, State, City } from 'country-state-city';
// import { CitySelect, CountrySelect, StateSelect } from "react-country-state-city";
// import "react-country-state-city/dist/react-country-state-city.css";

const AddOrganisation = () => {
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    useEffect(() => {
        const getData = async (e) => {
            setStates(State.getStatesOfCountry(countryid))
        }
        getData()
    }, [countryid])

    useEffect(() => {
        const getData = async (e) => {
            setCities(City.getCitiesOfState(countryid, stateid))
        }
        getData()
    }, [stateid, countryid]);

    /////////////////Userdata/////////////////////
    const router = useRouter();
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

    const [formData, setFormData] = useState({
        orgname: '',
        orgtype: '',
        industry: '',
        website: '',
        email: '',
        logo: '',
        description: '',
        contactname: '',
        contactnumber: '',
        contactaddress: '',
        country: '',
        state: '',
        city: '',
        postalcode: '',
        address: '',

    });
    const [imageSrc, setImageSrc] = useState('');
    const [createURL, setCreateURL] = useState('/');

    const uploadThumbImage = (event) => {
        // console.log(event);
        if (event.target.files && event.target.files[0]) {
            const i = event.target.files[0];
            setImageSrc(i);
            setCreateURL(URL.createObjectURL(i));
        }
    };
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target || e;
        // console.log("data", name, value);
        setFormData({ ...formData, [name]: value });
        if (name === 'countryid') {
            let selectedIndex = e.target.selectedIndex;
            let selectedCountry = e.target.options[selectedIndex].innerHTML;
            // console.log("country", selectedCountry);
            setSelectedCountry(selectedCountry); // Update selectedCountry state
        } else if (name === 'stateid') {
            let selectedIndex = e.target.selectedIndex;
            let selectedState = e.target.options[selectedIndex].innerHTML;
            // console.log("state", selectedState);
            setSelectedState(selectedState); // Update selectedState state
        }
    };

    const handleEditorChange = (content, editor) => {
        setFormData({ ...formData, description: content });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Email validation regex
        setFormSubmitted(true); // Mark form as submitted
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Name validation regex (accepts alphabets and spaces only)
        const orgnameRegex = /^[A-Za-z\s]+$/;
        const contactnameRegex = /^[A-Za-z\s]+$/;
        // Phone validation regex 
        // const phoneRegex = /\+?\d{10}|\d{3}-\d{3}-\d{4}/;

        // Basic validation
        if (formData.orgname === '' || formData.orgtype === '' || formData.email === '' || formData.contactname === '' || countryid === '' || stateid === '' || cityid === '' || formData.postalcode === '' || formData.address === '') {
            Swal.fire('Error', 'Please fill in all fields', 'error');
            setSubmitting(false);
            return;
        }
        if (!orgnameRegex.test(formData.orgname)) {
            Swal.fire('Error', 'Please enter a valid name', 'error');
            setSubmitting(false);
            return;
        }
        if (!contactnameRegex.test(formData.contactname)) {
            Swal.fire('Error', 'Please enter a valid name', 'error');
            setSubmitting(false);
            return;
        }
        if (!emailRegex.test(formData.email)) {
            Swal.fire('Error', 'Please enter a valid email address', 'error');
            setSubmitting(false);
            return;
        }
        // if (!phoneRegex.test(formData.contactnumber)) {
        //     Swal.fire('Error', 'Please enter a valid phone number', 'error');
        //     setSubmitting(false);
        //     return;
        // }

        // Additional validation logic can be added here
        // If validation passes, submit the form
        // console.log('Form submitted:', formData);

        // const data = JSON.stringify({
        //     "organization_name": formData.orgname,
        //     "organization_type": formData.orgtype,
        //     "industry": formData.industry,
        //     "website": formData.website,
        //     "email": formData.email,
        //     "short_description": formData.description,
        //     "contact_name": formData.contactname,
        //     "contact_number": formData.contactnumber,
        //     "logo": imageSrc,
        //     "contact_address": formData.contactaddress,
        //     "country": selectedCountry,
        //     "state_province": selectedState,
        //     "city": cityid,
        //     "postal_code": formData.postalcode,
        //     "street_address": formData.address,
        // });

        const fbody = new FormData()
        fbody.append("organization_name", formData.orgname),
            fbody.append("organization_type", formData.orgtype),
            fbody.append("industry", formData.industry),
            fbody.append("website", formData.website),
            fbody.append("email", formData.email),
            fbody.append("short_description", formData.description),
            fbody.append("contact_name", formData.contactname),
            fbody.append("contact_number", formData.contactnumber),
            fbody.append("contact_address", formData.contactaddress),
            fbody.append("logo", imageSrc),
            fbody.append("country", selectedCountry),
            fbody.append("state_province", selectedState),
            fbody.append("city", cityid),
            fbody.append("postal_code", formData.postalcode),
            fbody.append("street_address", formData.address)

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CommonVariables.API_URL + 'promotor_organization/create',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            data: fbody
        };

        axios.request(config)
            .then((response) => {
                if (response.data.status === 'success') {
                    Swal.fire("", response.data.message, response.data.status);
                    setFormData({
                        orgname: '',
                        orgtype: '',
                        industry: '',
                        website: '',
                        email: '',
                        logo: '',
                        description: '',
                        contactname: '',
                        contactnumber: '',
                        contactaddress: '',
                        country: '',
                        state: '',
                        city: '',
                        postalcode: '',
                        address: '',
                    });
                    router.push('/my-account');
                } else {
                    setSubmitting(false)
                    Swal.fire("", response.data.message, response.data.status);
                }
            })
            .catch((error) => {
                setSubmitting(false)
                if (error.message === "Request failed with status code 401") {
                    secureLocalStorage.removeItem("userdata")
                    router.push("/login")
                }
                console.log(error);
            })
            .finally(() => {
                setSubmitting(false);
            });

    };

    return (
        <>
            <Head>
                <title>Create Organisation</title>
            </Head>
            <Header />
            <PageHeader title={"Add Organisation"} />
            <div className="section login-register-section section-padding">
                <div className="container">
                    <div className="login-register-wrap">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="login-register-box p-3">
                                        <div className="login-register-form">
                                            <div className="single-form mt-3">
                                                <label>Organisation Name<span className='text-danger'>*</span></label>
                                                <input name='orgname' type="text" className="form-control" placeholder="Organisation Name" value={formData.orgname} onChange={handleChange} />
                                                {formSubmitted && formData.orgname === "" && <span style={{ color: 'red' }}>Please enter organisation name</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Organisation Type<span className='text-danger'>*</span></label>
                                                <select className='form-control'
                                                    name='orgtype' type="text" value={formData.orgtype} onChange={handleChange}>
                                                    <option value="" hidden>Select Organisation Type</option>
                                                    <option value={1}>Company</option>
                                                    <option value={2}>Non-profit Organisation</option>
                                                    <option value={3}>Individual</option>
                                                    <option value={4}>Other</option>
                                                </select>
                                                {formSubmitted && formData.orgtype === "" && <span style={{ color: 'red' }}>Please enter organisation type</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Industry</label>
                                                <input name='industry' type="text" className="form-control" placeholder="Industry" value={formData.industry} onChange={handleChange} />
                                                {/* {formSubmitted && formData.industry === "" && <span style={{ color: 'red' }}>Please enter industry</span>} */}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Website</label>
                                                <input name='website' type="text" className="form-control" placeholder="Website" value={formData.website} onChange={handleChange} />
                                                {/* {formSubmitted && formData.website === "" && <span style={{ color: 'red' }}>Please enter website</span>} */}
                                            </div>
                                            <div className="row">
                                                <div className='col-md-6'>
                                                    <div className="single-form mt-3">
                                                        <label>Contact Name<span className='text-danger'>*</span></label>
                                                        <input name='contactname' type="text" className="form-control" placeholder="Contact Name" value={formData.contactname} onChange={handleChange} />
                                                        {formSubmitted && formData.contactname === "" && <span style={{ color: 'red' }}>Please enter contact name</span>}
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="single-form mt-3">
                                                        <label>Contact Email<span className='text-danger'>*</span></label>
                                                        <input name='email' type="text" className="form-control" placeholder="Email" value={formData.email} onChange={handleChange} />
                                                        {formSubmitted && formData.email === "" && <span style={{ color: 'red' }}> Please enter email</span>}
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="single-form mt-3">
                                                        <label>Contact number</label>
                                                        <input name='contactnumber' type="text" className="form-control" placeholder="Phone" value={formData.contactnumber} onChange={handleChange} />
                                                        {/* {formSubmitted && formData.contactnumber === "" && <span style={{ color: 'red' }}>Please enter contact number</span>} */}
                                                    </div>
                                                </div>
                                                <div className='col-md-6'>
                                                    <div className="single-form mt-3">
                                                        <label>Contact Address</label>
                                                        <input name='contactaddress' type="text" className="form-control" placeholder="Contact Address" value={formData.contactaddress} onChange={handleChange} />
                                                        {/* {formSubmitted && formData.contactaddress === "" && <span style={{ color: 'red' }}> Please enter contact address</span>} */}
                                                    </div>
                                                </div>
                                                <div className="single-form mt-3">
                                                    <label>Organisation Description</label>
                                                    <Editor
                                                        apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
                                                        value={formData.description}
                                                        placeholder="Add event description..."
                                                        name='description'
                                                        onEditorChange={handleEditorChange}
                                                        init={{
                                                            height: 300,
                                                            menubar: true,
                                                            inline: false,
                                                            plugins: [
                                                                'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
                                                                'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
                                                                'insertdatetime', 'media', 'table', 'code', 'help', 'wordcount'
                                                            ],
                                                            toolbar: 'undo redo | blocks | ' +
                                                                'bold italic forecolor | alignleft aligncenter ' +
                                                                'alignright alignjustify | bullist numlist outdent indent | ' +
                                                                'removeformat | help',
                                                            content_style: 'body { font-family:Helvetica,Arial,sans-serif; font-size:14px }'
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="login-register-box p-3">
                                        <h5>Organisation Logo<span className='text-danger'>*</span></h5>
                                        <hr />
                                        {imageSrc ? (
                                            <Image src={createURL} className='mt-3' alt="" width={330} height={175} />
                                        ) : (
                                            <div className='mt-2'>No image selected</div>
                                        )}
                                        <input type="file" id="file_thumb" name="file_thumb" className="form-control"
                                            accept=".jpg,.jpeg,.png,.webp"
                                            onChange={uploadThumbImage}
                                        />
                                        {/* {formSubmitted && !imageSrc && <span style={{ color: 'red' }}>Please add organisation logo</span>} */}
                                    </div>
                                    <div className="login-register-box p-3 mt-3">
                                        {/* <div className="single-form">
                                            <label>Country<span className='text-danger'>*</span></label>
                                            <CountrySelect
                                                onChange={(e) => {
                                                    setCountryid(e.id);
                                                    handleChange(e);
                                                }}
                                                name='countryid'
                                                placeholder="Select Country"
                                                value={countryid}
                                            />
                                            {formSubmitted && !countryid && <span style={{ color: 'red' }}>Please select a country</span>}
                                        </div>
                                        <div className="mt-3">
                                            <label>State<span className='text-danger'>*</span></label>
                                            <StateSelect
                                                countryid={countryid}
                                                onChange={(e) => {
                                                    setStateid(e.id);
                                                    handleChange(e)
                                                }}
                                                name='stateid'
                                                placeholder="Select State"
                                                value={stateid}
                                            />
                                            {formSubmitted && !stateid && <span style={{ color: 'red' }}>Please select a state</span>}
                                        </div>
                                        <div className="mt-3">
                                            <label>City<span className='text-danger'>*</span></label>
                                            <CitySelect
                                                countryid={countryid}
                                                stateid={stateid}
                                                onChange={(e) => {
                                                    setCityid(e.id)
                                                    handleChange(e)
                                                }}
                                                name='city'
                                                placeholder="Select City"
                                                value={cityid}
                                            />
                                            {formSubmitted && !cityid && <span style={{ color: 'red' }}>Please select a city</span>}
                                        </div> */}
                                        <div className="single-form">
                                            <label>Country<span className='text-danger'>*</span></label>
                                            <select className="form-control countries" id="countryId" name='countryid' value={countryid}
                                                onChange={(e) => { setCountryid(e.target.value), handleChange(e) }} placeholder="Select Country">
                                                <option defaultValue hidden >Please select country</option>
                                                {countries.map((result) => {
                                                    return (
                                                        <option key={result.isoCode} value={result.isoCode}>{result.name}</option>
                                                    );
                                                })}
                                            </select>
                                            {formSubmitted && !countryid && <span style={{ color: 'red' }}>Please select a country</span>}

                                        </div>
                                        <div className="single-form mt-3">
                                            <label>State<span className='text-danger'>*</span></label>
                                            <select className="form-control states" id="stateId" name="stateid" value={stateid}
                                                onChange={event => { setStateid(event.target.value), handleChange(event) }} placeholder="">
                                                <option> {!countryid ? "Please select country first" : "Please select state"}</option>
                                                {states.map((result) => {
                                                    return (
                                                        <option key={result.isoCode} value={result.isoCode}>{result.name}</option>
                                                    );
                                                })}
                                            </select>
                                            {formSubmitted && !stateid && <span style={{ color: 'red' }}>Please select a state</span>}
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>City<span className='text-danger'>*</span></label>
                                            <select className="form-control cities" id="cityId" name="cityid"
                                                value={cityid}
                                                onChange={event => { setCityid(event.target.value), handleChange(event) }}
                                            >
                                                <option> {!stateid ? "Please select State first" : "Please select city"}</option>
                                                {cities.map((result) => {
                                                    return (
                                                        <option key={result.name}>{result.name}</option>
                                                    );
                                                })}</select>
                                            {formSubmitted && !cityid && <span style={{ color: 'red' }}>Please select a city</span>}
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Postal Code<span className='text-danger'>*</span></label>
                                            <input name="postalcode" type="text" className="form-control"
                                                placeholder="Postal Code"
                                                value={formData.postalcode}
                                                onChange={handleChange} />
                                            {formSubmitted && formData.postalcode === "" && <span style={{ color: 'red' }}>Please enter postal code</span>}
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Street Address<span className='text-danger'>*</span></label>
                                            <input name='address' type="text" className="form-control" placeholder="Street Address"
                                                value={formData.address}
                                                onChange={handleChange} />
                                            {formSubmitted && formData.address === "" && <span style={{ color: 'red' }}>Please enter street address</span>}
                                        </div>
                                    </div>
                                    <div className="form-btn mt-5 text-end">
                                        <button type="submit" className="btn-2" disabled={submitting}>
                                            {submitting ? "Loading..." : "Submit"}
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </form>
                    </div>
                </div >
            </div >
            <Footer />
        </>
    )
}

export default AddOrganisation
