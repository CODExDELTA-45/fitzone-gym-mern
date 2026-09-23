import { Link } from "react-router-dom";

const features = [
  { title: "Muscle Building", desc: "Structured strength programs designed by certified coaches." },
  { title: "Flexible Plans", desc: "Membership plans that fit every budget and goal." },
  { title: "Modern Equipment", desc: "State-of-the-art gear for strength & cardio training." },
];

const HERO_IMG =
  "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=1600&q=80";

const Home = () => (
  <div className="bg-dark">
    {/* HERO */}
    <section
      className="min-h-[85vh] flex flex-col justify-center items-center text-center px-6 border-b border-border relative overflow-hidden bg-cover bg-center"
      style={{ backgroundImage: `linear-gradient(rgba(13,13,13,0.75), rgba(13,13,13,0.9)), url(${HERO_IMG})` }}
    >
      <p className="uppercase tracking-[0.3em] text-primary text-sm mb-4">Convenient Location & Schedule</p>
      <h1 className="text-5xl md:text-6xl font-extrabold mb-6 text-white uppercase leading-tight">
        Work With <span className="text-primary">Professionals</span>
      </h1>
      <p className="text-gray-300 max-w-xl mb-10">
        Join FitZone Gym today and get access to world-class coaches, flexible
        membership plans, and a community that pushes you to be your best.
      </p>
      <div className="flex gap-4">
        <Link
          to="/register"
          className="bg-primary text-dark px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide hover:brightness-90 transition"
        >
          Start Now
        </Link>
        <Link
          to="/plans"
          className="border border-gray-500 text-white px-8 py-3 rounded-full text-sm font-bold uppercase tracking-wide hover:border-primary hover:text-primary transition"
        >
          Learn More →
        </Link>
      </div>
    </section>

    {/* WHY CHOOSE US */}
    <section className="max-w-6xl mx-auto px-8 py-20">
      <p className="uppercase tracking-[0.3em] text-primary text-sm mb-2 text-center">Why Choose Us</p>
      <h2 className="text-3xl font-bold text-white text-center mb-12">Built For Real Results</h2>

      <div className="grid md:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div
            key={f.title}
            className={`rounded-xl p-8 transition ${
              i === 0
                ? "bg-primary text-dark"
                : "bg-surface border border-border text-gray-300 hover:border-primary"
            }`}
          >
            <h3 className="text-xl font-bold mb-3">{f.title}</h3>
            <p className={i === 0 ? "text-dark/80" : "text-gray-400"}>{f.desc}</p>
          </div>
        ))}
      </div>
    </section>

    {/* GYM GALLERY STRIP */}
    <section className="grid grid-cols-2 md:grid-cols-4 gap-1">
      {[
        "https://images.unsplash.com/photo-1571902943202-507ec2618e8f?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1550345332-09e3ac987658?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1583454110551-21f2fa2afe61?auto=format&fit=crop&w=500&q=80",
        "https://images.unsplash.com/photo-1526506118085-60ce8714f8c5?auto=format&fit=crop&w=500&q=80",
      ].map((src) => (
        <img key={src} src={src} alt="Gym" className="h-48 w-full object-cover grayscale hover:grayscale-0 transition" />
      ))}
    </section>
  </div>
);

export default Home;
