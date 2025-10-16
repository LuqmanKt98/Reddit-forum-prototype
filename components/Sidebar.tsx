'use client';

import Link from 'next/link';
import { mockCommunities } from '@/lib/mockData';

export default function Sidebar() {
  return (
    <div className="space-y-5 sticky top-20">
      <div className="glass-effect rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
          <span>🌐</span> Communities
        </h3>
        <div className="space-y-2">
          {mockCommunities.map((community) => (
            <Link
              key={community.id}
              href="/"
              className="flex items-center gap-3 p-3 rounded-xl hover:bg-white/10 transition-all group"
            >
              <span className="text-2xl group-hover:scale-110 transition-transform">{community.icon}</span>
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-sm text-white">{community.name}</div>
                <div className="text-xs text-gray-400">{community.members.toLocaleString()} members</div>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="glass-effect rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-4 text-white flex items-center gap-2">
          <span>🔥</span> Trending
        </h3>
        <div className="space-y-2">
          {[
            { title: 'Next.js 15 Released', icon: '▲', color: 'from-blue-500 to-cyan-500' },
            { title: 'React Best Practices', icon: '⚛️', color: 'from-cyan-500 to-blue-500' },
            { title: 'Web Performance Tips', icon: '⚡', color: 'from-yellow-500 to-orange-500' },
            { title: 'CSS Grid Tutorial', icon: '📐', color: 'from-pink-500 to-purple-500' },
          ].map((item, idx) => (
            <Link
              key={idx}
              href="/"
              className="block p-3 rounded-xl hover:bg-white/10 transition-all group"
            >
              <div className="flex items-center gap-3">
                <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${item.color} flex items-center justify-center text-sm group-hover:scale-110 transition-transform`}>
                  {item.icon}
                </div>
                <span className="text-sm font-semibold text-gray-300 group-hover:text-white transition-colors">
                  {item.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="glass-effect rounded-2xl p-5">
        <h3 className="font-bold text-lg mb-3 text-white flex items-center gap-2">
          <span>ℹ️</span> About
        </h3>
        <p className="text-sm text-gray-400 mb-4">
          Modern developer community built with Next.js & Tailwind CSS
        </p>
        <div className="space-y-3">
          {[
            { label: 'Posts', value: '5', icon: '📝' },
            { label: 'Communities', value: '4', icon: '🌐' },
            { label: 'Users', value: '4', icon: '👥' },
          ].map((stat, idx) => (
            <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-white/5">
              <span className="text-sm text-gray-400 flex items-center gap-2">
                <span>{stat.icon}</span> {stat.label}
              </span>
              <span className="font-bold text-white">{stat.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

