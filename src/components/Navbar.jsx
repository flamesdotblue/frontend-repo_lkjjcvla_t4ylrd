import React from 'react';
import { Heart, Home, PlusCircle, User } from 'lucide-react';

const tabs = [
  { key: 'home', label: 'Home', icon: Home },
  { key: 'create', label: 'Create', icon: PlusCircle },
  { key: 'profile', label: 'Profile', icon: User },
];

export default function Navbar({ currentView, setView, totalKindness }) {
  return (
    <header className="sticky top-0 z-40 backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 border-b border-violet-100">
      <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
        <div
          onClick={() => setView('landing')}
          className="flex items-center gap-2 cursor-pointer select-none"
          aria-label="ShareSpace Home"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-200 via-violet-200 to-rose-200 shadow-inner" />
          <span className="font-semibold text-slate-800 tracking-tight">ShareSpace</span>
        </div>

        <nav className="flex items-center gap-2">
          {tabs.map(({ key, label, icon: Icon }) => (
            <button
              key={key}
              onClick={() => setView(key)}
              className={`inline-flex items-center gap-2 px-3 py-2 rounded-full transition-all text-sm
              ${
                currentView === key
                  ? 'bg-violet-600 text-white shadow-md shadow-violet-200'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
              aria-pressed={currentView === key}
            >
              <Icon size={16} />
              {label}
            </button>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-rose-50 text-rose-600">
            <Heart size={16} className="fill-rose-500/20" />
            <span className="text-sm font-medium">{totalKindness}</span>
          </div>
          <button className="px-3 py-1.5 rounded-full bg-slate-900 text-white text-sm hover:opacity-90 transition">Log in</button>
          <button className="px-3 py-1.5 rounded-full bg-gradient-to-r from-violet-500 to-indigo-500 text-white text-sm shadow hover:shadow-md transition">Sign up</button>
        </div>
      </div>
    </header>
  );
}
