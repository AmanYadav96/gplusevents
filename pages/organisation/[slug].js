import React from "react";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import PageHeader from "@/Component/PageHeader";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { CommonVariables } from "@/Component/CommonVariable";
import Loading from "@/Component/Loading";

const Organisation = ({ detail, slug }) => {
  // console.log('detail', detail);
  const router = useRouter();
  const { type } = router.query;
  const [filterDetail, setFilterDetail] = useState(detail);

  useEffect(() => {
    if (!type) return;

    const fetchData = async () => {
      let eventType = "";
      if (type === "past_events") {
        eventType = "past_events=1";
      } else if (type === "future_events") {
        eventType = "future_events=1";
      }

      const res = await axios.get(
        `${CommonVariables.API_URL}promotor_organization/front_detail/${slug}?${eventType}`
      );
      const fetchedDetail = res.data.status_code == 1 ? res.data : [];

      setFilterDetail(fetchedDetail.data ?? []);
    };

    fetchData();
  }, [type, slug]);
  // console.log("filterDetail", filterDetail);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    const options = { day: "2-digit", month: "short", year: "numeric" };
    return date.toLocaleDateString("en-GB", options).replace(/ /g, " ");
  };

  if (!detail) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>
          G plus Events -{" "}
          {detail?.organization_name.charAt(0).toUpperCase() +
            detail?.organization_name.slice(1)}
        </title>
      </Head>
      <Header />
      <PageHeader
        title={`${
          detail?.organization_name.charAt(0).toUpperCase() +
          detail?.organization_name.slice(1)
        } (Organisation)`}
      />
      <div
        className="meeta-event-single section-padding"
        style={{ backgroundColor: "white" }}
      >
        <div className="container">
          <div className="meeta-event-single-wrap">
            <div className="row">
              <div className="col-lg-8">
                <div className="event-single-content">
                  <div className="meeta-event-featured mt-0">
                    <h3 className="main-title">
                      About{" "}
                      {detail?.organization_name.charAt(0).toUpperCase() +
                        detail?.organization_name.slice(1)}
                    </h3>
                    <p
                      dangerouslySetInnerHTML={{ __html: detail?.description }}
                    ></p>
                  </div>
                  <div className="meeta-event-featured">
                    {detail?.announcement_list.length !== 0 ? (
                      <h3 className="main-title">Announcements</h3>
                    ) : null}
                    <div className="row">
                      {detail?.announcement_list &&
                        detail?.announcement_list.map((event, index) => (
                          <div className="col-md-4  col-sm-6" key={event.id}>
                            <div className="single-item">
                              <div className="featured-img">
                                <Link href={`/announcement/${event.slug}`}>
                                  <Image
                                    src={`${event.featured_image}`}
                                    height={137}
                                    width={203}
                                    alt=""
                                  />
                                </Link>
                                {/* <div className="top-meta">
                                                                <span className="date">{event.event_date}</span>
                                                            </div> */}
                              </div>
                              <Link href={`/announcement/${event.slug}`}>
                                <div className="featured-content">
                                  <span
                                    className={`category ${
                                      index % 3 === 0
                                        ? "color-1"
                                        : index % 3 === 1
                                        ? "color-2"
                                        : "color-3"
                                    }`}
                                  >
                                    Announcement
                                  </span>
                                  <h3 className="title">
                                    <Link href={`/announcement/${event.slug}`}>
                                      {event.name}
                                    </Link>
                                  </h3>
                                  <span className="meta  text-capitalize">
                                    <i className="fas fa-map-marker-alt"></i>
                                    {event.city && `${event.city}, `}
                                    {event.state_province &&
                                      `${event.state_province}, `}{" "}
                                    {event.country}
                                  </span>
                                </div>
                              </Link>
                            </div>
                          </div>
                        ))}
                    </div>
                  </div>
                  <div className="meeta-event-featured">
                    <div className="row">
                      <div className="col-md-6 align-self-center">
                        {detail?.event_list.length !== 0 ? (
                          <h3 className="main-title">Events</h3>
                        ) : null}
                      </div>
                      <div className="col-md-6 text-end">
                        {detail?.event_list.length !== 0 ? (
                          <div className="event-list-top-bar">
                            <div className="event-list-tag mt-0">
                              <ul>
                                <li>
                                  <Link
                                    href={`/organisation/${slug}?type=future_events`}
                                  >
                                    Upcoming Events
                                  </Link>
                                </li>
                                <li>
                                  <Link
                                    href={`/organisation/${slug}?type=past_events`}
                                  >
                                    Past Events
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      {filterDetail?.event_list
                        ? filterDetail?.event_list &&
                          filterDetail?.event_list.map((event, index) => (
                            <div className="col-md-4  col-sm-6" key={event.id}>
                              <div className="single-item">
                                <div className="featured-img">
                                  <Link href={`/event/${event.slug}`}>
                                    <Image
                                      src={`${event.featured_image}`}
                                      height={137}
                                      width={203}
                                      alt=""
                                    />
                                  </Link>
                                  <div className="top-meta">
                                    <span className="date">
                                      {formatDate(event.event_date)}
                                    </span>
                                  </div>
                                </div>
                                <Link href={`/event/${event.slug}`}>
                                  <div className="featured-content">
                                    <span
                                      className={`category ${
                                        index % 3 === 0
                                          ? "color-1"
                                          : index % 3 === 1
                                          ? "color-2"
                                          : "color-3"
                                      }`}
                                    >
                                      Event
                                    </span>
                                    <h3 className="title">
                                      <Link href={`/event/${event.slug}`}>
                                        {event.name}
                                      </Link>
                                    </h3>
                                    <span className="meta  text-capitalize">
                                      <i className="fas fa-map-marker-alt"></i>
                                      {event.city && `${event.city}, `}
                                      {event.state_province &&
                                        `${event.state_province}, `}{" "}
                                      {event.country}
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))
                        : detail?.event_list &&
                          detail?.event_list.map((event, index) => (
                            <div className="col-md-4  col-sm-6" key={event.id}>
                              <div className="single-item">
                                <div className="featured-img">
                                  <Link href={`/event/${event.slug}`}>
                                    <Image
                                      src={`${event.featured_image}`}
                                      height={137}
                                      width={203}
                                      alt=""
                                    />
                                  </Link>
                                  <div className="top-meta">
                                    <span className="date">
                                      {event.event_date}
                                    </span>
                                  </div>
                                </div>
                                <Link href={`/event/${event.slug}`}>
                                  <div className="featured-content">
                                    <span
                                      className={`category ${
                                        index % 3 === 0
                                          ? "color-1"
                                          : index % 3 === 1
                                          ? "color-2"
                                          : "color-3"
                                      }`}
                                    >
                                      {event.event_type_label}
                                    </span>
                                    <h3 className="title">
                                      <Link href={`/event/${event.slug}`}>
                                        {event.name}
                                      </Link>
                                    </h3>
                                    <span className="meta  text-capitalize">
                                      <i className="fas fa-map-marker-alt"></i>
                                      {event.city && `${event.city}, `}
                                      {event.state_province &&
                                        `${event.state_province}, `}{" "}
                                      {event.country}
                                    </span>
                                  </div>
                                </Link>
                              </div>
                            </div>
                          ))}
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="event-single-sidebar">
                  <div className="sidebar-item">
                    <div className="event-details mt-0">
                      <h3 className="sidebar-title">Contact Detail</h3>
                      <ul>
                        <li>
                          <h5 className="title">Contact Name:</h5>
                          <p>{detail?.contact_name}</p>
                        </li>
                        {detail?.contact_number ? (
                          <li>
                            <h5 className="title">Contact Number:</h5>
                            <p>{detail?.contact_number}</p>
                          </li>
                        ) : null}
                        <li>
                          <h5 className="title">Contact Email :</h5>
                          <p>{detail?.email}</p>
                        </li>
                        {detail?.contact_address ? (
                          <li>
                            <h5 className="title">Contact Address:</h5>
                            <p>{detail?.contact_address}</p>
                          </li>
                        ) : null}
                      </ul>
                    </div>
                  </div>
                  {detail?.contact_address ? (
                    <div className="sidebar-item">
                      <div className="event-map">
                        <h3 className="sidebar-title">Location Map</h3>
                        <div className="google-map">
                          <iframe
                            id="gmap_canvas"
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${detail?.contact_address}`}
                          ></iframe>
                        </div>
                      </div>
                    </div>
                  ) : null}
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

export async function getStaticProps({ params }) {
  const { slug } = params || {};
  let detail = [];

  try {
    const res = await axios.get(
      `${CommonVariables.API_URL}promotor_organization/front_detail/${slug}`
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
export default Organisation;
