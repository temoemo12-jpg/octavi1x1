
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Wallet, PlusCircle, ArrowUpRight, ShieldCheck, Info, ChevronLeft, TrendingUp, History, Trophy } from 'lucide-react';

const WalletHub = () => {
  const [totalBalance, setTotalBalance] = useState(0);
  const [wonBalance, setWonBalance] = useState(0);

  useEffect(() => {
    const savedTotal = localStorage.getItem('user_balance');
    const savedWon = localStorage.getItem('user_won_balance');
    if (savedTotal) setTotalBalance(parseFloat(savedTotal));
    if (savedWon) setWonBalance(parseFloat(savedWon));
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-8 text-right" dir="rtl">
      {/* Balance Card with Dual Stats */}
      <div className="bg-[#0B1E3A] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl border-b-4 border-[#FACC15]">
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 rounded-full -ml-48 -mt-48 blur-3xl"></div>
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="space-y-2 text-center md:text-right">
            <h1 className="text-3xl font-black font-sporty uppercase italic tracking-tight">إدارة الأموال والأرباح</h1>
            <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest leading-none">شفافية تامة بين رصيد اللعب والأرباح</p>
          </div>
          
          <div className="flex flex-col gap-4 min-w-[300px]">
            <div className="bg-white/5 backdrop-blur-xl p-4 rounded-2xl border border-white/10 flex justify-between items-center flex-row-reverse">
              <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">إجمالي الرصيد</span>
              <span className="text-2xl font-black font-sporty">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
            </div>
            <div className="bg-green-500/20 backdrop-blur-xl p-6 rounded-[2rem] border-2 border-green-500/30 flex justify-between items-center flex-row-reverse shadow-xl shadow-green-500/10">
              <div className="flex flex-col items-end">
                <span className="text-[10px] font-black text-green-400 uppercase tracking-widest">أرباح قابلة للسحب</span>
                <span className="text-4xl font-black text-[#FACC15] font-sporty italic">${wonBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <Trophy className="w-10 h-10 text-[#FACC15]" />
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Deposit */}
        <Link to="/deposit" className="group relative bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 flex flex-col items-center gap-6 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-green-500">
          <div className="w-24 h-24 bg-green-50 rounded-[2.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:rotate-12">
            <PlusCircle className="w-12 h-12 text-green-600" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#0B1E3A] font-sporty uppercase italic">شحن (DEPOSIT)</h2>
            <p className="text-xs text-green-600 font-black uppercase tracking-widest">إضافة رصيد للمواجهات</p>
          </div>
          <div className="btn-1xbet px-12 py-4 rounded-xl shadow-none"><span>انتقل للإيداع</span></div>
        </Link>

        {/* Withdraw */}
        <Link to="/withdraw" className="group relative bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 flex flex-col items-center gap-6 transition-all hover:-translate-y-2 hover:shadow-2xl hover:border-blue-600">
          <div className="w-24 h-24 bg-blue-50 rounded-[2.5rem] flex items-center justify-center shadow-lg transition-transform group-hover:-rotate-12">
            <ArrowUpRight className="w-12 h-12 text-blue-600" />
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-3xl font-black text-[#0B1E3A] font-sporty uppercase italic">سحب (WITHDRAW)</h2>
            <p className="text-xs text-blue-600 font-black uppercase tracking-widest">سحب الأرباح الصافية فقط</p>
          </div>
          <div className="bg-[#0B1E3A] text-white px-12 py-4 rounded-xl font-black uppercase font-sporty italic tracking-widest">انتقل للسحب</div>
        </Link>
      </div>
    </div>
  );
};

export default WalletHub;
