import { useNavigate } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { useState } from "react";

function LandingPage() {
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-purple-50 to-blue-50">
      {/* Navbar */}
      <nav className="fixed w-full top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-gray-900">
            CertTracker <span className="text-blue-600">🚀</span>
          </div>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center gap-8">
            <a href="#home" className="text-gray-700 hover:text-blue-600 transition">
              Home
            </a>
            <a href="#features" className="text-gray-700 hover:text-blue-600 transition">
              Features
            </a>
            <a href="#about" className="text-gray-700 hover:text-blue-600 transition">
              About
            </a>
            <a href="#contact" className="text-gray-700 hover:text-blue-600 transition">
              Contact
            </a>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center gap-4">
            <button
              onClick={() => navigate("/login")}
              className="px-6 py-2 text-gray-700 hover:text-blue-600 transition font-medium"
            >
              Log in
            </button>
            <button
              onClick={() => navigate("/register")}
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-medium"
            >
              Sign up
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden text-gray-700"
          >
            {menuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="md:hidden bg-white border-t border-gray-200">
            <div className="px-6 py-4 space-y-4">
              <a href="#home" className="block text-gray-700 hover:text-blue-600">
                Home
              </a>
              <a href="#features" className="block text-gray-700 hover:text-blue-600">
                Features
              </a>
              <a href="#about" className="block text-gray-700 hover:text-blue-600">
                About
              </a>
              <a href="#contact" className="block text-gray-700 hover:text-blue-600">
                Contact
              </a>
              <button
                onClick={() => navigate("/login")}
                className="w-full text-left text-gray-700 hover:text-blue-600 py-2"
              >
                Log in
              </button>
              <button
                onClick={() => navigate("/register")}
                className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700"
              >
                Sign up
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-32 pb-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-8">
              <div className="space-y-4">
                <p className="text-blue-600 font-semibold uppercase tracking-wide text-sm">
                  ✨ Manage Certifications Effortlessly
                </p>
                <h1 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
                  Never miss <span className="text-blue-600">certificate expiry</span> again
                </h1>
              </div>

              <p className="text-xl text-gray-600 leading-relaxed">
                CertTracker is your all-in-one platform to manage, track, and renew all your
                professional certifications. Automated notifications, detailed analytics, and
                secure storage - all in one place.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <button
                  onClick={() => navigate("/register")}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
                >
                  Start Free Trial
                </button>
                <button
                  onClick={() => navigate("/login")}
                  className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition font-semibold text-lg"
                >
                  Watch Demo
                </button>
              </div>

              <p className="text-gray-600 text-sm">
                🎁 Free forever plan available • No credit card required
              </p>
            </div>

            {/* Right Illustration */}
            <div className="flex justify-center items-center">
              <div className="relative w-full h-96 bg-gradient-to-br from-blue-400 to-purple-500 rounded-3xl shadow-2xl flex items-center justify-center">
                <div className="text-center space-y-4">
                  <div className="text-6xl">📜</div>
                  <p className="text-white text-xl font-semibold">Certificate Management</p>
                  <p className="text-blue-100 text-sm">Made Simple</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Powerful Features for Certificate Management
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to keep your certifications organized and up-to-date
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Feature 1 */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔔</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Smart Notifications</h3>
              <p className="text-gray-600">
                Get automatic alerts 30, 7, and 1 day before your certificates expire. Never miss
                a renewal deadline again.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition">
              <div className="text-4xl mb-4">📊</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Advanced Analytics</h3>
              <p className="text-gray-600">
                Track certification status, renewal history, and health metrics with beautiful
                charts and detailed reports.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔄</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Easy Renewal</h3>
              <p className="text-gray-600">
                Streamlined renewal process with file uploads and detailed renewal tracking. Keep
                everything organized.
              </p>
            </div>

            {/* Feature 4 */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition">
              <div className="text-4xl mb-4">👥</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Admin Dashboard</h3>
              <p className="text-gray-600">
                Manage users and certifications across your organization with powerful admin
                controls and reporting.
              </p>
            </div>

            {/* Feature 5 */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition">
              <div className="text-4xl mb-4">🔒</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Your data is encrypted and secure. Built on modern technology with automatic
                backups.
              </p>
            </div>

            {/* Feature 6 */}
            <div className="p-8 rounded-2xl border-2 border-gray-200 hover:border-blue-600 hover:shadow-xl transition">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Mobile Ready</h3>
              <p className="text-gray-600">
                Manage your certifications on the go. Access your dashboard from any device,
                anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 text-center text-white">
            <div>
              <div className="text-5xl font-bold mb-2">10k+</div>
              <p className="text-blue-100">Users Worldwide</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">50k+</div>
              <p className="text-blue-100">Certificates Managed</p>
            </div>
            <div>
              <div className="text-5xl font-bold mb-2">99%</div>
              <p className="text-blue-100">Uptime Guarantee</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">About CertTracker</h2>
          <p className="text-xl text-gray-600 leading-relaxed mb-8">
            CertTracker was built with professionals and organizations in mind. We understand
            the challenge of managing multiple certifications and keeping track of expiry dates.
            Our mission is to make certificate management simple, efficient, and stress-free.
          </p>
          <div className="grid md:grid-cols-3 gap-8 mt-12">
            <div>
              <div className="text-4xl mb-3">✅</div>
              <h3 className="text-xl font-bold mb-2">Easy to Use</h3>
              <p className="text-gray-600">Intuitive interface designed for everyone</p>
            </div>
            <div>
              <div className="text-4xl mb-3">⚡</div>
              <h3 className="text-xl font-bold mb-2">Fast & Reliable</h3>
              <p className="text-gray-600">Lightning-fast performance you can trust</p>
            </div>
            <div>
              <div className="text-4xl mb-3">🎯</div>
              <h3 className="text-xl font-bold mb-2">Goal Oriented</h3>
              <p className="text-gray-600">Built for certification management success</p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-blue-50 to-purple-50">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <h2 className="text-5xl font-bold text-gray-900">
            Ready to simplify certificate management?
          </h2>
          <p className="text-xl text-gray-600">
            Join thousands of professionals who trust CertTracker
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <button
              onClick={() => navigate("/register")}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition font-semibold text-lg shadow-lg hover:shadow-xl"
            >
              Get Started Free
            </button>
            <button
              onClick={() => navigate("/login")}
              className="px-8 py-4 border-2 border-gray-900 text-gray-900 rounded-lg hover:bg-gray-50 transition font-semibold text-lg"
            >
              Learn More
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer id="contact" className="bg-gray-900 text-gray-400 py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-white font-bold mb-4">CertTracker</h3>
              <p>Simplifying certificate management for professionals worldwide.</p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Product</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#features" className="hover:text-white transition">
                    Features
                  </a>
                </li>
                <li>
                  <a href="#about" className="hover:text-white transition">
                    Pricing
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Security
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Company</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#about" className="hover:text-white transition">
                    About
                  </a>
                </li>
                <li>
                  <a href="#contact" className="hover:text-white transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Blog
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-4">Legal</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#" className="hover:text-white transition">
                    Privacy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-white transition">
                    Terms
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center">
            <p>&copy; 2026 CertTracker. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;
