
import React, { useState, useEffect } from 'react';
import { ArrowUpRight, ShieldCheck, AlertCircle, Landmark, CreditCard, Coins, Loader2, CheckCircle2, Wallet, ArrowRight, Info, ArrowLeft, Trophy, User, Camera, Image as ImageIcon, X } from 'lucide-react';
import { useNavigate, Link } from 'react-router-dom';

const Withdraw = () => {
  const navigate = useNavigate();
  const [totalBalance, setTotalBalance] = useState(0);
  const [wonBalance, setWonBalance] = useState(0);
  
  // Form States
  const [amount, setAmount] = useState('');
  const [accountName, setAccountName] = useState('');
  const [ribNumber, setRibNumber] = useState('');
  const [bankName, setBankName] = useState('CIH BANK');
  const [screenshot, setScreenshot] = useState<string | null>(null);
  
  const [isProcessing, setIsProcessing] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const savedTotal = localStorage.getItem('user_balance');
    const savedWon = localStorage.getItem('user_won_balance');
    const profile = JSON.parse(localStorage.getItem('user_profile') || '{}');
    
    if (savedTotal) setTotalBalance(parseFloat(savedTotal));
    if (savedWon) setWonBalance(parseFloat(savedWon));
    if (profile.displayName) setAccountName(profile.displayName);
  }, []);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setScreenshot(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleWithdraw = () => {
    setError('');
    const withdrawAmount = parseFloat(amount || '0');

    if (withdrawAmount < 20) {
      setError('أدنى مبلغ للسحب هو $20.00');
      return;
    }

    if (withdrawAmount > wonBalance) {
      setError('رصيد الأرباح غير كافٍ. يمكنك سحب الأرباح فقط.');
      return;
    }

    if (!accountName || !ribNumber || !bankName) {
      setError('يرجى ملء كافة البيانات البنكية المطلوبة.');
      return;
    }

    setIsProcessing(true);
    
    setTimeout(() => {
      const newTotal = totalBalance - withdrawAmount;
      const newWon = wonBalance - withdrawAmount;
      localStorage.setItem('user_balance', newTotal.toString());
      localStorage.setItem('user_won_balance', newWon.toString());
      window.dispatchEvent(new Event('storage'));
      setIsProcessing(false);
      setSuccess(true);
    }, 4000);
  };

  if (success) {
    return (
      <div className="max-w-2xl mx-auto p-4 md:p-8 mt-12 animate-in zoom-in duration-500 text-right" dir="rtl">
        <div className="bg-white rounded-[3rem] p-12 text-center shadow-3xl border border-gray-100 space-y-8">
          <div className="w-24 h-24 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto rotate-12 shadow-xl shadow-blue-500/10">
             <CheckCircle2 className="w-14 h-14 text-[#1E3A8A]" />
          </div>
          <div className="space-y-4">
            <h2 className="text-4xl font-black text-[#0B1E3A] font-sporty uppercase italic">طلب سحب قيد المعالجة</h2>
            <p className="text-lg text-gray-500 font-bold leading-relaxed px-8">
              تم استلام طلب سحب مبلغ <span className="font-black text-[#22C55E]">${amount}</span> بنجاح. 
              ستتم مراجعة البيانات وتحويل الأموال إلى حسابك في <span className="text-[#0B1E3A]">{bankName}</span> خلال 24 ساعة.
            </p>
          </div>
          <button onClick={() => navigate('/dashboard')} className="w-full py-5 btn-1xbet text-xl shadow-2xl">
            <span>العودة للوحة التحكم</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-10 text-right" dir="rtl">
      <div className="flex justify-between items-center mb-4">
        <Link to="/wallet" className="flex items-center gap-2 text-xs font-black text-gray-500 hover:text-[#0B1E3A] transition-all flex-row-reverse">
          <ArrowLeft className="w-4 h-4" /> العودة للمحفظة
        </Link>
      </div>

      <div className="bg-white rounded-[3rem] shadow-3xl border border-gray-100 overflow-hidden relative min-h-[600px] flex flex-col">
        {isProcessing && (
          <div className="absolute inset-0 bg-white/90 backdrop-blur-sm z-50 flex flex-col items-center justify-center space-y-6">
            <div className="relative">
              <Loader2 className="w-24 h-24 text-[#1E3A8A] animate-spin" />
              <ShieldCheck className="absolute inset-0 m-auto w-10 h-10 text-[#FACC15]" />
            </div>
            <div className="text-center">
              <h3 className="text-2xl font-black text-[#0B1E3A]">جارِ التحقق من البيانات...</h3>
              <p className="text-xs text-gray-400 font-bold uppercase tracking-widest mt-2">نظام التحويل الآمن نشط</p>
            </div>
          </div>
        )}

        <div className="bg-[#0B1E3A] p-10 text-white flex justify-between items-center border-b-8 border-[#FACC15]">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-sporty uppercase italic tracking-tight">سحب الأرباح (WITHDRAW)</h1>
            <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest leading-none">حوّل أرباحك إلى كاش حقيقي</p>
          </div>
          <div className="bg-white/5 p-4 rounded-2xl border border-white/10">
            <Landmark className="w-10 h-10 text-[#FACC15]" />
          </div>
        </div>

        <div className="p-10 space-y-10 flex-1">
           {/* Balances Display */}
           <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-gray-50 p-6 rounded-[2.5rem] border border-gray-100 flex flex-col items-center">
                 <p className="text-[10px] text-gray-400 font-black uppercase tracking-widest mb-1 leading-none">إجمالي الرصيد</p>
                 <span className="text-2xl font-black text-gray-400 font-sporty tracking-tighter italic">${totalBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
              <div className="bg-green-50 p-6 rounded-[2.5rem] border-2 border-green-200 flex flex-col items-center relative overflow-hidden group">
                 <div className="absolute top-0 right-0 w-16 h-16 bg-green-500/10 rounded-full -mr-8 -mt-8"></div>
                 <p className="text-[10px] text-green-600 font-black uppercase tracking-widest mb-1 leading-none">الأرباح القابلة للسحب</p>
                 <span className="text-4xl font-black text-[#22C55E] font-sporty tracking-tighter italic">${wonBalance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
              </div>
           </div>

           {/* Withdrawal Form */}
           <div className="space-y-10">
              {/* Step 1: Amount */}
              <div className="space-y-6">
                <div className="flex justify-between items-center flex-row-reverse">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">1. مبلغ السحب ($)</label>
                  {error.includes('مبلغ') && <span className="text-[10px] font-black text-red-500 uppercase">{error}</span>}
                </div>
                <div className="relative">
                  <span className="absolute right-6 top-1/2 -translate-y-1/2 font-black text-[#0B1E3A] text-4xl italic">$</span>
                  <input 
                    type="number" 
                    value={amount}
                    onChange={(e) => setAmount(e.target.value)}
                    className="w-full pr-16 pl-24 py-8 bg-gray-50 border-[3px] border-transparent focus:border-[#1E3A8A] rounded-[2.5rem] font-black text-4xl outline-none transition-all placeholder:text-gray-200 text-left"
                    placeholder="0.00"
                  />
                  <button 
                    onClick={() => setAmount(wonBalance.toString())}
                    className="absolute left-6 top-1/2 -translate-y-1/2 px-5 py-2.5 bg-white border-2 border-gray-100 rounded-xl text-[10px] font-black text-[#1E3A8A] uppercase hover:bg-gray-100 shadow-sm transition-all"
                  >
                    الكل
                  </button>
                </div>
              </div>

              {/* Step 2: Bank Info */}
              <div className="space-y-6">
                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">2. البيانات البنكية</label>
                 <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2">اسم البنك</p>
                      <select 
                        value={bankName}
                        onChange={(e) => setBankName(e.target.value)}
                        className="w-full p-5 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-black outline-none transition-all"
                      >
                        <option value="CIH BANK">CIH BANK (المغرب)</option>
                        <option value="ATTIJARIWAFA">ATTIJARIWAFA BANK (المغرب)</option>
                        <option value="BMCE">BANK OF AFRICA / BMCE (المغرب)</option>
                        <option value="AL BARID">AL BARID BANK (المغرب)</option>
                        <option value="BARIDIMOB">BARIDIMOB (الجزائر)</option>
                        <option value="BINANCE">BINANCE / USDT (دولي)</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2">الاسم بالكامل (كما في البنك)</p>
                      <div className="relative">
                        <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          value={accountName}
                          onChange={(e) => setAccountName(e.target.value)}
                          className="w-full pr-12 pl-4 py-5 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none"
                          placeholder="مثال: أحمد محمد"
                        />
                      </div>
                    </div>
                    <div className="md:col-span-2 space-y-2">
                      <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest mr-2">رقم الحساب (RIB / Account / Wallet)</p>
                      <div className="relative">
                        <CreditCard className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                        <input 
                          type="text" 
                          value={ribNumber}
                          onChange={(e) => setRibNumber(e.target.value)}
                          className="w-full pr-12 pl-4 py-5 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-sporty font-black tracking-widest outline-none"
                          placeholder="000 000 0000000000000 00"
                        />
                      </div>
                    </div>
                 </div>
              </div>

              {/* Step 3: Screenshot Upload */}
              <div className="space-y-6">
                 <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.3em]">3. إثبات الهوية البنكية (اختياري)</label>
                 {!screenshot ? (
                   <label className="relative border-4 border-dashed border-gray-100 rounded-[2.5rem] p-10 flex flex-col items-center gap-4 hover:border-blue-400 hover:bg-blue-50/50 transition-all cursor-pointer group">
                      <input type="file" accept="image/*" onChange={handleFileChange} className="hidden" />
                      <div className="w-16 h-16 bg-white rounded-2xl shadow-lg flex items-center justify-center transition-transform group-hover:scale-110">
                        <Camera className="w-8 h-8 text-blue-500" />
                      </div>
                      <div className="text-center">
                        <p className="text-xs font-black text-[#0B1E3A] uppercase tracking-widest">إرفاق لقطة شاشة لبيانات حسابك</p>
                        <p className="text-[9px] text-gray-400 font-bold mt-1 uppercase">JPEG, PNG Max 5MB</p>
                      </div>
                   </label>
                 ) : (
                   <div className="relative rounded-[2.5rem] overflow-hidden border-2 border-blue-200 group aspect-video md:aspect-auto md:h-48">
                      <img src={screenshot} className="w-full h-full object-cover" alt="Preview" />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                         <button onClick={() => setScreenshot(null)} className="p-3 bg-red-600 text-white rounded-xl shadow-xl hover:bg-red-700 transition-all">
                           <X className="w-6 h-6" />
                         </button>
                      </div>
                      <div className="absolute bottom-4 right-4 bg-white/10 backdrop-blur-md px-4 py-1.5 rounded-full border border-white/20">
                         <p className="text-[9px] text-white font-black uppercase tracking-widest">تم اختيار الملف</p>
                      </div>
                   </div>
                 )}
              </div>

              {/* Error Display */}
              {error && (
                <div className="p-5 bg-red-50 text-red-600 rounded-3xl flex items-start gap-4 flex-row-reverse border-r-8 border-red-600 animate-in slide-in-from-top">
                  <AlertCircle className="w-6 h-6 shrink-0 mt-0.5" />
                  <p className="text-xs font-black leading-relaxed">{error}</p>
                </div>
              )}

              {/* Submit Button */}
              <button 
                onClick={handleWithdraw}
                disabled={!amount || parseFloat(amount) <= 0 || !ribNumber || !accountName || isProcessing}
                className="w-full py-6 btn-1xbet text-2xl shadow-2xl flex items-center justify-center gap-4 transition-transform hover:scale-[1.01] active:scale-95 disabled:opacity-50"
              >
                <span>تأكيد طلب السحب</span>
                <ArrowUpRight className="w-8 h-8" />
              </button>
           </div>
        </div>

        {/* Footer Note */}
        <div className="p-8 bg-gray-50 border-t flex items-start gap-4 flex-row-reverse">
           <Info className="w-6 h-6 text-blue-600 shrink-0 mt-0.5" />
           <p className="text-[10px] text-gray-500 font-bold leading-relaxed">
             بمجرد تقديم الطلب، سيقوم فريق المالية بمراجعته ومطابقة البيانات البنكية مع الهوية المسجلة. قد تستغرق عملية التحويل من ساعة إلى 24 ساعة كحد أقصى حسب البنك المختار.
           </p>
        </div>
      </div>
    </div>
  );
};

export default Withdraw;
