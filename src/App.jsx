import React, { useMemo, useState } from 'react';
import Navbar from './components/Navbar.jsx';
import Landing from './components/Landing.jsx';
import CreatePost from './components/CreatePost.jsx';
import PostCard from './components/PostCard.jsx';

function randomPastel() {
  const hues = [220, 260, 290, 320];
  const h = hues[Math.floor(Math.random() * hues.length)];
  return `hsl(${h} 70% 85%)`;
}

const INITIAL_POSTS = [
  {
    id: 'p1',
    user: 'Willow',
    avatarColor: randomPastel(),
    mood: 'Reflective',
    content:
      'Lately I have been learning to give myself permission to rest. It is harder than I expected, but I am trying.',
    kindness: 12,
    tags: ['Rest', 'Self-compassion'],
    comments: [
      { user: 'Kai', text: 'Proud of you for honoring your needs. Rest is productive.' },
      { user: 'June', text: 'Taking breaks is brave. You deserve calm.' },
    ],
  },
  {
    id: 'p2',
    user: 'Rowan',
    avatarColor: randomPastel(),
    mood: 'Anxious',
    content:
      'Feeling nervous about an upcoming conversation. Practicing deep breaths and kindness toward myself.',
    kindness: 7,
    tags: ['Anxiety', 'Breathing'],
    comments: [
      { user: 'Sky', text: 'You are more prepared than you think. One breath at a time.' },
    ],
  },
];

export default function App() {
  const [view, setView] = useState('landing');
  const [posts, setPosts] = useState(INITIAL_POSTS);
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [kindnessGiven, setKindnessGiven] = useState(0);

  const allTags = useMemo(() => {
    const s = new Set();
    posts.forEach((p) => p.tags?.forEach((t) => s.add(t)));
    return Array.from(s);
  }, [posts]);

  const totalKindness = posts.reduce((sum, p) => sum + p.kindness, 0);

  const filteredPosts = posts.filter((p) =>
    selectedFilters.length === 0 || selectedFilters.some((f) => p.tags?.includes(f))
  );

  const toggleFilter = (tag) => {
    setSelectedFilters((prev) =>
      prev.includes(tag) ? prev.filter((t) => t !== tag) : [...prev, tag]
    );
  };

  const addPost = ({ content, mood }) => {
    const newPost = {
      id: Math.random().toString(36).slice(2),
      user: 'You',
      avatarColor: randomPastel(),
      content,
      mood,
      kindness: 0,
      tags: mood ? [mood] : [],
      comments: [],
    };
    setPosts((prev) => [newPost, ...prev]);
    setView('home');
  };

  const sendKindness = (postId) => {
    setPosts((prev) =>
      prev.map((p) => (p.id === postId ? { ...p, kindness: p.kindness + 1 } : p))
    );
    setKindnessGiven((k) => k + 1);
  };

  const addComment = (postId, text) => {
    setPosts((prev) =>
      prev.map((p) =>
        p.id === postId
          ? { ...p, comments: [...p.comments, { user: 'You', text }] }
          : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-violet-50 to-rose-50">
      <Navbar currentView={view} setView={setView} totalKindness={totalKindness} />

      {view === 'landing' && (
        <Landing onGetStarted={() => setView('home')} />
      )}

      {view === 'home' && (
        <main className="max-w-5xl mx-auto px-4 py-8">
          <section className="mb-5">
            <h2 className="sr-only">Similar Experiences</h2>
            <div className="flex items-center gap-2 flex-wrap">
              {allTags.map((t) => (
                <button
                  key={t}
                  onClick={() => toggleFilter(t)}
                  className={`px-3 py-1.5 rounded-full text-sm transition border ${
                    selectedFilters.includes(t)
                      ? 'bg-violet-600 text-white border-violet-600'
                      : 'bg-white/80 text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {t}
                </button>
              ))}
              {allTags.length === 0 && (
                <span className="text-slate-500 text-sm">No filters yet — share a post to begin.</span>
              )}
            </div>
          </section>

          <div className="space-y-4">
            {filteredPosts.map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSendKindness={sendKindness}
                onAddComment={addComment}
              />
            ))}
            {filteredPosts.length === 0 && (
              <div className="rounded-2xl bg-white/70 border border-slate-100 p-8 text-center">
                <p className="text-slate-700 font-medium">Quiet for now.</p>
                <p className="text-slate-500 text-sm mt-1">Try clearing filters or creating your first post.</p>
              </div>
            )}
          </div>
        </main>
      )}

      {view === 'create' && (
        <main className="max-w-5xl mx-auto px-4 py-8">
          <CreatePost onSubmit={addPost} />
        </main>
      )}

      {view === 'profile' && (
        <main className="max-w-5xl mx-auto px-4 py-8 space-y-4">
          <section className="rounded-2xl bg-white/80 border border-slate-100 shadow-sm p-6">
            <div className="flex items-center gap-4">
              <div className="w-14 h-14 rounded-full" style={{ backgroundColor: '#D7D3F8' }} />
              <div>
                <p className="text-lg font-semibold text-slate-800">You</p>
                <p className="text-slate-500 text-sm">Growing gently, one day at a time.</p>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3 text-center">
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Posts</p>
                <p className="text-lg font-semibold text-slate-800">{posts.filter((p) => p.user === 'You').length}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Kindness received</p>
                <p className="text-lg font-semibold text-slate-800">{posts.filter((p) => p.user === 'You').reduce((s, p) => s + p.kindness, 0)}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Kindness given</p>
                <p className="text-lg font-semibold text-slate-800">{kindnessGiven}</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3">
                <p className="text-xs text-slate-500">Community kindness</p>
                <p className="text-lg font-semibold text-slate-800">{totalKindness}</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            {posts.filter((p) => p.user === 'You').map((post) => (
              <PostCard
                key={post.id}
                post={post}
                onSendKindness={sendKindness}
                onAddComment={addComment}
              />
            ))}
            {posts.filter((p) => p.user === 'You').length === 0 && (
              <div className="rounded-2xl bg-white/70 border border-slate-100 p-8 text-center">
                <p className="text-slate-700 font-medium">No posts yet</p>
                <p className="text-slate-500 text-sm mt-1">Your reflections will appear here. When you’re ready, share a thought.</p>
              </div>
            )}
          </section>
        </main>
      )}

      <footer className="max-w-5xl mx-auto px-4 py-10 text-center text-slate-400 text-sm">
        Built with care. Be gentle with yourself.
      </footer>
    </div>
  );
}
