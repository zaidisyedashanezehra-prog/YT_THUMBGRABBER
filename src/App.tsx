/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Download, Image as ImageIcon, Link as LinkIcon, AlertCircle, Sparkles, Scale, Copyright, Menu, Copy, Check, Video, Clock, ClipboardPaste } from 'lucide-react';

export default function App() {
  const [url, setUrl] = useState('');
  const [videoId, setVideoId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [activeQuality, setActiveQuality] = useState('maxresdefault');
  const [copied, setCopied] = useState(false);
  const [recentGrabs, setRecentGrabs] = useState<string[]>([]);

  useEffect(() => {
    const saved = localStorage.getItem('yt_recent_grabs');
    if (saved) {
      try { setRecentGrabs(JSON.parse(saved)); } catch (e) {}
    }
  }, []);

  const addRecent = (id: string) => {
    setRecentGrabs(prev => {
      const updated = [id, ...prev.filter(item => item !== id)].slice(0, 5);
      localStorage.setItem('yt_recent_grabs', JSON.stringify(updated));
      return updated;
    });
  };

  const scrollToLegal = (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById('legal-rights')?.scrollIntoView({ behavior: 'smooth' });
  };

  const qualities = [
    { id: 'maxresdefault', label: 'Max Res [1080p]' },
    { id: 'hqdefault', label: 'High [720p]' },
    { id: 'sddefault', label: 'Standard [480p]' },
    { id: 'mqdefault', label: 'Medium [360p]' },
  ];

  const extractVideoId = (inputUrl: string) => {
    const match = inputUrl.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=|shorts\/))([^&?\s]+)/);
    return match ? match[1] : null;
  };

  const handleGetThumbnail = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setError(null);
    setVideoId(null);
    setCopied(false);

    if (!url.trim()) {
      setError('Please enter a valid YouTube URL to proceed.');
      return;
    }

    const extractedId = extractVideoId(url);
    if (extractedId) {
      setVideoId(extractedId);
      setActiveQuality('maxresdefault');
      addRecent(extractedId);
    } else {
      setError('Could not extract Video ID. Ensure the link is a valid YouTube URL.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-4 sm:p-6 md:p-8 pt-28 font-sans selection:bg-cyan-500/30">
      {/* Navbar */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/60 backdrop-blur-2xl border-b border-white/5 px-6 py-5 flex items-center justify-between shadow-[0_4px_30px_rgba(0,0,0,0.5)]">
        <div className="flex items-center gap-3 group cursor-pointer">
          <Sparkles className="w-7 h-7 text-cyan-400 group-hover:text-purple-500 transition-colors duration-500" />
          <span className="font-poppins font-black text-xl md:text-2xl tracking-[0.1em] text-white uppercase">
            YT_<span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 group-hover:from-purple-500 group-hover:to-cyan-400 transition-all duration-500">THUMBGRABBER</span>
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-sm font-bold text-gray-400 tracking-wider uppercase">
          <a href="#" className="hover:text-cyan-400 transition-colors">Home</a>
          <a href="#" className="hover:text-cyan-400 transition-colors flex items-center gap-1.5"><Video className="w-4 h-4"/> Features</a>
          <a href="#legal-rights" onClick={scrollToLegal} className="hover:text-cyan-400 transition-colors">Legal Rights</a>
        </div>
        <button className="md:hidden text-gray-400 hover:text-white transition-colors">
          <Menu className="w-7 h-7" />
        </button>
      </nav>

      {/* Background ambient light effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[10%] left-[10%] w-[50%] h-[50%] rounded-full bg-cyan-600/10 blur-[150px] mix-blend-screen" />
        <div className="absolute top-[40%] right-[10%] w-[40%] h-[40%] rounded-full bg-purple-700/15 blur-[150px] mix-blend-screen" />
      </div>

      <motion.div 
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className="w-full max-w-4xl z-10 flex flex-col items-center mt-4"
      >
        {/* Header */}
        
<div className="text-center mb-10 md:mb-14 w-full">
          {/*<motion.div 
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="inline-flex items-center justify-center p-3.5 mb-6 rounded-2xl bg-white/[0.03] border border-white/10 shadow-[0_0_30px_rgba(34,211,238,0.15)] backdrop-blur-xl"
          >
            <ImageIcon className="w-8 h-8 text-cyan-400" />
          </motion.div>*/}
          <h1 className="text-4xl md:text-5xl lg:text-7xl font-poppins font-black mb-6 tracking-tight leading-tight uppercase">
            YT Thumbnail <br className="hidden sm:block"/>
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">
              Downloader
            </span>
          </h1>
          <p className="text-gray-400 text-lg md:text-xl font-medium max-w-2xl mx-auto leading-relaxed">
            Extract high-resolution YouTube thumbnails instantly. Just paste the URL below to grab your assets.
          </p>
        </div>

        {/* Main Glassmorphism Card */}
        <div className="bg-[#121212]/50 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 sm:p-8 md:p-12 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group/card max-w-3xl w-full">
          {/* Cyberpunk Top Accent Line */}
          <div className="absolute top-0 left-0 w-full h-[3px] bg-gradient-to-r from-transparent via-cyan-400 to-purple-600 opacity-70 group-hover/card:opacity-100 transition-opacity duration-500" />
          <div className="absolute bottom-0 right-0 w-[300px] h-[1px] bg-gradient-to-r from-purple-600 to-transparent opacity-50" />
          
          <form onSubmit={handleGetThumbnail} className="flex flex-col md:flex-row gap-4 mb-2 relative z-10 w-full">
            <div className="relative flex-1 group/input">
              <div className="absolute inset-y-0 left-0 pl-6 flex items-center pointer-events-none transition-colors duration-300">
                <LinkIcon className="h-6 w-6 text-gray-500 group-focus-within/input:text-cyan-400" />
              </div>
              <input
                type="text"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full pl-16 pr-28 py-5 bg-black/50 border border-white/10 rounded-2xl text-white placeholder-gray-600 focus:outline-none focus:border-cyan-400/50 focus:ring-1 focus:ring-cyan-400/50 transition-all text-lg shadow-[inset_0_2px_10px_rgba(0,0,0,0.4)] hover:border-white/20 font-medium tracking-wide"
              />
              <button
                type="button"
                onClick={async () => {
                  try {
                    const text = await navigator.clipboard.readText();
                    setUrl(text);
                  } catch (err) {
                    console.error('Failed to read clipboard', err);
                  }
                }}
                className="absolute inset-y-0 right-2 my-auto h-12 px-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-gray-300 hover:text-cyan-400 transition-all flex items-center gap-2 group/paste text-sm font-bold backdrop-blur-md cursor-pointer"
              >
                <ClipboardPaste className="w-4 h-4" />
                <span className="hidden sm:inline">Paste</span>
              </button>
            </div>
            <button
              type="submit"
              className="py-5 px-10 bg-white text-black hover:bg-gray-100 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 group whitespace-nowrap cursor-pointer shadow-[0_0_30px_rgba(255,255,255,0.15)] hover:shadow-[0_0_40px_rgba(255,255,255,0.3)] active:scale-[0.98]"
            >
              <span>Extract</span>
              <ImageIcon className="w-6 h-6 group-hover:scale-110 group-hover:rotate-6 transition-transform" />
            </button>
          </form>

          {/* Validation Error Message */}
          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, height: 0, marginTop: 0 }}
                animate={{ opacity: 1, height: 'auto', marginTop: 24 }}
                exit={{ opacity: 0, height: 0, marginTop: 0 }}
                className="overflow-hidden"
              >
                <div className="p-5 bg-red-500/10 border border-red-500/30 rounded-2xl flex items-center gap-4 justify-center text-red-400 relative z-10 backdrop-blur-xl shadow-inner">
                  <AlertCircle className="w-6 h-6 shrink-0" />
                  <p className="text-base font-semibold">{error}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Recent Extractions */}
          {recentGrabs.length > 0 && (
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-8 pt-6 border-t border-white/10 w-full"
            >
              <div className="flex items-center gap-2 text-gray-400 mb-5 text-xs font-bold uppercase tracking-widest pl-1">
                <Clock className="w-4 h-4 text-purple-400" /> Recent Grabs
              </div>
              <div className="flex flex-wrap gap-4">
                {recentGrabs.map(id => (
                  <button 
                    key={id} 
                    onClick={() => { 
                      setUrl(`https://youtube.com/watch?v=${id}`); 
                      setVideoId(id); 
                      setActiveQuality('maxresdefault'); 
                      setError(null);
                    }} 
                    className="relative group w-20 h-12 sm:w-24 sm:h-14 rounded-xl overflow-hidden border border-white/10 hover:border-cyan-400 transition-all cursor-pointer shadow-[0_4px_10px_rgba(0,0,0,0.3)] hover:shadow-[0_4px_15px_rgba(34,211,238,0.3)]"
                    title="Load recent thumbnail"
                  >
                    <img src={`https://img.youtube.com/vi/${id}/mqdefault.jpg`} alt="Recent" className="w-full h-full object-cover opacity-50 group-hover:opacity-100 transition-all duration-500 group-hover:scale-110" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent opacity-100 group-hover:opacity-0 transition-opacity duration-300 pointer-events-none" />
                  </button>
                ))}
              </div>
            </motion.div>
          )}
        </div>

        {/* Output Area */}
        <AnimatePresence>
          {videoId && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="mt-12 space-y-8 relative z-10 w-full"
            >
              {/* Quality Selector */}
              <div className="flex flex-wrap gap-3 justify-center w-full">
                {qualities.map((q) => (
                  <button
                    key={q.id}
                    onClick={() => setActiveQuality(q.id)}
                    className={`px-5 py-3 rounded-2xl text-sm md:text-base font-bold uppercase tracking-wider transition-all duration-300 backdrop-blur-xl border ${
                      activeQuality === q.id
                        ? 'bg-gradient-to-r from-cyan-500 to-purple-600 text-white border-transparent shadow-[0_0_20px_rgba(34,211,238,0.5)] scale-105'
                        : 'bg-white/5 text-gray-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/30'
                    }`}
                  >
                    {q.label}
                  </button>
                ))}
              </div>

              {/* Image Container with Glow Effect */}
              <div className="relative aspect-video rounded-3xl overflow-hidden border border-white/10 bg-[#0a0a0a] group/image w-full shadow-[0_0_60px_rgba(0,0,0,0.8)]">
                <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/20 via-transparent to-purple-600/20 animate-pulse pointer-events-none" />
                
                <img 
                  src={`https://img.youtube.com/vi/${videoId}/${activeQuality}.jpg`} 
                  alt="Extracted HD Thumbnail" 
                  className="w-full h-full object-cover relative z-10 transition-transform duration-1000 ease-out group-hover/image:scale-[1.03]"
                />
                
                {/* Hover Overlay */}
                <div className="absolute inset-0 z-20 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover/image:opacity-100 transition-opacity duration-300 pointer-events-none flex flex-col justify-end p-8">
                  <div>
                    <span className="inline-block px-4 py-2 rounded-xl bg-white/10 backdrop-blur-xl text-white text-xs md:text-sm font-bold tracking-widest uppercase border border-white/20 shadow-[0_4px_20px_rgba(0,0,0,0.5)]">
                      {qualities.find(q => q.id === activeQuality)?.label} Preview
                    </span>
                  </div>
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center w-full">
                <a
                  href={`https://img.youtube.com/vi/${videoId}/${activeQuality}.jpg`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full sm:w-auto px-8 py-4 md:py-5 md:px-10 bg-gradient-to-r from-cyan-500 to-purple-600 hover:from-cyan-400 hover:to-purple-500 text-white rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 shadow-[0_0_30px_rgba(168,85,247,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)] active:scale-[0.98]"
                >
                  <Download className="w-6 h-6" />
                  Download Image
                </a>
                <button
                  onClick={() => {
                      navigator.clipboard.writeText(`https://img.youtube.com/vi/${videoId}/${activeQuality}.jpg`);
                      setCopied(true);
                      setTimeout(() => setCopied(false), 2000);
                  }}
                  className="w-full sm:w-auto px-8 py-4 md:py-5 md:px-10 bg-white/5 hover:bg-white/10 text-white border border-white/10 rounded-2xl font-bold text-lg transition-all flex items-center justify-center gap-3 hover:shadow-[0_0_25px_rgba(255,255,255,0.1)] hover:border-white/30 active:scale-[0.98]"
                >
                  {copied ? <Check className="w-6 h-6 text-cyan-400" /> : <Copy className="w-6 h-6" />}
                  {copied ? 'Copied URL!' : 'Copy Image URL'}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Footer */}
        <footer className="mt-20 mb-8 text-center space-y-8 w-full max-w-3xl mx-auto">
          {/* Legal Rights Section */}
          <div id="legal-rights" className="p-6 md:p-8 rounded-[2rem] bg-white/[0.02] border border-white/5 text-sm md:text-base leading-relaxed text-gray-400 text-left shadow-inner backdrop-blur-xl relative overflow-hidden group/legal">
            <div className="absolute top-0 right-0 w-48 h-48 bg-cyan-500/10 rounded-full blur-[60px] -mr-16 -mt-16 pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-purple-500/10 rounded-full blur-[60px] -ml-16 -mb-16 pointer-events-none" />
            
            <div className="flex items-center gap-3 text-cyan-400 font-bold mb-4 relative z-10">
              <Scale className="w-5 h-5" />
              <span className="tracking-widest uppercase">Legal Rights & Disclaimer</span>
            </div>
            
            <p className="mb-3 relative z-10">
              This application is provided for educational and personal use only. YouTube™ is a registered trademark of Google LLC. 
              We are not affiliated with, endorsed by, or sponsored by YouTube or Google.
            </p>
            <p className="mb-4 relative z-10">
              All thumbnails downloaded through this tool remain the sole intellectual property and copyright of their respective creators, channel owners, and Google LLC. 
              Users are strictly responsible for how they use these assets. Do not use downloaded assets for commercial purposes, modification, or redistribution without obtaining explicit prior consent from the original copyright holders.
            </p>
            
            <div className="flex items-start sm:items-center gap-3 mt-6 pt-5 border-t border-white/10 text-gray-300 font-semibold relative z-10">
              <Copyright className="w-5 h-5 shrink-0 mt-0.5 sm:mt-0 text-purple-400" />
              <span>Creative Commons (CC): Some thumbnails may fall under CC licenses. Please verify licensing with the original video author before reuse.</span>
            </div>
          </div>
          
          {/* Credits */}
          <div className="pt-6 flex flex-col items-center justify-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-purple-500/20 to-transparent blur-3xl opacity-50 pointer-events-none" />
            <p className="text-gray-300 text-xl md:text-2xl font-medium font-poppins inline-flex items-center gap-2 group cursor-default relative z-10">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500 font-black tracking-widest uppercase">
                Credits by :
              </span>
              <span className="text-white group-hover:text-cyan-300 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-300 font-bold tracking-wide ml-1">
                Shan-e-Zehra
              </span>
            </p>
          </div>
          
          {/* Cyberpunk Dots */}
          <div className="flex items-center justify-center gap-5 mt-8 opacity-50">
            <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_15px_rgba(34,211,238,0.8)] animate-pulse"></div>
            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_15px_rgba(168,85,247,0.8)] animate-pulse delay-75"></div>
            <div className="w-2 h-2 rounded-full bg-white shadow-[0_0_15px_rgba(255,255,255,0.8)] animate-pulse delay-150"></div>
          </div>
        </footer>
      </motion.div>
    </div>
  );
}
