import React from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import './styles/Landing.css';

function Landing() {
  const { loginWithRedirect } = useAuth0();

  return (
    <div className="landing-page">
      <section className="hero">
        <h1>Welcome to QueryNexus</h1>
        <p>Your AI-powered solution for seamless data management and insights.</p>
        <button className="cta-button" onClick={() => loginWithRedirect()}>Get Started</button>
      </section>

      <section id="features" className="features">
        <h2>Features</h2>
        <div className="feature">
          <h3>AI-Driven Insights</h3>
          <p>Leverage the power of AI to gain valuable insights from your data.</p>
        </div>
        <div className="feature">
          <h3>Seamless Integration</h3>
          <p>Integrate with various data sources effortlessly.</p>
        </div>
        <div className="feature">
          <h3>Real-Time Analytics</h3>
          <p>Get real-time analytics and make data-driven decisions.</p>
        </div>
      </section>

      <section id="about" className="about">
        <h2>About Us</h2>
        <p>QueryNexus is dedicated to providing cutting-edge AI solutions for data management and analytics. Our mission is to empower businesses with the tools they need to make informed decisions and drive growth.</p>
      </section>

      <section id="contact" className="contact">
        <h2>Contact Us</h2>
        <p>Have questions? Get in touch with us at <a href="mailto:support@querynexus.com">support@querynexus.com</a>.</p>
      </section>

      <footer className="footer">
        <p>&copy; 2025 QueryNexus. All rights reserved.</p>
      </footer>
    </div>
  );
}

export default Landing;