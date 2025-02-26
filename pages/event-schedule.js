import React from 'react';
import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import BackToTop from '@/Component/BackToTop';

const eventSchedule = () => {
  return (
  <>
  <Header/>
<div className="section page-banner-section">
    <div className="shape-2"></div>
    <div className="container">
        <div className="page-banner-wrap">
            <div className="row">
                <div className="col-lg-12">
                    <div className="page-banner text-center">
                        <h2 className="title">Event Schedule</h2>
                        
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<div className="schedule-section section-padding" style={{backgroundColor: 'white'}}>
    <div className="container">
        <div className="row">
            <div className="col-lg-9">
                <div className="schedule-tag">
                    <ul>
                        <li><a href="#">All Events</a></li>
                        <li><a href="#">Yoga & Arabic</a></li>
                        <li><a href="#">Hip Hop</a></li>
                        <li><a href="#">Indoor Cycling</a></li>
                        <li><a href="#">Workout</a></li>
                    </ul>
                </div>
                <div className="schedule-table table-responsive">
                    <table className="table table-bordered">
                        <thead>
                            <tr>
                                <th className="day"></th>
                                <th className="day color-4">Sunday</th>
                                <th className="day color-2">Monday</th>
                                <th className="day color-3">Tuesday</th>
                                <th className="day color-1">Wednesday</th>
                                <th className="day color-2">Thursday</th>
                                <th className="day color-4">Friday</th>
                                <th className="day color-3">Saturday</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="hour">
                                    07:00
                                </td>
                                <td className="bg-1">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Registration For Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td className="bg-2">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td className="bg-4">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Registration For Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td className="hour">
                                    08:00
                                </td>
                                <td className="bg-3">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td className="bg-4">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td className="bg-1">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td className="hour">
                                    09:00
                                </td>
                                <td className="bg-2">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td className="bg-3">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Registration For Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td className="bg-4">
                                    <div className="schedule-text">
                                        <span className="time">09AM-11AM</span>
                                        <h3 className="title">Dance</h3>
                                        <p>Netflix Studio</p>
                                    </div>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td className="hour">
                                    10:00
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                            <tr>
                                <td className="hour">
                                    11:00
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                                <td>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className="col-lg-3">
                <div className="schedule-sidebar-wrap">
                    <div className="schedule-sidebar">
                        <h3 className="main-title">Ongoing Events</h3>
                        <div className="schedule-post">
                            <ul>
                                <li>
                                    <a className="post-link" href="event-single">
                                        <div className="post-thumb">
                                            <Image src="/assets/images/blog/r-post-1.jpg" height={61} width={61} alt=""/>
                                        </div>
                                        <div className="post-text">
                                            <h3 className="title">Hip Hop</h3>
                                            <p className="time">09 AM-11 AM</p>
                                            <span>Netflix Studio</span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="post-link" href="event-single">
                                        <div className="post-thumb">
                                            <Image src="/assets/images/blog/r-post-2.jpg" height={61} width={61} alt=""/>
                                        </div>
                                        <div className="post-text">
                                            <h3 className="title">Dance</h3>
                                            <p className="time">09 AM-11 AM</p>
                                            <span>Netflix Studio</span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="post-link" href="event-single">
                                        <div className="post-thumb">
                                            <Image src="/assets/images/blog/r-post-3.jpg" height={61} width={61} alt=""/>
                                        </div>
                                        <div className="post-text">
                                            <h3 className="title">Cycling</h3>
                                            <p className="time">09 AM-11 AM</p>
                                            <span>Netflix Studio</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                    <div className="schedule-sidebar">
                        <h3 className="main-title">Upcoming Events</h3>
                        <div className="schedule-post">
                            <ul>
                                <li>
                                    <a className="post-link" href="event-single">
                                        <div className="post-thumb">
                                            <Image src="/assets/images/blog/r-post-1.jpg" height={61} width={61} alt=""/>
                                        </div>
                                        <div className="post-text">
                                            <h3 className="title">Hip Hop</h3>
                                            <p className="time">09 AM-11 AM</p>
                                            <span>Netflix Studio</span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="post-link" href="event-single">
                                        <div className="post-thumb">
                                            <Image src="/assets/images/blog/r-post-2.jpg" height={61} width={61} alt=""/>
                                        </div>
                                        <div className="post-text">
                                            <h3 className="title">Dance</h3>
                                            <p className="time">09 AM-11 AM</p>
                                            <span>Netflix Studio</span>
                                        </div>
                                    </a>
                                </li>
                                <li>
                                    <a className="post-link" href="event-single">
                                        <div className="post-thumb">
                                            <Image src="/assets/images/blog/r-post-3.jpg" height={61} width={61}  alt=""/>
                                        </div>
                                        <div className="post-text">
                                            <h3 className="title">Cycling</h3>
                                            <p className="time">09 AM-11 AM</p>
                                            <span>Netflix Studio</span>
                                        </div>
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
<BackToTop/>
<Footer/>
  </>
  )
}

export default eventSchedule