import { useEffect, useState } from "react";
import api from "../api/axios";

const Trainers = () => {
  const [trainers, setTrainers] = useState([]);

  useEffect(() => {
    api.get("/trainers").then((res) => setTrainers(res.data)).catch(console.error);
  }, []);

  return (
    <div className="min-h-screen bg-dark px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-primary text-sm mb-2 text-center">Meet The Team</p>
        <h2 className="text-3xl font-bold text-white text-center mb-10">Our Best Coaches</h2>

        <div className="grid md:grid-cols-3 gap-8">
          {trainers.map((t) => (
            <div
              key={t._id}
              className="bg-surface border border-border rounded-xl overflow-hidden text-center hover:border-primary transition"
            >
              {t.image ? (
                <img src={t.image} alt={t.name} className="w-full h-56 object-cover" />
              ) : (
                <div className="w-full h-56 bg-dark border-b border-border flex items-center justify-center text-4xl font-bold text-primary">
                  {t.name.charAt(0)}
                </div>
              )}
              <div className="p-6">
                <h3 className="text-xl font-bold text-white">{t.name}</h3>
                <p className="text-primary font-medium text-sm uppercase tracking-wide">{t.specialty}</p>
                <p className="text-gray-500 text-sm mt-2">{t.experienceYears} years experience</p>
                <p className="text-gray-400 text-sm mt-2">{t.bio}</p>
              </div>
            </div>
          ))}
        </div>

        {trainers.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No trainers yet — run <code>node seed.js</code> in the backend to add sample trainers.
          </p>
        )}
      </div>
    </div>
  );
};

export default Trainers;
