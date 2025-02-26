import React from 'react'
import Link from 'next/link';
import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import secureLocalStorage  from 'react-secure-storage';
import { useRouter } from 'next/router';
import { useState } from 'react';

const VideoGallery = () => {
  const router = useRouter();

  /////////////////Userdata/////////////////////
  let userdata_res
  let token;
  if (typeof window !== "undefined") {
    const userdata = secureLocalStorage.getItem("userdata");
    userdata_res = userdata ? JSON.parse(userdata) : {};
    // console.log(userdata_res);
    token = userdata_res.token;

    if (!userdata_res.token) {
      router.push('/login')
      // console.log("Redirecting to login");
    }
  }
  //////////////////////////////////////////////////////

  const [showConfirmation, setShowConfirmation] = useState(false);

  const handleClick = () => {
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    // Logic to publish the video
    // You can put your publish logic here

    // After publishing, close the confirmation popup
    setShowConfirmation(false);
  };

  const handleCancel = () => {
    // If user cancels, simply close the confirmation popup
    setShowConfirmation(false);
  };

  return (
    <>
      <Header />
      <PageHeader title={"Event Video Gallery"} />
      <div className="section login-register-section section-padding">
        <div className="container">
          <div className="login-register-wrap">
            <div className="login-register-box p-3">
              <div className="login-register-form">
                <div className="single-form text-center">
                  <input type="file" className="form-control" />
                  <Image src="/assets/images/event-bg-1.jpg" alt="" width={332} height={175} />
                </div>
              </div>
              <div className="form-btn mt-5">
                <span>
                  <Link className="btn btn-default float-start" href="#" style={{ marginRight: '30px' }}>Delete</Link>
                  <Link href="#" className="btn-2">Add More</Link>
                </span>
              </div>
            </div>
            <div className='row mt-5'>
              <div className='col-lg-9 col-sm-6 col-12'>
                <button className="btn btn-default" style={{ marginRight: '10px' }} onClick={handleClick}>Skip</button>
              </div>
              <div className='col-lg-3 col-sm-6 col-12 text-end'>
                <div className='row'>
                  <div className='col-md-6 text-end'>
                    <Link href="/add-image" className="btn-2">Back</Link>
                  </div>
                  <div className='col-md-6'>
                    <button className="btn-2" onClick={handleClick}>Next</button>
                  </div>
                </div>
              </div>
            </div>
            <br />
            {showConfirmation && (
              <div className="section login-register-section">
                <div className="container">
                  <div className="login-register-wrap">
                    <div className="login-register-box p-3">
                      <div className="login-register-form">
                        <div className="single-form text-center">
                          <h2 className="mt-3">Do you confirm to publish event?</h2>
                          <div className='row mt-4'>
                            <div className='col-md-6 text-end'>
                              <Link className="btn btn-default" href="/" style={{ marginRight: '10px' }} onClick={handleCancel}>Cancel</Link>
                            </div>
                            <div className='col-md-6 text-start'>
                              <Link className="btn-2" href="/thankyou" onClick={handleConfirm}>Publish</Link>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

          </div>
        </div>
      </div>
      <Footer />
    </>
  )
}
export default VideoGallery
