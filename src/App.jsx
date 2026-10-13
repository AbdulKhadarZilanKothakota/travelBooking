import { useState } from "react";
import {
  Routes,
  Route,
  useNavigate,
  Navigate,
  Link
} from "react-router-dom";
import { CheckCircle2 } from "lucide-react";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import About from "./pages/About";
import Services from "./pages/Services";
import ServiceDetails from "./pages/ServiceDetails";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Profile from "./pages/Profile";

function NotFound() {
  return (
    <main className="empty-state page-container">
      <h1>404 - Page Not Found</h1>
      <p>The page you are looking for does not exist.</p>
      <Link to="/" className="button">
        Go Home
      </Link>
    </main>
  );
}

export default function App() {
  const [bookings, setBookings] = useState([]);
  const [cancelledBookings, setCancelledBookings] = useState([]);
  const [notice, setNotice] = useState("");

  const navigate = useNavigate();

  // Book a sample journey
  function handleBook(item, type) {
    const booking = {
      ...item,
      type,
      bookingId: `${type}-${item.id}-${Date.now()}`
    };

    setBookings((current) => [...current, booking]);
    setNotice(`${item.name} added to your bookings.`);
    navigate("/profile");
  }

  // Cancel a booking and retain its history
  function handleCancel(bookingId) {
    const booking = bookings.find(
      (item) => item.bookingId === bookingId
    );

    if (!booking) return;

    setBookings((current) =>
      current.filter((item) => item.bookingId !== bookingId)
    );

    setCancelledBookings((current) => [
      booking,
      ...current
    ]);

    setNotice("Booking cancelled successfully.");
  }

  return (
    <div className="app">
      <Navbar />

      {notice && (
        <div className="notice-toast" role="status">
          <CheckCircle2 size={18} />
          <span>{notice}</span>

          <button
            onClick={() => setNotice("")}
            aria-label="Dismiss notification"
          >
            ×
          </button>
        </div>
      )}

      <Routes>
        {/* Home */}
        <Route
          path="/"
          element={<Home onBook={handleBook} />}
        />

        {/* About Us */}
        <Route
          path="/about"
          element={<About />}
        />

        {/* Services with nested routing */}
        <Route
          path="/services"
          element={<Services />}
        >
          <Route
            index
            element={<Navigate to="flights" replace />}
          />

          <Route
            path="flights"
            element={<ServiceDetails onBook={handleBook} />}
          />

          <Route
            path="trains"
            element={<ServiceDetails onBook={handleBook} />}
          />

          <Route
            path="buses"
            element={<ServiceDetails onBook={handleBook} />}
          />
        </Route>

        {/* Contact */}
        <Route
          path="/contact"
          element={<Contact />}
        />

        {/* Login and Sign Up */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* Profile and booking management */}
        <Route
          path="/profile"
          element={
            <Profile
              bookings={bookings}
              cancelledBookings={cancelledBookings}
              onCancel={handleCancel}
            />
          }
        />

        {/* Unknown routes */}
        <Route
          path="*"
          element={<NotFound />}
        />
      </Routes>

      <footer className="footer">
        <div className="footer-inner">
          <Link to="/" className="brand footer-brand">
            Explore<span className="brand-highlight">India</span>
          </Link>

          <p>Discover India, one journey at a time.</p>

          <span>
            © {new Date().getFullYear()} Explore India
          </span>
        </div>
      </footer>
    </div>
  );
}
