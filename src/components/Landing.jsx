import React from 'react';
import { motion } from 'framer-motion';

export default function Landing({ onGetStarted }) {
  return (
    <section className="relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 via-violet-50 to-rose-50" />
      <div className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-indigo-200/30 blur-3xl" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-rose-200/30 blur-3xl" />

      <div className="relative max-w-5xl mx-auto px-4 py-20 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-semibold tracking-tight text-slate-800">
            Breathe. Share. Feel Supported.
          </h1>
          <p className="mt-4 md:mt-6 text-slate-600 text-lg md:text-xl leading-relaxed max-w-2xl mx-auto">
            ShareSpace is a gentle corner of the internet to express your thoughts and receive kind, uplifting responses from a caring community.
          </p>

          <div className="mt-8 flex items-center justify-center gap-3">
            <button
              onClick={onGetStarted}
              className="px-5 py-3 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow hover:shadow-lg transition focus:outline-none focus:ring-2 focus:ring-violet-300"
            >
              Explore Home Feed
            </button>
            <button
              className="px-5 py-3 rounded-full bg-white/80 text-slate-700 border border-slate-200 hover:bg-white transition"
            >
              Learn More
            </button>
          </div>

          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-4">
            {["Safe & Kind", "Anonymous Sharing", "Positive-Only Replies"].map((t, i) => (
              <motion.div
                key={t}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
                className="rounded-2xl p-6 bg-white/70 border border-slate-100 shadow-sm"
              >
                <p className="text-slate-700 font-medium">{t}</p>
                <p className="text-slate-500 mt-1 text-sm">Gentle design and supportive interactions to reduce anxiety.</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
