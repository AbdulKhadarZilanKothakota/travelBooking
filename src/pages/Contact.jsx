import { useState } from "react";
import { Mail, Phone, MapPin, Send } from "lucide-react";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    setStatus(`Thank you, ${form.name}! Your demo message has been submitted.`);
    setForm({ name: "", email: "", message: "" });
  }

  return (
    <main className="page-container">
      <section className="page-banner">
        <span className="eyebrow">CONTACT US</span>
        <h1>We would love to hear from you.</h1>
        <p>Have a question about the demo? Send us a message below.</p>
      </section>

      <section className="contact-layout">
        <div className="contact-info">
          <h2>Get in touch</h2>
          <p>Use the form for this project's sample contact interaction.</p>
          <div><Mail /><span><strong>Email</strong><br />hello@exploreindia.example</span></div>
          <div><Phone /><span><strong>Phone</strong><br />+91 98765 43210</span></div>
          <div><MapPin /><span><strong>Location</strong><br />India</span></div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit}>
          <h2>Send a message</h2>
          <label>
            Your name
            <input required value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="Enter your name" />
          </label>
          <label>
            Email address
            <input required type="email" value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
              placeholder="you@example.com" />
          </label>
          <label>
            Message
            <textarea required rows="4" value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              placeholder="How can we help?" />
          </label>
          <button className="button" type="submit"><Send size={17} /> Send Message</button>
          {status && <p className="success-message">{status}</p>}
          <p className="sample-note">Demo form only. Messages are not sent to a server.</p>
        </form>
      </section>
    </main>
  );
}