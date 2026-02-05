
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ShieldCheck, Zap, Trophy, Play, Crown, ChevronRight, ChevronLeft, Shield, Swords } from 'lucide-react';

const Home = () => {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);
  const banners = [
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop',
  ];

  useEffect(() => {
    const isLoggedIn = !!localStorage.getItem('user_profile');
    if (isLoggedIn) navigate('/dashboard');
    const timer = setInterval(() => setCurrentSlide((prev) => (prev + 1) % banners.length), 5000);
    return () => clearInterval(timer);
  }, [navigate, banners.length]);

  return (
    <div className="space-y-0 text-right" dir="rtl">
      <section className="relative min-h-[750px] flex items-center bg-[#050B16] text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img src="https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2070" className="w-full h-full object-cover opacity-30" alt="Arcade" />
          <div className="absolute inset-0 bg-gradient-to-l from-[#0B1E3A] via-[#050B16]/90 to-transparent"></div>
        </div>

        <div className="container mx-auto px-6 relative z-10 grid lg:grid-cols-2 gap-20 items-center">
          <div className="hidden lg:grid grid-cols-2 gap-6">
            <div className="border-[3px] border-[#3B82F6]/40 p-1.5 rounded-[2.5rem] bg-blue-900/10 backdrop-blur-sm">
              <div className="space-y-4">
                <div className="relative h-[220px] rounded-[2rem] overflow-hidden group shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1620067802517-380388921831?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Ludo" />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                    <h3 className="text-xl font-black font-sporty italic uppercase">LUDO STAR</h3>
                    <p className="text-[10px] font-bold text-blue-300 uppercase">142 تحدي مباشر</p>
                  </div>
                </div>
                <div className="relative h-[220px] rounded-[2rem] overflow-hidden group shadow-2xl">
                  <img src="https://images.unsplash.com/photo-1511211155949-c16766487e38?q=80&w=1000&auto=format&fit=crop" className="w-full h-full object-cover group-hover:scale-110 transition-transform" alt="Pool" />
                  <div className="absolute inset-0 bg-black/60 flex flex-col items-center justify-center p-4">
                    <h3 className="text-xl font-black font-sporty italic uppercase">POOL 8 BALL</h3>
                    <p className="text-[10px] font-bold text-blue-300 uppercase">89 تحدي مباشر</p>
                  </div>
                </div>
              </div>
            </div>
            <div className="space-y-6 flex flex-col justify-center">
              <div className="bg-[#22C55E] p-10 rounded-[2.5rem] text-center shadow-2xl min-h-[220px]">
                <Zap className="w-16 h-16 mb-4 text-[#FACC15] mx-auto" />
                <h3 className="font-black text-2xl font-sporty italic uppercase">سحب فوري</h3>
                <p className="text-[11px] font-bold opacity-90">BARIDIMOB & BINANCE</p>
              </div>
              <div className="bg-[#0B1E3A]/40 backdrop-blur-xl p-10 rounded-[2.5rem] border border-white/10 text-center shadow-2xl min-h-[220px]">
                <Shield className="w-16 h-16 mb-4 text-blue-500 mx-auto" />
                <h3 className="font-black text-2xl font-sporty italic uppercase">أمان 100%</h3>
                <p className="text-[11px] font-bold text-gray-400 uppercase">نظام ESCROW عالمي</p>
              </div>
            </div>
          </div>

          <div className="space-y-10 text-right">
            <div className="flex justify-end">
              <div className="inline-flex items-center gap-3 bg-white/5 border-r-[6px] border-[#FACC15] px-6 py-3 rounded-lg backdrop-blur-md">
                <Crown className="w-6 h-6 text-[#FACC15]" />
                <span className="text-xs font-black text-gray-100 uppercase tracking-widest">أكبر منصة ألعاب تنافسية في الجزائر</span>
              </div>
            </div>
            <h1 className="text-7xl md:text-9xl font-black leading-[0.9] uppercase tracking-tighter">
              <span className="font-sporty">إلعب.</span> <br />
              <span className="font-sporty">نافس.</span> <br />
              <span className="font-sporty text-[#FACC15] drop-shadow-[0_0_30px_rgba(250,204,21,0.3)]">اربح كاش.</span>
            </h1>
            <p className="text-xl text-blue-100 font-bold opacity-80 leading-relaxed max-w-xl ml-0 mr-auto">
              تحدَّ خصومك في 1 ضد 1 لودو أو بلياردو. مهاراتك هي طريقك للثراء، اربح جوائز مالية حقيقية واسحبها في دقائق.
            </p>
            <div className="flex flex-wrap gap-6 justify-end items-center">
              <div className="bg-[#1E293B]/60 border border-white/10 px-8 py-4 rounded-2xl flex flex-col text-center backdrop-blur-md">
                 <span className="text-[10px] text-blue-300 uppercase font-black mb-1">إجمالي جوائز اليوم</span>
                 <span className="text-3xl font-black text-white font-sporty">$8,240.00</span>
              </div>
              <Link to="/register" className="btn-1xbet px-12 py-6 rounded-2xl shadow-2xl">
                <span className="text-2xl italic">ابدأ اللعب الآن</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Home;
