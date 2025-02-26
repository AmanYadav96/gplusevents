import React from 'react'
import axios from 'axios';
import Link from 'next/link';
import Swal from 'sweetalert2';
import Image from 'next/image';
import Head from 'next/head';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import Loading from '@/Component/Loading';
import secureLocalStorage from 'react-secure-storage';
import { CommonVariables } from '@/Component/CommonVariable';
import { useRouter } from 'next/router';
import { useEffect, useState } from "react";
import { Country, State, City } from 'country-state-city';
import { Editor } from '@tinymce/tinymce-react';

const AddAnnouncement = () => {
    const [location, setLocation] = useState('');
    const [countryid, setCountryid] = useState(0);
    const [stateid, setStateid] = useState(0);
    const [cityid, setCityid] = useState(0);
    const [countries, setCountries] = useState(Country.getAllCountries());
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);
    const [latitude, setLatitude] = useState();
    const [longitude, setLongitude] = useState();
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
    const [loading, setLoading] = useState(true);
    const [userdata_res, setUserdataRes] = useState({});
    const [token, setToken] = useState('');
    useEffect(() => {
        const checkUserToken = async () => {
            if (typeof window !== "undefined") {
                const userdata = secureLocalStorage.getItem("userdata");
                const parsedUserdata = userdata ? JSON.parse(userdata) : {};
                setUserdataRes(parsedUserdata);
                setToken(parsedUserdata.token);

                if (!parsedUserdata.token) {
                    router.push('/login');
                }

                setLoading(false);
            }
        };

        checkUserToken();
    }, [router]);
    //////////////////////////////////////////////////////

    const [imageSrc, setImageSrc] = useState({ bannerImage: '', featuredImage: '' });
    const [createURL, setCreateURL] = useState({ bannerImage: "/", featuredImage: "/" });
    const uploadThumbImage = (event) => {
        const { name, files } = event.target;
        if (files && files[0]) {
            const file = files[0];
            setImageSrc(prevImageSrc => ({
                ...prevImageSrc,
                [name]: file
            }));
            setCreateURL(prevCreateURL => ({
                ...prevCreateURL,
                [name]: URL.createObjectURL(file)
            }));
        }
    };

    // const uploadThumbImage = (event) => {
    //     // console.log(event);
    //     if (event.target.files && event.target.files[0]) {
    //         const i = event.target.files[0];
    //         setImageSrc(i);
    //         setCreateURL(URL.createObjectURL(i));
    //     }
    // };
    const handleEditorChange = (content, editor) => {
        setFormData({ ...formData, description: content });
    };

    const [formData, setFormData] = useState({
        announcementname: '',
        contactperson: '',
        contactnumber: '',
        email: '',
        description: '',
        eventSponsered: '',
        image: '',
        bannerImage: '',
        country: '',
        state: '',
        city: '',
        facebook: '',
        instagram: '',
        youtube: '',
        x: '',
        snapchat: '',
        tiktok: '',
        website: '',
    });

    const [formSubmitted, setFormSubmitted] = useState(false);
    const [submitting, setSubmitting] = useState(false);
    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target || e;
        // console.log("data", name, value);
        if (value === "create") {
            router.push('/add-organisation');
        }
        if (name === 'location') {
            setLocation(value);
            setCountryid('');
            setStateid('');
            setCityid('');
        } else {
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
        }
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        setSubmitting(true);
        // Email validation regex
        setFormSubmitted(true); // Mark form as submitted
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        // Name validation regex (accepts alphabets and spaces only)
        // const announcementRegex = /^[A-Za-z\s]+$/;
        const nameRegex = /^[A-Za-z\s]+$/;
        // Phone validation regex
        // const phoneRegex = /\+?\d{10}|\d{3}-\d{3}-\d{4}/;

        // Basic validation
        if (formData.announcementname === '' || formData.orgtype === '' || formData.contactperson === '' || formData.contactnumber === '' || formData.email === '' || formData.description === '' || formData.eventSponsered === '' || imageSrc === '' || countryid === '') {
            Swal.fire('Error', 'Please fill in all fields', 'error');
            setSubmitting(false);
            return;
        }
        // if (!announcementRegex.test(formData.announcementname)) {
        //     Swal.fire('Error', 'Please enter a valid name', 'error');
        //     setSubmitting(false);
        //     return;
        // }
        if (!nameRegex.test(formData.contactperson)) {
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

        const fbody = new FormData()
        fbody.append("name", formData.announcementname),
            fbody.append("event_subtype", 1),
            fbody.append("org_id", formData.orgtype),
            fbody.append("contact_person", formData.contactperson),
            fbody.append("phone", formData.contactnumber),
            fbody.append("email", formData.email),
            fbody.append("short_description", formData.description),
            fbody.append("sponsered_type", formData.eventSponsered),
            fbody.append("featured_image", imageSrc.featuredImage),
            fbody.append("banner", imageSrc.bannerImage),
            fbody.append("country", selectedCountry),
            fbody.append("state", selectedState),
            fbody.append("city", cityid),
            fbody.append("latitude", latitude),
            fbody.append("longitude", longitude),
            fbody.append("facebook", formData.facebook),
            fbody.append("instagram", formData.instagram),
            fbody.append("youtube", formData.youtube),
            fbody.append("x", formData.x),
            fbody.append("snapchat", formData.snapchat),
            fbody.append("tiktok", formData.tiktok),
            fbody.append("website", formData.website)

        const config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: CommonVariables.API_URL + 'event/create?event_type=1',
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
                        announcementname: '',
                        contactperson: '',
                        contactnumber: '',
                        email: '',
                        description: '',
                        eventSponsered: '',
                        image: '',
                        bannerImage: '',
                        country: '',
                        state: '',
                        city: '',
                        facebook: '',
                        instagram: '',
                        youtube: '',
                        x: '',
                        snapchat: '',
                        tiktok: '',
                        website: '',
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
                    sessionStorage.removeItem("userdata")
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
                // cstatus removed from here
                const response = await axios.get(
                  CommonVariables.API_URL +
                    `promotor_organization/list?user_id=${userdata_res.id}`,
                  {
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: `Bearer ${token}`,
                    },
                  }
                );
                // const response = await axios.get(CommonVariables.API_URL + `promotor_organization/list?user_id=${userdata_res.id}&cstatus=1`, {
                //     headers: {
                //         "Content-Type": "application/json",
                //         'Authorization': `Bearer ${token}`,
                //     }
                // });
                console.log("Response", response.data);
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

    console.log("orgList", lists);

    const [sponsered, setSponsered] = useState([]);
    // Sponsered List API
    useEffect(() => {
        const fetchSponseredList = async () => {
            try {
                const response = await axios.get(CommonVariables.API_URL + `event/sponsered_type`, {
                    headers: {
                        "Content-Type": "application/json",
                    }
                });
                if (response.data.status_code === 1) {
                    setSponsered(response.data.data || []);
                }
            } catch (error) {
                console.error('Error fetching Sponsered List:', error);
            }
        };
        fetchSponseredList();

    }, [router, token]);
    // console.log("sponsered", sponsered);

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <>
            <Head>
                <title>Create Announcement</title>
            </Head>
            <Header />
            <PageHeader title={"Add Announcement"} />
            <div className="section login-register-section section-padding">
                <div className="container">
                    <div className="login-register-wrap">
                        <form onSubmit={handleSubmit}>
                            <div className="row">
                                <div className="col-md-8">
                                    <div className="login-register-box p-3">
                                        <div className="login-register-form">
                                            <div className="single-form mt-3">
                                                <label>Select Organisation<span className='text-danger'>*</span></label>
                                                <select className='form-control'
                                                    name='orgtype' type="text" value={formData.orgtype} onChange={handleChange}>
                                                    <option value="" hidden>Select Organisation Name</option>
                                                    <option value="create">Create Organisation</option>
                                                    {lists && lists.length > 0 ? (
                                                        lists.map(org => (
                                                            <option key={org.id} value={org.id}>{org.organization_name}</option>
                                                        ))

                                                    ) : (
                                                        <option value="" disabled>No organisations available</option>
                                                    )}
                                                </select>
                                                {formSubmitted && formData.orgtype === "" && <span style={{ color: 'red' }}>Please enter organisation type</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Announcement Name<span className='text-danger'>*</span></label>
                                                <input name='announcementname' type="text" className="form-control" placeholder=" Enter announcement name" value={formData.announcementname} onChange={handleChange} />
                                                {formSubmitted && formData.announcementname === "" && <span style={{ color: 'red' }}>Please enter announcement name</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Contact Person Name<span className='text-danger'>*</span></label>
                                                <input name='contactperson' type="text" className="form-control" placeholder="Enter your name" value={formData.contactperson} onChange={handleChange} />
                                                {formSubmitted && formData.contactperson === "" && <span style={{ color: 'red' }}>Please enter your name</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label>Contact number<span className='text-danger'>*</span></label>
                                                <input name='contactnumber' type="text" className="form-control" placeholder="Enter your contact number" value={formData.contactnumber} onChange={handleChange} />
                                                {formSubmitted && formData.contactnumber === "" && <span style={{ color: 'red' }}>Please enter contact number</span>}
                                            </div>
                                            <div className="single-form">
                                                <label>Contact Email<span className='text-danger'>*</span></label>
                                                <input name='email' type="text" className="form-control" placeholder="Enter your email" value={formData.email} onChange={handleChange} />
                                                {formSubmitted && formData.email === "" && <span style={{ color: 'red' }}> Please enter email</span>}
                                            </div>
                                            <div className="single-form mt-3">
                                                <label> Announcement Description<span className='text-danger'>*</span></label>
                                                <Editor
                                                    apiKey={process.env.NEXT_PUBLIC_EDITOR_API_KEY}
                                                    value={formData.description}
                                                    placeholder="Add event description..."
                                                    name='description'
                                                    onEditorChange={handleEditorChange}
                                                    init={{
                                                        height: 500,
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
                                                {/* <textarea name='description'
                                                    className="form-control"
                                                    placeholder="Add description..."
                                                    value={formData.description}
                                                    onChange={handleChange}
                                                >
                                                </textarea> */}
                                                {formSubmitted && formData.description === "" && (
                                                    <span style={{ color: 'red' }}>Please enter announcement description</span>
                                                )}

                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-4">
                                    <div className="login-register-box p-3">
                                        <h5>Featured Image<span className='text-danger'>*</span></h5>
                                        <hr />
                                        {imageSrc.featuredImage ? (
                                            <Image src={createURL.featuredImage} className='mt-3' alt="Featured" width={330} height={175} />
                                        ) : (
                                            <div className='mt-2'>No image selected</div>
                                        )}
                                        <input
                                            type="file"
                                            name="featuredImage"
                                            className="form-control"
                                            accept=".jpg,.jpeg,.png,.webp"
                                            onChange={uploadThumbImage}
                                        />
                                        <p>Image size should be 270 x 180</p>
                                        {formSubmitted && !imageSrc.featuredImage && (
                                            <span style={{ color: 'red' }}>Please add a featured image</span>
                                        )}
                                    </div>
                                    <div className="login-register-box mt-3 p-3">
                                        <h5>Social Media Accounts</h5>
                                        <hr />
                                        <div className="single-form mt-3">
                                            <label>Facebook</label>
                                            <input name='facebook' type="text" className="form-control" placeholder=" Enter your facebook account" value={formData.facebook} onChange={handleChange} />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Instagram</label>
                                            <input name='instagram' type="text" className="form-control" placeholder=" Enter your instagram account" value={formData.instagram} onChange={handleChange} />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>YouTube</label>
                                            <input name='youtube' type="text" className="form-control" placeholder=" Enter your youtube account" value={formData.youtube} onChange={handleChange} />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>X</label>
                                            <input name='x' type="text" className="form-control" placeholder=" Enter your x account" value={formData.x} onChange={handleChange} />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>SnapChat</label>
                                            <input name='snapchat' type="text" className="form-control" placeholder=" Enter your snapchat account" value={formData.snapchat} onChange={handleChange} />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>TikTok</label>
                                            <input name='tiktok' type="text" className="form-control" placeholder=" Enter your tiktok account" value={formData.tiktok} onChange={handleChange} />
                                        </div>
                                        <div className="single-form mt-3">
                                            <label>Website</label>
                                            <input name='website' type="text" className="form-control" placeholder=" Enter your website" value={formData.website} onChange={handleChange} />
                                        </div>
                                    </div>
                                    <div className="login-register-box mt-3 p-3">
                                        <h5>Applying For?<span className='text-danger'>*</span></h5>
                                        <hr />
                                        <div className="single-form mt-3">
                                            {/* <label>Location<span className='text-danger'>*</span></label> */}
                                            <select
                                                className='form-control'
                                                name='location'
                                                value={location}
                                                onChange={handleChange}
                                            >
                                                <option value="" hidden>Please select a Level</option>
                                                <option>Country</option>
                                                <option>State</option>
                                                <option>City</option>
                                            </select>
                                            {formSubmitted && !location && <span style={{ color: 'red' }}>Please select a level</span>}
                                        </div>
                                        {location === 'Country' && (
                                            <div className="row mb-3 mt-3">
                                                <div className="single-form">
                                                    <label>Country<span className='text-danger'>*</span></label>
                                                    <select className="form-control countries" id="countryId" name='countryid' value={countryid}
                                                        // onChange={(e) => { setCountryid(e.target.value), handleChange(e) }}
                                                        onChange={event => {
                                                            const selectedCountry = countries.find(country => country.isoCode === event.target.value);
                                                            if (selectedCountry) {
                                                                setCountryid(event.target.value);
                                                                setLatitude(selectedCountry.latitude);
                                                                setLongitude(selectedCountry.longitude);
                                                                handleChange(event);
                                                            }
                                                        }} placeholder="Select Country">
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
                                            </div>
                                        )}
                                        {location === 'State' && (
                                            <div className="row mb-3 mt-3">
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
                                                        // onChange={event => { setStateid(event.target.value), handleChange(event) }}
                                                        onChange={event => {
                                                            const selectedState = states.find(state => state.isoCode === event.target.value);
                                                            if (selectedState) {
                                                                setStateid(event.target.value);
                                                                setLatitude(selectedState.latitude);
                                                                setLongitude(selectedState.longitude);
                                                                handleChange(event);
                                                            }
                                                        }}
                                                        placeholder="">
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
                                            </div>
                                        )}
                                        {location === 'City' && (
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
                                                    <label>City<span className='text-danger'>*</span></label>
                                                    <select className="form-control cities" id="cityId" name="cityid"
                                                        value={cityid}
                                                        // onChange={event => { setCityid(event.target.value), handleChange(event) }}
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
                                            </div>
                                        )}
                                        <div className="single-form mt-3">
                                            <label>Select Event Sponsored Type<span className='text-danger'>*</span></label>
                                            <select
                                                className='form-control'
                                                name='eventSponsered'
                                                value={formData.eventSponsered}
                                                onChange={handleChange}
                                            >
                                                <option value="" hidden>Select Event Sponsored Type</option>
                                                {sponsered && sponsered.map((list) => (
                                                    <option key={list.id} value={list.key}>{list.name}</option>
                                                ))}
                                            </select>
                                            {formSubmitted && !formData.eventSponsered && (
                                                <span style={{ color: 'red' }}>Please enter Event Sponsored Type</span>
                                            )}
                                        </div>
                                        {formData.eventSponsered > 0 ? (
                                            <div className="single-form mt-3">
                                                <label>Banner Image<span className='text-danger'>*</span></label>
                                                <hr />
                                                {imageSrc.bannerImage ? (
                                                    <Image src={createURL.bannerImage} className='mt-3' alt="Banner" width={330} height={175} />
                                                ) : (
                                                    <div className='mt-2'>No image selected</div>
                                                )}
                                                <input
                                                    type="file"
                                                    name="bannerImage"
                                                    className="form-control"
                                                    accept=".jpg,.jpeg,.png,.webp"
                                                    onChange={uploadThumbImage}
                                                />
                                                {formData.eventSponsered == 1 ? <p>Image size should be 1920 x 1080</p> : null}
                                                {formData.eventSponsered == 2 ? <p>Image size should be 480 x 580</p> : null}
                                                {formData.eventSponsered == 3 ? <p>Image size should be 270 x 180</p> : null}
                                            </div>
                                        ) : null}
                                        {formSubmitted && formData.eventSponsered > 0 && (
                                            <span style={{ color: 'red' }}>Please add banner image</span>
                                        )}
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
                </div>
            </div>
            <Footer />
        </>
    )
}

export default AddAnnouncement
