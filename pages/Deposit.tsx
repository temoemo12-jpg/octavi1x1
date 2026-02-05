
import React, { useState } from 'react';
import { Landmark, Coins, Wallet, Info, ArrowLeft, CheckCircle2, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const Deposit = () => {
  const navigate = useNavigate();
  const [selectedMethod, setSelectedMethod] = useState('ma-banks');
  const [amount, setAmount] = useState('10');
  const [step, setStep] = useState(1);

  const methods = [
    { id: 'crypto', name: 'CRYPTO / USDT', icon: Coins, color: 'text-orange-500' },
    { id: 'ma-banks', name: 'البنوك المغربية', icon: Landmark, color: 'text-orange-600' },
    { id: 'dz-banks', name: 'البنوك الجزائرية', icon: Landmark, color: 'text-green-600' },
  ];

  return (
    <div className="max-w-5xl mx-auto p-4 md:p-10 space-y-6 text-right" dir="rtl">
      <div className="bg-white rounded-[3rem] shadow-3xl overflow-hidden border">
        <div className="bg-[#0B1E3A] p-10 text-white flex justify-between items-center border-b-8 border-[#FACC15]">
          <div className="bg-white/5 p-4 rounded-3xl border border-white/10 flex items-center gap-4">
            <Wallet className="w-8 h-8 text-[#FACC15]" />
            <div className="text-left leading-none">
              <p className="text-[10px] font-black text-blue-400 mb-1">رصيدك الحالي</p>
              <p className="text-3xl font-black font-sporty italic text-[#FACC15]">$50.00</p>
            </div>
          </div>
          <div className="text-right">
            <h1 className="text-4xl font-black font-sporty italic uppercase">شحن الرصيد (DEPOSIT)</h1>
            <p className="text-blue-300 text-[10px] font-bold uppercase">الجزائر • المغرب • دولي</p>
          </div>
        </div>

        <div className="p-10 space-y-12">
          <div className="space-y-6">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">1. اختر بوابة الدفع</label>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {methods.map(m => (
                <button key={m.id} onClick={() => setSelectedMethod(m.id)} className={`p-8 rounded-[2.5rem] border-[3px] flex flex-col items-center gap-2 transition-all ${selectedMethod === m.id ? 'border-[#1E3A8A] bg-blue-50/50' : 'border-gray-50 hover:bg-gray-50'}`}>
                  <m.icon className={`w-10 h-10 ${m.color}`} />
                  <span className="font-black text-xs uppercase">{m.name}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">2. مبلغ الإيداع ($)</label>
            <div className="relative">
              <span className="absolute left-8 top-1/2 -translate-y-1/2 text-4xl font-black font-sporty italic text-[#0B1E3A]">$</span>
              <input type="number" value={amount} onChange={(e) => setAmount(e.target.value)} className="w-full p-8 bg-gray-50 rounded-[2.5rem] font-black text-4xl outline-none text-left pl-16 focus:border-[#1E3A8A] border-2 border-transparent" />
            </div>
          </div>

          <button onClick={() => setStep(2)} className="w-full py-6 btn-1xbet text-2xl shadow-2xl">
            <span>متابعة لبيانات الدفع</span>
          </button>
        </div>
      </div>
    </div>
  );
};
export default Deposit;
