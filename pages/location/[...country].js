import Image from 'next/image';
import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import Link from 'next/link';
import axios from 'axios';
import Head from 'next/head';
import { CommonVariables } from '@/Component/CommonVariable';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';

const CountryEvents = ({ stateData, pdata, detail }) => {

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


    const [title, setTitle] = useState('');
    const router = useRouter();

    useEffect(() => {
        if (router) {
            const path = router.asPath || '';
            const name = path.split('/');
            const country = name.pop() || '';
            const countryName = country.replace(/-/g, ' ');
            setTitle(decodeURIComponent(countryName) || '');
        }
    }, [router]);

    const eventData = detail && detail.data;
    // console.log("eventData", eventData);
    // console.log("data", pdata);

    return (
        <>
            <Head>
                <title>G plus Events - Announcements</title>
            </Head>
            <Header />
            <div className="section page-banner-section">
                <div className="shape-2"></div>
                <div className="container">
                    <div className="page-banner-wrap">
                        <div className="row">
                            <div className="col-lg-12">
                                <div className="page-banner text-center">
                                    <p className="title text-capitalize">{title}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="meeta-speaker-single section-padding">
                <div className="container">
                    <div className="meeta-speaker-single-wrap">
                        <div className="row">
                            <div className="col-lg-4">
                                <div className="speaker-image-box text-center">
                                    <iframe
                                        // src={`https://www.google.com/maps/place/${encodeURIComponent(title)}`}
                                        // src={`https://www.google.com/maps/embed/v1/place?q=${encodeURIComponent(title)}`}
                                        src={`https://www.google.com/maps/embed/v1/place?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&q=${title}`}
                                        width="100%"
                                        height="450"
                                        style={{ border: "0", loading: "lazy", referrerpolicy: "no-referrer-when-downgrade" }}
                                    ></iframe>
                                </div>
                                <div className="form-btn text-center mb-lg-5 mb-4 mt-5">
                                    <h3 className="title">Become a Artist?</h3>
                                    {userData ? (
                                        <Link className="btn-2 mt-2" href="/add-announcement">Apply Now</Link>
                                    ) : (
                                        <Link className="btn-2 mt-2" href="/login">Apply Now</Link>
                                    )}
                                </div>
                            </div>
                            <div className="col-lg-8">
                                <div className="speaker-single-right">
                                    <div className="meeta-event-featured mt-0">
                                        <h3 className="main-title ">Announcements in <span className='text-capitalize'>{title}</span></h3>
                                        <div className="row">
                                            {/* {eventData && eventData.map((event, index) => (
                                                <div className="col-md-4  col-sm-6" key={event.id}>
                                                    <div className="single-item">
                                                        <div className="featured-img">
                                                            <Link href={`/announcement/${event.slug}`}><Image src={`${event.featured_image}`} height={137} width={203} alt="" /></Link>
                                                            <div className="top-meta">
                                                                <span className="date">{event.event_date}</span>
                                                            </div>
                                                        </div>
                                                        <Link href={`/announcement/${event.slug}`}>
                                                            <div className="featured-content">
                                                                <span className={`category ${index % 3 === 0 ? 'color-1' : index % 3 === 1 ? 'color-2' : 'color-3'}`}>Announcements</span>
                                                                <h3 className="title"><Link href={`/announcement/${event.slug}`}>{event.name}</Link></h3>
                                                                <span className="meta  text-capitalize"><i className="fas fa-map-marker-alt"></i>{event.city && `${event.city}, `}{event.state_province && `${event.state_province}, `} {event.country}</span>
                                                            </div>
                                                        </Link>
                                                    </div>
                                                </div>
                                            ))} */}

                                            {eventData && eventData.length > 0 ? (
                                                eventData
                                                    .filter(event => {
                                                        return (
                                                            (event.country).toLowerCase() === title.toLowerCase() ||
                                                            (event.state_province && event.state_province.toLowerCase() === title.toLowerCase()) ||
                                                            (event.city && event.city.toLowerCase() === title.toLowerCase())
                                                        );
                                                    })
                                                    .map((event, index) => (
                                                        <div className="col-md-4 col-sm-6" key={event.id}>
                                                            <div className="single-item">
                                                                <div className="featured-img">
                                                                    <Link href={`/announcement/${event.slug}`}><Image src={`${event.featured_image}`} height={150} width={200} alt="" /></Link>
                                                                </div>
                                                                <Link href={`/announcement/${event.slug}`}>
                                                                    <div className="featured-content">
                                                                        <span className={`category ${index % 3 === 0 ? 'color-1' : index % 3 === 1 ? 'color-2' : 'color-3'}`}>Announcements</span>
                                                                        <h3 className="title"><Link href={`/announcement/${event.slug}`}>{event.name}</Link></h3>
                                                                        <span className="meta text-capitalize"><i className="fas fa-map-marker-alt"></i>{event.city === null ? '' : `${event.city}, `} {event.state_province === null ? '' : `${event.state_province}, `} {event.country}
                                                                        </span>
                                                                    </div>
                                                                </Link>
                                                            </div>
                                                        </div>
                                                    ))
                                            ) : (
                                                <div>Currently, there are no announcements at this location.</div>
                                            )}
                                        </div>
                                    </div>
                                    {/* <div className="meeta-event-featured">
                                        <h3 className="main-title">Sub Locations</h3>
                                        <div className="row">
                                            {stateData && stateData.data && stateData.data.length > 0 ? (
                                                stateData.data.map((state, index) => (
                                                    <div className="col-md-4 col-sm-6" key={state.key}>
                                                        <div className="single-item" style={{ backgroundColor: "#edf2f4" }}>
                                                            <Link href={`/location/${pdata.country[0]}/${pdata.country[1] ? pdata.country[1] + '/' + state.slug : state.slug}`}>
                                                                <div className="featured-content" style={{ backgroundColor: "#edf2f4", boxShadow: 'inherit' }}>
                                                                    <span className={`category ${index % 3 === 0 ? 'color-1' : index % 3 === 1 ? 'color-2' : 'color-3'}`}>Events</span>
                                                                    <h3 className="title" style={{ fontSize: "16px" }}>
                                                                        <Link href={`/location/${pdata.country[0]}/${pdata.country[1] ? pdata.country[1] + '/' + state.slug : state.slug}`}>{state.name}</Link>
                                                                    </h3>
                                                                    <span className="meta text-capitalize" style={{ fontSize: "12px" }}>
                                                                        <i className="fas fa-map-marker-alt"></i>{pdata.country[0]}
                                                                    </span>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>
                                                ))
                                            ) : (
                                                <div>Currently, there are no scheduled events at this location.</div>
                                            )}
                                        </div>
                                    </div> */}
                                    {stateData && stateData !== null ? (
                                        stateData.data && stateData.data.length > 0 ? (
                                            stateData.data.some(state => state.name !== null) ? (
                                                <div className="meeta-event-featured">
                                                    <h3 className="main-title">Sub Locations</h3>
                                                    <div className="row">
                                                        {stateData.data.map((state, index) => (
                                                            state.name !== null && (
                                                                <div className="col-md-4 col-sm-6" key={state.key}>
                                                                    <div className="single-item" style={{ backgroundColor: "#edf2f4" }}>
                                                                        <Link href={`/location/${pdata.country[0]}/${pdata.country[1] ? pdata.country[1] + '/' + state.slug : state.slug}`}>
                                                                            <div className="featured-content" style={{ backgroundColor: "#edf2f4", boxShadow: 'inherit' }}>
                                                                                <span className={`category ${index % 3 === 0 ? 'color-1' : index % 3 === 1 ? 'color-2' : 'color-3'}`}>Events</span>
                                                                                <h3 className="title" style={{ fontSize: "16px" }}>
                                                                                    <Link href={`/location/${pdata.country[0]}/${pdata.country[1] ? pdata.country[1] + '/' + state.slug : state.slug}`}>{state.name}</Link>
                                                                                </h3>
                                                                                <span className="meta text-capitalize" style={{ fontSize: "12px" }}>
                                                                                    <i className="fas fa-map-marker-alt"></i>{pdata.country[0]}
                                                                                </span>
                                                                            </div>
                                                                        </Link>
                                                                    </div>
                                                                </div>
                                                            )
                                                        ))}
                                                    </div>
                                                </div>
                                            ) : (
                                                <div>Currently, there are no scheduled announcements at this location.</div>
                                            )
                                        ) : (
                                            null
                                        )
                                    ) : (
                                        <div>Currently, No Announcement Available.</div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            < Footer />
        </>
    )
}

export async function getStaticProps({ params }) {
    // console.log("params",params);
    let formPostdata = "";
    if (!params.country[0]) {
        return
    }
    if (params.country[0]) {
        const countryName = params.country[0].replace(/-/g, ' ');
        formPostdata = "?country=" + countryName;
        // console.log("formPostdata", formPostdata);
    }
    if (params.country[1]) {
        const stateName = params.country[1].replace(/-/g, ' ');
        formPostdata += "&state=" + stateName;
        // console.log("formPostdata1", formPostdata);
    }
    if (params.country[2]) {
        const cityName = params.country[2].replace(/-/g, ' ');
        formPostdata += "&city=" + cityName;
        // console.log("formPostdata2", formPostdata);
    }
    const response = await axios.get(`${CommonVariables.API_URL}event/event_location${formPostdata}&event_type=1`);
    const stateData = response.data.status_code == 1 ? response.data : [];
    // console.log("StateData", stateData);

    const announcement = await axios.get(`${CommonVariables.API_URL}event/front_list?event_type=1`);
    const detail = announcement.data.status_code == 1 ? announcement.data : [];
    // console.log("detail", announcement);

    return {
        props: {
            stateData: stateData ?? [],
            detail: detail ?? [],
            pdata: params ?? [],
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

export default CountryEvents