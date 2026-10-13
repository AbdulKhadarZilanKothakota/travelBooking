import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  UserRound,
  Ticket,
  CalendarCheck,
  CircleX,
  Plane,
  LogOut
} from "lucide-react";

export default function Profile({
  bookings,
  cancelledBookings,
  onCancel
}) {
  const savedUser = sessionStorage.getItem("exploreIndiaUser");
  const user = savedUser ? JSON.parse(savedUser) : null;
  const [activeTab, setActiveTab] = useState("active");
  const navigate = useNavigate();

  function handleLogout() {
    sessionStorage.removeItem("exploreIndiaUser");
    navigate("/", { replace: true });
    window.location.reload();
  }

  const displayedBookings =
    activeTab === "active" ? bookings : cancelledBookings;

  return (
    <main className="page-container profile-page">
      <section className="profile-header">
        <div className="profile-avatar">
          <UserRound size={34} />
        </div>

        <div className="profile-user">
          <span className="eyebrow">MY ACCOUNT</span>
          <h1>{user?.name || "Guest Traveller"}</h1>
          <p>
            {user?.email || "Login or sign up to view your demo profile."}
          </p>
        </div>

        <div className="profile-header-action">
          {user ? (
            <button
              type="button"
              className="profile-logout-button"
              onClick={handleLogout}
            >
              <LogOut size={17} />
              Logout
            </button>
          ) : (
            <Link to="/login" className="button">
              Login / Sign Up
            </Link>
          )}
        </div>
      </section>

      <section className="profile-stats">
        <article>
          <Ticket />
          <span>Active Bookings</span>
          <strong>{bookings.length}</strong>
        </article>

        <article>
          <CalendarCheck />
          <span>Trips Managed</span>
          <strong>{bookings.length + cancelledBookings.length}</strong>
        </article>

        <article>
          <CircleX />
          <span>Cancelled Bookings</span>
          <strong>{cancelledBookings.length}</strong>
        </article>
      </section>

      <section className="profile-bookings">
        <div className="profile-bookings-heading">
          <div>
            <span className="eyebrow">TRAVEL ACTIVITY</span>
            <h2>My Bookings</h2>
          </div>

          <Link to="/services" className="text-link">
            Book a trip →
          </Link>
        </div>

        <div className="profile-tabs">
          <button
            className={activeTab === "active" ? "active" : ""}
            onClick={() => setActiveTab("active")}
          >
            Active ({bookings.length})
          </button>

          <button
            className={activeTab === "cancelled" ? "active" : ""}
            onClick={() => setActiveTab("cancelled")}
          >
            Cancelled ({cancelledBookings.length})
          </button>
        </div>

        {displayedBookings.length === 0 ? (
          <div className="empty-state">
            <Plane size={35} />
            <h3>
              {activeTab === "active"
                ? "No active bookings"
                : "No cancelled bookings"}
            </h3>
            <p>
              {activeTab === "active"
                ? "Choose a flight, train, or bus to add a demo booking."
                : "Your cancelled bookings will appear here."}
            </p>

            {activeTab === "active" && (
              <Link to="/services" className="button">
                Explore Services
              </Link>
            )}
          </div>
        ) : (
          <div className="booking-list">
            {displayedBookings.map((booking) => (
              <article className="booking-row" key={booking.bookingId}>
                <div className={`travel-icon ${booking.type}`}>
                  {booking.type === "flights"
                    ? "✈"
                    : booking.type === "trains"
                    ? "🚆"
                    : "🚌"}
                </div>

                <div className="booking-main">
                  <h3>{booking.name}</h3>
                  <p>{booking.from} → {booking.to}</p>
                  <span className="muted">{booking.time}</span>
                </div>

                <strong className="price">
                  ₹{booking.price.toLocaleString("en-IN")}
                </strong>

                {activeTab === "active" ? (
                  <button
                    className="cancel-button"
                    onClick={() => onCancel(booking.bookingId)}
                  >
                    Cancel
                  </button>
                ) : (
                  <span className="cancelled-label">Cancelled</span>
                )}
              </article>
            ))}
          </div>
        )}
      </section>
    </main>
  );
}
