import { useState } from "react";
import { Link } from "react-router-dom";
import { Plane, TrainFront, Bus, Search, ShieldCheck, Headphones } from "lucide-react";
import { travelData } from "../data/travelData";
import TravelCard from "../components/TravelCard";

export default function Home({ onBook }) {
  const [type, setType] = useState("flights");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const results = travelData[type].filter((item) =>
    item.from.toLowerCase().includes(from.toLowerCase()) &&
    item.to.toLowerCase().includes(to.toLowerCase())
  );

  const tabs = [
    { id: "flights", label: "Flights", icon: Plane },
    { id: "trains", label: "Trains", icon: TrainFront },
    { id: "buses", label: "Buses", icon: Bus }
  ];

  return (
    <>
      <section className="hero">
        <div className="hero-content">
          <span className="eyebrow">YOUR JOURNEY STARTS HERE</span>
          <h1>Discover India.<br /><span>Travel Your Way.</span></h1>
          <p>Find your next journey with simple and convenient travel options across India.</p>
          <a href="#search" className="button hero-button">Explore Trips <span>→</span></a>
        </div>
        <div className="hero-stats">
          <div><strong>3</strong><span>Travel options</span></div>
          <div><strong>9+</strong><span>Sample journeys</span></div>
          <div><strong>1</strong><span>Beautiful country</span></div>
        </div>
      </section>

      <section className="search-section section-container" id="search">
        <div className="section-heading">
          <span className="eyebrow">PLAN YOUR TRIP</span>
          <h2>Where would you like to go?</h2>
          <p>Choose your travel option and find a sample journey.</p>
        </div>

        <div className="search-panel">
          <div className="travel-tabs">
            {tabs.map(({ id, label, icon: Icon }) => (
              <button
                key={id}
                className={`travel-tab ${type === id ? "active" : ""}`}
                onClick={() => setType(id)}
              >
                <Icon size={19} /> {label}
              </button>
            ))}
          </div>

          <div className="search-fields">
            <label>
              From
              <div className="input-wrap">
                <MapPinIcon />
                <input value={from} onChange={(e) => setFrom(e.target.value)}
                  placeholder="Departure city" />
              </div>
            </label>
            <label>
              To
              <div className="input-wrap">
                <MapPinIcon />
                <input value={to} onChange={(e) => setTo(e.target.value)}
                  placeholder="Destination city" />
              </div>
            </label>
            <button className="button search-button" onClick={() =>
              document.getElementById("results").scrollIntoView({ behavior: "smooth" })
            }>
              <Search size={18} /> Search
            </button>
          </div>
          <p className="sample-note">Sample booking data for demonstration only.</p>
        </div>
      </section>

      <section className="section-container results-section" id="results">
        <div className="results-heading">
          <div>
            <span className="eyebrow">TRAVEL OPTIONS</span>
            <h2>Popular journeys</h2>
          </div>
          <Link to="/services" className="text-link">All services →</Link>
        </div>

        {results.length ? (
          <div className="travel-grid">
            {results.map((item) => (
              <TravelCard key={item.id} item={item} type={type} onBook={onBook} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={30} />
            <h3>No matching journeys</h3>
            <p>Try a different departure or destination city.</p>
            <button className="button" onClick={() => { setFrom(""); setTo(""); }}>
              Clear Search
            </button>
          </div>
        )}
      </section>

      <section className="benefits">
        <div className="section-container benefits-grid">
          <div><ShieldCheck /><h3>Simple booking</h3><p>Choose a journey and book with one click.</p></div>
          <div><Search /><h3>Easy search</h3><p>Filter sample routes by departure and destination.</p></div>
          <div><Headphones /><h3>Travel information</h3><p>View journey details in one convenient place.</p></div>
        </div>
      </section>
    </>
  );
}

function MapPinIcon() {
  return <span className="field-icon">⌖</span>;
}