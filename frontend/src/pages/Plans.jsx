import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../context/AuthContext";

const Plans = () => {
  const [plans, setPlans] = useState([]);
  const [loadingId, setLoadingId] = useState(null);
  const [message, setMessage] = useState(null);
  const { user } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    api.get("/plans").then((res) => setPlans(res.data)).catch(console.error);
  }, []);

  const handleChoosePlan = async (plan) => {
    setMessage(null);
    if (!user) {
      navigate("/login");
      return;
    }
    setLoadingId(plan._id);
    try {
      await api.post(`/plans/${plan._id}/subscribe`);
      setMessage({ type: "success", text: `${plan.name} plan activated! Check your email for confirmation.` });
    } catch (err) {
      setMessage({
        type: "error",
        text: err.response?.data?.message || "Could not activate plan. Please try again.",
      });
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <div className="min-h-screen bg-dark px-6 py-20">
      <div className="max-w-6xl mx-auto">
        <p className="uppercase tracking-[0.3em] text-primary text-sm mb-2 text-center">Our Gym Passes</p>
        <h2 className="text-3xl font-bold text-white text-center mb-10">Membership Plans</h2>

        {message && (
          <p
            className={`text-center mb-8 p-3 rounded-md text-sm max-w-md mx-auto ${
              message.type === "success" ? "bg-primary/20 text-primary" : "bg-red-900/40 text-red-300"
            }`}
          >
            {message.text}
          </p>
        )}

        <div className="grid md:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`rounded-xl p-8 text-center transition ${
                plan.isPopular
                  ? "bg-primary text-dark md:scale-105"
                  : "bg-surface border border-border text-gray-300 hover:border-primary"
              }`}
            >
              {plan.isPopular && (
                <span className="bg-dark text-primary text-xs px-3 py-1 rounded-full font-bold uppercase">
                  Most Popular
                </span>
              )}
              <h3 className={`text-2xl font-bold mt-4 ${plan.isPopular ? "text-dark" : "text-white"}`}>
                {plan.name}
              </h3>
              <p className="text-4xl font-extrabold my-4">
                ₹{plan.price}
                <span className={`text-base font-normal ${plan.isPopular ? "text-dark/70" : "text-gray-500"}`}>
                  /{plan.durationInMonths}mo
                </span>
              </p>
              <ul className={`space-y-2 mb-6 ${plan.isPopular ? "text-dark/80" : "text-gray-400"}`}>
                {plan.features.map((f) => (
                  <li key={f}>✔️ {f}</li>
                ))}
              </ul>
              <button
                onClick={() => handleChoosePlan(plan)}
                disabled={loadingId === plan._id}
                className={`px-6 py-2 rounded-full font-bold uppercase text-sm tracking-wide transition disabled:opacity-60 ${
                  plan.isPopular
                    ? "bg-dark text-primary hover:brightness-125"
                    : "bg-primary text-dark hover:brightness-90"
                }`}
              >
                {loadingId === plan._id ? "Activating..." : "Choose Plan"}
              </button>
            </div>
          ))}
        </div>

        {plans.length === 0 && (
          <p className="text-center text-gray-500 mt-10">
            No plans yet — run <code>node seed.js</code> in the backend to add sample plans.
          </p>
        )}
      </div>
    </div>
  );
};

export default Plans;
