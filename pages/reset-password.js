import Image from "next/image";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import PageHeader from "@/Component/PageHeader";
import Swal from "sweetalert2";
import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { CommonVariables } from "@/Component/CommonVariable";
import secureLocalStorage from "react-secure-storage";

const ResetPassword = () => {
  const router = useRouter();
  const email = secureLocalStorage.getItem("email");
  const otp = secureLocalStorage.getItem("otp");
  // console.log("email", email);
  // console.log("otp", otp);

  const [formData, setFormData] = useState({
    email: email || "",
    otp: otp,
    password: "",
    confirmPassword: "",
  });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (email) {
      setFormData((prevState) => ({ ...prevState, email }));
    }
  }, [email]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    setFormSubmitted(true);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Basic validation
    if (
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

    const data = JSON.stringify({
      email: formData.email,
      new_password: formData.password,
      confirm_password: formData.confirmPassword,
      otp: otp,
    });

    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: CommonVariables.API_URL + "user/reset_password",
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
          setFormData({
            email: "",
            password: "",
            confirmPassword: "",
          });
          secureLocalStorage.removeItem("email");
          secureLocalStorage.removeItem("otp");
          router.push("/login");
        } else {
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
  return (
    <>
      <Head>
        <title>Reset Password</title>
      </Head>
      <Header />
      <PageHeader title={"Reset Password"} />
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
                    <h2 className="title">Reset Password</h2>
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
                          value={formData.email}
                          onChange={handleChange}
                        />
                        {formSubmitted && formData.email === "" && (
                          <span style={{ color: "red" }}>
                            Please enter email
                          </span>
                        )}
                      </div>
                      <div className="single-form">
                        <label>New Password</label>
                        <input
                          type="password"
                          className="form-control"
                          placeholder="New Password"
                          name="password"
                          value={formData.password}
                          onChange={handleChange}
                        />
                        {formSubmitted && formData.password === "" && (
                          <span style={{ color: "red" }}>
                            Please enter new password
                          </span>
                        )}
                      </div>
                      <div className="single-form">
                        <label>Confirm New Password</label>
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
                            Please confirm new password
                          </span>
                        )}
                      </div>
                      <div className="form-btn">
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
      <Footer />
    </>
  );
};

export default ResetPassword;
