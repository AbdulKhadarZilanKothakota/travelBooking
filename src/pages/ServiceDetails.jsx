import { useState } from "react";
import { useLocation, Link } from "react-router-dom";
import { Plane, TrainFront, Bus, Search } from "lucide-react";
import { travelData } from "../data/travelData";
import TravelCard from "../components/TravelCard";

const serviceInfo = {
  flights: {
    title: "Flights across India",
    description: "Explore sample air routes connecting major Indian cities.",
    icon: Plane
  },
  trains: {
    title: "Discover train journeys",
    description: "Browse sample train services and their journey information.",
    icon: TrainFront
  },
  buses: {
    title: "Travel by bus",
    description: "Find sample bus services for intercity travel.",
    icon: Bus
  }
};

export default function ServiceDetails({ onBook }) {
  const location = useLocation();
  const type = location.pathname.split("/").pop();
  const info = serviceInfo[type];
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  if (!info) {
    return (
      <div className="empty-state">
        <h2>Service not found</h2>
        <Link className="button" to="/services">View services</Link>
      </div>
    );
  }

  const Icon = info.icon;
  const results = travelData[type].filter((item) =>
    item.from.toLowerCase().includes(from.toLowerCase()) &&
    item.to.toLowerCase().includes(to.toLowerCase())
  );

  return (
    <section className="service-content">
      <div className="service-intro">
        <span className={`service-large-icon ${type}`}><Icon size={30} /></span>
        <div>
          <h2>{info.title}</h2>
          <p>{info.description}</p>
        </div>
      </div>

      <div className="service-filter">
        <label>
          From
          <input value={from} onChange={(e) => setFrom(e.target.value)}
            placeholder="Enter departure city" />
        </label>
        <label>
          To
          <input value={to} onChange={(e) => setTo(e.target.value)}
            placeholder="Enter destination city" />
        </label>
        <button className="button" onClick={() => { setFrom(""); setTo(""); }}>
          <Search size={17} /> Reset
        </button>
      </div>

      <div className="travel-grid">
        {results.map((item) => (
          <TravelCard key={item.id} item={item} type={type} onBook={onBook} />
        ))}
      </div>

      {!results.length && (
        <div className="empty-state">
          <h3>No journeys found</h3>
          <p>Try another city or reset the search.</p>
        </div>
      )}
    </section>
  );
}