import { Ticket, Trash2 } from "lucide-react";

export default function Bookings({ bookings, onCancel }) {
  return (
    <main className="page-container">
      <section className="page-banner">
        <span className="eyebrow">YOUR TRAVEL</span>
        <h1>My Bookings</h1>
        <p>View the sample journeys you have selected during this session.</p>
      </section>

      {bookings.length === 0 ? (
        <div className="empty-state">
          <Ticket size={42} />
          <h2>No bookings yet</h2>
          <p>Explore available journeys and select Book Now to add one here.</p>
          <a href="/services" className="button">Explore Services</a>
        </div>
      ) : (
        <div className="booking-list">
          {bookings.map((booking) => (
            <article className="booking-row" key={booking.bookingId}>
              <div className={`travel-icon ${booking.type}`}>
                {booking.type === "flights" ? "✈" : booking.type === "trains" ? "🚆" : "🚌"}
              </div>
              <div className="booking-main">
                <h3>{booking.name}</h3>
                <p>{booking.from} → {booking.to}</p>
                <span className="muted">{booking.time} · Demo booking</span>
              </div>
              <strong className="price">₹{booking.price.toLocaleString("en-IN")}</strong>
              <button className="cancel-button" onClick={() => onCancel(booking.bookingId)}>
                <Trash2 size={17} /> Cancel
              </button>
            </article>
          ))}
        </div>
      )}
    </main>
  );
}