import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Head from "next/head";
import Image from "next/image";
import Swal from "sweetalert2";
import axios from "axios";
import secureLocalStorage from "react-secure-storage";
import { CommonVariables } from "@/Component/CommonVariable";
import { Editor } from "@tinymce/tinymce-react";
import Link from "next/link";
import PageHeader from "@/Component/PageHeader";
import Header from "@/Component/Header";
import Loading from "@/Component/Loading";
import Footer from "@/Component/Footer";
export const showChat = () => {
  const chatWindow = window.open(
    "",
    "ChatWindow",
    "width=1200,height=600,left=200,top=100"
  );

  if (chatWindow) {
    chatWindow.document.write(`
      <html>
        <head>
          <title>Chat</title>
          <style>
            body { margin: 0; padding: 0; overflow: hidden; }
            iframe { width: 100vw; height: 100vh; border: none; }
          </style>
        </head>
        <body>
          <iframe src="http://localhost:2000/"></iframe>
        </body>
      </html>
    `);
    chatWindow.document.close();
  } else {
    alert("Popup blocked! Please allow popups for this site.");
  }
};



const MyAccount = () => {
  
  /////////////////Userdata/////////////////////
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [userdata_res, setUserdataRes] = useState({});
  const [token, setToken] = useState("");
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

        // setLoading(false);
      }
    };

    checkUserToken();
  }, [router]);
  //////////////////////////////////////////////////////

  // var userdata_res
  // if (typeof window !== "undefined") {
  //     const userdata = secureLocalStorage.getItem("userdata");
  //     userdata_res = userdata ? JSON.parse(userdata) : {};
  //     // console.log(userdata_res);

  //     if (!userdata_res.token) {
  //         router.push('/login')
  //         // console.log("Redirecting to login");
  //     }
  // }

  const logoutUser = () => {
    secureLocalStorage.removeItem("userdata");
    secureLocalStorage.removeItem("status");
    router.push("/login");
  };
  // console.log("userdata_res",userdata_res);

  const [userDetail, setUserDetail] = useState([]);
  // User Detail API
  useEffect(() => {
    const fetchUserDetail = async () => {
      try {
        if (!userdata_res.token || !userdata_res || !userdata_res.id) {
          router.push("/login");
          return;
        }

        const response = await axios.get(
          CommonVariables.API_URL + `user/detail?user_id=${userdata_res.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        // console.log("response:", response);

        if (response.data && response.data.status_code === 1) {
          setUserDetail(response.data.data || []);
        } else {
          // console.error("error:", response.data);
        }
      } catch (error) {
        // console.error("Fetch Error:", error);
        if (error.response && error.response.status === 401) {
          router.push("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    if (userdata_res.token && userdata_res && userdata_res.id) {
      fetchUserDetail();
    }
  }, [router, token]);

  // console.log("userDetail", userDetail);

  //Edit Profile Section Details
  const [content, setContent] = useState("");
  const [imageSrc, setImageSrc] = useState("");
  const [createURL, setCreateURL] = useState("/");
  const [initialContent, setInitialContent] = useState("<p></p>");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    contactnumber: "",
    address: "",
    description: "",
    image: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  const fetchMemberDetails = async () => {
    await axios({
      method: "GET",
      url: CommonVariables.API_URL + `user/detail`,
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then(function (response) {
        if (response.data.status_code == 1) {
          // console.log("Response Data:", response.data);
          const userData = response.data.data;
          setCreateURL(userData.image);
          setInitialContent(userData.description);
          setContent(userData.description);
          setFormData({
            name: userData.name,
            email: userData.email,
            contactnumber: userData.contact_no,
            address: userData.address,
          });
        }
      })
      .catch(function (response) {
        // console.log(response);
        if (response.message == "Request failed with status code 401") {
          // Swal.fire("", "Session expired!", "info")
          router.push("/login");
        }
      });
  };

  useEffect(() => {
    if (token) {
      fetchMemberDetails();
    }
  }, [token]);
  // console.log("formdata", formData);

  // Update Profile
  const [submitting, setSubmitting] = useState(false);
  const uploadThumbImage = (event) => {
    if (event.target.files && event.target.files[0]) {
      const i = event.target.files[0];
      setImageSrc(i);
      setCreateURL(URL.createObjectURL(i));
    }
  };
  const handleEditorChange = (content, editor) => {
    // console.log('Content was updated:', content);
    setContent(content);
  };
  const handleChange = (e) => {
    const { name, value } = e.target || e; // If e.target is undefined, fallback to e itself
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormSubmitted(true); // Mark form as submitted
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // const eventnameRegex = /^[A-Za-z\s]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;
    // const phoneRegex = /\+?\d{10}|\d{3}-\d{3}-\d{4}/;
    // if (!eventnameRegex.test(formData.eventname)) {
    //   Swal.fire('Error', 'Please enter a valid name', 'error');
    //   setSubmitting(false);
    //   return;
    // }
    if (formData.name === "" || formData.email === "") {
      Swal.fire("Error", "Please enter details", "error");
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
    //   Swal.fire('Error', 'Please enter a valid phone number', 'error');
    //   setSubmitting(false);
    //   return;
    // }

    const fbody = new FormData();
    const appendValue = (key, value) => {
      if (value !== undefined) {
        fbody.append(key, value !== null ? value : "");
      } else {
        fbody.append(key, "");
      }
    };
    appendValue("name", formData.name);
    appendValue("email", formData.email);
    appendValue("contact_no", formData.contactnumber);
    appendValue("description", content);
    if (imageSrc !== "") {
      appendValue("image", imageSrc);
    }
    appendValue("address", formData.address);

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: CommonVariables.API_URL + "user/update",
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
        } else {
          setSubmitting(false);
          Swal.fire("", response.data.message, response.data.status);
        }
      })
      .catch((error) => {
        setSubmitting(false);
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };

  const [eventList, setEventList] = useState([]);
  // Event list API
  useEffect(() => {
    const fetchEventList = async () => {
      try {
        if (!userdata_res.token || !userdata_res || !userdata_res.id) {
          router.push("/login");
          return;
        }
        const response = await axios.get(
          CommonVariables.API_URL +
            `event/list?event_type=2&user_id=${userdata_res.id}`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status_code === 1) {
          setEventList(response.data.data || []);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/login");
        } else {
          console.error("Error fetching organisations:", error);
        }
      }
    };

    if (userdata_res.token && userdata_res && userdata_res.id) {
      fetchEventList();
    }
  }, [router, token]);

  // // console.log("EventList", eventList);

  const [announcementList, setAnnouncementList] = useState([]);
  // Event list API
  useEffect(() => {
    const fetchAnnouncementList = async () => {
      try {
        if (!userdata_res.token || !userdata_res || !userdata_res.id) {
          router.push("/login");
          return;
        }
        const response = await axios.get(
          CommonVariables.API_URL + `announcement_api/details_by_user/1`,
          {
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (response.data.status_code === 1) {
          setAnnouncementList(response.data.data || []);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/login");
        } else {
          console.error("Error fetching organisations:", error);
        }
      }
    };

    if (userdata_res.token && userdata_res && userdata_res.id) {
      fetchAnnouncementList();
    }
  }, [router, token]);

  // console.log("announcementList", announcementList);

  const [lists, setLists] = useState([]);
  // Organisation list API
  useEffect(() => {
    const fetchOrgList = async () => {
      try {
        if (!userdata_res.token || !userdata_res || !userdata_res.id) {
          router.push("/login");
          return;
        }
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
        if (response.data.status_code === 1) {
          setLists(response.data.data || []);
        }
      } catch (error) {
        if (error.response && error.response.status === 401) {
          router.push("/login");
        } else {
          console.error("Error fetching organisations:", error);
        }
      }
    };

    if (userdata_res.token && userdata_res && userdata_res.id) {
      fetchOrgList();
    }
  }, [router, token]);

  // console.log("orgList", lists);

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
        <title>G plus Events - MyAccount</title>
      </Head>
      <Header />
      <PageHeader title={"My Account"} />
      <div
        className="section login-register-section section-padding"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          <div className="my-account">
            <div className="accordion form-style" id="accordionExample">
              <div className="row">
                <div className="col-lg-4">
                  <div className="box text-box border">
                    <h2 className="accordion-header bg_grey" id="headingOne">
                      <button
                        className="accordion-button"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseOne"
                        aria-expanded="true"
                        aria-controls="collapseOne"
                      >
                        <i className="fa fa-address-card me-2"></i> Personal
                        Information
                      </button>
                    </h2>
                    {/* <h2 className="accordion-header bg_grey" id="headingTwo">
                                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                                <i className="fa fa-ticket-alt me-2"></i> Ticket History
                                            </button>
                                        </h2> */}
                    <h2 className="accordion-header bg_grey" id="headingSix">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseSix"
                        aria-expanded="false"
                        aria-controls="collapseSix"
                      >
                        <i className="fa fa-user me-2"></i> Edit Profile
                      </button>
                    </h2>
                    <h2 className="accordion-header bg_grey" id="headingThree">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseThree"
                        aria-expanded="false"
                        aria-controls="collapseThree"
                      >
                        <i className="fa fa-calendar-alt me-2"></i> Events
                      </button>
                    </h2>
                    <h2 className="accordion-header bg_grey" id="headingFive">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFive"
                        aria-expanded="false"
                        aria-controls="collapseFive"
                      >
                        <i className="fa fa-bullhorn me-2"></i> Announcements
                      </button>
                    </h2>
                    <h2 className="accordion-header bg_grey" id="headingFour">
                      <button
                        className="accordion-button collapsed"
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#collapseFour"
                        aria-expanded="false"
                        aria-controls="collapseFour"
                      >
                        <i className="fa fa-sitemap me-2"></i> Organisations
                      </button>
                      
                    </h2>
                    <h2 className="accordion-header bg_grey chat">
  <button
    className="accordion-button collapsed text-primary"
    // onClick={() => window.open("http://13.49.137.149:2000/", "_blank")}
    onClick={showChat}
    style={{ background: "none", border: "none", cursor: "pointer" }}
  >
    <i className="fa fa-comments me-2"></i> Chat
  </button>
</h2>


                    <h2 className="accordion-header bg_grey logout">
                      <Link
                        className="accordion-button collapsed text-danger"
                        href="#"
                        onClick={() => logoutUser()}
                      >
                        <i className="fa fa-sign-out-alt me-2"></i> Logout
                      </Link>
                    </h2>
                  </div>
                </div>
                <div className="col-lg-8 mt_20 mt-20">
                  <div className="accordion-item">
                    <div
                      id="collapseOne"
                      className="accordion-collapse collapse show"
                      aria-labelledby="headingOne"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body border">
                        <h4 className="mb-4">Personal Information</h4>
                        <p className="text-dark">
                          Name -{" "}
                          <span className="text-dark">{userDetail?.name}</span>
                        </p>
                        <p className="text-dark">
                          Email -{" "}
                          <span className="text-dark">{userDetail?.email}</span>
                        </p>
                        <p className="text-dark">
                          Password -{" "}
                          <span className="text-dark"> ********** </span>
                          <Link href="/change-password">
                            <span style={{ color: "red", cursor: "pointer" }}>
                              {" "}
                              Change Password{" "}
                            </span>
                          </Link>
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div
                      id="collapseSix"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingSix"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body border">
                        <h4 className="mb-4">Edit Personal Information</h4>
                        <div className="login-register-form">
                          <form onSubmit={handleSubmit}>
                            <div className="row">
                              <div className="col-md-8">
                                <div className="single-form mb-4">
                                  <label>Name</label>
                                  <input
                                    name="name"
                                    type="text"
                                    className="form-control"
                                    value={formData.name}
                                    onChange={handleChange}
                                  />
                                  {formSubmitted && formData.name === "" && (
                                    <span style={{ color: "red" }}>
                                      Please enter name
                                    </span>
                                  )}
                                </div>
                                <div className="single-form mb-4">
                                  <label>Email</label>
                                  <input
                                    type="text"
                                    name="email"
                                    className="form-control"
                                    value={formData.email}
                                    onChange={handleChange}
                                  />
                                  {formSubmitted && formData.email === "" && (
                                    <span style={{ color: "red" }}>
                                      Please enter email
                                    </span>
                                  )}
                                </div>
                                <div className="single-form mb-4">
                                  <label>Contact Number</label>
                                  <input
                                    type="text"
                                    name="contactnumber"
                                    className="form-control"
                                    value={formData.contactnumber}
                                    onChange={handleChange}
                                  />
                                </div>
                                <div className="single-form mb-4">
                                  <label>Contact Address</label>
                                  <input
                                    type="text"
                                    name="address"
                                    className="form-control"
                                    value={formData.address}
                                    onChange={handleChange}
                                  />
                                </div>
                              </div>
                              <div className="col-md-4">
                                {" "}
                                <div className="login-register-box">
                                  <label htmlFor="file" className="form-label">
                                    Profile Image
                                  </label>
                                  <hr />
                                  {createURL ? (
                                    <Image
                                      src={createURL}
                                      className="mt-3 mb-4"
                                      alt=""
                                      width={220}
                                      height={220}
                                    />
                                  ) : (
                                    <div className="mt-2">
                                      No image selected
                                    </div>
                                  )}
                                  <input
                                    type="file"
                                    id="file_thumb"
                                    name="file_thumb"
                                    className="form-control"
                                    accept=".jpg,.jpeg,.png,.webp"
                                    onChange={uploadThumbImage}
                                  />
                                </div>
                              </div>
                            </div>
                            <div className="row">
                              <div className="single-form">
                                <label>Bio</label>
                                <Editor
                                  apiKey={
                                    process.env.NEXT_PUBLIC_EDITOR_API_KEY
                                  }
                                  value={formData.description}
                                  placeholder="Add Bio..."
                                  name="description"
                                  onEditorChange={handleEditorChange}
                                  initialValue={initialContent}
                                  init={{
                                    height: 300,
                                    menubar: true,
                                    inline: false,
                                    plugins: [
                                      "advlist",
                                      "autolink",
                                      "lists",
                                      "link",
                                      "image",
                                      "charmap",
                                      "preview",
                                      "anchor",
                                      "searchreplace",
                                      "visualblocks",
                                      "code",
                                      "fullscreen",
                                      "insertdatetime",
                                      "media",
                                      "table",
                                      "code",
                                      "help",
                                      "wordcount",
                                    ],
                                    toolbar:
                                      "undo redo | blocks | " +
                                      "bold italic forecolor | alignleft aligncenter " +
                                      "alignright alignjustify | bullist numlist outdent indent | " +
                                      "removeformat | help",
                                    content_style:
                                      "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }",
                                  }}
                                />
                              </div>
                            </div>
                            <div className="form-btn mt-5 text-end">
                              <button
                                type="submit"
                                className="btn-2"
                                disabled={submitting}
                              >
                                {submitting ? "Loading..." : "Update"}
                              </button>
                            </div>
                          </form>
                        </div>
                      </div>
                    </div>
                  </div>
                  {/* <div className="accordion-item">
                                        <div id="collapseTwo" className="accordion-collapse collapse" aria-labelledby="headingTwo" data-bs-parent="#accordionExample">
                                            <div className="accordion-body border">
                                                <h4 className="mb-4">Ticket History</h4>
                                                <ul className="nav nav-tabs" id="myTab" role="tablist">
                                                    <li className="nav-item me-4" role="presentation">
                                                        <button className="nav-link active" id="All-tab" data-bs-toggle="tab" data-bs-target="#All" type="button" role="tab" aria-controls="All" aria-selected="true">All</button>
                                                    </li>
                                                    <li className="nav-item" role="presentation">
                                                        <button className="nav-link" id="Cancel-tab" data-bs-toggle="tab" data-bs-target="#Cancel" type="button" role="tab" aria-controls="Cancel" aria-selected="false">Cancelled</button>
                                                    </li>
                                                </ul>
                                                <div className="tab-content" id="myTabContent">
                                                    <div className="tab-pane fade show active" id="All" role="tabpanel" aria-labelledby="All-tab">
                                                        <div className="card mt-3">
                                                            <div className="card-header">
                                                                <h6 className="mb-0">Virtual Event with Protected Content and Hidden Livestream</h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <p className="mb-0">Quantity: <span className="text-dark">1</span></p>
                                                                <p className="mb-0">
                                                                    Event Date: <span className="text-dark">2023-07-12</span>
                                                                </p>
                                                                <p className="mb-0">
                                                                    Event Address: <span className="text-dark">Delhi India</span>
                                                                </p>
                                                                <p>
                                                                    Payment: <span className="text-warning">Pending</span>
                                                                </p>
                                                                <div className="mt-3">
                                                                    <button className="btn btn-3 btn-primary">
                                                                        Pay Now $69
                                                                    </button>
                                                                    <button className="btn btn-secondary ms-2" data-bs-toggle="modal" data-bs-target="#viewdetails">
                                                                        View Details
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="tab-pane fade" id="Cancel" role="tabpanel" aria-labelledby="Cancel-tab">
                                                        <div className="card mt-3">
                                                            <div className="card-header">
                                                                <h6 className="mb-0">Virtual Event with Protected Content and Hidden Livestream</h6>
                                                            </div>
                                                            <div className="card-body">
                                                                <p className="mb-0">Quantity: <span className="text-dark">1</span></p>
                                                                <p className="mb-0">
                                                                    Event Date: <span className="text-dark">12 July, 06:00 AM</span>
                                                                </p>
                                                                <p className="mb-0">
                                                                    Event Address: <span className="text-dark">Delhi India</span>
                                                                </p>
                                                                <p>
                                                                    Payment: <span className="text-danger">Cancel</span>
                                                                </p>
                                                                <div className="mt-3">
                                                                    <button className="btn btn-secondary" data-bs-toggle="modal" data-bs-target="#viewdetails">
                                                                        View Details
                                                                    </button>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div> */}
                  <div className="accordion-item">
                    <div
                      id="collapseThree"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingThree"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body border">
                        <div className="row">
                          <div className="col-md-6 align-self-center">
                            <h4>Events</h4>
                          </div>
                          <div className="col-md-6 text-end">
                            <Link
                              className="btn btn-3 btn-primary"
                              href="/add-event"
                            >
                              Add Event
                            </Link>
                          </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
                          {eventList.length > 0 ? (
                            eventList.map((item) => (
                              <div className="card mt-3" key={item.id}>
                                <div className="card-header">
                                  <h6 className="mb-0">
                                    Event Name: {item.name}
                                    {item.cstatus === 1 ? (
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "green",
                                        }}
                                      >
                                        {" "}
                                        (Verified)
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "orange",
                                        }}
                                      >
                                        {" "}
                                        (Pending)
                                      </span>
                                    )}
                                  </h6>
                                </div>
                                <div className="card-body">
                                  <p className="mb-0 text-dark">
                                    Contact Person:{" "}
                                    <span className="text-dark">
                                      {item.contact_person}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Contact Number:{" "}
                                    <span className="text-dark">
                                      {"+" + item.phone}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Email:{" "}
                                    <span className="text-dark">
                                      {item.email}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Event Date:{" "}
                                    <span className="text-dark">
                                      {item.event_date}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Event Time:{" "}
                                    <span className="text-dark">
                                      {item.event_time}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Address:{" "}
                                    <span className="text-dark">
                                      {item.city && `${item.city}, `}
                                      {item.state_province &&
                                        `${item.state_province}, `}{" "}
                                      {item.country}
                                    </span>
                                  </p>
                                  <div className="mt-3">
                                    {item.cstatus === 1 ? (
                                      <Link
                                        className="btn btn-secondary"
                                        href={`/event/${item.slug}`}
                                        style={{ marginRight: "10px" }}
                                      >
                                        View Details
                                      </Link>
                                    ) : null}
                                    <Link
                                      className="btn btn-primary"
                                      href={`https://manage.gplusevents.com/event/${item.slug}`}
                                      target="_blank"
                                    >
                                      Update
                                    </Link>
                                    {/* <Link className="btn btn-primary" href={{
                                                                        pathname: `http://localhost:3001/event/${item.slug}`,
                                                                        query: { data: JSON.stringify(userdata_res) }
                                                                    }} target="_blank">Update</Link> */}
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>You don{"'"}t have any Event</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div
                      id="collapseFive"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFive"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body border">
                        <div className="row">
                          <div className="col-md-6 align-self-center">
                            <h4>Announcements</h4>
                          </div>
                          <div className="col-md-6 text-end">
                            <Link
                              className="btn btn-3 btn-primary"
                              href="/add-announcement"
                            >
                              Add Announcement
                            </Link>
                          </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
                          {announcementList.length > 0 ? (
                            announcementList.map((item) => (
                              <div className="card mt-3" key={item.id}>
                                <div className="card-header">
                                  <h6 className="mb-0 text-dark">
                                    Announcement Name: {item.name}{" "}
                                    {item.cstatus === 1 ? (
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "green",
                                        }}
                                      >
                                        {" "}
                                        (Verified)
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "orange",
                                        }}
                                      >
                                        {" "}
                                        (Pending)
                                      </span>
                                    )}
                                  </h6>
                                </div>
                                <div className="card-body">
                                  <p className="mb-0 text-dark">
                                    Contact Person:{" "}
                                    <span className="text-dark">
                                      {item.contact_person}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Contact Number:{" "}
                                    <span className="text-dark">
                                      {"+" + item.phone}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Email:{" "}
                                    <span className="text-dark">
                                      {item.email}
                                    </span>
                                  </p>
                                  <p className="mb-0 text-dark">
                                    Address:{" "}
                                    <span className="text-dark">
                                      {item.city === null
                                        ? ""
                                        : `${item.city}, `}{" "}
                                      {item.state_province === null
                                        ? ""
                                        : `${item.state_province}, `}{" "}
                                      {item.country}
                                    </span>
                                  </p>
                                  <div className="mt-3">
                                    {item.cstatus === 1 ? (
                                      <Link
                                        className="btn btn-secondary"
                                        href={`/announcement/${item.slug}`}
                                        style={{ marginRight: "10px" }}
                                      >
                                        View Details
                                      </Link>
                                    ) : null}
                                    <Link
                                      className="btn btn-primary"
                                      href={`https://manage.gplusevents.com/event/${item.slug}`}
                                      target="_blank"
                                    >
                                      Update
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>You don{"'"}t have any Announcements</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="accordion-item">
                    <div
                      id="collapseFour"
                      className="accordion-collapse collapse"
                      aria-labelledby="headingFour"
                      data-bs-parent="#accordionExample"
                    >
                      <div className="accordion-body border">
                        <div className="row">
                          <div className="col-md-6 align-self-center">
                            <h4>Organisations</h4>
                          </div>
                          <div className="col-md-6 text-end">
                            <Link
                              className="btn btn-3 btn-primary"
                              href="/add-organisation"
                            >
                              Add Organisation
                            </Link>
                          </div>
                        </div>
                        <div className="tab-content" id="myTabContent">
                          {lists.length > 0 ? (
                            lists.map((item) => (
                              <div className="card mt-3" key={item.id}>
                                <div className="card-header">
                                  <h5 className="mb-0 text-dark">
                                    Organisation Name: {item.organization_name}
                                    {item.cstatus === 1 ? (
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "green",
                                        }}
                                      >
                                        {" "}
                                        (Verified)
                                      </span>
                                    ) : (
                                      <span
                                        style={{
                                          fontSize: "12px",
                                          color: "orange",
                                        }}
                                      >
                                        {" "}
                                        (Pending)
                                      </span>
                                    )}
                                  </h5>
                                </div>
                                <div className="card-body">
                                  {item.contact_number ? (
                                    <p className="mb-0 text-dark">
                                      Phone Number:{" "}
                                      <span className="text-dark">
                                        {"+" + item.contact_number}
                                      </span>
                                    </p>
                                  ) : null}
                                  <p className="mb-0 text-dark">
                                    Email:{" "}
                                    <span className="text-dark">
                                      {item.email}
                                    </span>
                                  </p>
                                  {item.website ? (
                                    <p className="mb-0 text-dark">
                                      Organisation Website:{" "}
                                      <span className="text-dark">
                                        {item.website}
                                      </span>
                                    </p>
                                  ) : null}
                                  <p className="mb-0 text-dark">
                                    Organisation Address:{" "}
                                    <span className="text-dark">
                                      {item.street_address}, {item.city},{" "}
                                      {item.state_province}, {item.country}
                                    </span>
                                  </p>
                                  <div className="mt-3">
                                    {item.cstatus === 1 ? (
                                      <Link
                                        className="btn btn-secondary"
                                        href={`/organisation/${item.slug}`}
                                        style={{ marginRight: "10px" }}
                                      >
                                        View Details
                                      </Link>
                                    ) : null}
                                    <Link
                                      className="btn btn-primary"
                                      href={`https://manage.gplusevents.com/organisation-dashboard/${item.id}`}
                                      target="_blank"
                                    >
                                      Manage
                                    </Link>
                                  </div>
                                </div>
                              </div>
                            ))
                          ) : (
                            <p>You don{"'"}t have any Organisation</p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className="modal fade"
        id="viewdetails"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-lg">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Virtual Event with Protected Content and Hidden Livestream
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <p className="mb-0">
                Name: <span>Suman Kumar</span>
              </p>
              <hr />
              <h6>Event</h6>
              <p className="mb-0">
                Date & Time: <span>12 July, 06:00 AM</span>
              </p>
              <p>
                Address:{" "}
                <span>
                  Greater Noida, NRI City Road, NRI Apartment, Greater Noida,
                  Uttar Pradesh, 201308
                </span>
              </p>
              <hr />
              <h6>Payment</h6>
              <p className="mb-0">
                Total Ticket <span className="float-end">1</span>
              </p>
              <p className="text-green">
                Payable Amount <span className="float-end">$69</span>
              </p>
              <div className="row mt-3">
                <div className="col-lg-6">
                  <button type="button" className="btn btn-secondary me-3">
                    Cancel Booking
                  </button>{" "}
                  |{" "}
                  <a className="ms-3" href="#">
                    Reschedule booking
                  </a>
                </div>
                <div className="col-lg-6 text-end">
                  <button type="button" className="btn btn-3 btn-primary">
                    Pay Now $69
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};
export default MyAccount;
