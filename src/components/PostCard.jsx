import React, { useState } from 'react';
import { Heart } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PostCard({ post, onSendKindness, onAddComment }) {
  const [comment, setComment] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmed = comment.trim();
    if (!trimmed) return;
    onAddComment(post.id, trimmed);
    setComment('');
  };

  return (
    <motion.article
      layout
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="rounded-2xl bg-white/80 border border-slate-100 shadow-sm p-5"
    >
      <div className="flex items-start gap-3">
        <div
          className="w-10 h-10 rounded-full shrink-0"
          style={{ backgroundColor: post.avatarColor }}
          aria-hidden
        />
        <div className="flex-1">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-semibold text-slate-700">{post.user}</p>
              {post.mood && (
                <span className="inline-flex items-center text-xs text-slate-500 mt-0.5">Mood: {post.mood}</span>
              )}
            </div>
            <div className="flex items-center gap-2">
              {post.tags?.map((t) => (
                <span key={t} className="text-[11px] px-2 py-1 rounded-full bg-violet-50 text-violet-700">
                  {t}
                </span>
              ))}
            </div>
          </div>

          <p className="mt-3 text-slate-700 leading-relaxed">{post.content}</p>

          <div className="mt-4 flex items-center gap-3">
            <button
              onClick={() => onSendKindness(post.id)}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600 hover:bg-rose-100 transition"
            >
              <Heart size={16} className="fill-rose-500/20" />
              <span className="text-sm">Send Kindness</span>
              <span className="text-xs font-medium px-2 py-0.5 rounded-full bg-white border border-rose-200 text-rose-600">
                {post.kindness}
              </span>
            </button>
          </div>

          <div className="mt-4 border-t border-slate-100 pt-4">
            <p className="text-xs uppercase tracking-wide text-slate-400 mb-2">Supportive comments</p>
            <ul className="space-y-2">
              {post.comments.map((c, idx) => (
                <li key={idx} className="text-sm text-slate-600 bg-slate-50/80 rounded-xl px-3 py-2">
                  <span className="font-medium text-slate-700">{c.user}:</span> {c.text}
                </li>
              ))}
            </ul>

            <form onSubmit={handleSubmit} className="mt-3 flex items-center gap-2">
              <input
                type="text"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Share gentle, uplifting words..."
                className="flex-1 rounded-full border border-slate-200 bg-white/70 px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-violet-300"
                aria-label="Add a positive comment"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-full bg-violet-600 text-white text-sm hover:opacity-90 transition"
              >
                Send
              </button>
            </form>
          </div>
        </div>
      </div>
    </motion.article>
  );
}
