import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../api/axios";

const Dashboard = () => {
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [me, setMe] = useState(null);

  useEffect(() => {
    api.get("/bookings/my").then((res) => setBookings(res.data)).catch(console.error);
    api.get("/auth/me").then((res) => setMe(res.data)).catch(console.error);
  }, []);

  const membership = me?.membership;

  return (
    <div className="min-h-screen bg-dark px-6 py-20">
      <div className="max-w-4xl mx-auto">
        <h2 className="text-3xl font-bold mb-1 text-white">Welcome, {user?.name} 👋</h2>
        <p className="text-gray-500 mb-8">{user?.email}</p>

        <div className="bg-surface border border-border rounded-xl p-6 mb-10">
          <h3 className="text-xl font-semibold mb-3 text-white">Membership Status</h3>
          {membership?.isActive ? (
            <div className="flex justify-between items-center">
              <div>
                <p className="font-bold text-primary">{membership.plan?.name} Plan</p>
                <p className="text-sm text-gray-400">
                  ₹{membership.plan?.price} / {membership.plan?.durationInMonths} month
                  {membership.plan?.durationInMonths > 1 ? "s" : ""}
                </p>
                <p className="text-sm text-gray-500">
                  Active since {new Date(membership.startDate).toDateString()}
                </p>
              </div>
              <span className="bg-primary/20 text-primary px-3 py-1 rounded-full text-sm font-medium">
                Active
              </span>
            </div>
          ) : (
            <p className="text-gray-400">
              No active plan yet. Head over to <a href="/plans" className="text-primary font-semibold">Plans</a> to choose one.
            </p>
          )}
        </div>

        <h3 className="text-xl font-semibold mb-4 text-white">My Bookings</h3>
        {bookings.length === 0 ? (
          <p className="text-gray-400">No bookings yet. Head over to Trainers to book a session.</p>
        ) : (
          <div className="space-y-4">
            {bookings.map((b) => (
              <div
                key={b._id}
                className="bg-surface border border-border rounded-lg p-4 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-white">{b.trainer?.name}</p>
                  <p className="text-sm text-gray-400">{b.trainer?.specialty}</p>
                </div>
                <div className="text-right text-sm text-gray-300">
                  <p>{new Date(b.date).toDateString()}</p>
                  <p className="text-gray-500">{b.timeSlot}</p>
                  <span className="inline-block mt-1 px-2 py-1 rounded-full text-xs bg-dark border border-border">
                    {b.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
