import { Compass, ShieldCheck, Heart, MapPinned } from "lucide-react";

export default function About() {
  return (
    <main className="page-container about-page">
      <section className="about-hero">
        <div className="about-hero-content">
          <span className="eyebrow">ABOUT EXPLORE INDIA</span>
          <h1>Your journey.<br /><span>Your India.</span></h1>
          <p>
            Discover new places and plan your next trip with convenient
            travel options for flights, trains, and buses.
          </p>
        </div>
        <div className="about-illustration">
          <img
            src="https://images.unsplash.com/photo-1524492412937-b28074a5d7da?auto=format&fit=crop&w=900&q=85"
            alt="Taj Mahal in India"
          />
          <div className="about-image-label">
            <Compass size={21} />
            <span>Explore incredible India</span>
          </div>
        </div>
      </section>

      <section className="about-mission">
        <span className="eyebrow">WHO WE ARE</span>
        <h2>Travel planning made simple</h2>
        <p>
          Explore India is a travel-booking demonstration project built with
          React. It brings sample transport options into one place so users
          can explore journeys, review fares, and manage demo bookings easily.
        </p>
      </section>

      <section className="about-features">
        <article>
          <span><MapPinned /></span>
          <h3>Explore destinations</h3>
          <p>Discover sample journeys between popular Indian cities.</p>
        </article>
        <article>
          <span><ShieldCheck /></span>
          <h3>Simple experience</h3>
          <p>Search routes and review travel information with ease.</p>
        </article>
        <article>
          <span><Heart /></span>
          <h3>Travel your way</h3>
          <p>Choose flights, trains, or buses to suit your journey.</p>
        </article>
      </section>

      <div className="about-note">
        This is a frontend learning project. It does not provide real tickets
        or live transport availability.
      </div>
    </main>
  );
}