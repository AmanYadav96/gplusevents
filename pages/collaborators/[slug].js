import React from "react";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import PageHeader from "@/Component/PageHeader";
import axios from "axios";
import Link from "next/link";
import Image from "next/image";
import Head from "next/head";
import Loading from "@/Component/Loading";
import { useEffect, useState } from "react";
import { CommonVariables } from "@/Component/CommonVariable";
import Cookies from "js-cookie";
import secureLocalStorage from "react-secure-storage";
import { useRouter } from "next/router";
import { showChat } from "../my-account";

const isLoggedIn = () => {
  const data = secureLocalStorage.getItem("userdata"); 


  return !!data; // Returns true if token exists, false otherwise
};

//fetch
export async function fetchDetail(email, created_by, name , user_email ) {
  try {
    const response = await fetch(`http://13.49.137.149:2000/user/${email}`);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    const contactdata = JSON.stringify({
      name: data.data.name,
      email: data.data.email,
      user_id: data.data._id,
      created_by: created_by,
    });
    console.log(contactdata)
    const contactcreate = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://13.49.137.149:2000/contact",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: contactdata,
    };
    const contactdata1 = JSON.stringify({
      name: name,
      email: user_email,
      user_id: created_by,
      created_by: data.data._id,
    });
    const contactcreate1 = {
      method: "post",
      maxBodyLength: Infinity,
      url: "http://13.49.137.149:2000/contact",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: contactdata1,
    };
    axios
  .request(contactcreate)
  .then((response) => {
    const responseData = response?.data; // Ensure data exists
    if (responseData && responseData.status === "success") { 
      // Store response data in localStorage
      localStorage.setItem("userData", JSON.stringify(responseData));

      console.log("First API Success. Data Saved:", responseData);

      // Now call the second API
      return axios.request(contactcreate1);
    } else {
      console.error("First API did not return success!");
      throw new Error("First API did not return success!"); // Prevents calling second API
    }
  })
  .then((secondResponse) => {
    console.log("Second API Response:", secondResponse.data);

    // Do something with the second API response
  })
  .catch((error) => {
    console.error("Error in API calls:", error);
  });


    showChat()
    return data;
  } catch (error) {
    console.error("Error fetching collaborator data:", error);
    return null;
  }
}



