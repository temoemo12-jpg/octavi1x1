
import React, { useState, useEffect } from 'react';
import { ShieldAlert, Gamepad2, Info, ArrowRight, Wallet, CircleDot, Crown, Dice5, AlertCircle } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const CreateMatch = () => {
  const navigate = useNavigate();
  const [game, setGame] = useState('Ludo Party');
  const [entryFee, setEntryFee] = useState(10);
  const [vipTier, setVipTier] = useState('NONE');
  const [isInMatch, setIsInMatch] = useState(false);
  
  useEffect(() => {
    const profile = JSON.parse(localStorage.getItem('user_profile') || '{}');
    if (profile.vipTier) setVipTier(profile.vipTier);
    
    const matchStatus = localStorage.getItem('is_in_match');
    if (matchStatus === 'true') {
      setIsInMatch(true);
    }
  }, []);

  const getCommissionRate = () => {
    switch (vipTier) {
      case 'STARTER': return 0.05;
      case 'PRO': return 0.02;
      case 'ELITE':
      case 'ULTIMATE': return 0.0;
      default: return 0.10;
    }
  };

  const totalPot = entryFee * 2;
  const commissionRate = getCommissionRate();
  const platformFee = totalPot * commissionRate;
  const winnerTakes = totalPot - platformFee;

  const handleCreate = () => {
    if (isInMatch) {
      alert("لديك مباراة نشطة بالفعل!");
      navigate('/match-room');
      return;
    }

    const currentBalance = parseFloat(localStorage.getItem('user_balance') || '0');
    if (currentBalance < entryFee) {
      alert("رصيدك غير كافٍ! يرجى الإيداع أولاً.");
      navigate('/deposit');
      return;
    }
    
    const newBalance = currentBalance - entryFee;
    localStorage.setItem('user_balance', newBalance.toString());
    localStorage.setItem('is_in_match', 'true');
    localStorage.setItem('current_match_prize', winnerTakes.toString());
    localStorage.setItem('current_match_game', game);
    
    window.dispatchEvent(new Event('storage'));
    navigate('/match-room');
  };

  if (isInMatch) {
    return (
      <div className="max-w-2xl mx-auto p-12 mt-20 text-center space-y-8 bg-white rounded-[3rem] shadow-2xl border-t-8 border-red-500">
        <AlertCircle className="w-24 h-24 text-red-500 mx-auto animate-bounce" />
        <div className="space-y-2">
          <h2 className="text-3xl font-black text-[#0B1E3A] font-sporty uppercase">لديك تحدي نشط!</h2>
          <p className="text-gray-500 font-bold">يجب إنهاء مباراتك الحالية قبل إنشاء تحدٍ جديد.</p>
        </div>
        <Link to="/match-room" className="btn-1xbet px-12 py-5 rounded-2xl text-xl inline-block">
          <span>العودة لغرفة المباراة</span>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-10 text-right" dir="rtl">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#0B1E3A] p-10 text-white flex flex-col md:flex-row justify-between items-center gap-8 border-b-4 border-[#FACC15]">
          <div className="space-y-1">
            <h1 className="text-4xl font-black uppercase font-sporty italic">تحدي مالي جديد</h1>
            <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">اختر اللعبة والمبلغ وانتظر خصمك</p>
          </div>
          <div className="flex items-center gap-4 bg-white/5 px-8 py-4 rounded-2xl border border-white/10">
            <Wallet className="w-8 h-8 text-[#FACC15]" />
            <div className="text-right">
              <p className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">رصيدك الحالي</p>
              <p className="text-3xl font-black text-[#FACC15] font-sporty tracking-tighter">${parseFloat(localStorage.getItem('user_balance') || '0').toFixed(2)}</p>
            </div>
          </div>
        </div>

        <div className="p-10 grid lg:grid-cols-5 gap-12">
          <div className="lg:col-span-3 space-y-10">
            {vipTier !== 'NONE' && (
              <div className="bg-gradient-to-r from-[#FACC15]/20 to-transparent p-6 rounded-2xl border-r-4 border-[#FACC15] flex items-center gap-4 flex-row-reverse">
                <Crown className="w-8 h-8 text-[#A16207]" />
                <div>
                  <p className="text-xs font-black text-[#A16207] uppercase tracking-widest">ميزة VIP نشطة: {vipTier}</p>
                  <p className="text-[10px] font-bold text-[#A16207] opacity-80 uppercase">عمولة مخفضة بنسبة {((1 - commissionRate / 0.1) * 100).toFixed(0)}% مطبقة.</p>
                </div>
              </div>
            )}

            <div className="space-y-6">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">1. اختر اللعبة</label>
              <div className="grid grid-cols-2 gap-6">
                <button 
                  onClick={() => setGame('Ludo Party')}
                  className={`relative p-1 rounded-[2rem] border-4 transition-all overflow-hidden ${game === 'Ludo Party' ? 'border-[#1E3A8A] scale-105 shadow-2xl' : 'border-gray-50'}`}
                >
                  <div className="h-40 relative group">
                    <img src="https://images.unsplash.com/photo-1620067802517-380388921831?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Real Ludo" />
                    <div className={`absolute inset-0 transition-opacity ${game === 'Ludo Party' ? 'bg-[#1E3A8A]/40' : 'bg-black/60 group-hover:bg-black/40'}`}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <Dice5 className="w-10 h-10 mb-2" />
                      <span className="font-black uppercase text-xs italic tracking-tighter">Ludo Party</span>
                    </div>
                  </div>
                </button>
                <button 
                  onClick={() => setGame('8 Ball Pool')}
                  className={`relative p-1 rounded-[2rem] border-4 transition-all overflow-hidden ${game === '8 Ball Pool' ? 'border-[#1E3A8A] scale-105 shadow-2xl' : 'border-gray-50'}`}
                >
                  <div className="h-40 relative group">
                    <img src="https://images.unsplash.com/photo-1511211155949-c16766487e38?q=80&w=400&auto=format&fit=crop" className="w-full h-full object-cover" alt="Real Pool" />
                    <div className={`absolute inset-0 transition-opacity ${game === '8 Ball Pool' ? 'bg-[#1E3A8A]/40' : 'bg-black/60 group-hover:bg-black/40'}`}></div>
                    <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
                      <CircleDot className="w-10 h-10 mb-2" />
                      <span className="font-black uppercase text-xs italic tracking-tighter">8 Ball Pool</span>
                    </div>
                  </div>
                </button>
              </div>
            </div>

            <div className="space-y-6">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">2. مبلغ الرهان ($)</label>
              <div className="grid grid-cols-4 gap-4">
                {[5, 10, 20, 50].map((val) => (
                  <button 
                    key={val}
                    onClick={() => setEntryFee(val)}
                    className={`py-4 rounded-xl font-black text-md transition-all border ${entryFee === val ? 'bg-[#1E3A8A] text-white border-[#1E3A8A] shadow-lg' : 'bg-white border-gray-100 text-[#0B1E3A]'}`}
                  >
                    ${val}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-2">
            <div className="bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-2xl space-y-8 sticky top-24">
              <h3 className="text-xs font-black uppercase text-gray-400 flex items-center gap-2 flex-row-reverse tracking-widest">
                <Info className="w-4 h-4 text-[#1E3A8A]" /> ملخص الأرباح
              </h3>
              
              <div className="space-y-6">
                <div className="flex justify-between items-center text-xs flex-row-reverse">
                  <span className="text-gray-400 font-bold uppercase tracking-widest">رهانك</span>
                  <span className="font-black text-[#0B1E3A] text-lg">${entryFee.toFixed(2)}</span>
                </div>
                <div className="flex justify-between items-center text-xs flex-row-reverse pt-4 border-t border-gray-50">
                  <span className="text-red-500 font-black uppercase tracking-widest">العمولة ({commissionRate * 100}%)</span>
                  <span className="font-black text-red-500 text-lg">-${platformFee.toFixed(2)}</span>
                </div>
                
                <div className="pt-8 border-t-4 border-dashed border-gray-50 text-center">
                  <p className="text-[10px] font-black text-blue-600 uppercase tracking-[0.4em] mb-2">صافي أرباح الفائز</p>
                  <p className="text-6xl font-black text-[#22C55E] font-sporty tracking-tighter italic shadow-green-500/10">${winnerTakes.toFixed(2)}</p>
                </div>
              </div>

              <button 
                onClick={handleCreate}
                className="w-full py-5 btn-1xbet shadow-2xl text-xl"
              >
                <span>ابدأ التحدي الآن</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateMatch;
