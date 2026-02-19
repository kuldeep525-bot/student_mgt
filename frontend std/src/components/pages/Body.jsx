import React, { useState } from "react";
import { useNavigate } from "react-router";

const Body = () => {
  const navigate = useNavigate();
  const [dark, setDark] = useState(true);

  return (
    <div
      data-theme={dark ? "forest" : "lofi"}
      className="min-h-screen bg-base-200 text-base-content"
    >
      {/* Theme Toggle */}
      <div className="fixed top-20 right-6 z-50">
        <button
          onClick={() => setDark(!dark)}
          className="btn btn-sm btn-primary shadow-lg"
        >
          {dark ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <main className="pt-24">
        {/* ================= HERO ================= */}
        <section className="py-24 relative overflow-hidden">
          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16">
            {/* LEFT */}
            <div className="flex-1 text-center lg:text-left">
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Organize your <br />
                <span className="text-primary">digital chaos.</span>
              </h1>

              <p className="mt-6 text-lg opacity-80 max-w-xl">
                A powerful full-stack note management system where you can
                create, edit, delete and organize your notes securely.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/register")}
                  className="btn btn-primary btn-lg shadow-lg"
                >
                  Get Started
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline btn-lg"
                >
                  Login
                </button>
              </div>

              {/* Stats Row */}
              <div className="mt-10 flex gap-10 justify-center lg:justify-start opacity-80 text-sm">
                <div>
                  <p className="text-2xl font-bold text-primary">10K+</p>
                  <p>Notes Created</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-secondary">99.9%</p>
                  <p>Secure</p>
                </div>
              </div>
            </div>

            {/* RIGHT MOCKUP */}
            <div className="flex-1 relative">
              <div className="card bg-base-100 shadow-2xl border border-base-300">
                <div className="card-body space-y-4">
                  <div className="h-6 w-3/4 bg-primary/30 rounded"></div>
                  <div className="h-3 bg-base-300 rounded"></div>
                  <div className="h-3 bg-base-300 rounded w-5/6"></div>
                  <div className="h-3 bg-base-300 rounded w-4/6"></div>

                  <div className="mt-4 p-4 bg-base-200 rounded-xl">
                    <div className="h-3 w-2/3 bg-secondary/40 rounded"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ================= FEATURES ================= */}
        <section className="py-24 bg-base-100">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold">Why Choose NoteSphere?</h2>
            <p className="opacity-70 mt-4">
              Everything you need to manage your thoughts efficiently
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-6">
            {[
              {
                title: "Secure Authentication",
                desc: "JWT-based authentication with protected routes.",
              },
              {
                title: "Full CRUD Support",
                desc: "Create, read, update and delete instantly.",
              },
              {
                title: "Modern UI",
                desc: "Clean and distraction-free productivity design.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="card bg-base-200 shadow-xl hover:scale-105 transition-transform"
              >
                <div className="card-body text-center">
                  <h3 className="card-title justify-center">{feature.title}</h3>
                  <p className="opacity-70">{feature.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ================= TECH STACK ================= */}
        <section className="py-20">
          <div className="text-center mb-10">
            <h2 className="text-4xl font-bold">Built With</h2>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {["React", "Node.js", "Express", "MongoDB", "JWT Auth"].map(
              (tech) => (
                <div key={tech} className="badge badge-primary badge-lg">
                  {tech}
                </div>
              ),
            )}
          </div>
        </section>

        {/* ================= CTA ================= */}
        <footer className="footer sm:footer-horizontal bg-base-200 text-base-content p-10">
          <aside>
            <svg
              width="50"
              height="50"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
              fillRule="evenodd"
              clipRule="evenodd"
              className="fill-current"
            >
              <path d="M22.672 15.226l-2.432.811.841 2.515c.33 1.019-.209 2.127-1.23 2.456-1.15.325-2.148-.321-2.463-1.226l-.84-2.518-5.013 1.677.84 2.517c.391 1.203-.434 2.542-1.831 2.542-.88 0-1.601-.564-1.86-1.314l-.842-2.516-2.431.809c-1.135.328-2.145-.317-2.463-1.229-.329-1.018.211-2.127 1.231-2.456l2.432-.809-1.621-4.823-2.432.808c-1.355.384-2.558-.59-2.558-1.839 0-.817.509-1.582 1.327-1.846l2.433-.809-.842-2.515c-.33-1.02.211-2.129 1.232-2.458 1.02-.329 2.13.209 2.461 1.229l.842 2.515 5.011-1.677-.839-2.517c-.403-1.238.484-2.553 1.843-2.553.819 0 1.585.509 1.85 1.326l.841 2.517 2.431-.81c1.02-.33 2.131.211 2.461 1.229.332 1.018-.21 2.126-1.23 2.456l-2.433.809 1.622 4.823 2.433-.809c1.242-.401 2.557.484 2.557 1.838 0 .819-.51 1.583-1.328 1.847m-8.992-6.428l-5.01 1.675 1.619 4.828 5.011-1.674-1.62-4.829z"></path>
            </svg>
            <p>
              ACME Industries Ltd.
              <br />
              Providing reliable tech since 1992
            </p>
          </aside>
          <nav>
            <h6 className="footer-title">Services</h6>
            <a className="link link-hover">Branding</a>
            <a className="link link-hover">Design</a>
            <a className="link link-hover">Marketing</a>
            <a className="link link-hover">Advertisement</a>
          </nav>
          <nav>
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Contact</a>
            <a className="link link-hover">Jobs</a>
            <a className="link link-hover">Press kit</a>
          </nav>
          <nav>
            <h6 className="footer-title">Legal</h6>
            <a className="link link-hover">Terms of use</a>
            <a className="link link-hover">Privacy policy</a>
            <a className="link link-hover">Cookie policy</a>
          </nav>
        </footer>
      </main>
    </div>
  );
};

export default Body;
