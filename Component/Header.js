import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';

const Header = (props) => {
  // const userData = secureLocalStorage.getItem("userdata");
  // console.log("userData", userData);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      if (typeof secureLocalStorage !== 'undefined') {
        const userDataFromSecureLocalStorage = secureLocalStorage.getItem("userdata");
        if (userDataFromSecureLocalStorage) {
          setUserData(JSON.parse(userDataFromSecureLocalStorage));
        }
      } else {
        console.error("secureLocalStorage is not defined");
      }
    }
  }, []);

  return (
    <div className="main-wrapper">
      <div className="meeta-header-section">
        <div className="header-middle header-sticky">
          <div className="container-fluid custom-container">
            <div className="row align-items-center">
              <div className="col-lg-3 col-4">
                <div className="header-logo">
                  <Link href="/"><Image src="/assets/images/logo.png" height={68} width={100} alt="Logo" /></Link>
                </div>
              </div>
              <div className="col-lg-6 d-none d-lg-block">
                <div className="header-navigation">
                  <ul className="main-menu">
                    <li className="relative group">
                      <Link className="active-menu" href="/"><p>Home</p></Link>
                    </li>
                    <li className="relative group">
                      <Link className="active-menu" href="/about"><p>About</p></Link>
                    </li>
                   
                    <li className="relative group">
                      <Link className="active-menu" href="/collaborate"><p>Collaborate</p></Link>
                    </li>
                    <li className="relative group">
                      <Link className="active-menu" href="/announcements"><p>Announcements</p></Link>
                    </li>
                    <li className="relative group">
                      <Link className="active-menu" href="/event-list"><p>Events</p></Link>
                    </li>
                    {/* <li className="relative group">
                      <Link className="active-menu" href="/partners"><p>Partners</p></Link>
                    </li> */}
                    {/* {userData ? (
                      <li className="relative group">
                        <Link className="active-menu" href="/add-event">
                          <p>Add Event</p>
                        </Link>
                      </li>
                    ) : <li className="relative group">
                      <Link className="active-menu" href="/login">
                        <p>Add Event</p>
                      </Link>
                    </li>}
                    {userData ? (
                      <li className="relative group">
                        <Link className="active-menu" href="/add-announcement">
                          <p>Add Announcement</p>
                        </Link>
                      </li>
                    ) : <li className="relative group">
                      <Link className="active-menu" href="/login">
                        <p>Add Announcement</p>
                      </Link>
                    </li>} */}
                    {/* <ul className="sub-menu">
                      <li><a href="#">Search</a></li>
                      <li><a href="#">By Ticket</a></li>
                    </ul> */}
                  </ul>
                </div>
              </div>
              <div className="col-lg-3 col-8">
                <div className="header-meta">
                  {/* <div className="header-actions">
                    <div className="header-action d-none d-sm-block">
                      <div className="header-search">
                        <a className="search-btn" href="#"><i className="flaticon-loupe"></i></a>
                        <div className="search-wrap">
                          <div className="search-inner">
                            <i id="search-close" className="flaticon-close search-close"></i>
                            <div className="search-cell">
                              <form action="#">
                                <div className="search-field-holder">
                                  <input className="main-search-input" type="search" placeholder="Search Your Keyword..." />
                                </div>
                              </form>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div> */}
                  <div className="header-btn d-none d-md-block">
                    {userData ? (
                      <Link className="btn btn-3 btn-primary" href="/my-account"><p>My Account</p></Link>
                    ) : (
                      <Link className="btn btn-3 btn-primary" href="/login"><p>My Account</p></Link>
                    )}
                    {/* <a href="price" className="btn btn-3 btn-primary">Buy Ticket</a> */}
                  </div>
                  <div className="header-toggle d-md-none">
                    <button data-bs-toggle="offcanvas" data-bs-target="#offcanvasExample">
                      <span></span>
                      <span></span>
                      <span></span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="offcanvas offcanvas-start" id="offcanvasExample">
        <div className="offcanvas-header">
          <div className="offcanvas-logo">
            <Link href="/"><Image src="/assets/images/logo.png" height={114} width={100} alt="" /></Link>
          </div>
          <button type="button" className="close-btn" data-bs-dismiss="offcanvas"><i className="flaticon-close"></i></button>
        </div>
        <div className="offcanvas-body">
          <div className="offcanvas-menu">
            <ul className="main-menu">
              <li className="relative group">

                <Link className="active-menu" href="/"><p>Home</p></Link>
              </li>
              <li className="relative group">
                <Link className="active-menu" href="/about"><p>About</p></Link>
              </li>
              <li className="relative group">
                <Link className="active-menu" href="/event-list"><p>Events</p></Link>
              </li>
              <li className="relative group">
                <Link className="active-menu" href="/announcements"><p>Announcements</p></Link>
              </li>
              <li className="relative group">
                <Link className="active-menu" href="/collaborate"><p>Collaborate</p></Link>
              </li>
              {/* <li className="relative group">
                <Link className="active-menu" href="/partners"><p>Partners</p></Link>
              </li> */}
              <li className="relative group">
                <Link className="active-menu" href="/my-account"><p>My Account</p></Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Header;
