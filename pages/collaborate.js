import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import Collaborators from '@/Component/collaborators';
import axios from 'axios';
import Link from 'next/link';
import { CommonVariables } from '@/Component/CommonVariable';
import { useState, useEffect } from 'react';
import Head from 'next/head';
import Loading from '@/Component/Loading';

const Collaborate = () => {
    // User List API
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(true);
    const [nationalPromoters, setNationalPromoters] = useState([]);
    const [organizers, setOrganizers] = useState([]);
    const [eventManagers, setEventManagers] = useState([]);
    const [artists, setArtists] = useState([]);
    const [organisations, setOrganisations] = useState([]);
    const [serviceProviders, setServiceProviders] = useState([]);
    const [leaders, setLeaders] = useState([]);
    const [celebrityManagers, setCelebrityManagers] = useState([]);

    // Filtered User Lists
    const [filteredNationalPromoters, setFilteredNationalPromoters] = useState([]);
    const [filteredOrganizers, setFilteredOrganizers] = useState([]);
    const [filteredEventManagers, setFilteredEventManagers] = useState([]);
    const [filteredArtists, setFilteredArtists] = useState([]);
    const [filteredOrganisations, setFilteredOrganisations] = useState([]);
    const [filteredServiceProviders, setFilteredServiceProviders] = useState([]);
    const [filteredLeaders, setFilteredLeaders] = useState([]);
    const [filteredCelebrityManagers, setFilteredCelebrityManagers] = useState([]);

    useEffect(() => {
        const fetchUserList = async (userType, setUserList) => {
            try {
                const response = await axios.post(
                    CommonVariables.API_URL + "user/list",
                    {
                        user_type: userType
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        }
                    }
                );
                if (response.data.status_code === 1) {
                    setUserList(response.data.data);
                } else {
                    setError("Failed to fetch user list");
                }
            } catch (error) {
                console.error('Error fetching user list:', error);
                setError("Error fetching user list");
            } finally {
                setLoading(false);
            }
        };

        fetchUserList(9, setNationalPromoters);
        fetchUserList(11, setOrganizers);
        fetchUserList(12, setEventManagers);
        fetchUserList(13, setArtists);
        fetchUserList(14, setOrganisations);
        fetchUserList(15, setServiceProviders);
        fetchUserList(16, setLeaders);
        fetchUserList(17, setCelebrityManagers);
    }, []);

    const handleSearch = (e, userType) => {
        const searchTerm = e.target.value.toLowerCase();
        switch (userType) {
            case 'nationalPromoters':
                setFilteredNationalPromoters(nationalPromoters.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            case 'organizers':
                setFilteredOrganizers(organizers.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            case 'eventManagers':
                setFilteredEventManagers(eventManagers.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            case 'artists':
                setFilteredArtists(artists.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            case 'organisations':
                setFilteredOrganisations(organisations.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            case 'serviceProviders':
                setFilteredServiceProviders(serviceProviders.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            case 'leaders':
                setFilteredLeaders(leaders.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            case 'celebrityManagers':
                setFilteredCelebrityManagers(celebrityManagers.filter(user =>
                    user.name.toLowerCase().includes(searchTerm)
                ));
                break;
            default:
                break;
        }
    };

    if (loading) {
        return <div><Loading /></div>;
    }

    return (
        <>
            <Head>
                <title>G plus Events - Collaborate</title>
            </Head>
            <Header />
            <PageHeader title={<>Collaborate<br /><h2 className='second-title'>Unite, Create, Engage</h2></>} />
            <div className="section login-register-section section-padding" style={{ backgroundColor: 'white' }}>
            <div className="section login-register-section section-padding" style={{ backgroundColor: 'white' }}>
    <div className="container">
        <div className="row">
            <div className="col-12">
                <h2 className="title text-center mb-4" style={{ fontSize: '42px' }}>Collaborators</h2>
            </div>
        </div>
        <div className="row gx-4 gy-3">
            {/* National Promoter */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3"  style={{ fontSize: '32px' }}>National Promoter</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search National Promoters"
                        onChange={(e) => handleSearch(e, 'nationalPromoters')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=9">Become a Promoter</Link>
                </div>
                <Collaborators users={filteredNationalPromoters.length ? filteredNationalPromoters : nationalPromoters} usertype={9} />
            </div>
            {/* Organizer */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3" style={{ fontSize: '32px' }}>Organizer</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search Organizers"
                        onChange={(e) => handleSearch(e, 'organizers')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=11">Become an Organizer</Link>
                </div>
                <Collaborators users={filteredOrganizers.length ? filteredOrganizers : organizers} usertype={11} />
            </div>
            {/* Event Manager */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3" style={{ fontSize: '32px' }}>Event Manager</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search Event Managers"
                        onChange={(e) => handleSearch(e, 'eventManagers')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=12">Become a Manager</Link>
                </div>
                <Collaborators users={filteredEventManagers.length ? filteredEventManagers : eventManagers} usertype={12} />
            </div>
            {/* Artist */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3" style={{ fontSize: '32px' }}>Artist</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search Artists"
                        onChange={(e) => handleSearch(e, 'artists')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=13">Become an Artist</Link>
                </div>
                <Collaborators users={filteredArtists.length ? filteredArtists : artists} usertype={13} />
            </div>
            {/* Organisation */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3" style={{ fontSize: '32px' }}>Organisation</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search Organisations"
                        onChange={(e) => handleSearch(e, 'organisations')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=14">Register Organisation</Link>
                </div>
                <Collaborators users={filteredOrganisations.length ? filteredOrganisations : organisations} usertype={14} />
            </div>
            {/* Service Provider */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3" style={{ fontSize: '32px' }}>Service Provider</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search Service Providers"
                        onChange={(e) => handleSearch(e, 'serviceProviders')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=15">Become a Provider</Link>
                </div>
                <Collaborators users={filteredServiceProviders.length ? filteredServiceProviders : serviceProviders} usertype={15} />
            </div>
            {/* Leader */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3" style={{ fontSize: '32px' }}>Leader</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search Leaders"
                        onChange={(e) => handleSearch(e, 'leaders')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=16">Become a Leader</Link>
                </div>
                <Collaborators users={filteredLeaders.length ? filteredLeaders : leaders} usertype={16} />
            </div>
            {/* Celebrity Manager */}
            <div className="col-12 d-flex flex-column align-items-center text-center mb-4">
                <div className="d-flex align-items-center justify-content-between w-100">
                    <h4 className="sub-title me-3" style={{ fontSize: '32px' }}>Celebrity Manager</h4>
                    <input
                        type="text"
                        className="form-control mb-2"
                        style={{ maxWidth: '600px' }}
                        placeholder="Search Celebrity Managers"
                        onChange={(e) => handleSearch(e, 'celebrityManagers')}
                    />
                    <Link className="btn-2 mt-2 ms-3" href="/register?usertype=17">Become a Manager</Link>
                </div>
                <Collaborators users={filteredCelebrityManagers.length ? filteredCelebrityManagers : celebrityManagers} usertype={17} />
            </div>
        </div>
    </div>
</div>


</div>

            <Footer />
        </>
    );
};

export default Collaborate;
