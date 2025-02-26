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

const ChangePassword = () => {
  /////////////////Userdata/////////////////////
  const router = useRouter();
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
      }
    };

    checkUserToken();
  }, [router]);
  //////////////////////////////////////////////////////
  const [formData, setFormData] = useState({
    password: "",
    confirmPassword: "",
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
    setFormSubmitted(true);

    // Basic validation
    if (formData.password === "" || formData.confirmPassword === "") {
      Swal.fire("Error", "Please fill in all fields", "error");
      setSubmitting(false);
      return;
    }

    const data = JSON.stringify({
      new_password: formData.password,
      confirm_password: formData.confirmPassword,
    });

    const config = {
      method: "POST",
      maxBodyLength: Infinity,
      url: CommonVariables.API_URL + "user/change_password",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
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
          secureLocalStorage.removeItem("status");
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
        <title>Change Password</title>
      </Head>
      <Header />
      <PageHeader title={"Change Password"} />
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
                    <h2 className="title">Change Password</h2>
                  </div>
                  <div className="login-register-form">
                    <form onSubmit={handleSubmit}>
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
                            please confirm new password
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

export default ChangePassword;
