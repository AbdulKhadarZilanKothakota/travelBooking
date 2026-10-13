import { Clock3, MapPin, ArrowRight } from "lucide-react";

export default function TravelCard({ item, type, onBook }) {
  return (
    <article className="travel-card">
      <div className="travel-card-top">
        <div className={`travel-icon ${type}`}>
          {type === "flights" ? "✈" : type === "trains" ? "🚆" : "🚌"}
        </div>
        <span className="travel-type">
          {type.slice(0, 1).toUpperCase() + type.slice(1)}
        </span>
      </div>

      <h3>{item.name}</h3>

      <div className="route">
        <div>
          <span className="muted">FROM</span>
          <strong>{item.from}</strong>
        </div>
        <ArrowRight size={20} className="route-arrow" />
        <div className="route-destination">
          <span className="muted">TO</span>
          <strong>{item.to}</strong>
        </div>
      </div>

      <div className="travel-time">
        <span><Clock3 size={16} /> {item.time}</span>
        <span>{item.duration}</span>
      </div>

      <div className="travel-card-bottom">
        <div>
          <span className="muted">Starting from</span>
          <strong className="price">₹{item.price.toLocaleString("en-IN")}</strong>
        </div>
        <button className="button button-small" onClick={() => onBook(item, type)}>
          Book Now
        </button>
      </div>
    </article>
  );
}