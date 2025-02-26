import React from 'react';
import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import Link from 'next/link';
import Head from 'next/head';
import axios from 'axios';
import Loading from '@/Component/Loading';
import PageHeader from '@/Component/PageHeader';
import { useState, useEffect } from 'react';
import { CommonVariables } from '@/Component/CommonVariable';

const EventList = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCountry, setSelectedCountry] = useState('');
    const [countryList, setCountryList] = useState([]);
    const [refreshList, setRefreshList] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);

    const fetchEvents = async (page = 1) => {
        try {
            const response = await axios.get(`${CommonVariables.API_URL}event/front_list?event_type=2 &removepast=1&search_key=${searchQuery.toLowerCase()}&country=${selectedCountry.toLowerCase()}&page_no=${page}&per_page=6`, {
                headers: {
                    "content-type": "application/json",
                }
            });
            if (response.data.status_code === 1) {
                setEvents(response.data.data || []);
                setTotalPages(response.data.total_page);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
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
            setCurrentPage(prevPage => prevPage - 1);
            setLoading(true);
        }
    };

    const handleNext = () => {
        if (currentPage < totalPages) {
            setCurrentPage(prevPage => prevPage + 1);
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
            const response = await axios.get(`${CommonVariables.API_URL}event/countrylist`, {
                headers: {
                    "content-type": "application/json",
                }
            });
            if (response.data.status_code === 1) {
                setCountryList(response.data.data || []);
            }
        } catch (error) {
            console.error('Error fetching events:', error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCountryList();
    }, [refreshList]);

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <>
            <Head>
                <title>G plus Events - Events</title>
            </Head>
            <Header />
            <PageHeader title={<>Events<br /><h2 className='second-title'>Discover, Experience, Celebrate</h2></>} />
            <div className="meeta-event-list section-padding" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="meeta-event-list-wrap">
                        <div className="event-list-top-bar">
                            <div className="row">
                                <div className="col-lg-8">
                                    <div className="event-list-search">
                                        <div className="row g-0">
                                            <div className="col-md-5">
                                                <div className="single-form">
                                                    <i className="fas fa-search"></i>
                                                    <input type="text"
                                                        value={searchQuery}
                                                        onChange={(e) => setSearchQuery(e.target.value)}
                                                        placeholder="Search events..." />
                                                </div>
                                            </div>
                                            <div className="col-md-5">
                                                <div className="single-form form-border">
                                                    <i className="fas fa-map-marker-alt"></i>
                                                    <select value={selectedCountry} onChange={(e) => setSelectedCountry(e.target.value)}>
                                                        <option value="">All Location</option>
                                                        {[...new Set(countryList.map(data => data.country))].map(country => (
                                                            <option key={country} value={country} selected={selectedCountry === country}>
                                                                {country}
                                                            </option>
                                                        ))}
                                                    </select>
                                                </div>
                                            </div>
                                            <div className="col-md-2">
                                                <div className="form-btn">
                                                    <button className="btn btn-primary" onClick={handleSearch} disabled={submitting}>{submitting ? "Searching.." : "Find Event"}</button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="event-filter-wrap">
                                        <div className="event-collapse-btn">
                                            <Link href="/add-event">
                                                <button className="btn btn-primary text-white">
                                                    Create Event
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-lg-2">
                                    <div className="event-filter-wrap">
                                        <div className="event-collapse-btn">
                                            <Link href="#">
                                                <button className="btn btn-primary text-white">
                                                    Watch Live
                                                </button>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="event-list-content-wrap">
                            <div className="tab-content">
                                <div className="tab-pane show active" id="list">
                                    {events.length > 0 ? (
                                        events.map((sortedData) => (
                                            <div className="event-list-item event-list align-items-center" key={sortedData.id}>
                                                <div className='row'>
                                                    <div className='col-md-4'>
                                                        <div className="event-img">
                                                            <Link href={`/event/${sortedData.slug}`}>
                                                                <Image className='w-100' src={`${sortedData.featured_image}`} alt="" height={200} width={340} />
                                                            </Link>
                                                        </div>
                                                    </div>
                                                    <div className='col-md-8'>
                                                        <div className="event-list-content">
                                                            <h3 className="title"><Link href={`/event/${sortedData.slug}`}>{sortedData.name} </Link></h3>
                                                            <div className="meta-data">
                                                                <span><i className="fas fa-calendar-alt"></i> {sortedData.event_date}</span>
                                                                <span><i className="fas fa-map-marker-alt"></i> <Link href="#">{sortedData.city}, {sortedData.state_province}<span><i className="fas fa-map-marker-alt"></i> {sortedData.country}</span></Link></span>
                                                            </div>
                                                            <div className="event-desc" style={{ maxHeight: '100px', overflow: 'hidden' }}>
                                                                <p dangerouslySetInnerHTML={{ __html: sortedData.short_description }}></p>
                                                            </div>
                                                            <Link className="ticket-link" href={`/event/${sortedData.slug}`}>Get Ticket Now</Link>
                                                        </div>
                                                    </div>
                                                </div>
                                                <span className="event-time"><span>{sortedData.event_time}</span></span>
                                            </div>
                                        ))
                                    ) : (
                                        <div className="text-center mt-5 pt-lg-5">
                                            <Image src="/assets/images/search-error.png" width={300} height={228} alt="Image" />
                                            <h2 className='mt-4 text-danger'>No events match your search criteria.</h2>
                                            <p>Please consider exploring other events or refining your search to discover more options.</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                        {events.length > 0 && totalPages > 1 ? <div className="event-next-prev-btn text-center">
                            <button className="event-btn btn btn-primary mt-4" onClick={handlePrevious} disabled={currentPage === 1}>
                                <i className="flaticon-back"></i> Previous
                            </button>
                            <button className="event-btn btn-next btn btn-primary mt-4" onClick={handleNext} disabled={currentPage === totalPages}>
                                Next <i className="flaticon-next"></i>
                            </button>
                        </div> : null}
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}

export default EventList;
