import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import secureLocalStorage from 'react-secure-storage';
import ImageCropper from '@/Component/ImageCropper';
import { CommonVariables } from '@/Component/CommonVariable';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';

const AddEvent = () => {
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

    // const [imageSrc, setImageSrc] = useState('');
    // const [createURL, setCreateURL] = useState("/");

    // const uploadThumbImage = (event) => {
    //     // console.log(event);
    //     if (event.target.files && event.target.files[0]) {
    //         const i = event.target.files[0];
    //         setImageSrc(i);
    //         setCreateURL(URL.createObjectURL(i));
    //     }
    // };

    const [imageSrc, setImageSrc] = useState(null);
    const [croppedImageBlob, setCroppedImageBlob] = useState(null);

    const handleCroppedImage = (croppedBlob) => {
        const croppedImageUrl = URL.createObjectURL(croppedBlob);
        setImageSrc(croppedImageUrl);
        setCroppedImageBlob(croppedBlob);
    };

    const [formData, setFormData] = useState({
        eventname: '',
        date: '',
        time: '',
        contactperson: '',
        contactnumber: '',
        email: '',
        description: '',
        image: '',
        country: '',
        state: '',
        city: '',
        pincode: '',
        address: '',
        price: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target || e;
        console.log("data", name, value);
        setFormData({ ...formData, [name]: value });
        if (value == "0") {
            router.push('/add-organisation');
        }
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

    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Email validation regex
        setFormSubmitted(true); // Mark form as submitted
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Name validation regex (accepts alphabets and spaces only)
        // const eventnameRegex = /^[A-Za-z\s]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        // Phone validation regex 
        const phoneRegex = /\+?\d{10}|\d{3}-\d{3}-\d{4}/;

        // Basic validation
        // if (formData.eventname === '' || formData.date === '' || formData.time === '' || formData.contactperson === '' || formData.contactnumber === '' || formData.email === '' || formData.description === '' || imageSrc === '' || countryid === '' || stateid === '' || cityid === '' || formData.pincode === '' || formData.address === '' || formData.price === '') {
        //     Swal.fire('Error', 'Please fill in all fields', 'error');
        //     setSubmitting(false);
        //     return;
        // }
        // if (!eventnameRegex.test(formData.eventname)) {
        //     Swal.fire('Error', 'Please enter a valid name', 'error');
        //     setSubmitting(false);
        //     return;
        // }
        // if (!nameRegex.test(formData.contactperson)) {
        //     Swal.fire('Error', 'Please enter a valid name', 'error');
        //     setSubmitting(false);
        //     return;
        // }
        // if (!emailRegex.test(formData.email)) {
        //     Swal.fire('Error', 'Please enter a valid email address', 'error');
        //     setSubmitting(false);
        //     return;
        // }
        // if (!phoneRegex.test(formData.contactnumber)) {
        //     Swal.fire('Error', 'Please enter a valid phone number', 'error');
        //     setSubmitting(false);
        //     return;
        // }

        // Additional validation logic can be added here
        // If validation passes, submit the form
        // console.log('Form submitted:', formData);

        const fbody = new FormData()
        fbody.append("name", formData.eventname),
            fbody.append("event_date", formData.date),
            fbody.append("event_time", formData.time),
            fbody.append("event_subtype", 3),
            fbody.append("org_id", formData.orgtype || 0),
            fbody.append("contact_person", formData.contactperson),
            fbody.append("phone", formData.contactnumber),
            fbody.append("email", formData.email),
            fbody.append("short_description", formData.description)
        if (croppedImageBlob) {
            fbody.append('featured_image', croppedImageBlob);
        }
        fbody.append("country", selectedCountry),
            fbody.append("state", selectedState),
            fbody.append("city", cityid),
            fbody.append("pincode", formData.pincode),
            fbody.append("postal_code", formData.pincode),
            fbody.append("street_address", formData.address),
            fbody.append("sponsering_area", formData.address),
            fbody.append("ticket_price", formData.price),
            fbody.append("latitude", latitude),
            fbody.append("longitude", longitude)

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CommonVariables.API_URL + 'event/create?event_type=2',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'multipart/form-data',
                'Authorization': `Bearer ${token}`
            },
            data: fbody
        };

        // const data = JSON.stringify({
        //     "name": formData.eventname,
        //     "event_date": formData.date,
        //     "event_time": formData.time,
        //     "event_subtype": 1,
        //     "contact_person": formData.contactperson,
        //     "phone": formData.contactnumber,
        //     "email": formData.email,
        //     "short_description": formData.description,
        //     "featured_image": imageSrc,
        //     "country": countryid,
        //     "state": stateid,
        //     "city": cityid,
        //     "pincode": formData.pincode,
        //     "postal_code": formData.pincode,
        //     "street_address": formData.address,
        //     "sponsering_area": formData.address,
        //     "ticket_price": formData.price,
        //     "latitude": latitude,
        //     "longitude": longitude,
        // });

        // const config = {
        //     method: 'post',
        //     maxBodyLength: Infinity,
        //     url: CommonVariables.API_URL + 'event/create?event_type=2',
        //     headers: {
        //         'Accept': 'application/json',
        //         'Content-Type': 'application/json',
        //         'Authorization': `Bearer ${token}`
        //     },
        //     data: data
        // };

        axios.request(config)
            .then((response) => {
                if (response.data.status === 'success') {
                    Swal.fire("", response.data.message, response.data.status);
                    setFormData({
                        eventname: '',
                        date: '',
                        time: '',
                        contactperson: '',
                        contactnumber: '',
                        email: '',
                        description: '',
                        image: '',
                        country: '',
                        state: '',
                        city: '',
                        pincode: '',
                        address: '',
                        price: '',
                    });
                    router.push('/event-list');
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
            })
            .finally(() => {
                setSubmitting(false);
            });

    };

    const [lists, setLists] = useState([]);
    // Organisation List API
    useEffect(() => {
        const fetchOrgList = async () => {
            try {
                if (!token || !userdata_res || !userdata_res.id) {
                    router.push('/login');
                    return;
                }
                const response = await axios.get(CommonVariables.API_URL + `promotor_organization/list?user_id=${userdata_res.id}&cstatus=1`, {
                    headers: {
                        "Content-Type": "application/json",
                        'Authorization': `Bearer ${token}`,
                    }
                });
                if (response.data.status_code === 1) {
                    setLists(response.data.data || []);
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    router.push('/login');
                } else {
                    console.error('Error fetching organisations:', error);
                }
            }
        };

        if (token && userdata_res && userdata_res.id) {
            fetchOrgList();
        }
    }, [router, token]);

    // console.log("orgList", lists);

    return (
        <>
            <Head>
                <title>Create Event</title>
            </Head>
            <Header />
            <PageHeader title={"Add Event"} />
            <div className="section login-register-section section-padding">
                <div className="container">
                    <div className="login-register-wrap">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="login-register-box p-3">
                                        <div className="login-register-form">
                                            <div className="single-form mt-3">
                                                <label>Event Name<span className='text-danger'>*</span></label>
                                                <input name='eventname' type="text" className="form-control" placeholder="Enter event Name" value={formData.eventname} onChange={handleChange} />
                                                {formSubmitted && formData.eventname === "" && <span style={{ color: 'red' }}>Please enter event name</span>}
                                            </div>
                                            <div className="row mb-4">
                                                <div className="col-md-6">
                                                    <div className="single-form">
                                                        <label>Event Date<span className='text-danger'>*</span></label>
                                                        <input name='date' type="date" className="form-control" value={formData.date} onChange={handleChange} />
                                                        {formSubmitted && formData.date === "" && <span style={{ color: 'red' }}>Please enter event date</span>}
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="single-form">
                                                        <label>Event Time<span className='text-danger'>*</span></label>
                                                        <input name='time' type="time" className="form-control" value={formData.time} onChange={handleChange} />
                                                        {formSubmitted && formData.time === "" && <span style={{ color: 'red' }}>Please enter event time</span>}
                                                    </div>
                                                </div>
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Event Ticket Price<span className='text-danger'>*</span></label>
                                                <input name='price' type="number" min='0' defaultValue={0} placeholder="$ Price" className="form-control" value={formData.price} onChange={handleChange} />
                                                {formSubmitted && formData.price === "" && <span style={{ color: 'red' }}>Please enter event ticket price</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Select Organisation</label>
                                                <select className='form-control'
                                                    name='orgtype' type="text" value={formData.orgtype} onChange={handleChange}>
                                                    <option value="" hidden>Select Organisation Name</option>
                                                    <option value="0">Create Organisation</option>
                                                    {lists && lists.length > 0 ? (
                                                        lists.map(org => (
                                                            <option key={org.id} value={org.id}>{org.organization_name}</option>
                                                        ))

                                                    ) : (
                                                        <option value={0} disabled>No organisations available</option>
                                                    )}
                                                </select>
                                                {formSubmitted && formData.orgtype === "" && <span style={{ color: 'red' }}>Please enter organisation type</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Contact Person Name<span className='text-danger'>*</span></label>
                                                <input name='contactperson' type="name" className="form-control" placeholder="Enter your name" value={formData.contactperson} onChange={handleChange} />
                                                {formSubmitted && formData.contactperson === "" && <span style={{ color: 'red' }}>Please enter your name</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Contact number<span className='text-danger'>*</span></label>
                                                <input name='contactnumber' type="number" className="form-control" placeholder="Enter your contact number" value={formData.contactnumber} onChange={handleChange} />
                                                {formSubmitted && formData.contactnumber === "" && <span style={{ color: 'red' }}>Please enter contact number</span>}
                                            </div>
                                            <div className="single-form">
                                                <label>Contact Email<span className='text-danger'>*</span></label>
                                                <input name='email' type="text" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                                                {formSubmitted && formData.email === "" && <span style={{ color: 'red' }}> Please enter email</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Event Description<span className='text-danger'>*</span></label>
                                                <textarea name='description'
                                                    className="form-control"
                                                    placeholder="Add event description..."
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                >
                                                </textarea>
                                                {formSubmitted && formData.description === "" && (
                                                    <span style={{ color: 'red' }}>Please enter event description</span>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="login-register-box p-3">
                                        <h5>Event Image<span className='text-danger'>*</span></h5>
                                        <hr />
                                        {/* {imageSrc ? (
                                            <Image src={createURL} className='mt-3' alt="" width={330} height={175} />
                                        ) : (
                                            <div className='mt-2'>No image selected</div>
                                        )}
                                        <input type="file" id="file_thumb" name="file_thumb" className="form-control"
                                            accept=".jpg,.jpeg,.png,.webp"
                                            onChange={uploadThumbImage}
                                        /> */}
                                        {imageSrc ? (
                                            <Image src={imageSrc} className='mt-3' alt="Cropped" width={330} height={175} />
                                        ) : (
                                            <div className='mt-2'>No image selected</div>
                                        )}
                                        <ImageCropper onCropped={handleCroppedImage} />
                                    </div>
                                    <div className="login-register-box mt-3 p-3">
                                        <h5>Event Venue</h5>
                                        <hr />
                                        <div className="row mb-3 mt-3">
                                            <div className="single-form">
                                                <label>Country<span className='text-danger'>*</span></label>
                                                <select className="form-control countries" id="countryId" name='countryid' value={countryid}
                                                    onChange={(e) => { setCountryid(e.target.value), handleChange(e) }} placeholder="Select Country">
                                                    <option defaultValue hidden >Please select country</option>
                                                    {countries.map((result) => {
                                                        // console.log(result, "country");
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
                                                        // console.log(result, "state");
                                                        return (
                                                            <option key={result.isoCode} value={result.isoCode}>{result.name}</option>
                                                        );
                                                    })}
                                                </select>
                                                {formSubmitted && !stateid && <span style={{ color: 'red' }}>Please select a state</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>City-{latitude}-{longitude}<span className='text-danger'>*</span></label>
                                                <select className="form-control cities" id="cityId" name="cityid"
                                                    value={cityid}
                                                    onChange={event => {
                                                        const selectedCity = cities.find(city => city.name === event.target.value);
                                                        if (selectedCity) {
                                                            setCityid(event.target.value);
                                                            setLatitude(selectedCity.latitude);
                                                            setLongitude(selectedCity.longitude);
                                                            handleChange(event);
                                                        }
                                                    }}
                                                >
                                                    <option> {!stateid ? "Please select State first" : "Please select city"}</option>
                                                    {cities.map((result) => {
                                                        // console.log(result, "city");
                                                        return (
                                                            <option key={result.name}>{result.name}</option>
                                                        );
                                                    })}</select>
                                                {formSubmitted && !cityid && <span style={{ color: 'red' }}>Please select a city</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Pincode<span className='text-danger'>*</span></label>
                                                <input name="pincode" type="number" className="form-control"
                                                    placeholder="Enter pincode"
                                                    value={formData.pincode}
                                                    onChange={handleChange} />
                                                {formSubmitted && formData.pincode === "" && <span style={{ color: 'red' }}>Please enter pincode</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Street Address<span className='text-danger'>*</span></label>
                                                <input name='address' type="name" className="form-control" placeholder="Enter street Address"
                                                    value={formData.address}
                                                    onChange={handleChange} />
                                                {formSubmitted && formData.address === "" && <span style={{ color: 'red' }}>Please enter street address</span>}
                                            </div>
                                        </div>
                                    </div>
                                    <div className="form-btn mt-5 text-end">
                                        <button type="submit" className="btn-2" disabled={submitting}>
                                            {submitting ? "Loading..." : "Submit"}
                                        </button>
                                        {/* <Link href="/add-image" className="btn-2">Next</Link> */}
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

export default AddEvent
