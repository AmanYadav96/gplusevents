import Header from '@/Component/Header';
import Footer from '@/Component/Footer';
import PageHeader from '@/Component/PageHeader';
import axios from 'axios';
import Link from 'next/link';
import CountryFlag from 'react-country-flag';
import { CommonVariables } from '@/Component/CommonVariable';
import countries from 'i18n-iso-countries';
countries.registerLocale(require('i18n-iso-countries/langs/en.json'));
import { useState, useEffect } from 'react';
import secureLocalStorage from 'react-secure-storage';
import Head from 'next/head';
import https from "https";

const agent = new https.Agent({  
  rejectUnauthorized: false,  // ⚠️ Ignore SSL errors (not recommended for production)
});

const mapLocationToCountryCode = (locationName) => {
    const countryCodes = {

        "United States": "US",
        "Afghanistan": "AF",
        "land Islands": "AX",
        "Albania": "AL",
        "Algeria": "DZ",
        "American Samoa": "AS",
        "AndorrA": "AD",
        "Angola": "AO",
        "Anguilla": "AI",
        "Antarctica": "AQ",
        "Antigua and Barbuda": "AG",
        "Argentina": "AR",
        "Armenia": "AM",
        "Aruba": "AW",
        "Australia": "AU",
        "Austria": "AT",
        "Azerbaijan": "AZ",
        "Bahamas": "BS",
        "Bahrain": "BH",
        "Bangladesh": "BD",
        "Barbados": "BB",
        "Belarus": "BY",
        "Belgium": "BE",
        "Belize": "BZ",
        "Benin": "BJ",
        "Bermuda": "BM",
        "Bhutan": "BT",
        "Bolivia": "BO",
        "Bosnia and Herzegovina": "BA",
        "Botswana": "BW",
        "Bouvet Island": "BV",
        "Brazil": "BR",
        "British Indian Ocean Territory": "IO",
        "Brunei Darussalam": "BN",
        "Bulgaria": "BG",
        "Burkina Faso": "BF",
        "Burundi": "BI",
        "Cambodia": "KH",
        "Cameroon": "CM",
        "Canada": "CA",
        "Cape Verde": "CV",
        "Cayman Islands": "KY",
        "Central African Republic": "CF",
        "Chad": "TD",
        "Chile": "CL",
        "China": "CN",
        "Christmas Island": "CX",
        "Cocos (Keeling) Islands": "CC",
        "Colombia": "CO",
        "Comoros": "KM",
        "Congo": "CG",
        "Congo, The Democratic Republic of the": "CD",
        "Cook Islands": "CK",
        "Costa Rica": "CR",
        "Cote D": "CI",
        "Croatia": "HR",
        "Cuba": "CU",
        "Cyprus": "CY",
        "Czech Republic": "CZ",
        "Denmark": "DK",
        "Djibouti": "DJ",
        "Dominica": "DM",
        "Dominican Republic": "DO",
        "Ecuador": "EC",
        "Egypt": "EG",
        "El Salvador": "SV",
        "Equatorial Guinea": "GQ",
        "Eritrea": "ER",
        "Estonia": "EE",
        "Ethiopia": "ET",
        "Falkland Islands (Malvinas)": "FK",
        "Faroe Islands": "FO",
        "Fiji": "FJ",
        "Finland": "FI",
        "France": "FR",
        "French Guiana": "GF",
        "French Polynesia": "PF",
        "French Southern Territories": "TF",
        "Gabon": "GA",
        "Gambia": "GM",
        "Georgia": "GE",
        "Germany": "DE",
        "Ghana": "GH",
        "Gibraltar": "GI",
        "Greece": "GR",
        "Greenland": "GL",
        "Grenada": "GD",
        "Guadeloupe": "GP",
        "Guam": "GU",
        "Guatemala": "GT",
        "Guernsey": "GG",
        "Guinea": "GN",
        "Guinea-Bissau": "GW",
        "Guyana": "GY",
        "Haiti": "HT",
        "Heard Island and Mcdonald Islands": "HM",
        "Holy See (Vatican City State)": "VA",
        "Honduras": "HN",
        "Hong Kong": "HK",
        "Hungary": "HU",
        "Iceland": "IS",
        "India": "IN",
        "Indonesia": "ID",
        "Iran, Islamic Republic of": "IR",
        "Iraq": "IQ",
        "Ireland": "IE",
        "Isle of Man": "IM",
        "Israel": "IL",
        "Italy": "IT",
        "Jamaica": "JM",
        "Japan": "JP",
        "Jersey": "JE",
        "Jordan": "JO",
        "Kazakhstan": "KZ",
        "Kenya": "KE",
        "Kiribati": "KI",
        "Korea, Democratic People": "KP",
        "Korea, Republic of": "KR",
        "Kuwait": "KW",
        "Kyrgyzstan": "KG",
        "Lao People": "LA",
        "Latvia": "LV",
        "Lebanon": "LB",
        "Lesotho": "LS",
        "Liberia": "LR",
        "Libyan Arab Jamahiriya": "LY",
        "Liechtenstein": "LI",
        "Lithuania": "LT",
        "London": "GB",
        "Luxembourg": "LU",
        "Macao": "MO",
        "Macedonia, The Former Yugoslav Republic of": "MK",
        "Madagascar": "MG",
        "Malawi": "MW",
        "Malaysia": "MY",
        "Maldives": "MV",
        "Mali": "ML",
        "Malta": "MT",
        "Marshall Islands": "MH",
        "Martinique": "MQ",
        "Mauritania": "MR",
        "Mauritius": "MU",
        "Mayotte": "YT",
        "Mexico": "MX",
        "Micronesia, Federated States of": "FM",
        "Moldova, Republic of": "MD",
        "Monaco": "MC",
        "Mongolia": "MN",
        "Montenegro": "ME",
        "Montserrat": "MS",
        "Morocco": "MA",
        "Mozambique": "MZ",
        "Myanmar": "MM",
        "Namibia": "NA",
        "Nauru": "NR",
        "Nepal": "NP",
        "Netherlands": "NL",
        "Netherlands Antilles": "AN",
        "New Caledonia": "NC",
        "New York": "US",
        "New Zealand": "NZ",
        "Nicaragua": "NI",
        "Niger": "NE",
        "Nigeria": "NG",
        "Niue": "NU",
        "Norfolk Island": "NF",
        "Northern Mariana Islands": "MP",
        "Norway": "NO",
        "Oman": "OM",
        "Pakistan": "PK",
        "Palau": "PW",
        "Palestinian Territory, Occupied": "PS",
        "Panama": "PA",
        "Papua New Guinea": "PG",
        "Paraguay": "PY",
        "Peru": "PE",
        "Philippines": "PH",
        "Pitcairn": "PN",
        "Poland": "PL",
        "Portugal": "PT",
        "Puerto Rico": "PR",
        "Qatar": "QA",
        "Reunion": "RE",
        "Romania": "RO",
        "Russia": "RU",
        "Rwanda": "RW",
        "Saint Helena": "SH",
        "Saint Kitts and Nevis": "KN",
        "Saint Lucia": "LC",
        "Saint Pierre and Miquelon": "PM",
        "Saint Vincent and The Grenadines": "VC",
        "Samoa": "WS",
        "San Marino": "SM",
        "Sao Tome and Principe": "ST",
        "Saudi Arabia": "SA",
        "Senegal": "SN",
        "Serbia": "RS",
        "Seychelles": "SC",
        "Sierra Leone": "SL",
        "Singapore": "SG",
        "Slovakia": "SK",
        "Slovenia": "SI",
        "Somalia": "SO",
        "South Africa": "ZA",
        "South Georgia and The South Sandwich Islands": "GS",
        "Spain": "ES",
        "Sri Lanka": "LK",
        "Sudan": "SD",
        "Suriname": "SR",
        "Svalbard and Jan Mayen": "SJ",
        "Swaziland": "SZ",
        "Sweden": "SE",
        "Switzerland": "CH",
        "Syrian Arab Republic": "SY",
        "Taiwan, Province of China": "TW",
        "Tajikistan": "TJ",
        "Tanzania, United Republic of": "TZ",
        "Thailand": "TH",
        "Timor-Leste": "TL",
        "Togo": "TG",
        "Tokelau": "TK",
        "Tonga": "TO",
        "Trinidad and Tobago": "TT",
        "Tunisia": "TN",
        "Turkey": "TR",
        "Turkmenistan": "TM",
        "Turks and Caicos Islands": "TC",
        "Tuvalu": "TV",
        "Uganda": "UG",
        "Ukraine": "UA",
        "United Arab Emirates": "AE",
        "United Kingdom": "GB",
        "United States Minor Outlying Islands": "UM",
        "Uruguay": "UY",
        "Uzbekistan": "UZ",
        "Vanuatu": "VU",
        "Venezuela": "VE",
        "Viet Nam": "VN",
        "Virgin Islands, British": "VG",
        "Virgin Islands, U.S.": "VI",
        "Wallis and Futuna": "WF",
        "Western Sahara": "EH",
        "Yemen": "YE",
        "Zambia": "ZM",
        "Zimbabwe": "ZW"
    }

    return countryCodes[locationName] || '';
};

