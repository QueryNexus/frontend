import { useAuth0 } from "@auth0/auth0-react";
import { motion } from "framer-motion";
import "../styles/LandingPage.css";

export default function LandingPage() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center p-6">
      <motion.h1
        className="text-5xl font-bold mb-6 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        QueryNexus
      </motion.h1>
      <motion.p
        className="text-lg text-gray-400 text-center max-w-2xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
      >
        AI-powered query management system that automates responses and enhances customer support efficiency.
      </motion.p>
      <motion.button
        className="mt-8 px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-2xl shadow-lg transition"
        onClick={() => loginWithRedirect()}
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3, delay: 0.4 }}
      >
        Login
      </motion.button>
    </div>
  );
}