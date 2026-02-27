import { useNavigate } from "react-router";
import { motion } from "framer-motion";
import Footer from "../layout/Footer";

const Body = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-base-200 text-base-content overflow-hidden">
      <main className="pt-24">
        {/* HERO SECTION */}
        <section className="py-28 relative">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-secondary/10 blur-3xl opacity-40"></div>

          <div className="max-w-6xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-16 relative z-10">
            {/* LEFT CONTENT */}
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="flex-1 text-center lg:text-left"
            >
              <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
                Organize your <br />
                <span className="text-primary">digital chaos.</span>
              </h1>

              <p className="mt-6 text-lg opacity-80 max-w-xl">
                NoteSphere helps you capture ideas, manage tasks and track
                productivity with a clean, distraction-free experience built
                using modern MERN architecture.
              </p>

              <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <button
                  onClick={() => navigate("/signup")}
                  className="btn btn-primary btn-lg shadow-xl hover:scale-105 transition"
                >
                  Get Started Free
                </button>

                <button
                  onClick={() => navigate("/login")}
                  className="btn btn-outline btn-lg hover:scale-105 transition"
                >
                  Login
                </button>
              </div>

              <p className="mt-6 text-sm opacity-60">
                Built with React, Node.js & MongoDB
              </p>
            </motion.div>

            {/* RIGHT MOCKUP */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="flex-1"
            >
              <div className="bg-base-100 shadow-2xl border border-base-300 rounded-2xl overflow-hidden">
                {/* Mac Top Bar */}
                <div className="flex items-center gap-2 px-4 py-3 bg-base-200 border-b border-base-300">
                  <div className="w-3 h-3 rounded-full bg-red-500"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  <span className="ml-4 text-xs opacity-60">
                    notesphere.app/dashboard
                  </span>
                </div>

                {/* App Content */}
                <div className="p-6 space-y-6">
                  <div className="p-4 bg-base-200 rounded-xl border border-base-300 shadow-sm">
                    <h3 className="font-semibold text-primary mb-2">
                      Product Ideas
                    </h3>
                    <p className="text-sm opacity-70">
                      Build admin analytics dashboard with monthly growth
                      tracking.
                    </p>

                    <div className="flex justify-between items-center mt-4">
                      <span className="badge badge-primary badge-sm">
                        Important
                      </span>

                      <div className="flex gap-2">
                        <button className="btn btn-xs btn-outline">Edit</button>
                        <button className="btn btn-xs btn-ghost">
                          Archive
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 bg-base-200 rounded-xl border border-base-300 shadow-sm">
                    <h3 className="font-semibold text-secondary mb-2">
                      Backend Optimization
                    </h3>
                    <p className="text-sm opacity-70">
                      Replace filters with MongoDB countDocuments for
                      performance.
                    </p>

                    <div className="mt-4 h-2 bg-base-300 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: "70%" }}
                        transition={{ duration: 1.5 }}
                        className="h-full bg-secondary"
                      />
                    </div>
                  </div>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.8 }}
                    className="text-xs opacity-50 text-right"
                  >
                    Last synced: {new Date().toLocaleTimeString()}
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* SOCIAL PROOF */}
        <section className="py-24 bg-base-100 text-center">
          <h2 className="text-3xl font-bold mb-10">
            Trusted by modern creators
          </h2>

          <div className="flex flex-wrap justify-center gap-10 opacity-60 text-lg font-medium">
            <span>Startup Teams</span>
            <span>Developers</span>
            <span>Product Designers</span>
            <span>Students</span>
          </div>
        </section>

        {/* FEATURES */}
        <section className="py-28 bg-base-200">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-bold">Designed for Focus</h2>
            <p className="opacity-70 mt-4">
              Everything you need. Nothing you don't.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-10 max-w-6xl mx-auto px-6">
            {[
              {
                title: "Secure Authentication",
                desc: "JWT protected system with role-based access control.",
              },
              {
                title: "Real-Time Productivity",
                desc: "Instant note updates with optimized backend APIs.",
              },
              {
                title: "Smart Organization",
                desc: "Archive, favorite and restore notes seamlessly.",
              },
              {
                title: "Admin Control",
                desc: "Complete moderation with analytics dashboard.",
              },
              {
                title: "Cloud Integration",
                desc: "Secure file uploads using Cloudinary.",
              },
              {
                title: "Minimal Design",
                desc: "A distraction-free environment for creators.",
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                transition={{ duration: 0.2 }}
                className="card bg-base-100 shadow-xl border border-base-300"
              >
                <div className="card-body text-center">
                  <h3 className="card-title justify-center">{feature.title}</h3>
                  <p className="opacity-70">{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="py-24 text-center">
          <h2 className="text-4xl font-bold">
            Your ideas deserve better organization.
          </h2>
          <p className="mt-4 opacity-70">
            Join NoteSphere and simplify your digital life.
          </p>

          <button
            onClick={() => navigate("/signup")}
            className="btn btn-primary btn-lg mt-8 shadow-xl hover:scale-105 transition"
          >
            Create Free Account
          </button>
        </section>

        {/* FOOTER */}
        <Footer />
      </main>
    </div>
  );
};

export default Body;
  