const Locations = ({ countryData }) => {
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
        <>
            <Head>
                <title>G plus Events - Announcements</title>
            </Head>
            <Header />
            <PageHeader title={"Announcements"} />
            <div className="section login-register-section section-padding" style={{ backgroundColor: 'white' }}>
                <div className="container">
                    <div className="form-btn text-center mb-lg-5 mb-4">
                        <h3 className="title">Become a National Promoter?</h3>
                        {userData ? (
                            <Link className="btn-2 mt-2" href="/add-announcement">Apply Now</Link>
                        ) : (
                            <Link className="btn-2 mt-2" href="/login">Apply Now</Link>
                        )}
                    </div>
                    <div className="location">
                        <div className="row">
                            {/* <ul className="nav nav-tabs" id="myTab" role="tablist">
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link active" id="first-tab" data-bs-toggle="tab" data-bs-target="#firsttab" type="button" role="tab" aria-controls="firsttab" aria-selected="true">Europe & Africa</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="second-tab" data-bs-toggle="tab" data-bs-target="#secondtab" type="button" role="tab" aria-controls="secondtab" aria-selected="false">America</button>
                                </li>
                                <li className="nav-item" role="presentation">
                                    <button className="nav-link" id="third-tab" data-bs-toggle="tab" data-bs-target="#thirdtab" type="button" role="tab" aria-controls="thirdtab" aria-selected="false">Asia & Pacific</button>
                                </li>
                            </ul> */}
                            {countryData && countryData.data && countryData.data.length > 0 ? (
                                countryData.data.map((country) => (
                                    <div className="col-md-4" key={country.key}>
                                        <div className="location-item">
                                            <Link
                                                className="box w-100"
                                                href={`/location/${(country.slug).toLowerCase().replace(/%20|\s/g, '-')}`}
                                                style={{ paddingRight: "8vw", backgroundColor: "#edf2f4" }}
                                            >
                                                {/* <CountryFlag
                                                    countryCode={mapLocationToCountryCode(
                                                        countries.getName(country.name, 'en', { select: 'official' }) || country.name
                                                    )}
                                                    svg
                                                    className="flag-icon mt-1"
                                                    style={{ width: '35px', height: 'auto' }}
                                                /> */}
                                                {/* <h4>{countries.getName(country.name, 'en', { select: 'official' }) || country.name}</h4> */}
                                                <CountryFlag countryCode={mapLocationToCountryCode(country.name)} svg className="flag-icon mt-1" style={{ width: '35px', height: 'auto' }} />
                                                <h4>{country.name}</h4>
                                            </Link>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div>No data available</div>
                            )}

                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}
export async function getStaticProps() {

    const countryres = await axios.get(`${CommonVariables.API_URL}event/event_location?event_type=1`, {
        httpsAgent: agent,  // Use the agent here
      });
    const countryData = countryres.data.status_code == 1 ? countryres.data : [];
    // console.log("countryData", countryData);

    return {
        props: {
            countryData: countryData ?? [],
        },
        revalidate: 10,
    };

}

export default Locations