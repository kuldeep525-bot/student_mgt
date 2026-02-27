import React from "react";

const Footer = () => {
  return (
    <div>
      <footer className="bg-base-100 py-16 mt-16">
        <div className="max-w-6xl mx-auto px-6 grid md:grid-cols-4 gap-10">
          <div>
            <h3 className="text-xl font-bold text-primary">NoteSphere</h3>
            <p className="mt-4 opacity-70 text-sm">
              A modern full-stack notes management system built using MERN.
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Product</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>Features</li>
              <li>Dashboard</li>
              <li>Security</li>
              <li>Analytics</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Company</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>About</li>
              <li>Contact</li>
              <li>Privacy</li>
              <li>Terms</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Built With</h4>
            <ul className="space-y-2 text-sm opacity-70">
              <li>React</li>
              <li>Node.js</li>
              <li>MongoDB</li>
              <li>Tailwind + DaisyUI</li>
            </ul>
          </div>
        </div>

      </footer>
        <div className="text-center mb-3 text-sm opacity-50 mt-10">
          © {new Date().getFullYear()} NoteSphere. All rights reserved.
        </div>
    </div>
  );
};

export default Footer;
