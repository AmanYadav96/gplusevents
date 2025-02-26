import React, { useEffect, useState } from "react";

const LocalEventsComponent = () => {
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [location, setLocation] = useState("");
  const [manualLocation, setManualLocation] = useState("");

  // Fetch user's geolocation
  useEffect(() => {
    const fetchUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setLocation(`${latitude},${longitude}`);
          },
          (err) => {
            console.error("Error fetching location:", err);
            setError(
              "Location access is required to fetch events near you. You can manually enter your location below."
            );
            setLoading(false);
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
        setLoading(false);
      }
    };

    fetchUserLocation();
  }, []);

  // Fetch events based on the location (geolocation or manual input)
  useEffect(() => {
    if (!location && !manualLocation) return;

    const fetchEvents = async () => {
      setLoading(true);
      const apiKey = "YOUR_GOOGLE_API_KEY"; // Replace with your API Key
      const searchEngineId = "YOUR_SEARCH_ENGINE_ID"; // Replace with your Search Engine ID
      const query = `events near ${manualLocation || location}`;

      const apiUrl = `https://www.googleapis.com/customsearch/v1?q=${encodeURIComponent(
        query
      )}&cx=${searchEngineId}&key=${apiKey}`;

      try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        if (data.items) {
          setEvents(
            data.items.map((item) => ({
              title: item.title,
              link: item.link,
              snippet: item.snippet,
              displayLink: item.displayLink,
            }))
          );
        } else {
          setEvents([]);
        }
      } catch (err) {
        console.error("Error fetching events:", err);
        setError("Failed to load events. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, [location, manualLocation]);

  const handleManualLocationSubmit = (e) => {
    e.preventDefault();
    if (manualLocation.trim()) {
      setLocation(""); // Clear geolocation to prioritize manual input
    }
  };

  if (loading) {
    return <p>Loading events...</p>;
  }

  return (
    <div className="container">
      <div className="meeta-section-title mb-0 text-center">
        <h2 className="main-title">Local Events</h2>
      </div>
      {error && (
        <div className="alert alert-warning text-center">
          <p>{error}</p>
          <form onSubmit={handleManualLocationSubmit}>
            <input
              type="text"
              value={manualLocation}
              onChange={(e) => setManualLocation(e.target.value)}
              placeholder="Enter your city or area"
              className="form-control mb-3"
            />
            <button type="submit" className="btn btn-primary">
              Search Events
            </button>
          </form>
        </div>
      )}
      {events.length > 0 ? (
        <div className="row">
          {events.map((event, index) => (
            <div
              key={index}
              className="col-lg-4 col-md-6 mb-4"
              style={{
                border: "1px solid #ddd",
                padding: "20px",
                borderRadius: "8px",
              }}
            >
              <h4 className="event-title">
                <a
                  href={event.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ textDecoration: "none", color: "#007bff" }}
                >
                  {event.title}
                </a>
              </h4>
              <p>{event.snippet}</p>
              <small className="text-muted">{event.displayLink}</small>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-center">No events found.</p>
      )}
    </div>
  );
};

export default LocalEventsComponent;
