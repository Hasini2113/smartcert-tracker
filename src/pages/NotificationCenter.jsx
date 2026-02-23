import { useState } from "react";
import DashboardLayout from "../layouts/DashboardLayout";
import { Bell, Trash2, Check } from "lucide-react";

function NotificationCenter({ certifications }) {
  const generateNotifications = () => {
    const today = new Date();
    const alerts = [];

    certifications.forEach((cert) => {
      const expiryDate = new Date(cert.expiryDate);
      const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));

      // Expired - 0 days left
      if (daysLeft < 0) {
        alerts.push({
          id: `${cert.id}-expired`,
          certId: cert.id,
          certName: cert.name,
          organization: cert.organization,
          type: "expired",
          message: `Your certification "${cert.name}" expired ${Math.abs(daysLeft)} days ago`,
          daysLeft,
          severity: "critical",
          read: false,
          date: new Date().toISOString(),
        });
      }
      // Expiring within 7 days
      else if (daysLeft <= 7 && daysLeft > 0) {
        alerts.push({
          id: `${cert.id}-expiring`,
          certId: cert.id,
          certName: cert.name,
          organization: cert.organization,
          type: "expiring",
          message: `Your certification "${cert.name}" will expire in ${daysLeft} days`,
          daysLeft,
          severity: "urgent",
          read: false,
          date: new Date().toISOString(),
        });
      }
      // Expiring within 30 days
      else if (daysLeft <= 30 && daysLeft > 7) {
        alerts.push({
          id: `${cert.id}-soon`,
          certId: cert.id,
          certName: cert.name,
          organization: cert.organization,
          type: "expiring_soon",
          message: `Your certification "${cert.name}" will expire in ${daysLeft} days`,
          daysLeft,
          severity: "warning",
          read: false,
          date: new Date().toISOString(),
        });
      }
    });

    return alerts.sort((a, b) => a.daysLeft - b.daysLeft);
  };

  const [notifications, setNotifications] = useState(generateNotifications());
  const [filterRead, setFilterRead] = useState("all");

  const handleMarkAsRead = (id) => {
    setNotifications(
      notifications.map((notif) =>
        notif.id === id ? { ...notif, read: true } : notif
      )
    );
  };

  const handleDelete = (id) => {
    setNotifications(notifications.filter((notif) => notif.id !== id));
  };

  const handleMarkAllAsRead = () => {
    setNotifications(notifications.map((notif) => ({ ...notif, read: true })));
  };

  let filtered = notifications;
  if (filterRead === "unread") {
    filtered = notifications.filter((n) => !n.read);
  } else if (filterRead === "read") {
    filtered = notifications.filter((n) => n.read);
  }

  const getSeverityColor = (severity) => {
    switch (severity) {
      case "critical":
        return "bg-red-500/20 border-red-500/30";
      case "urgent":
        return "bg-orange-500/20 border-orange-500/30";
      case "warning":
        return "bg-yellow-500/20 border-yellow-500/30";
      default:
        return "bg-blue-500/20 border-blue-500/30";
    }
  };

  const getSeverityIcon = (severity) => {
    switch (severity) {
      case "critical":
        return "🔴";
      case "urgent":
        return "🟠";
      case "warning":
        return "🟡";
      default:
        return "🔵";
    }
  };

  return (
    <DashboardLayout>
      <div className="space-y-8">
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold text-white flex items-center gap-3">
            <Bell size={40} />
            Notification Center
          </h1>
          {notifications.some((n) => !n.read) && (
            <button
              onClick={handleMarkAllAsRead}
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm transition"
            >
              Mark All as Read
            </button>
          )}
        </div>

        {/* Filter */}
        <div className="flex gap-4">
          <select
            value={filterRead}
            onChange={(e) => setFilterRead(e.target.value)}
            className="px-4 py-2 bg-gray-800 border border-gray-600 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Notifications</option>
            <option value="unread">Unread Only</option>
            <option value="read">Read</option>
          </select>
          <span className="px-4 py-2 bg-white/10 rounded-lg text-gray-300">
            {filtered.length} notification{filtered.length !== 1 ? "s" : ""}
          </span>
        </div>

        {/* Notifications List */}
        {filtered.length === 0 ? (
          <div className="bg-white/5 backdrop-blur-xl p-12 rounded-2xl border border-white/10 text-center">
            <Bell size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400 text-lg">
              {notifications.length === 0
                ? "No notifications! All your certificates are up to date ✅"
                : "No notifications match your filter"}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filtered.map((notif) => (
              <div
                key={notif.id}
                className={`${getSeverityColor(
                  notif.severity
                )} border rounded-xl p-6 transition-all duration-300 ${
                  notif.read ? "opacity-75" : "shadow-lg"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-2xl">{getSeverityIcon(notif.severity)}</span>
                      <h3 className="text-white font-bold text-lg flex items-center gap-2">
                        {notif.message}
                        {notif.read && (
                          <Check size={16} className="text-green-400" />
                        )}
                      </h3>
                    </div>
                    <div className="text-gray-300 text-sm space-y-1 ml-8">
                      <p>
                        <span className="font-semibold">Certificate:</span>{" "}
                        {notif.certName}
                      </p>
                      <p>
                        <span className="font-semibold">Organization:</span>{" "}
                        {notif.organization}
                      </p>
                      <p>
                        <span className="font-semibold">Days Left:</span>{" "}
                        <span
                          className={
                            notif.daysLeft < 0
                              ? "text-red-400 font-bold"
                              : "text-yellow-400 font-bold"
                          }
                        >
                          {notif.daysLeft < 0
                            ? `${Math.abs(notif.daysLeft)} days overdue`
                            : `${notif.daysLeft} days`}
                        </span>
                      </p>
                    </div>
                  </div>

                  <div className="flex gap-2 flex-shrink-0">
                    {!notif.read && (
                      <button
                        onClick={() => handleMarkAsRead(notif.id)}
                        className="p-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
                        title="Mark as read"
                      >
                        <Check size={18} />
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(notif.id)}
                      className="p-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
                      title="Delete notification"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-6 rounded-2xl border border-red-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">Expired</h3>
            <div className="text-3xl font-bold text-red-400 mt-2">
              {notifications.filter((n) => n.type === "expired").length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-orange-500/20 to-orange-600/20 p-6 rounded-2xl border border-orange-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">
              Expiring Soon
            </h3>
            <div className="text-3xl font-bold text-orange-400 mt-2">
              {notifications.filter((n) => n.type === "expiring").length}
            </div>
          </div>
          <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-6 rounded-2xl border border-yellow-400/30 shadow-2xl">
            <h3 className="text-gray-300 text-sm font-semibold uppercase">
              In 30 Days
            </h3>
            <div className="text-3xl font-bold text-yellow-400 mt-2">
              {notifications.filter((n) => n.type === "expiring_soon").length}
            </div>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
}

export default NotificationCenter;
