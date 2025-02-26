import React from "react";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Footer from "@/Component/Footer";
import Header from "@/Component/Header";
import PageHeader from "@/Component/PageHeader";
import Head from "next/head";
import Swal from "sweetalert2";
import { useState } from "react";
import { useRouter } from "next/router";
import { CommonVariables } from "@/Component/CommonVariable";
import secureLocalStorage from "react-secure-storage";

const ForgotPassword = () => {
  const router = useRouter();
  const [formdata, setFormData] = useState({
    email: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formdata, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setFormSubmitted(true);
    setSubmitting(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formdata.email)) {
      Swal.fire("Error", "Please enter a valid email", "error");
      setSubmitting(false);
      return;
    }

    const data = JSON.stringify({
      email: formdata.email,
    });

    const config = {
      method: "POST",
      url: CommonVariables.API_URL + "user/forgot_password",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: data,
    };

    axios
      .request(config)
      .then((response) => {
        if (response.data.status === "success") {
          Swal.fire("", response.data.message, response.data.status);
          secureLocalStorage.setItem("email", formdata.email);
          setFormData({ email: "" });
          router.push("/verify-otp");
        } else {
          Swal.fire("", response.data.message, "error");
        }
      })
      .catch((error) => {
        // console.log('Error:', error);
        Swal.fire("Error", "Failed to submit form", "error");
      })
      .finally(() => {
        setSubmitting(false);
      });
  };
  return (
    <>
      <Head>
        <title>Forgot Password</title>
      </Head>
      <Header />
      <PageHeader title={"Forgot Password"} />
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
                  alt="login"
                  width={549}
                  height={547}
                />
              </div>
              <div className="col-lg-6 align-self-center">
                <div className="login-register-box">
                  <div className="section-title">
                    <h2 className="title">Forgot Password?</h2>
                  </div>
                  <div className="login-register-form">
                    <form onSubmit={handleSubmit}>
                      <div className="single-form mt-4">
                        <label>Email</label>
                        <input
                          type="text"
                          className="form-control"
                          placeholder="Enter your email"
                          name="email"
                          value={formdata.email}
                          onChange={handleChange}
                        />
                        {formSubmitted && formdata.email === "" && (
                          <span style={{ color: "red" }}>
                            Please add your email
                          </span>
                        )}
                      </div>
                      <div className="form-btn">
                        <button className="btn-2" disabled={submitting}>
                          {submitting ? "Loading..." : "Submit"}
                        </button>
                      </div>
                      <div className="single-form">
                        <h6>
                          <Link href="login">Login</Link>
                        </h6>
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
export default ForgotPassword;
