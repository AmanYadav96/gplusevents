import React, { useState } from "react";
import Image from "next/image";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import Link from "next/link";
import PageHeader from "@/Component/PageHeader";
import Swal from "sweetalert2";
import { useRouter } from "next/router";
import { CommonVariables } from "@/Component/CommonVariable";
import secureLocalStorage from "react-secure-storage";
import axios from "axios";
import Head from "next/head";
import Cookies from "js-cookie";

const Login = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setSubmitting(true);

    ///////Basic validation///////
    if (formData.name === "" || formData.password === "") {
      Swal.fire("Error", "Please fill in all fields", "error");
      setSubmitting(false);
      return;
    }

    // Perform login request
    const data = JSON.stringify({
      email: formData.name,
      password: formData.password,
    });

    const config = {
      method: "post",
      maxBodyLength: Infinity,
      url: CommonVariables.API_URL + "user/login",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    const chatlogin = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://13.49.137.149:2000/signin",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };
    axios
      .request(config)
      .then((response) => {
        if (response.data.status === "error") {
          Swal.fire("", response.data.message, response.data.status);
        } else if (response.data.status_code === 1) {
          var data = response.data.user;

          // Log the user ID
          console.log("User ID:", data.id);

          data.token = response.data.authorisation.token;
          console.log("Token:", data.token);

          secureLocalStorage.setItem("userdata", JSON.stringify(data));
          let status = response.data.status;
          secureLocalStorage.setItem("status", JSON.stringify(status));

          setFormData({
            name: "",
            password: "",
          });

          // Call the second API after successful login


          axios
          .request(chatlogin)
          .then((secondResponse) => {
            // console.log("Second API Response:", secondResponse.data);
        
            const responseData = secondResponse?.data; // Ensure data exists
            if (responseData) {
              // Convert object to string and store in localStorage
              localStorage.setItem("userchatdata", JSON.stringify(responseData.data));
        
              // Check if data is stored successfully
              console.log("User Data Saved:", JSON.parse(localStorage.getItem("userchatdata")));
            } else {
              console.error("Response data is missing!");
            }
          })
          .catch((error) => {
            console.error("Error in second API call:", error);
          });
        

          router.push("/my-account");
        } else {
          Swal.fire("", response.data.message, response.data.status);
        }
      })
      .catch((error) => {
        console.log(error);
        if (error.response && error.response.status === 401)
          Swal.fire("", error.response.data.message, error.response.data.status);
        router.push("/login");
      })
      .finally(() => {
        setSubmitting(false); // RESET FORM
      });
  };
  //   axios
  //     .request(config)
  //     .then((response) => {
  //       if (response.data.status === "error") {
  //         Swal.fire("", response.data.message, response.data.status);
  //       } else if (response.data.status_code === 1) {
  //         var data = response.data.user;

  //         // Log the user ID
  //         console.log("User ID:", data.id);

  //         data.token = response.data.authorisation.token;
  //         console.log("Token:", data.token);

  //         secureLocalStorage.setItem("userdata", JSON.stringify(data));
  //         let status = response.data.status;
  //         secureLocalStorage.setItem("status", JSON.stringify(status));

  //         setFormData({
  //           name: "",
  //           password: "",
  //         });
  //         router.push("/my-account");
  //       } else {
  //         Swal.fire("", response.data.message, response.data.status);
  //       }
  //     })
  //     .catch((error) => {
  //       console.log(error);
  //       if (error.response.status === 401)
  //         Swal.fire(
  //           "",
  //           error.response.data.message,
  //           error.response.data.status
  //         );
  //       router.push("/login");
  //     })
  //     .finally(() => {
  //       setSubmitting(false); //RESET FORM
  //     });
  // };

  return (
    <>
      <Head>
        <title>G plus Events - Login</title>
      </Head>
      <Header />
      <PageHeader title={"Login"} />
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
                    <h2 className="title">Login</h2>
                  </div>
                  <div className="login-register-form">
                    <form onSubmit={handleSubmit}>
                      <div className="single-form">
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Email "
                          name="name"
                          value={formData.name}
                          onChange={handleChange}
                        />
                        {/* {formSubmitted && formData.name === "" && (
                          <span style={{ color: "red" }}>
                            Please enter email
                          </span>
                        )} */}
                      </div>
                      <div className="single-form">
                        <input
                          type="password"
                          className="form-control"
                          name="password"
                          value={formData.password}
                          placeholder="Password"
                          onChange={handleChange}
                        />
                        {/* {formSubmitted && formData.password === "" && (
                          <span style={{ color: "red" }}>
                            Please enter Password
                          </span>
                        )} */}
                      </div>
                      <div
                        className="single-form"
                        style={{ display: "flex", justifyContent: "flex-end" }}
                      >
                        <h6>
                          <Link href="/forgot-password">
                            Lost your password?
                          </Link>
                        </h6>
                      </div>
                      <div className="form-btn mt-0">
                        <button
                          type="submit"
                          className="btn-2"
                          disabled={submitting}
                        >
                          {submitting ? "Authenticating..." : "Login"}
                        </button>
                      </div>
                      <div className="single-form">
                        <p>
                          <Link className="btn-2" href="/register">
                            New User? Register
                          </Link>
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

export default Login;
