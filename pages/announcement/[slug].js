import React from "react";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import PageHeader from "@/Component/PageHeader";
import Fancybox from "@/Component/Fancybox";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Swal from "sweetalert2";
import Head from "next/head";
import secureLocalStorage from "react-secure-storage";
import { CommonVariables } from "@/Component/CommonVariable";
import { useEffect, useState, useRef } from "react";
import { Country, State, City } from "country-state-city";
import { useRouter } from "next/router";
import Loading from "@/Component/Loading";

const AnnouncementDetails = (props) => {
  // console.log("props", props.detail);

  /////////////////Userdata/////////////////////
  var userdata_res;
  let token;
  if (typeof window !== "undefined") {
    const userdata = secureLocalStorage.getItem("userdata");
    userdata_res = userdata ? JSON.parse(userdata) : {};
    // console.log(userdata_res);
    token = userdata_res.token;
  }
  //////////////////////////////////////////////////////
  const router = useRouter();
  const [isActive, setIsActive] = useState(false);
  const closeButtonRef = useRef(null);

  const handleClick = () => {
    const userdata = secureLocalStorage.getItem("userdata");
    const userdata_res = userdata ? JSON.parse(userdata) : {};
    const token = userdata_res.token;

    if (!token) {
      router.push("/login");
    } else {
      setIsActive(true);
      const modal = new window.bootstrap.Modal(
        document.getElementById("applynow")
      );
      modal.show();
    }
  };

  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState("");
  const [countryid, setCountryid] = useState(0);
  const [stateid, setStateid] = useState(0);
  const [cityid, setCityid] = useState(0);
  const [countries, setCountries] = useState(Country.getAllCountries());
  const [states, setStates] = useState([]);
  const [cities, setCities] = useState([]);
  useEffect(() => {
    const getData = async (e) => {
      setStates(State.getStatesOfCountry(countryid));
    };
    getData();
  }, [countryid]);

  useEffect(() => {
    const getData = async (e) => {
      setCities(City.getCitiesOfState(countryid, stateid));
    };
    getData();
  }, [stateid, countryid]);

  const [formData, setFormData] = useState({
    announcementname: "",
    contactperson: "",
    contactnumber: "",
    email: "",
    country: "",
    state: "",
    city: "",
  });

  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState("");
  const [selectedState, setSelectedState] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    console.log("data", name, value);
    if (value == "0") {
      router.push("/add-organisation");
      closeButtonRef.current.click();
    }
    if (name === "location") {
      setLocation(value);
      setCountryid("");
      setStateid("");
      setCityid("");
    } else {
      setFormData({ ...formData, [name]: value });
      if (name === "countryid") {
        let selectedIndex = e.target.selectedIndex;
        let selectedCountry = e.target.options[selectedIndex].innerHTML;
        // console.log("country", selectedCountry);
        setSelectedCountry(selectedCountry); // Update selectedCountry state
      } else if (name === "stateid") {
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
    const nameRegex = /^[A-Za-z\s]+$/;
    // Phone validation regex
    // const phoneRegex = /\+?\d{10}|\d{3}-\d{3}-\d{4}/;
    // Basic validation
    if (
      formData.contactperson === "" ||
      formData.contactnumber === "" ||
      formData.email === "" ||
      countryid === ""
    ) {
      Swal.fire("Error", "Please fill in all fields", "error");
      setSubmitting(false);
      return;
    }
    if (!nameRegex.test(formData.contactperson)) {
      Swal.fire("Error", "Please enter a valid name", "error");
      setSubmitting(false);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      Swal.fire("Error", "Please enter a valid email address", "error");
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

    const locationType = document.getElementById("locationType").value;
    const fbody = new FormData();
    fbody.append("name", props.detail.name);
    if (locationType === "state") {
      fbody.append("sponsering_for", 2);
    } else if (locationType === "city") {
      fbody.append("sponsering_for", 3);
    }
    fbody.append("sponsered_id", props.detail.id),
      fbody.append("org_id", formData.orgtype),
      fbody.append("contact_person", formData.contactperson),
      fbody.append("phone", formData.contactnumber),
      fbody.append("email", formData.email),
      fbody.append("country", selectedCountry),
      fbody.append("state", selectedState),
      fbody.append("city", cityid);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url:
        CommonVariables.API_URL + "event/create?event_type=1&event_subtype=2",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: fbody,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status === "success") {
          Swal.fire("", response.data.message, response.data.status);
          setFormData({
            contactperson: "",
            contactnumber: "",
            email: "",
            country: "",
            state: "",
            city: "",
          });
          router.push(`/announcement/${props.detail.slug}`);
          setIsActive(false);
          const modalElement = document.getElementById("applynow");
          const modal =
            bootstrap.Modal.getInstance(modalElement) ||
            new bootstrap.Modal(modalElement);
          modal.hide();
        } else {
          setSubmitting(false);
          Swal.fire("", response.data.message, response.data.status);
        }
      })
      .catch((error) => {
        setSubmitting(false);
        if (error.message === "Request failed with status code 401") {
          secureLocalStorage.removeItem("userdata");
          router.push("/login");
        }
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const [lists, setLists] = useState([]);
  // Organisation list API
  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        if (!token || !userdata_res || !userdata_res.id) {
          router.push("/login");
          return;
        }
        const response = await axios.get(
          CommonVariables.API_URL +
            `promotor_organization/list?user_id=${userdata_res.id}&cstatus=1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status_code === 1) {
          setLists(response.data.data || []);
        }
      } catch (error) {
        console.error("Error fetching organisations:", error);
      }
    };

    if (token && userdata_res && userdata_res.id) {
      fetchOrgList();
    }
  }, [router, token]);

  // console.log("orgList", lists);

  if (!props.detail) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>{props?.detail?.name}</title>
      </Head>
      <Header />
      <PageHeader title={props?.detail?.name} />
      <div
        className="meeta-event-single section-padding"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          <div className="meeta-event-single-wrap">
            <div className="row mb-lg-5">
              <div className="col-lg-8">
                <div className="event-single-content">
                  <div className="meeta-video-section-2">
                    <Image
                      src={props?.detail?.featured_image}
                      width={800}
                      height={500}
                      alt=""
                    />
                  </div>
                  <p
                    dangerouslySetInnerHTML={{
                      __html: props?.detail?.short_description,
                    }}
                  ></p>

                  {/* <div className="event-single-item">
                    <h3 className="title">Event Speakers</h3>
                    <div className="speakers-content-wrap">
                      <div className="row">
                        <div className="col-md-4 col-sm-6">
                          <div className="single-speker-3">
                            <div className="speker-img">
                              <a href="#">
                                <Image
                                  src="/assets/images/speaker/speaker-7.jpg"
                                  height={325}
                                  width={263}
                                  alt=""
                                />
                              </a>
                              <div className="speker-content text-center">
                                <h3 className="name">Mike Fermalin</h3>
                                <span className="designation">
                                  Lead Speaker
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="single-speker-3">
                            <div className="speker-img">
                              <a href="#">
                                <Image
                                  src="/assets/images/speaker/speaker-8.jpg"
                                  height={325}
                                  width={263}
                                  alt=""
                                />
                              </a>
                              <div className="speker-content text-center">
                                <h3 className="name">Megan Fox</h3>
                                <span className="designation">
                                  Graphic Designer
                                </span>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="col-md-4 col-sm-6">
                          <div className="single-speker-3">
                            <div className="speker-img">
                              <a href="#">
                                <Image
                                  src="/assets/images/speaker/speaker-9.jpg"
                                  height={325}
                                  width={263}
                                  alt=""
                                />
                              </a>
                              <div className="speker-content text-center">
                                <h3 className="name">Joakim Ken</h3>
                                <span className="designation">Developer</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  {/* <div className="event-single-item">
                    <h3 className="title">Event Sponsor</h3>
                    <div className="meeta-event-sponsors-3">
                      <div className="meeta-sponsor-wrap">
                        <div className="row">
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/logo-sm-1.png"
                                  height={48}
                                  width={135}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/logo-sm-2.png"
                                  height={44}
                                  width={134}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/logo-sm-3.png"
                                  height={43}
                                  width={132}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/logo-sm-4.png"
                                  height={44}
                                  width={134}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/logo-sm-5.png"
                                  height={43}
                                  width={134}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/logo-sm-6.png"
                                  height={28}
                                  width={134}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/logo-sm-7.png"
                                  height={37}
                                  width={134}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                          <div className="col-lg-3 col-sm-6">
                            <div className="meeta-sponsor-logo">
                              <a href="#">
                                <Image
                                  src="/assets/images/brand-logo-1.png"
                                  height={59}
                                  width={87}
                                  alt=""
                                />
                              </a>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                </div>
              </div>

              <div className="col-lg-4">
                <div className="event-single-sidebar">
                  {/* <div className="btn-price">
                    <div className="price">
                      <span>
                        {props?.detail?.ticket_price
                          ? `$${props?.detail?.ticket_price}`
                          : "Free"}
                      </span>
                    </div>
                  </div> */}
                  <div className="sidebar-item">
                    <div className="event-details mt-0">
                      <h3 className="sidebar-title">Contact Detail</h3>
                      <ul>
                        <li>
                          <h5 className="title">Contact Name:</h5>
                          <p>{props?.detail?.contact_person}</p>
                        </li>
                        {props?.detail?.contact_number ? (
                          <li>
                            <p className="title">Contact Number:</p>
                            <p>{props?.detail?.contact_number}</p>
                          </li>
                        ) : null}
                        <li>
                          <p className="title">Contact Email:</p>
                          <p>{props?.detail?.email}</p>
                        </li>
                        <li>
                          <p className="title">Contact Address:</p>
                          <p>
                            {" "}
                            {props?.detail?.city
                              ? `${props?.detail?.city}, `
                              : ""}{" "}
                            {props?.detail?.state_province
                              ? `${props?.detail?.state_province}, `
                              : ""}
                            {props?.detail?.country
                              ? `${props?.detail?.country}`
                              : ""}
                          </p>
                        </li>
                        {props?.detail?.website ||
                        props?.detail?.facebook ||
                        props?.detail?.instagram ||
                        props?.detail?.x ||
                        props?.detail?.snapchat ||
                        props?.detail?.youtube ||
                        props?.detail?.tiktok ? (
                          <li>
                            <p className="title">Social Accounts:</p>
                          </li>
                        ) : null}
                        <div className="right_bar footer-widget-social">
                          {props?.detail?.website ? (
                            <Link href={props?.detail?.website} target="_blank">
                              <i className="fa fa-globe"></i>
                            </Link>
                          ) : null}
                          {props?.detail?.facebook ? (
                            <Link
                              href={props?.detail?.facebook}
                              target="_blank"
                            >
                              <i className="fab fa-facebook-f"></i>
                            </Link>
                          ) : null}
                          {props?.detail?.instagram ? (
                            <Link
                              href={props?.detail?.instagram}
                              target="_blank"
                            >
                              <i className="fab fa-instagram"></i>
                            </Link>
                          ) : null}
                          {props?.detail?.x ? (
                            <Link href={props?.detail?.x} target="_blank">
                              <i className="fab fa-x-twitter">𝕏</i>
                            </Link>
                          ) : null}
                          {props?.detail?.snapchat ? (
                            <Link
                              href={props?.detail?.snapchat}
                              target="_blank"
                            >
                              <i className="fab fa-snapchat"></i>
                            </Link>
                          ) : null}
                          {props?.detail?.youtube ? (
                            <Link href={props?.detail?.youtube} target="_blank">
                              <i className="fab fa-youtube"></i>
                            </Link>
                          ) : null}
                          {props?.detail?.tiktok ? (
                            <Link href={props?.detail?.tiktok} target="_blank">
                              <i className="fab fa-tiktok"></i>
                            </Link>
                          ) : null}
                        </div>
                      </ul>
                    </div>
                  </div>
                  <br />
                  <br />
                  <div className="meeta-pricing meeta-pricing-2 meeta-pricing-4 meeta-pricing-5 mt-2">
                    <div className="sidebar-item mb-2">
                      <h3 className="title">Become an Organizer?</h3>
                    </div>
                  </div>
                  {/* data-bs-toggle="modal" data-bs-target="#applynow" */}
                  {userdata_res ? (
                    <button className="btn-2 mt-2" onClick={handleClick}>
                      Apply Now
                    </button>
                  ) : (
                    <Link className="btn-2 mt-2" href="/login">
                      Apply Now
                    </Link>
                  )}
                  <div className="sidebar-item">
                    <div className="event-map">
                      <h3 className="sidebar-title">Location Map</h3>
                      <div className="google-map">
                        <iframe
                          id="gmap_canvas"
                          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${props?.detail?.organization[0].street_address}`}
                        ></iframe>
                      </div>
                    </div>
                  </div>
                  <div
                    className={`modal fade ${isActive ? "show" : ""}`}
                    id="applynow"
                    tabIndex="-1"
                    aria-labelledby="exampleModalLabel"
                    aria-hidden="true"
                    data-bs-backdrop="static"
                    data-bs-keyboard="false"
                  >
                    <div className="modal-dialog">
                      <div className="modal-content">
                        <div className="modal-header">
                          <h5 className="modal-title" id="exampleModalLabel">
                            Apply for National Promoter
                          </h5>
                          <button
                            ref={closeButtonRef}
                            type="button"
                            className="btn-close"
                            data-bs-dismiss="modal"
                            aria-label="Close"
                          ></button>
                        </div>
                        <form onSubmit={handleSubmit}>
                          <div className="modal-body">
                            <div className="single-form mt-3">
                              <label>
                                Select Organisation
                                <span className="text-danger">*</span>
                              </label>
                              <select
                                className="form-control"
                                name="orgtype"
                                type="text"
                                value={formData.orgtype}
                                onChange={handleChange}
                              >
                                <option value="" hidden>
                                  Select Organisation Name
                                </option>
                                <option value="0">Create Organisation</option>
                                {lists.map((org) => (
                                  <option key={org.id} value={org.id}>
                                    {org.organization_name}
                                  </option>
                                ))}
                              </select>
                              {formSubmitted && formData.orgtype === "" && (
                                <span style={{ color: "red" }}>
                                  Please enter organisation type
                                </span>
                              )}
                            </div>
                            <div className="single-form mt-3">
                              <label>
                                Contact Person Name
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                name="contactperson"
                                type="name"
                                className="form-control"
                                placeholder="Enter your name"
                                value={formData.contactperson}
                                onChange={handleChange}
                              />
                              {formSubmitted &&
                                formData.contactperson === "" && (
                                  <span style={{ color: "red" }}>
                                    Please enter your name
                                  </span>
                                )}
                            </div>
                            <div className="single-form mt-3">
                              <label>
                                Contact number
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                name="contactnumber"
                                type="text"
                                className="form-control"
                                placeholder="Enter your contact number"
                                value={formData.contactnumber}
                                onChange={handleChange}
                              />
                              {formSubmitted &&
                                formData.contactnumber === "" && (
                                  <span style={{ color: "red" }}>
                                    Please enter contact number
                                  </span>
                                )}
                            </div>
                            <div className="single-form mt-3">
                              <label>
                                Contact Email
                                <span className="text-danger">*</span>
                              </label>
                              <input
                                name="email"
                                type="text"
                                className="form-control"
                                placeholder="Enter your email"
                                value={formData.email}
                                onChange={handleChange}
                              />
                              {formSubmitted && formData.email === "" && (
                                <span style={{ color: "red" }}>
                                  {" "}
                                  Please enter email
                                </span>
                              )}
                            </div>
                            <div className="single-form mt-3">
                              <label>
                                Applying For?
                                <span className="text-danger">*</span>
                              </label>
                              <div className="mb-3">
                                <select
                                  className="form-control"
                                  name="location"
                                  id="locationType"
                                  value={location}
                                  onChange={handleChange}
                                >
                                  <option value="" hidden>
                                    Please select a Level
                                  </option>
                                  {/* <option>Country</option> */}
                                  <option value="state">State</option>
                                  <option value="city">City</option>
                                </select>
                                {formSubmitted && !location && (
                                  <span style={{ color: "red" }}>
                                    Please select a level
                                  </span>
                                )}
                              </div>
                              {/* {location === "country" && (
                                <div className="row mb-3 mt-3">
                                  <div className="single-form">
                                    <label>
                                      Country
                                      <span className="text-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control countries"
                                      id="countryId"
                                      name="countryid"
                                      value={countryid}
                                      onChange={(e) => {
                                        setCountryid(e.target.value),
                                          handleChange(e);
                                      }}
                                      placeholder="Select Country"
                                    >
                                      <option defaultValue hidden>
                                        Please select country
                                      </option>
                                      {countries.map((result) => {
                                        return (
                                          <option
                                            key={result.isoCode}
                                            value={result.isoCode}
                                          >
                                            {result.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {formSubmitted && !countryid && (
                                      <span style={{ color: "red" }}>
                                        Please select a country
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )} */}
                              {location === "state" && (
                                <div className="row mb-3 mt-3">
                                  <div className="single-form">
                                    <label>
                                      Country
                                      <span className="text-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control countries"
                                      id="countryId"
                                      name="countryid"
                                      value={countryid}
                                      onChange={(e) => {
                                        setCountryid(e.target.value),
                                          handleChange(e);
                                      }}
                                      placeholder="Select Country"
                                    >
                                      <option defaultValue hidden>
                                        Please select country
                                      </option>
                                      {countries.map((result) => {
                                        return (
                                          <option
                                            key={result.isoCode}
                                            value={result.isoCode}
                                          >
                                            {result.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {formSubmitted && !countryid && (
                                      <span style={{ color: "red" }}>
                                        Please select a country
                                      </span>
                                    )}
                                  </div>
                                  <div className="single-form mt-3">
                                    <label>
                                      State
                                      <span className="text-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control states"
                                      id="stateId"
                                      name="stateid"
                                      value={stateid}
                                      onChange={(event) => {
                                        setStateid(event.target.value),
                                          handleChange(event);
                                      }}
                                      placeholder=""
                                    >
                                      <option>
                                        {!countryid
                                          ? "Please select country first"
                                          : "Please select state"}
                                      </option>
                                      {states.map((result) => {
                                        return (
                                          <option
                                            key={result.isoCode}
                                            value={result.isoCode}
                                          >
                                            {result.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {formSubmitted && !stateid && (
                                      <span style={{ color: "red" }}>
                                        Please select a state
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                              {location === "city" && (
                                <div className="row mb-3 mt-3">
                                  <div className="single-form">
                                    <label>
                                      Country
                                      <span className="text-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control countries"
                                      id="countryId"
                                      name="countryid"
                                      value={countryid}
                                      onChange={(e) => {
                                        setCountryid(e.target.value),
                                          handleChange(e);
                                      }}
                                      placeholder="Select Country"
                                    >
                                      <option defaultValue hidden>
                                        Please select country
                                      </option>
                                      {countries.map((result) => {
                                        return (
                                          <option
                                            key={result.isoCode}
                                            value={result.isoCode}
                                          >
                                            {result.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {formSubmitted && !countryid && (
                                      <span style={{ color: "red" }}>
                                        Please select a country
                                      </span>
                                    )}
                                  </div>
                                  <div className="single-form mt-3">
                                    <label>
                                      State
                                      <span className="text-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control states"
                                      id="stateId"
                                      name="stateid"
                                      value={stateid}
                                      onChange={(event) => {
                                        setStateid(event.target.value),
                                          handleChange(event);
                                      }}
                                      placeholder=""
                                    >
                                      <option>
                                        {" "}
                                        {!countryid
                                          ? "Please select country first"
                                          : "Please select state"}
                                      </option>
                                      {states.map((result) => {
                                        return (
                                          <option
                                            key={result.isoCode}
                                            value={result.isoCode}
                                          >
                                            {result.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {formSubmitted && !stateid && (
                                      <span style={{ color: "red" }}>
                                        Please select a state
                                      </span>
                                    )}
                                  </div>
                                  <div className="single-form mt-3">
                                    <label>
                                      City<span className="text-danger">*</span>
                                    </label>
                                    <select
                                      className="form-control cities"
                                      id="cityId"
                                      name="cityid"
                                      value={cityid}
                                      onChange={(event) => {
                                        setCityid(event.target.value),
                                          handleChange(event);
                                      }}
                                    >
                                      <option>
                                        {" "}
                                        {!stateid
                                          ? "Please select State first"
                                          : "Please select city"}
                                      </option>
                                      {cities.map((result) => {
                                        return (
                                          <option key={result.name}>
                                            {result.name}
                                          </option>
                                        );
                                      })}
                                    </select>
                                    {formSubmitted && !cityid && (
                                      <span style={{ color: "red" }}>
                                        Please select a city
                                      </span>
                                    )}
                                  </div>
                                </div>
                              )}
                            </div>
                          </div>
                          <div className="modal-footer">
                            <button
                              type="button"
                              className="btn btn-secondary"
                              data-bs-dismiss="modal"
                            >
                              Close
                            </button>
                            <button
                              type="submit"
                              className="btn-2"
                              disabled={submitting}
                            >
                              {submitting ? "Loading..." : "Submit"}
                            </button>
                          </div>
                        </form>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          {props?.detail?.image_gallery &&
            props.detail.image_gallery.length > 0 && (
              <div className="container">
                <div className="meeta-section-title text-center">
                  <h4 className="sub-title">Photo Gallery</h4>
                  <h2 className="main-title">Have A Look On</h2>
                </div>
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: false,
                    },
                  }}
                >
                  <div className="row g-0">
                    {props.detail.image_gallery.map((imageUrl, index) => (
                      <div key={index} className="col-lg-4 col-sm-6">
                        <div className="single-gallery">
                          <div className="gallery-image">
                            <Image
                              src={imageUrl}
                              height={250}
                              width={380}
                              alt="Gallery"
                            />
                          </div>
                          <div className="gallery-content">
                            <div className="gallery-content-wrap">
                              <a
                                data-fancybox="gallery"
                                href={imageUrl}
                                className="gallery-plus "
                              >
                                <span></span>
                              </a>
                              <h4 className="gallery-title">
                                <a href="#">{props.detail.name}</a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Fancybox>
              </div>
            )}

          {props?.detail?.image_gallery &&
            props.detail.video_gallery.length > 0 && (
              <div className="container mt-5">
                <div className="meeta-section-title text-center">
                  <h4 className="sub-title">Video Gallery</h4>
                  <h2 className="main-title">Have A Look On</h2>
                </div>
                <Fancybox
                  options={{
                    Carousel: {
                      infinite: false,
                    },
                  }}
                >
                  <div className="row g-0">
                    {props.detail.video_gallery.map((videoUrl, index) => (
                      <div key={index} className="col-lg-4 col-sm-6">
                        <div className="single-gallery">
                          <div className="gallery-image">
                            <video width="380" height="250" controls>
                              <source src={videoUrl} type="video/mp4" />
                              Your browser does not support the video tag.
                            </video>
                            {/* <iframe
                              width="380"
                              height="250"
                              src="https://www.youtube.com/embed/oMA6zgnk13c"
                              title="YouTube video player"
                              frameborder="0"
                              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                              allowfullscreen
                            ></iframe> */}
                          </div>
                          <div className="gallery-content">
                            <div className="gallery-content-wrap">
                              <a
                                data-fancybox="gallery"
                                href={videoUrl}
                                className="gallery-plus "
                              >
                                <span></span>
                              </a>
                              <h4 className="gallery-title">
                                <a href="#">{props.detail.name}</a>
                              </h4>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </Fancybox>
              </div>
            )}
          {/* <div className="container mt-5">
            <div className="meeta-section-title text-center">
              <h4 className="sub-title">Video Gallery</h4>
              <h2 className="main-title">Have A Look On</h2>
            </div>
            <Fancybox
              options={{
                Carousel: {
                  infinite: false,
                },
              }}
            >
              <div className="row g-0">
                <div className="col-lg-4 col-sm-6">
                  <div className="single-gallery">
                    <div className="gallery-image">
                      <Image
                        src="http://i3.ytimg.com/vi/StE8nhHkEMI/hqdefault.jpg"
                        height={250}
                        width={380}
                        alt="Gallery"
                      />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-content-wrap">
                        <a
                          data-fancybox="gallery"
                          href="https://youtu.be/StE8nhHkEMI?si=1VAgYFkVq_Na5BAN"
                          className="gallery-plus "
                        >
                          <span></span>
                        </a>
                        <h4 className="gallery-title">
                          <a href="#">Developer Concert 2024</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="single-gallery">
                    <div className="gallery-image">
                      <Image
                        src="http://i3.ytimg.com/vi/M7ebX_7ay6o/hqdefault.jpg"
                        height={250}
                        width={380}
                        alt=""
                      />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-content-wrap">
                        <a
                          data-fancybox="gallery"
                          href="https://youtu.be/M7ebX_7ay6o?si=5DLnNnl4943hyifq"
                          className="gallery-plus "
                        >
                          <span></span>
                        </a>
                        <h4 className="gallery-title">
                          <a href="#">Developer Concert 2024</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="single-gallery">
                    <div className="gallery-image">
                      <Image
                        src="http://i3.ytimg.com/vi/R-dXS5TI_dQ/hqdefault.jpg"
                        height={250}
                        width={380}
                        alt="Gallery"
                      />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-content-wrap">
                        <a
                          data-fancybox="gallery"
                          href="https://youtu.be/R-dXS5TI_dQ?si=Gqhd7EnNH9tvcnTf"
                          className="gallery-plus "
                        >
                          <span></span>
                        </a>
                        <h4 className="gallery-title">
                          <a href="#">Developer Concert 2024</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="single-gallery">
                    <div className="gallery-image">
                      <Image
                        src="http://i3.ytimg.com/vi/KbWbK2qRe7U/hqdefault.jpg"
                        height={250}
                        width={380}
                        alt="Gallery"
                      />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-content-wrap">
                        <a
                          data-fancybox="gallery"
                          href="https://youtu.be/KbWbK2qRe7U?si=WNR8EuLbRC2QXCUW"
                          className="gallery-plus "
                        >
                          <span></span>
                        </a>
                        <h4 className="gallery-title">
                          <a href="#">Developer Concert 2024</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="single-gallery">
                    <div className="gallery-image">
                      <Image
                        src="http://i3.ytimg.com/vi/6E51wmh9f9g/hqdefault.jpg"
                        height={250}
                        width={380}
                        alt="Gallery"
                      />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-content-wrap">
                        <a
                          data-fancybox="gallery"
                          href="https://youtu.be/6E51wmh9f9g?si=tUB9E4i4l3_jMORt"
                          className="gallery-plus "
                        >
                          <span></span>
                        </a>
                        <h4 className="gallery-title">
                          <a href="#">Developer Concert 2024</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="col-lg-4 col-sm-6">
                  <div className="single-gallery">
                    <div className="gallery-image">
                      <Image
                        src="http://i3.ytimg.com/vi/p0YJLN3nQoM/hqdefault.jpg"
                        height={250}
                        width={380}
                        alt="Gallery"
                      />
                    </div>
                    <div className="gallery-content">
                      <div className="gallery-content-wrap">
                        <a
                          data-fancybox="gallery"
                          href="https://youtu.be/p0YJLN3nQoM?si=ixVZ4X4GU26dXKnC"
                          className="gallery-plus "
                        >
                          <span></span>
                        </a>
                        <h4 className="gallery-title">
                          <a href="#">Developer Concert 2024</a>
                        </h4>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Fancybox>
          </div> */}
        </div>
      </div>
      <Footer />
    </>
  );
};

export async function getStaticProps({ params }) {
  const { slug } = params || {};
  let detail = [];

  try {
    const res = await axios.get(
      `${CommonVariables.API_URL}event/front_detail?slug=${slug}&event_type=1&organization=1&organization=1&image_gallery=1&video_gallery=1}}`
    );
    if (res.data.status_code === 1) {
      detail = res.data;
    } else {
      return {
        notFound: true,
      };
    }
  } catch (error) {
    console.error("Error fetching data", error);
    return {
      notFound: true,
    };
  }

  return {
    props: {
      detail: detail.data ?? [],
      slug: slug ?? [],
    },
    revalidate: 10,
  };
}

export async function getStaticPaths() {
  return {
    paths: [],
    fallback: true,
  };
}

export default AnnouncementDetails;
