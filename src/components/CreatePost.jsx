import React, { useState } from 'react';

const MOODS = ['Calm', 'Hopeful', 'Tender', 'Anxious', 'Reflective'];

export default function CreatePost({ onSubmit }) {
  const [content, setContent] = useState('');
  const [mood, setMood] = useState('');
  const max = 280;
  const count = content.length;

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = content.trim();
    if (!trimmed) return;
    onSubmit({ content: trimmed, mood: mood || undefined });
    setContent('');
    setMood('');
  };

  return (
    <section className="max-w-3xl mx-auto w-full">
      <div className="rounded-2xl bg-white/80 border border-slate-100 shadow-sm p-6">
        <h2 className="text-lg font-semibold text-slate-800">Create a Post</h2>
        <p className="text-slate-500 text-sm mt-1">Share freely. This is a gentle, supportive space.</p>

        <form onSubmit={handleSubmit} className="mt-4 space-y-4">
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value.slice(0, max))}
            rows={5}
            placeholder="What's on your mind today?"
            className="w-full rounded-2xl border border-slate-200 bg-white/70 px-4 py-3 text-slate-700 outline-none focus:ring-2 focus:ring-violet-300"
          />

          <div className="flex flex-col md:flex-row md:items-center gap-3 justify-between">
            <div className="flex items-center gap-2 flex-wrap">
              {MOODS.map((m) => (
                <button
                  type="button"
                  key={m}
                  onClick={() => setMood(m === mood ? '' : m)}
                  className={`px-3 py-1.5 rounded-full text-sm transition border ${
                    mood === m
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {m}
                </button>
              ))}
            </div>

            <div className="text-sm text-slate-500">
              {count}/{max}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-5 py-2.5 rounded-full bg-gradient-to-r from-violet-600 to-indigo-600 text-white shadow hover:shadow-md transition"
            >
              Share with Kindness
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}
