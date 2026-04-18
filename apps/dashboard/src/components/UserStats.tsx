"use client";
import React, { useState, useEffect } from 'react';

const UserStats = () => {
  const [profile, setProfile] = useState<any>(null);

  useEffect(() => {
    fetch('http://localhost:8000/profile')
      .then(res => res.json())
      .then(data => setProfile(data))
      .catch(err => console.error("API error:", err));
  }, []);

  if (!profile) return <div className="animate-pulse bg-zinc-900 h-12 rounded-lg"></div>;

  return (
    <div className="w-full">
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 rounded bg-zinc-800 flex items-center justify-center text-[10px] font-medium text-zinc-400 uppercase">
          {profile.username.substring(0, 2)}
        </div>
        <div>
          <h2 className="text-sm font-medium text-zinc-200">{profile.username}</h2>
          <p className="text-[10px] text-zinc-600 uppercase tracking-tighter">Sessão Ativa</p>
        </div>
      </div>
    </div>
  );
};

export default UserStats;
