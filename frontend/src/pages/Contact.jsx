import { useState } from "react";
import api from "../api/axios";

const BANNER_IMG =
  "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=1200&q=80";

const Contact = () => {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("");
    try {
      await api.post("/contact", form);
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      setStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-dark px-6 py-20">
      <div className="max-w-lg mx-auto bg-surface border border-border rounded-xl overflow-hidden">
        <img src={BANNER_IMG} alt="FitZone Gym" className="w-full h-40 object-cover" />
        <div className="p-8">
          <p className="uppercase tracking-[0.3em] text-primary text-sm mb-2 text-center">Get In Touch</p>
          <h2 className="text-2xl font-bold text-white text-center mb-8">Contact Us</h2>

          {status === "success" && (
            <p className="bg-primary/20 text-primary p-3 rounded-md mb-4 text-sm text-center">
              Message sent! Check your email for a confirmation.
            </p>
          )}
          {status === "error" && (
            <p className="bg-red-900/40 text-red-300 p-3 rounded-md mb-4 text-sm text-center">
              Something went wrong. Please try again.
            </p>
          )}

          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              placeholder="Your Name"
              required
              className="bg-dark border border-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Your Email"
              required
              className="bg-dark border border-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
            <textarea
              placeholder="Your Message"
              required
              rows={5}
              className="bg-dark border border-border rounded-md p-3 text-white placeholder-gray-500 focus:outline-none focus:border-primary"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
            />
            <button className="bg-primary text-dark py-3 rounded-md font-bold uppercase tracking-wide hover:brightness-90 transition">
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
