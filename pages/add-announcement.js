import React, { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/router";
import Link from "next/link";
import Swal from "sweetalert2";
import Image from "next/image";
import Head from "next/head";
import secureLocalStorage from "react-secure-storage";
import { CommonVariables } from "@/Component/CommonVariable";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import PageHeader from "@/Component/PageHeader";
import Loading from "@/Component/Loading";
import { Editor } from "@tinymce/tinymce-react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";


const AddAnnouncement = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userdata_res, setUserdataRes] = useState({});
  const [token, setToken] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [role, setRole] = useState(null);
  const [userdata, setUserdata] = useState({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  // useEffect(() => {
  //   const fetchUserData = async () => {
  //     try {
  //       // Fetch data from the API
  //       const response = await axios.get("https://tester.shortlinker.in/api/user/detail");

  //       // Check if the response is successful
  //       if (response.data.status_code === 1) {
  //         const userData = response.data.data;
  //         console.log("User Data from API: ", userData);

  //         // Save the user data to localStorage
  //         localStorage.setItem("userdata", JSON.stringify(userData));

  //         // Set the role and other user data to state
  //         setUserdata(userData);
  //         setRole(userData.user_type_label);
  //       } else {
  //         // If the user is not found, redirect to another page
  //         router.push("/my-account");
  //       }
  //     } catch (error) {
  //       console.error("Error fetching user data:", error);
  //       router.push("/my-account"); // Redirect on error
  //     }
  //   };

  //   // Call the fetch function
  //   fetchUserData();
  // }, [router]);

  // useEffect(() => {
  //   if (role && role !== "Promotors" && !isRedirecting) {  // Adjust this condition based on actual role
  //     Swal.fire({
  //       icon: "error",
  //       title: "Permission Denied",
  //       text: "You do not have permission to access this page.",
  //     }).then(() => {
  //       setIsRedirecting(true);
  //       router.push("/"); // Redirect after closing the alert
  //     });
  //   }
  // }, [role, router, isRedirecting]);

  // // If role is not set or not a "Promotors", prevent rendering of the page content
  // if (role === null || (role !== "Promotors" && !isRedirecting)) { // Adjust this condition based on actual role
  //   return null; // Return nothing while waiting for the role to be checked or while redirecting
  // }
  const [imageSrc, setImageSrc] = useState({
    bannerImage: "",
    featuredImage: "",
  });

  const [createURL, setCreateURL] = useState({
    bannerImage: "/",
    featuredImage: "/",
  });

  const [formData, setFormData] = useState({
    event_tour_name: "", // Event tour name
    event_location: "",  // Event location
    starting_date: "",   // Starting date of the event
    end_date: "",        // End date of the event
    event_type: "",      // Type of the event
    event_theme: "",     // Theme of the event
    about_event: "",     // Additional details about the event
    artists: [           // Artists array with initial empty object
      {
        artist_name: "",
        artist_occupation: "",
        artist_image: null
      }
    ],
    verifications: [     // Verifications array with initial empty object
      {
        agreement_image: null,
        agreement_video: null,
        agreement_audio: null,
      }
    ],
  });


  useEffect(() => {
    const checkUserToken = async () => {
      if (typeof window !== "undefined") {
        const userdata = secureLocalStorage.getItem("userdata");
        const parsedUserdata = userdata ? JSON.parse(userdata) : {};
        setUserdataRes(parsedUserdata);
        setToken(parsedUserdata.token);

        if (!parsedUserdata.token) {
          router.push("/login");
        }

        setLoading(false);
      }
    };

    checkUserToken();
  }, [router]);

  const handleChange = (e) => {
    const { name, value } = e.target || e;
    setFormData({ ...formData, [name]: value });
  };

  const handleEditorChange = (content) => {
    setFormData({ ...formData, about_event: content });
  };

  const uploadThumbImage = (event) => {
    const { name, files } = event.target;
    if (files && files[0]) {
      const file = files[0];
      setImageSrc((prevImageSrc) => ({
        ...prevImageSrc,
        [name]: file,
      }));
      setCreateURL((prevCreateURL) => ({
        ...prevCreateURL,
        [name]: URL.createObjectURL(file),
      }));
    }
  };

  const handleVerificationChange = (index, key, value) => {
    const updatedVerifications = [...formData.verifications];
    updatedVerifications[index][key] = value;
    setFormData({ ...formData, verifications: updatedVerifications });
  };

  const handleArtistChange = (index, field, value) => {
    const updatedArtists = [...formData.artists];
    updatedArtists[index][field] = value;
    setFormData({ ...formData, artists: updatedArtists });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormSubmitted(true);

    // Validate form fields
    if (
      formData.event_tour_name === "" ||
      formData.event_location === "" ||
      formData.starting_date === "" ||
      formData.end_date === "" ||
      formData.event_type === "" ||
      formData.event_theme === "" ||
      formData.about_event === ""
    ) {
      Swal.fire("Error", "Please fill in all fields", "error");
      setSubmitting(false);
      return;
    }

    const formDataBody = new FormData();

    // Append user and event details
    formDataBody.append("user_id", userdata_res.id);
    formDataBody.append("event_tour_name", formData.event_tour_name);
    formDataBody.append("event_location", formData.event_location);
    formDataBody.append("starting_date", formData.starting_date);
    formDataBody.append("end_date", formData.end_date);
    formDataBody.append("event_type", formData.event_type);
    formDataBody.append("event_theme", formData.event_theme);
    formDataBody.append("about_event", formData.about_event);

    // Append bulk images
    if (imageSrc.bannerImage) {
      formDataBody.append("upload_bulk_agreement_image[]", imageSrc.bannerImage);
    }
    if (imageSrc.featuredImage) {
      formDataBody.append("upload_bulk_social_media_image[]", imageSrc.featuredImage);
    }

    // Append artists
    formData.artists.forEach((artist, index) => {
      formDataBody.append(`artist_name[]`, artist.artist_name);
      formDataBody.append(`artist_occupation[]`, artist.artist_occupation);
      if (artist.artist_image) {
        formDataBody.append(`artist_image[]`, artist.artist_image);
      }
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: CommonVariables.API_URL + "annocement_api/create",
      headers: {
        Accept: "application/json",
        "Content-Type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
      data: formDataBody,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status === "success") {
          Swal.fire("", response.data.message, response.data.status);
          setFormData({
            event_tour_name: "",
            event_location: "",
            starting_date: "",
            end_date: "",
            event_type: "",
            event_theme: "",
            about_event: "",
          });
          router.push("/my-account");
        } else {
          Swal.fire("", response.data.message, response.data.status);
          setSubmitting(false);
        }
      })
      .catch((error) => {
        if (error.message === "Request failed with status code 401") {
          secureLocalStorage.removeItem("userdata");
          router.push("/login");
        }
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>Create Announcement</title>
      </Head>
      <Header />
      <PageHeader title={"Add Announcement"} />
      <div className="section login-register-section section-padding d-flex align-items-center justify-content-center">
        <div className="container">
          <div className="login-register-wrap centered-form">
            <form onSubmit={handleSubmit} className="custom-form-container">
              <div className="row">
                <div className="col-md-12">
                  <div className="custom-box p-3">
                    <div className="row g-3">
                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">
                          Tour Name<span className="text-danger">*</span>
                        </label>
                        <select
                          name="event_tour_name"
                          className="form-control"
                          value={formData.event_tour_name}
                          onChange={handleChange}
                          required
                        >
                          <option value="">Select tour type</option>
                          <option value="Concert Tours">Concert Tours</option>
                          <option value="Promotional Tours">Promotional Tours</option>
                          <option value="Residency Tours">Residency Tours</option>
                          <option value="Regional or National Tours">
                            Regional or National Tours
                          </option>
                          <option value="World Tours">World Tours</option>
                          <option value="Acoustic/ Unplugged Tours">
                            Acoustic/ Unplugged Tours
                          </option>
                          <option value="Themed or Conceptual Tours">
                            Themed or Conceptual Tours
                          </option>
                          <option value="Collaboration/ Co-Headlining Tours">
                            Collaboration/ Co-Headlining Tours
                          </option>
                          <option value="Benefit or Charity Tours">
                            Benefit or Charity Tours
                          </option>
                          <option value="Farewell or Reunion Tours">
                            Farewell or Reunion Tours
                          </option>
                        </select>
                        {formSubmitted && !formData.event_tour_name && (
                          <span style={{ color: "red" }}>
                            Please select a tour type.
                          </span>
                        )}
                      </div>

                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">
                          Event Area<span className="text-danger">*</span>
                        </label>
                        <select
                          name="event_area"
                          className="form-control"
                          value={formData.event_area}
                          onChange={handleChange}
                        >
                          <option value="">Select event area</option>
                          <option value="National">National</option>
                          <option value="International">International</option>
                        </select>
                        {formSubmitted && formData.event_area === "" && (
                          <span style={{ color: "red" }}>Please select an event area</span>
                        )}
                      </div>
                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">
                          Starting Date<span className="text-danger">*</span>
                        </label>
                        <DatePicker
                          selected={formData.starting_date ? new Date(formData.starting_date) : null}
                          onChange={(date) =>
                            setFormData({ ...formData, starting_date: date.toISOString().split("T")[0] })
                          }
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                          placeholderText="Select starting date"
                        />
                        {formSubmitted && formData.starting_date === "" && (
                          <span style={{ color: "red" }}>Please select starting date</span>
                        )}
                      </div>

                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">
                          End Date<span className="text-danger">*</span>
                        </label>
                        <DatePicker
                          selected={formData.end_date ? new Date(formData.end_date) : null}
                          onChange={(date) =>
                            setFormData({ ...formData, end_date: date.toISOString().split("T")[0] })
                          }
                          dateFormat="yyyy-MM-dd"
                          className="form-control"
                          placeholderText="Select end date"
                        />
                        {formSubmitted && formData.end_date === "" && (
                          <span style={{ color: "red" }}>Please select end date</span>
                        )}
                      </div>

                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">
                          Event Theme<span className="text-danger">*</span>
                        </label>
                        <input
                          name="event_theme"
                          type="text"
                          className="form-control"
                          placeholder="Enter event theme"
                          value={formData.event_theme}
                          onChange={handleChange}
                        />
                        {formSubmitted && formData.event_theme === "" && (
                          <span style={{ color: "red" }}>
                            Please enter event theme
                          </span>
                        )}
                      </div>
                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">
                          Event Type<span className="text-danger">*</span>
                        </label>
                        <select
                          name="event_type"
                          className="form-control"
                          value={formData.event_type}
                          onChange={handleChange}
                        >
                          <option value="">Select event type</option>
                          <option value="Corporate Events">Corporate Events</option>
                          <option value="Social Events">Social Events</option>
                          <option value="Cultural and Community Events">
                            Cultural and Community Events
                          </option>
                          <option value="Entertainment Events">Entertainment Events</option>
                          <option value="Sports Events">Sports Events</option>
                          <option value="Educational Events">Educational Events</option>
                          <option value="Charity and Fundraising Events">
                            Charity and Fundraising Events
                          </option>
                          <option value="Business and Networking Events">
                            Business and Networking Events
                          </option>
                          <option value="Virtual or Hybrid Events">Virtual or Hybrid Events</option>
                          <option value="Political Events">Political Events</option>
                        </select>
                        {formSubmitted && formData.event_type === "" && (
                          <span style={{ color: "red" }}>Please select an event type</span>
                        )}
                      </div>

                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">Upload Banner Image</label>
                        <input
                          name="bannerImage"
                          type="file"
                          className="form-control"
                          onChange={uploadThumbImage}
                        />
                      </div>
                      <div className="col-md-6 custom-single-form">
                        <label className="text-dark">
                          Upload Featured Image
                        </label>
                        <input
                          name="featuredImage"
                          type="file"
                          className="form-control"
                          onChange={uploadThumbImage}
                        />
                      </div>
                    </div>
                    {/* Verification Details Section */}
                    <div className="col-md-12 custom-single-form mt-3">
                      <h4 className="text-dark">Verification Details</h4>
                    </div>

                    {formData?.verifications?.map((verification, vIndex) => (
                      <div key={vIndex} className="col-md-12">
                        <div className="row g-3 align-items-center">
                          {/* Agreement Image */}
                          <div className="col-md-4">
                            <label className="text-dark">Agreement Image</label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  handleVerificationChange(vIndex, "agreement_image", file);
                                }
                              }}
                            />
                          </div>

                          {/* Agreement Video */}
                          <div className="col-md-4">
                            <label className="text-dark">Agreement Video</label>
                            <input
                              type="file"
                              className="form-control"
                              accept="video/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  handleVerificationChange(vIndex, "agreement_video", file);
                                }
                              }}
                            />
                          </div>

                          {/* Agreement Audio */}
                          <div className="col-md-4">
                            <label className="text-dark">Agreement Audio</label>
                            <input
                              type="file"
                              className="form-control"
                              accept="audio/*"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  handleVerificationChange(vIndex, "agreement_audio", file);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    {/* Artist Section */}
                    <div className="col-md-12 custom-single-form mt-3">
                      <h4 className="text-dark">Artist Details</h4>
                    </div>

                    {formData?.artists?.map((artist, index) => (
                      <div key={index} className="col-md-12">
                        <div className="row g-3 align-items-center">
                          {/* Artist Name */}
                          <div className="col-md-4">
                            <label className="text-dark">Artist Name</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Artist Name"
                              value={artist.artist_name}
                              onChange={(e) =>
                                handleArtistChange(index, "artist_name", e.target.value)
                              }
                            />
                          </div>

                          {/* Artist Occupation */}
                          <div className="col-md-4">
                            <label className="text-dark">Artist Occupation</label>
                            <input
                              type="text"
                              className="form-control"
                              placeholder="Artist Occupation"
                              value={artist.artist_occupation}
                              onChange={(e) =>
                                handleArtistChange(index, "artist_occupation", e.target.value)
                              }
                            />
                          </div>

                          {/* Artist Image */}
                          <div className="col-md-4">
                            <label className="text-dark">Artist Image</label>
                            <input
                              type="file"
                              className="form-control"
                              onChange={(e) => {
                                const file = e.target.files[0];
                                if (file) {
                                  handleArtistChange(index, "artist_image", file);
                                }
                              }}
                            />
                          </div>
                        </div>
                      </div>
                    ))}

                    <div className="text-center mt-4">
                      <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={submitting}
                      >
                        {submitting ? "Submitting..." : "Submit"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div >
      </div >
      <Footer />
    </>
  );
};

export default AddAnnouncement;
