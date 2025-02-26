import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import dynamic from "next/dynamic";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel/dist/assets/owl.theme.default.css";

const ReactOwlCarousel = dynamic(() => import("react-owl-carousel"), {
  ssr: false,
});

const Slider = ({ events }) => {
  const formatDate = (dateString) => {
    const options = { month: "long", day: "numeric" };
    const date = new Date(dateString);
    return new Intl.DateTimeFormat("en-US", options).format(date);
  };

  const getYear = (dateString) => {
    const date = new Date(dateString);
    return date.getFullYear();
  };

  return (
    <div
      className="carousel home-slider"
      data-ride="carousel"
      data-pause="hover"
      data-interval="10000"
      data-duration="2000"
    >
      <ReactOwlCarousel
        className="carousel-inner"
        role="listbox"
        items={1}
        loop={true}
        nav={true}
        margin={10}
        autoplay={true}
        dots={false}
        autoplayTimeout={8000}
      >
        {events?.premium?.length ? (
          events.premium.map((event, index) => (
            <div className="carousel-item active" key={index}>
              <Link
                className="w-100"
                href={
                  event.event_type === 1
                    ? `/announcement/${event.slug}`
                    : `/event/${event.slug}`
                }
              >
                <div
                  className="meeta-hero-section"
                  style={{ backgroundImage: `url("${event.image_url}")` }}
                >
                  {/* <Image
                    className="hero-shape-01"
                    src="/assets/images/shape/shape-1.svg"
                    alt="shpae"
                    width={170}
                    height={170}
                    style={{ width: "inherit" }}
                  />
                  <Image
                    className="hero-shape-02"
                    src="/assets/images/shape/shape-2.png"
                    alt="shpae"
                    width={191}
                    height={173}
                    style={{ width: "inherit" }}
                  /> */}
                  <div className="container">
                    <div className="meeta-hero-content">
                      <div className="hero-content-shape">
                        {/* <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 1904.000000 1521.000000"
                          preserveAspectRatio="xMidYMid meet"
                        >
                          <defs>
                            <linearGradient
                              id="grad1"
                              x1="0%"
                              y1="0%"
                              x2="0%"
                              y2="100%"
                            >
                              <stop
                                offset="10%"
                                style={{ stopColor: "#c40378" }}
                              />
                              <stop
                                offset="90%"
                                style={{ stopColor: "#ff3866" }}
                              />
                            </linearGradient>
                          </defs>
                          <g
                            transform="translate(0.000000,1521.000000) scale(0.100000,-0.100000)"
                            fill="url(#grad1)"
                          >
                            <path d="M9505 14211 l-9500 -997 3 -34 c8 -94 1739 -13170 1744 -13175 4 -4 15636 1194 15645 1199 1 1 369 3140 818 6976 448 3836 818 6987 821 7003 5 22 2 27 -13 26 -10 -1 -4293 -450 -9518 -998z" />
                          </g>
                        </svg> */}
                        {/* <div className="hero-content-shape-01"></div>
                        <div
                          className="hero-content-shape-02 aos-init aos-animate"
                          data-aos="fade-right"
                        ></div>
                        <div
                          className="hero-content-shape-03 aos-init aos-animate"
                          data-aos="fade-right"
                        ></div>
                        <div
                          className="hero-content-shape-04 aos-init aos-animate"
                          data-aos="fade-left"
                        ></div>
                        <div
                          className="hero-content-shape-05 aos-init aos-animate"
                          data-aos="fade-left"
                        ></div> */}
                        {/* <Link href={event.event_type === 1 ? `/announcement/${event.slug}` : `/event/${event.slug}`}><h1 className="hero-title">{event.name}</h1></Link> */}
                        <div className="row">
                          <div className="col-md-12">
                            <p className="hero-date text-center">
                              {formatDate(event.event_date)}
                            </p>
                            <p>
                              <span className="hero-year">
                                {getYear(event.event_date)}
                              </span>
                            </p>
                            <p className="mb-0">
                              <Link
                                className="btn btn-3 btn-primary mt-3"
                                href={
                                  event.event_type === 1
                                    ? `/announcement/${event.slug}`
                                    : `/event/${event.slug}`
                                }
                              >
                                Click Here
                              </Link>
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          ))
        ) : (
          <p>No Premium events available</p>
        )}
      </ReactOwlCarousel>
    </div>
  );
};

export default Slider;