const Collaborators = ({ detail, slug }) => {
  // console.log('detail', detail);
  const router = useRouter();
  const { type } = router.query;
  const [filterDetail, setFilterDetail] = useState(detail);

  
const addchat = () => {
  if (isLoggedIn()) {
    alert("User is logged in, proceeding with chat...");
    const data =  JSON.parse(localStorage.getItem("userchatdata"))
    console.log(filterDetail.email)
    // console.log(data._id)
    console.log(data.user._id)
    fetchDetail(filterDetail.email, data.user._id,data.user.name,data.user.email )
  } else {
    
   router.push('/login');
    // Redirect to login page if needed
  }
};
  
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
        `${CommonVariables.API_URL}user/front_detail/${slug}?${eventType}&event_list=1&announcement_list=1&organization_list=1&organizer_list=1`
      );
      const fetchedDetail = res.data.status_code == 1 ? res.data : [];
      console.log(res)
      setFilterDetail(fetchedDetail.data ?? []);
    };

    fetchData();
  }, [type, slug]);
  console.log("filterDetail", filterDetail);

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
        <title>G plus Events - {detail?.user_type_label}</title>
      </Head>
      <Header />
      <PageHeader
        title={`${detail?.name.charAt(0).toUpperCase() + detail?.name.slice(1)
          } (${detail?.user_type_label})`}
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
                      {detail?.name.charAt(0).toUpperCase() +
                        detail?.name.slice(1)}
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
                                  <span className="date">
                                    {event.event_date}
                                  </span>
                                </div> */}
                              </div>
                              <Link href={`/announcement/${event.slug}`}>
                                <div className="featured-content">
                                  <span
                                    className={`category ${index % 3 === 0
                                      ? "color-1"
                                      : index % 3 === 1
                                        ? "color-2"
                                        : "color-3"
                                      }`}
                                  >
                                    {event.event_type_label}
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
                          <h3 className="main-title mb-0">Events</h3>
                        ) : null}
                      </div>
                      <div className="col-md-6 text-end">
                        {detail?.event_list.length !== 0 ? (
                          <div className="event-list-top-bar">
                            <div className="event-list-tag mt-0">
                              <ul>
                                <li className="mt-0">
                                  <Link
                                    href={`/collaborators/${slug}?type=future_events`}
                                  >
                                    Upcoming Events
                                  </Link>
                                </li>
                                <li className="mt-0">
                                  <Link
                                    href={`/collaborators/${slug}?type=past_events`}
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
                                    {event.event_date}
                                  </span>
                                </div>
                              </div>
                              <Link href={`/event/${event.slug}`}>
                                <div className="featured-content">
                                  <span
                                    className={`category ${index % 3 === 0
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
                                    className={`category ${index % 3 === 0
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
                  <div className="meeta-event-featured">
                    {detail?.organizer_list.length !== 0 ? (
                      <h3 className="main-title">Organizers</h3>
                    ) : null}
                    <div className="speakers-content-wrap">
                      <div className="row">
                        {detail?.organizer_list &&
                          detail?.organizer_list.map((organizer, index) => (
                            <div
                              className="col-md-4 col-sm-6"
                              key={organizer.id}
                            >
                              <div className="single-speker-3">
                                <div className="speker-img">
                                  <Link href={`/organizer/${organizer.slug}`}>
                                    <Image
                                      src={organizer.image}
                                      height={260}
                                      width={260}
                                      alt=""
                                    />
                                  </Link>
                                  <div className="speker-content text-center">
                                    <h3 className="name">{organizer.name}</h3>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                      </div>
                    </div>
                  </div>
                  <div className="event-single-item">
                    {detail?.organization_list.length !== 0 ? (
                      <h3 className="title">Organisations</h3>
                    ) : null}
                    <div className="meeta-event-sponsors-3">
                      <div className="meeta-sponsor-wrap">
                        <div className="row">
                          {detail?.organization_list &&
                            detail?.organization_list.map((org, index) => (
                              <div className="col-lg-3 col-sm-6" key={org.id}>
                                <div className="meeta-sponsor-logo">
                                  <Link href={`/organisation/${org.slug}`}>
                                    {org.image ? (
                                      <Image
                                        src={org.image}
                                        height={60}
                                        width={200}
                                        alt=""
                                      />
                                    ) : (
                                      <h3>{org.organization_name}</h3>
                                    )}
                                  </Link>
                                </div>
                              </div>
                            ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <div className="event-single-sidebar">
                  <div className="sidebar-item">
                    <div className="event-details mt-0">
                      <div className="meeta-speaker-single">
                        <div className="meeta-speaker-single-wrap">
                          <div className="speaker-image-box text-center">
                            <div className="single-speaker">
                              <div className="speaker-image mt-5">
                                <Image
                                  src={detail?.image}
                                  height={200}
                                  width={200}
                                  alt="Speaker"
                                />
                              </div>
                              <div className="speaker-content">
                                <div className="speaker-content-box">
                                  <h4 className="speaker-name">
                                    {detail?.name.charAt(0).toUpperCase() +
                                      detail?.name.slice(1)}
                                  </h4>
                                </div>
                                <Image
                                  className="speaker-shape-1"
                                  src="/assets/images/shape/shape-8.png"
                                  height={24}
                                  width={290}
                                  alt=""
                                />
                                <div className="speaker-shape-2"></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <h3 className="sidebar-title mt-4">Contact Detail</h3>
                      <ul>
                        <li>
                          <h5 className="title">Contact Name:</h5>
                          <p>
                            {detail?.name.charAt(0).toUpperCase() + detail?.name.slice(1)}
                          </p>
                        </li>
                        {detail?.contact_no && (
                          <li>
                            <h5 className="title">Contact Number:</h5>
                            <p>{detail?.contact_no}</p>
                          </li>
                        )}
                        <li>
                          <h5 className="title">Contact Email:</h5>
                          <p>{detail?.email}</p>
                        </li>
                        {detail?.address && (
                          <li>
                            <h5 className="title">Contact Address:</h5>
                            <p>{detail?.address}</p>
                          </li>
                        )}
                        <li>
                            <h5 className="title">Messenger:</h5>
                              <button
                                onClick={addchat} 
                                className="messenger-button"
                                >
                                     Message
                                   </button>
                          </li>

                      </ul>


                    </div>
                  </div>
                  {detail?.address ? (
                    <div className="sidebar-item">
                      <div className="event-map">
                        <h3 className="sidebar-title">Location Map</h3>
                        <div className="google-map">
                          <iframe
                            id="gmap_canvas"
                            src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${detail?.address}`}
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
      {/* <Footer /> */}
    </>
  );
};
export async function getStaticProps({ params }) {
  const { slug } = params || {};
  let detail = [];

  try {
    const res = await axios.get(
      `${CommonVariables.API_URL}user/front_detail/${slug}?event_list=1&announcement_list=1&organization_list=1&organizer_list=1`
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
export default Collaborators;
