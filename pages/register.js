import React, { useState, useEffect } from "react";
import Image from "next/image";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import PageHeader from "@/Component/PageHeader";
import Swal from "sweetalert2";
import Link from "next/link";
import axios from "axios";
import { CommonVariables } from "@/Component/CommonVariable";
import { useRouter } from "next/router";
import Head from "next/head";
import queryString from "query-string";
// async function postData() {
//   const url = 'http://localhost:2000/signup'
//   const data = {
//       email: 'user@example.com',
//       name: 'John Doe',
//       password: 'securepassword'
//   };

//   try {
//       const response = await fetch(url, {
//           method: 'POST',
         
//           headers: {
//               'Content-Type': 'application/json'
//           },
//           body: JSON.stringify(data)
//       });

//       if (!response.ok) {
//           throw new Error(`HTTP error! Status: ${response.status}`);
//       }

//       const result = await response.json();
//       console.log('Success:', result);
//   } catch (error) {
//       console.error('Error:', error);
//   }
// }
const Register = () => {
  const router = useRouter();
  const { usertype } = queryString.parse(router.asPath.split("?")[1]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    usertype: usertype || "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormSubmitted(true); // Mark form as submitted

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const nameRegex = /^[A-Za-z\s]+$/;

    if (
      formData.name === "" ||
      formData.email === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      Swal.fire("Error", "Please fill in all fields", "error");
      setSubmitting(false);
      return;
    }
    if (!emailRegex.test(formData.email)) {
      Swal.fire("Error", "Please enter a valid email address", "error");
      setSubmitting(false);
      return;
    }
    if (!nameRegex.test(formData.name)) {
      Swal.fire("Error", "Please enter a valid name", "error");
      setSubmitting(false);
      return;
    }
    if (formData.password !== formData.confirmPassword) {
      Swal.fire("Error", "Passwords do not match", "error");
      setSubmitting(false);
      return;
    }

    const data = JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password,
      confirm_password: formData.confirmPassword,
      user_type: formData.usertype,
    });
    const chatdata = JSON.stringify({
      name: formData.name,
      email: formData.email,
      password: formData.password
    });
    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: CommonVariables.API_URL + "user/register",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const chatRegister = {
      method: "post",
      maxBodyLength: Infinity,
      url: 'http://13.49.137.149:2000/signup',
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: chatdata,
    }
  
    
    axios
      .request(config)
      .then((response) => {
        if (response.data.status === "success") {
          // Registration was successful
          // Swal.fire("", response.data.message, response.data.status);
          setFormData({
            name: "",
            email: "",
            password: "",
            confirmPassword: "",
            usertype: "",
          });
          // If registration is successful, navigate to login page
          axios.request(chatRegister)
         .then((chatResponse) => {
            if (chatResponse.data.status === "success") {
              // Registration was successful
              // Swal.fire("", response.data.message, response.data.status);
              setFormData({
                name: "",
                email: "",
                password: "",
                confirmPassword: "",
                usertype: "",
              });
              // If registration is successful, navigate to login page
              router.push("/login");
            } else {
              // Registration failed
              Swal.fire("", chatResponse.data.message, chatResponse.data.status);
            }
          })
         .catch((chatError) => {
            console.log(chatError);
          });
          // postData()
          router.push("/login");
        } else {
          // Registration failed
          Swal.fire("", response.data.message, response.data.status);
        }
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  // User List API
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUserList = async () => {
      try {
        const response = await axios.post(
          CommonVariables.API_URL + "user_type/front_list",
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (response.data.status_code === 1) {
          setUserList(response.data.data);
          if (usertype) {
            setFormData((prevFormData) => ({
              ...prevFormData,
              usertype: usertype,
            }));
          }
        } else {
          setError("Failed to fetch user types");
        }
      } catch (error) {
        console.error("Error fetching user types:", error);
        setError("Error fetching user types");
      }
    };

    fetchUserList();
  }, [usertype]);

  return (
    <>
      <Head>
        <title>G plus Events - Register</title>
      </Head>
      <Header />
      <PageHeader title={"Register"} />
      <div
        className="section login-register-section section-padding"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          <div className="login-register-wrap">
            <div className="row gx-5">
              <div className="col-lg-6">
                <Image
                  className="w-100"
                  src="/assets/images/login.jpg"
                  height={549}
                  width={547}
                  alt="login"
                />
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="login-register-box">
                  <div className="section-title">
                    <h2 className="title">Register</h2>
                  </div>
                  <div className="login-register-form">
                    <form onSubmit={handleSubmit}>
                      <div className="single-form">
                        <select
                          className="form-control"
                          name="usertype"
                          type="text"
                          value={formData.usertype}
                          onChange={handleChange}
                        >
                          <option value="" hidden>
                            Select Registration Type
                          </option>
                          {userList && userList.length > 0 ? (
                            userList.map((user) => (
                              <option key={user.id} value={user.id}>
                                {user.name}
                              </option>
                            ))
                          ) : (
                            <option value="" disabled>
                              No Registration Type Available
                            </option>
                          )}
                        </select>
                        {formSubmitted && formData.usertype === "" && (
                          <span style={{ color: "red" }}>
                            Please select a registration type
                          </span>
                        )}
                      </div>
                      <div className="single-form">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Name"
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {formSubmitted && formData.name === "" && (
                          <span style={{ color: "red" }}>
                            Please enter your name
                          </span>
                        )}
                      </div>
                      <div className="single-form">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email"
                          name="email"
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {formSubmitted && formData.email === "" && (
                          <span style={{ color: "red" }}>
                            Please enter your email
                          </span>
                        )}
                      </div>
                      <div className="single-form">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        {formSubmitted && formData.password === "" && (
                          <span style={{ color: "red" }}>
                            Please enter a password
                          </span>
                        )}
                      </div>
                      <div className="single-form">
                        <input
                          type="password"
                          className="form-control"
                          placeholder="Confirm Password"
                          name="confirmPassword"
                          value={formData.confirmPassword}
                          onChange={handleChange}
                        />
                        {formSubmitted && formData.confirmPassword === "" && (
                          <span style={{ color: "red" }}>
                            Please confirm your password
                          </span>
                        )}
                      </div>
                      <div className="form-btn">
                        <button
                          type="submit"
                          className="btn-2"
                          disabled={submitting}
                        >
                          {submitting ? "Registering..." : "Register"}
                        </button>
                      </div>
                      <div className="single-form">
                        <p>
                          <Link href="/login">Already Registered? Login</Link>
                        </p>
                      </div>
                    </form>
                  </div>
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

export default Register;
