import { NavLink, Outlet } from "react-router-dom";
import { Plane, TrainFront, Bus } from "lucide-react";

export default function Services() {
  return (
    <main className="page-container services-page">
      <section className="services-heading">
        <span className="eyebrow">OUR SERVICES</span>
        <h1>Choose Your Travel</h1>
        <p>Select flights, trains, or buses to explore available sample journeys.</p>
      </section>

      <section className="services-grid">
        <NavLink to="flights" className="service-tile flight-service">
          <div className="service-tile-icon"><Plane size={30} /></div>
          <h2>Flights</h2>
          <p>Explore sample flights between Indian cities.</p>
          <span className="service-explore">View Flights →</span>
        </NavLink>

        <NavLink to="trains" className="service-tile train-service">
          <div className="service-tile-icon"><TrainFront size={30} /></div>
          <h2>Trains</h2>
          <p>Discover sample train journeys and ticket prices.</p>
          <span className="service-explore">View Trains →</span>
        </NavLink>

        <NavLink to="buses" className="service-tile bus-service">
          <div className="service-tile-icon"><Bus size={30} /></div>
          <h2>Buses</h2>
          <p>Find sample bus routes for your next trip.</p>
          <span className="service-explore">View Buses →</span>
        </NavLink>
      </section>

      <Outlet />
    </main>
  );
}