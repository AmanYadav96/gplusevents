import React from "react";
import Image from "next/image";
import Header from "@/Component/Header";
import Footer from "@/Component/Footer";
import Link from "next/link";
import Head from "next/head";
import axios from "axios";
import Loading from "@/Component/Loading";
import PageHeader from "@/Component/PageHeader";
import { useState, useEffect } from "react";
import { CommonVariables } from "@/Component/CommonVariable";
import { Button, Card, Carousel } from "react-bootstrap";

const AnnouncementsList = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCountry, setSelectedCountry] = useState("");
  const [countryList, setCountryList] = useState([]);
  const [refreshList, setRefreshList] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchEvents = async (page = 1) => {
    try {
      const response = await axios.get(
        `${CommonVariables.API_URL}annocement_api/list`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.data.status_code === 1) {
        console.log(response.data.data);
        setEvents(response.data.data || []);
        setTotalPages(response.data.total_page);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
      setSubmitting(false);
    }
  };

  useEffect(() => {
    fetchEvents(currentPage);
  }, [currentPage, refreshList]);

  const handlePrevious = () => {
    if (currentPage > 1) {
      setCurrentPage((prevPage) => prevPage - 1);
      setLoading(true);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      setCurrentPage((prevPage) => prevPage + 1);
      setLoading(true);
    }
  };

  const handleSearch = () => {
    setSubmitting(true);
    setCurrentPage(1);
    setRefreshList(refreshList + 1);
  };

  const fetchCountryList = async (page = 1) => {
    try {
      const response = await axios.get(
        `${CommonVariables.API_URL}event/countrylist`,
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      if (response.data.status_code === 1) {
        setCountryList(response.data.data || []);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCountryList();
  }, [refreshList]);

  if (loading) {
    return (
      <div>
        <Loading />
      </div>
    );
  }

  return (
    <>
      <Head>
        <title>G plus Announcements - Announcements</title>
      </Head>
      <Header />
      { <PageHeader
        title={
          <>
            Announcements
            <br />
            <h2 className="second-title">Discover, Experience, Celebrate</h2>
          </>
        }
      />}
      <div className="bg-light">
        <div className="container">
          <div className="d-flex justify-content-between py-3">
            <h3>Recent Announcement</h3>
            <Button className="btn-danger text-light rounded-2">
              Make Announcement
            </Button>
          </div>
          {events?.map((event) => (
            <Card key={event.id}>
              <Card.Img
                variant="top"
                src={
                  event?.agreement_images[0] ||
                  "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                }
                height={400}
              />
              <Card.Body className="text-dark">
                <div className="d-flex align-items-center pb-2">
                  <img
                    src={
                      "https://letsenhance.io/static/8f5e523ee6b2479e26ecc91b9c25261e/1015f/MainAfter.jpg"
                    }
                    className="rounded-circle"
                    style={{ height: "2rem", width: "2rem" }}
                  />
                  <div className="ps-3">
                    <h6 className="p-0 m-0">Namit Yadav</h6>
                    <p className="p-0 m-0">1 hour ago</p>
                  </div>
                </div>
                <p className="pb-2">
                  {event?.end_date} | {event?.location}
                </p>
                <Card.Title>{event?.event_tour_name}</Card.Title>
                <Card.Text>{event?.about_event}</Card.Text>
              </Card.Body>
            </Card>
          ))}
        </div>
      </div>

      {/* </div> */}
      <Footer />
    </>
  );
};

export default AnnouncementsList;
