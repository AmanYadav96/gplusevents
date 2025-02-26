import React from "react";
import Image from "next/image";
import Link from "next/link";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import PageHeader from "@/Component/PageHeader";
import Fancybox from "@/Component/Fancybox";
import axios from "axios";
import Head from "next/head";
import { useState, useEffect } from "react";
import { CommonVariables } from "@/Component/CommonVariable";
import { useRouter } from "next/router";
import Loading from "@/Component/Loading";

const EventDetails = (props) => {
  // console.log("detail", props.detail);

  /////////** CSR API **//////////

  // const router = useRouter();
  // const Slug = router.query.slug;
  // console.log("router", router.query.slug);

  // const [eventDetail, setEventDetail] = useState();
  // const [refreshData, setRefreshData] = useState(0);

  // useEffect(() => {
  //     const userDetail = async (e) => {
  //         await axios({
  //             method: "GET",
  //             url: CommonVariables.API_URL + "event/front_detail",
  //             params: {
  //                  "slug": Slug
  //               },
  //             headers: {
  //                 "content-type": "application/json",
  //                 // 'Authorization': `Bearer ${token}`
  //             },
  //         })
  //             .then(function (response) {

  //                 // setLabTestList(response.data.data)
  //                 if (response.data.status_code == 1) {
  //                     const userData = response.data.data;
  //                     setEventDetail(userData);
  //                     setRefreshData((prevCount) => prevCount + 1)
  //                 }
  //             })
  //             .catch(function (response) {
  //                 console.log("response", response);
  //             });
  //     };

  //     userDetail();

  // }, []);
  //   console.log("eventDetail", eventDetail);

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
                  {props?.detail?.external_booking === 1 ? (
                    ""
                  ) : (
                    <div className="meeta-pricing meeta-pricing-2 meeta-pricing-4 meeta-pricing-5">
                      <div className="event-single-item">
                        <h3 className="title">Get Your Tickets Now</h3>
                      </div>
                      <div className="color-3 bookticket mt-4 p-12">
                        <div className="row">
                          <div className="col-md-7 align-self-center">
                            <div className="form-group row">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-5 col-form-label text-white"
                              >
                                Number of Tickets
                              </label>
                              <div className="col-sm-6">
                                <input
                                  defaultValue="1"
                                  max="100"
                                  min="1"
                                  style={{
                                    width: "100px",
                                    margin: "0 auto",
                                    textAlign: "center",
                                  }}
                                  type="number"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5 text-end">
                            <Link className="btn btn-primary" href="#">
                              Book A Seat
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                  <p
                    dangerouslySetInnerHTML={{
                      __html: props?.detail?.short_description,
                    }}
                  ></p>
                  {props?.detail?.external_booking === 1 ? (
                    ""
                  ) : (
                    <div className="meeta-pricing meeta-pricing-2 meeta-pricing-4 meeta-pricing-5">
                      <div className="event-single-item">
                        <h3 className="title">Get Your Tickets Now</h3>
                      </div>
                      <div className="color-3 bookticket mt-4 p-12">
                        <div className="row">
                          <div className="col-md-7 align-self-center">
                            <div className="form-group row">
                              <label
                                htmlFor="inputEmail3"
                                className="col-sm-5 col-form-label text-white"
                              >
                                Number of Tickets
                              </label>
                              <div className="col-sm-6">
                                <input
                                  defaultValue="1"
                                  max="100"
                                  min="1"
                                  style={{
                                    width: "100px",
                                    margin: "0 auto",
                                    textAlign: "center",
                                  }}
                                  type="number"
                                  className="form-control"
                                />
                              </div>
                            </div>
                          </div>
                          <div className="col-md-5 text-end">
                            <Link className="btn btn-primary" href="#">
                              Book A Seat
                            </Link>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
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
                  {props?.detail?.ticket_price ? (
                    <div className="btn-price mb-4">
                      <div className="price">
                        <span>${props?.detail?.ticket_price}</span>
                      </div>
                    </div>
                  ) : null}
                  <div className="sidebar-item">
                    <div className="event-details mt-0">
                      <h3 className="sidebar-title">Contact Detail</h3>
                      <ul>
                        <li>
                          <h5 className="title">Event Date:</h5>
                          <p>{props?.detail?.event_date}</p>
                        </li>
                        <li>
                          <h5 className="title">Event Time:</h5>
                          <p>{props?.detail?.event_time}</p>
                        </li>
                        <li>
                          <h5 className="title">Location :</h5>
                          <p>
                            {props?.detail?.street_address},{" "}
                            {props?.detail?.city},{" "}
                            {props?.detail?.state_province},{" "}
                            {props?.detail?.country}
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
                      </ul>
                      <div className="right_bar footer-widget-social">
                        {props?.detail?.website ? (
                          <Link href={props?.detail?.website} target="_blank">
                            <i className="fa fa-globe"></i>
                          </Link>
                        ) : null}
                        {props?.detail?.facebook ? (
                          <Link href={props?.detail?.facebook} target="_blank">
                            <i className="fab fa-facebook-f"></i>
                          </Link>
                        ) : null}
                        {props?.detail?.instagram ? (
                          <Link href={props?.detail?.instagram} target="_blank">
                            <i className="fab fa-instagram"></i>
                          </Link>
                        ) : null}
                        {props?.detail?.x ? (
                          <Link href={props?.detail?.x} target="_blank">
                            <i className="fab fa-x-twitter">𝕏</i>
                          </Link>
                        ) : null}
                        {props?.detail?.snapchat ? (
                          <Link href={props?.detail?.snapchat} target="_blank">
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
                    </div>
                  </div>
                  <br />
                  <br />
                  {props?.detail?.external_booking === 1 ? (
                    <div className="meeta-pricing meeta-pricing-2 meeta-pricing-4 meeta-pricing-5 mt-2">
                      <div className="event-single-item mb-2">
                        <h3 className="title">Interested?</h3>
                      </div>
                      <Link
                        href={props?.detail?.external_booking_url}
                        target="_blank"
                        className="btn-2 mt-2"
                      >
                        Register Now
                      </Link>
                    </div>
                  ) : null}
                  <div className="sidebar-item">
                    <div className="event-map">
                      <h3 className="sidebar-title">Location Map</h3>
                      <div className="google-map">
                        <iframe
                          id="gmap_canvas"
                          src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${props?.detail?.city}`}
                        ></iframe>
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
      `${CommonVariables.API_URL}event/front_detail?slug=${slug}&event_type=2&organization=1&organization=1&image_gallery=1&video_gallery=1}}`
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

export default EventDetails;
