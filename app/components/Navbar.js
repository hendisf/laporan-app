"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [session, setSession] = useState(null);

  useEffect(() => {
    // Handle scroll
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);

    // Handle auth session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      subscription.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-white/80 dark:bg-slate-900/80 backdrop-blur-md shadow-sm py-4' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-4 sm:px-6 flex justify-between items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg group-hover:scale-105 transition-transform">
            L
          </div>
          <span className={`font-bold text-xl tracking-tight transition-colors ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white drop-shadow-sm'}`}>
            Lapor<span className="text-blue-600">Aja</span>
          </span>
        </Link>

        {/* Menu */}
        <div className="hidden md:flex items-center gap-6 lg:gap-8 font-medium">
          <Link href="/" className={`transition-colors hover:text-blue-600 ${scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-800 dark:text-slate-200'}`}>
            Home
          </Link>
          <Link href="/about" className={`transition-colors hover:text-blue-600 ${scrolled ? 'text-slate-600 dark:text-slate-300' : 'text-slate-800 dark:text-slate-200'}`}>
            Tentang
          </Link>
          <div className="h-6 w-px bg-slate-300 dark:bg-slate-700 mx-2"></div>
          
          {session ? (
            <div className="flex items-center gap-4">
              <Link href="/dashboard" className={`flex items-center justify-center w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-800 hover:bg-slate-200 dark:hover:bg-slate-700 transition-colors ${scrolled ? 'text-slate-700 dark:text-slate-200' : 'text-slate-800 dark:text-white'}`} title="Dashboard Admin">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path></svg>
              </Link>
              <button 
                onClick={handleLogout}
                className="flex items-center gap-2 text-sm font-bold text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 transition-colors py-2 px-4 rounded-full border border-red-200 dark:border-red-900/50 hover:bg-red-50 dark:hover:bg-red-900/20"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path></svg>
                Keluar
              </button>
            </div>
          ) : (
            <>
              <Link href="/login" className={`transition-colors hover:text-blue-600 ${scrolled ? 'text-slate-900 dark:text-white' : 'text-slate-900 dark:text-white'}`}>
                Masuk
              </Link>
              <Link href="/register">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-full shadow-lg shadow-blue-500/30 transition-all hover:shadow-blue-500/50 hover:-translate-y-0.5 font-semibold">
                  Daftar
                </button>
              </Link>
            </>
          )}
        </div>
        
        {/* Mobile menu button (placeholder) */}
        <button className="md:hidden p-2 rounded-lg bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7"></path></svg>
        </button>
      </div>
    </nav>
  );
}