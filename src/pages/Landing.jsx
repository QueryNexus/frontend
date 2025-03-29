import React from "react";
import { useAuth0 } from "@auth0/auth0-react";
import { FiArrowRight } from "react-icons/fi";
import { FaRobot, FaBolt, FaFlagCheckered, FaHeadset } from "react-icons/fa";
import { MdSecurity, MdAnalytics, MdEmail } from "react-icons/md";

const Landing = () => {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="bg-gray-900 text-gray-100 min-h-screen">
      {/* Hero Section */}
      <section className="flex flex-col items-center justify-center text-center py-24 px-6">
        <h1 className="text-5xl md:text-6xl font-extrabold text-white">
          Empower Queries with{" "}
          <span className="text-blue-500">AI Intelligence</span>
        </h1>
        <p className="mt-4 text-lg text-gray-400 max-w-3xl">
          QueryNexus automates query management by leveraging cutting-edge AI to
          respond intelligently and classify customer queries with precision.
        </p>
        <button
          className="mt-6 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white px-8 py-3 rounded-lg flex items-center gap-2 transition-all"
          onClick={() => loginWithRedirect()}
        >
          Get Started <FiArrowRight />
        </button>

      </section>

      {/* Features Section */}
      <section id="features" className="py-20 bg-gray-800 px-8">
        <h2 className="text-center text-4xl font-bold text-gray-200">
          Features at a Glance
        </h2>
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          <FeatureCard
            icon={<FaRobot className="text-blue-400 text-4xl" />}
            title="AI-Powered Responses"
            description="Automatically generate intelligent responses to common user queries using advanced NLP models."
          />
          <FeatureCard
            icon={<FaBolt className="text-purple-400 text-4xl" />}
            title="Instant Query Classification"
            description="Classify incoming queries as Inquiry, Complaint, Suggestion, or other predefined categories."
          />
          <FeatureCard
            icon={<FaFlagCheckered className="text-green-400 text-4xl" />}
            title="Priority Flagging"
            description="Automatically flag high-priority or complex queries for manual admin review."
          />
          <FeatureCard
            icon={<MdAnalytics className="text-yellow-400 text-4xl" />}
            title="AI Analytics Dashboard"
            description="Track performance and efficiency through insightful analytics and reports."
          />
          <FeatureCard
            icon={<MdSecurity className="text-red-400 text-4xl" />}
            title="Secure API Integration"
            description="Ensure secure communication between the backend and external APIs."
          />
          <FeatureCard
            icon={<FaHeadset className="text-cyan-400 text-4xl" />}
            title="Email & Chat Integration"
            description="Seamlessly respond to queries via email and live chat channels."
          />
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 px-8 bg-gray-900">
        <h2 className="text-center text-4xl font-bold text-gray-200">About Us</h2>
        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          QueryNexus is built to revolutionize how businesses handle customer
          inquiries. Our AI model intelligently classifies, processes, and
          responds to queries with speed and precision. By using Google’s
          Gemini AI and real-time analytics, we ensure that customer
          interactions remain smooth and efficient.
        </p>
        <p className="text-center text-gray-300 mt-6 max-w-3xl mx-auto">
          Our mission is to empower businesses by reducing workload, ensuring
          consistency, and enhancing the overall customer experience.
        </p>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 px-8 bg-gray-800">
        <h2 className="text-center text-4xl font-bold text-gray-200">
          Get in Touch
        </h2>
        <p className="text-center text-gray-300 mt-4 max-w-3xl mx-auto">
          For any queries or assistance, feel free to reach out to us via
          email.
        </p>
        <div className="flex justify-center mt-6">
          <a
            href="mailto:support@querynexus.com"
            className="flex items-center gap-2 text-blue-400 hover:text-blue-500 transition-all text-lg"
          >
            <MdEmail size={24} />
            support@querynexus.com
          </a>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-6 text-center bg-gray-900 text-gray-400">
        <p>&copy; 2025 QueryNexus. All rights reserved.</p>
      </footer>
    </div>
  );
};

// Feature Card Component
const FeatureCard = ({ icon, title, description }) => {
  return (
    <div className="bg-gray-700 p-6 rounded-lg text-center w-72 shadow-md transition-all hover:scale-105">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold text-white">{title}</h3>
      <p className="text-gray-300 mt-2">{description}</p>
    </div>
  );
};

export default Landing;
