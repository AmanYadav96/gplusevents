import React, { useEffect, useState } from "react";
import { CommonVariables } from "@/Component/CommonVariable";
import Image from "next/image";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import CountDown from "@/Component/CountDown";
import Slider from "@/Component/Slider";
import AboutSlider from "@/Component/AboutSlider";
import Loading from "@/Component/Loading";
import LocalEventsComponent from "@/Component/LocalEvents";

export default function Home() {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchEventList = async () => {
      try {
        const response = await axios.get(
          CommonVariables.API_URL + "home/events",
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (response.data.status_code === 1) {
          setEvents(response.data.data);
        } else {
          setError("Failed to fetch events");
        }
      } catch (error) {
        console.error("Error fetching events:", error);
        setError("Failed to fetch events");
      } finally {
        setLoading(false);
      }
    };

    fetchEventList();
  }, []);

  // console.log("events", events);

  const [location, setLocation] = useState({
    city: "",
    region: "",
    country: "",
    latitude: "",
    longitude: "",
  });

  useEffect(() => {
    const fetchLocation = async () => {
      const response = await fetch("/api/geolocation");
      const data = await response.json();
      setLocation(data);
    };

    fetchLocation();
  }, []);

  // console.log("location", location);

  const [localEvents, setLocalEvents] = useState([]);

  const fetchEvents = async () => {
    try {
      if (location.latitude && location.longitude) {
        const response = await axios.get(
          `${CommonVariables.API_URL}event/nearest_location?latitude=${location.latitude}&longitude=${location.longitude}`,
          {
            headers: {
              "content-type": "application/json",
            },
          }
        );
        if (response.data.status_code === 1) {
          setLocalEvents(response.data.data || []);
        }
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [location]);

  // console.log("localEvents", localEvents);

  const [eventsByDate, setEventsByDate] = useState([]);

  //Event List API

  const fetchEventsByDate = async () => {
    try {
      const response = await axios.get(
        CommonVariables.API_URL + "event/front_list?event_type=2",
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.data.status_code === 1) {
        setEventsByDate(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    }
  };

  useEffect(() => {
    fetchEventsByDate();
  }, []);

  // console.log("eventsByDate", eventsByDate);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  // if (error) {
  //     return <p>Error: {error}</p>;
  // }
  //  console.log("eventlist", events);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, " ");
  };

  return (
    <>
      <Head>
        <title>G plus Events</title>
        <meta name="description" content="Welcome to G plus Events homepage." />
      </Head>
      <Header />
      <Slider events={events} />
      {/* <div className="meeta-register-countdown" style={{ backgroundColor: 'white' }}>
        <div className="container position-relative" >
          <div className="meeta-register-countdown-wrapper">
            <div className="row gy-5 align-items-center">
              <div className="col-lg-4">
                <div className="meeta-register">
                  <h2 className="register-title">Register Today</h2>
                  <Link className="register-btn btn btn-3 btn-outline-primary" href="/register">Book Your Seat</Link>
                </div>
              </div>
              <div className="col-lg-8">
                <CountDown />
              </div>
            </div>
          </div>
          <Image className="register-countdown-shape" src="/assets/images/shape/shape-5.png" alt="Shape" width={774}
            height={136} />
        </div>
      </div> */}
      
      <div className="meeta-about-section section-padding">
        <div className="container1">
          <div className="row align-items-center">
            <div className="meeta-section-title text-center">
              {/* <h4 className="sub-title">Have A Look On</h4> */}
              <h2 className="main-title">Featured Events</h2>
            </div>
            <div className="col-lg-7">
              <div
                className="meeta-about-images"
                style={{
                  backgroundImage: `url("assets/images/shape/shape-4.png")`,
                }}
              >
                <AboutSlider events={events} />
              </div>
            </div>
            <div className="col-lg-5">
              <div className="meeta-section-title meeta-about-title p-0">
                {/* <h4 className="sub-title">
                  Discover and secure your tickets for upcoming events!
                </h4> */}
                <h2 className="main-title">
                  Explore the magic of events with GPlus
                </h2>
              </div>
              <div className="meeta-about-content p-0">
                <p>
                  Enjoy the ease of promoting, organizing, and attending events
                  with the right set of tools, resources, and support to make
                  your event successful.
                </p>
              </div>
              <Link href="/add-event" className="mt-4">
                  <button className="btn btn-primary text-white">
                    Create Event
                  </button>
                </Link>
            </div>
          </div>
        </div>
      </div>
      <div
        className="meeta-testimonial section-padding"
        style={{ backgroundImage: `url("assets/images/testimonial-bg.jpg")` }}
      >
        <div
          className="testimonial-shape-01"
          data-aos-delay="700"
          data-aos="zoom-in"
        ></div>
        <Image
          className="testimonial-shape-02"
          src="/assets/images/shape/shape-11.png"
          alt="Shape"
          width={191}
          height={173}
        />
        <div className="container-fluid custom-container">
          <div className="meeta-gallery">
            <div className="container">
              <div className="meeta-section-title mb-0 text-center">
                {/* <h4 className="sub-title">Have A Look On</h4> */}
                <h2 className="main-title">Recommended Events</h2>
              </div>
              <div className="meeta-event-featured">
                <div className="row">
                  {events &&
                    events?.silver?.map((event, index) => (
                      <div className="col-lg-3 col-md-4 col-sm-6" key={index}>
                        <div className="single-item">
                          <div className="featured-img">
                            <Link
                              href={
                                event.event_type === 1
                                  ? `/announcement/${event.slug}`
                                  : `/event/${event.slug}`
                              }
                            >
                              <Image
                                src={event.image_url}
                                height={180}
                                width={270}
                                alt={event.name || "Gallery"}
                              />
                            </Link>
                            {event.event_type === 2 ? (
                              <div className="top-meta">
                                <span className="date">
                                  {formatDate(event.event_date)}
                                </span>
                              </div>
                            ) : null}
                          </div>
                          <div className="featured-content">
                            <span
                              className={`category ${index % 4 === 0
                                ? "color-1"
                                : index % 4 === 1
                                  ? "color-2"
                                  : index % 4 === 2
                                    ? "color-3"
                                    : "color-4"
                                }`}
                            >
                              {event.event_type === 1
                                ? "Announcement"
                                : "Event"}
                            </span>
                            <h3 className="title">
                              <Link
                                href={
                                  event.event_type === 1
                                    ? `/announcement/${event.slug}`
                                    : `/event/${event.slug}`
                                }
                              >
                                {event.name}
                              </Link>
                            </h3>
                            <span className="meta">
                              <i className="fas fa-map-marker-alt"></i>
                              {event.city === null
                                ? ""
                                : `${event.city}, `}{" "}
                              {event.state === null ? "" : `${event.state}, `}{" "}
                              {event.country}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="meeta-testimonial section-padding">
        <div
          className="testimonial-shape-01"
          data-aos-delay="700"
          data-aos="zoom-in"
        ></div>
        <Image
          className="testimonial-shape-02"
          src="/assets/images/shape/shape-11.png"
          alt="Shape"
          width={191}
          height={173}
        />
        <div className="container-fluid custom-container">
          <div className="meeta-gallery">
            <div className="container">
              <div className="meeta-section-title mb-0 text-center">
                {/* <h4 className="sub-title">Have A Look On</h4> */}
                <h2 className="main-title">Our Events</h2>
              </div>
              <div className="meeta-event-featured mb-0">
                {localEvents.length > 0 ? (
                  <div className="row">
                    {localEvents &&
                      localEvents
                        .filter((event) => event.sponsered_type === 0)
                        // .filter(event => {
                        //   const eventDate = new Date(event.event_date);
                        //   const currentDate = new Date();
                        //   return eventDate >= currentDate;
                        // })
                        .slice(0, 4)
                        .map((event, index) => (
                          <div
                            className="col-lg-3 col-md-4 col-sm-6"
                            key={event.id}
                          >
                            <div className="single-item">
                              <div className="featured-img">
                                <Link href={`/event/${event.slug}`}>
                                  <Image
                                    src={event.featured_image}
                                    height={180}
                                    width={270}
                                    alt={event.name || "Event Image"}
                                  />
                                </Link>
                                {event.event_date !== "N/A" && (
                                  <div className="top-meta">
                                    <span className="date">
                                      {formatDate(event.event_date)}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="featured-content">
                                <span
                                  className={`category ${index % 4 === 0
                                    ? "color-1"
                                    : index % 4 === 1
                                      ? "color-2"
                                      : index % 4 === 2
                                        ? "color-3"
                                        : "color-4"
                                    }`}
                                >
                                  {event.event_type === 1
                                    ? "Announcement"
                                    : event.event_type === 2
                                      ? "Event"
                                      : null}
                                </span>
                                <h3 className="title">
                                  <Link href={`/event/${event.slug}`}>
                                    {event.name}
                                  </Link>
                                </h3>
                                <span className="meta">
                                  <i className="fas fa-map-marker-alt"></i>
                                  {event.city ? `${event.city}, ` : ""}
                                  {event.state_province
                                    ? `${event.state_province}, `
                                    : ""}
                                  {event.country}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                ) : (
                  <div className="row">
                    {eventsByDate &&
                      eventsByDate
                        .filter((event) => event.sponsered_type === "General")
                        .filter((event) => {
                          const eventDate = new Date(event.event_date);
                          const currentDate = new Date();
                          return eventDate >= currentDate;
                        })
                        .slice(0, 4)
                        .map((event, index) => (
                          <div
                            className="col-lg-3 col-md-4 col-sm-6"
                            key={index}
                          >
                            <div className="single-item">
                              <div className="featured-img">
                                <Link href={`/event/${event.slug}`}>
                                  <Image
                                    src={event.featured_image}
                                    height={180}
                                    width={270}
                                    alt={event.name || "Event Image"}
                                  />
                                </Link>
                                {event.event_date !== "N/A" && (
                                  <div className="top-meta">
                                    <span className="date">
                                      {event.event_date}
                                    </span>
                                  </div>
                                )}
                              </div>
                              <div className="featured-content">
                                <span
                                  className={`category ${index % 4 === 0
                                    ? "color-1"
                                    : index % 4 === 1
                                      ? "color-2"
                                      : index % 4 === 2
                                        ? "color-3"
                                        : "color-4"
                                    }`}
                                >
                                  {event.event_type === 1
                                    ? "Announcement"
                                    : event.event_type === 2
                                      ? "Event"
                                      : null}
                                </span>
                                <h3 className="title">
                                  <Link href={`/event/${event.slug}`}>
                                    {event.name}
                                  </Link>
                                </h3>
                                <span className="meta">
                                  <i className="fas fa-map-marker-alt"></i>
                                  {event.city ? `${event.city}, ` : ""}
                                  {event.state_province
                                    ? `${event.state_province}, `
                                    : ""}
                                  {event.country}
                                </span>
                              </div>
                            </div>
                          </div>
                        ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
    <LocalEventsComponent/>
        <div className="meeta-plans-section section-padding">
          <div className="container">
            <div className="meeta-section-title text-center">
              <h2 className="main-title">Event Plans</h2>
              <p className="sub-title">
                Choose the perfect plan for your next event. Tailored to meet your needs.
              </p>
            </div>
            <div className="row justify-content-center">
              {/* Platinum Plan */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="plan-card platinum">
                  <div className="plan-header">
                    <h3>Platinum</h3>
                    <span className="plan-price">$500</span>
                  </div>
                  <div className="plan-body">
                    <ul>
                      <li><i className="fas fa-check"></i> VIP Access</li>
                      <li><i className="fas fa-check"></i> Premium Seating</li>
                      <li><i className="fas fa-check"></i> Exclusive Networking</li>
                      <li><i className="fas fa-check"></i> Free Merchandise</li>
                    </ul>
                  </div>
                  <div className="plan-footer">
                    <button className="btn btn-primary">Get Platinum</button>
                  </div>
                </div>
              </div>

              {/* Gold Plan */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="plan-card gold">
                  <div className="plan-header">
                    <h3>Gold</h3>
                    <span className="plan-price">$300</span>
                  </div>
                  <div className="plan-body">
                    <ul>
                      <li><i className="fas fa-check"></i> Reserved Seating</li>
                      <li><i className="fas fa-check"></i> Priority Entry</li>
                      <li><i className="fas fa-check"></i> Event Goodies</li>
                      <li><i className="fas fa-check"></i> Networking Opportunities</li>
                    </ul>
                  </div>
                  <div className="plan-footer">
                    <button className="btn btn-secondary">Get Gold</button>
                  </div>
                </div>
              </div>

              {/* Silver Plan */}
              <div className="col-lg-4 col-md-6 mb-4">
                <div className="plan-card silver">
                  <div className="plan-header">
                    <h3>Silver</h3>
                    <span className="plan-price">$150</span>
                  </div>
                  <div className="plan-body">
                    <ul>
                      <li><i className="fas fa-check"></i> General Admission</li>
                      <li><i className="fas fa-check"></i> Standard Seating</li>
                      <li><i className="fas fa-check"></i> Event Brochure</li>
                      <li><i className="fas fa-check"></i> Free Snacks</li>
                    </ul>
                  </div>
                  <div className="plan-footer">
                    <button className="btn btn-light">Get Silver</button>
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
}
