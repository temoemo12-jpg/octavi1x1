
import React, { useState, useEffect } from 'react';
import { Trophy, Users, Calendar, ArrowRight, Zap, Crown, AlertCircle, CheckCircle2 } from 'lucide-react';
// Added 'Link' to the imported members from react-router-dom
import { useNavigate, Link } from 'react-router-dom';

const Tournaments = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Upcoming');
  const [userBalance, setUserBalance] = useState(0);
  const [isInMatch, setIsInMatch] = useState(false);

  useEffect(() => {
    const savedBalance = localStorage.getItem('user_balance');
    const matchStatus = localStorage.getItem('is_in_match');
    if (savedBalance) setUserBalance(parseFloat(savedBalance));
    setIsInMatch(matchStatus === 'true');
  }, []);

  const tourneys = [
    { id: 1, title: 'كأس لودو الصيفي', game: 'Ludo Party', prize: '$500.00', players: 124, max: 256, status: 'Upcoming', entryFee: 15, image: 'https://images.unsplash.com/photo-1593508512255-86ab42a8e620?auto=format&fit=crop&q=80&w=400&h=200' },
    { id: 2, title: 'دوري المحترفين FIFA 24', game: 'FIFA 24', prize: '$1,200.00', players: 64, max: 64, status: 'Live', entryFee: 30, image: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?auto=format&fit=crop&q=80&w=400&h=200' },
    { id: 3, title: 'تحدي البلياردو الكبرى', game: '8 Ball Pool', prize: '$350.00', players: 88, max: 100, status: 'Upcoming', entryFee: 10, image: 'https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=400&h=200' },
    { id: 4, title: 'ماسترز الشطرنج DZ', game: 'Chess.com', prize: '$150.00', players: 32, max: 32, status: 'Finished', entryFee: 5, image: 'https://images.unsplash.com/photo-1586165368502-1bad197a6461?auto=format&fit=crop&q=80&w=400&h=200' },
  ];

  const handleJoin = (id: number, fee: number) => {
    if (isInMatch) {
      alert("عذراً! لديك تحدي نشط حالياً. لا يمكنك الانضمام لبطولة أخرى حتى تنهي مباراتك.");
      navigate('/match-room');
      return;
    }

    if (userBalance < fee) {
      alert("رصيدك غير كافٍ للاشتراك في هذه البطولة. يرجى الشحن أولاً.");
      navigate('/deposit');
      return;
    }

    const confirmJoin = window.confirm(`هل أنت متأكد من الانضمام للبطولة؟ سيتم خصم رسوم الاشتراك $${fee}.`);
    if (confirmJoin) {
      const newBalance = userBalance - fee;
      localStorage.setItem('user_balance', newBalance.toString());
      localStorage.setItem('is_in_match', 'true');
      window.dispatchEvent(new Event('storage'));
      alert("تم الانضمام بنجاح! سيتم توجيهك لغرفة البطولة.");
      navigate('/match-room');
    }
  };

  const filtered = tourneys.filter(t => t.status === activeTab);

  return (
    <div className="p-4 md:p-10 space-y-10 text-right" dir="rtl">
      {/* Tournament Header */}
      <div className="bg-[#0B1E3A] rounded-[2.5rem] p-10 text-white relative overflow-hidden shadow-2xl border-b-4 border-[#FACC15]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
           <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FACC15] rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8 flex-row-reverse">
          <div className="space-y-4 text-center md:text-right">
             <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/5 rounded-full border border-white/10">
               <Crown className="w-4 h-4 text-[#FACC15]" />
               <span className="text-[10px] font-black uppercase tracking-widest text-[#FACC15]">البطولات الرسمية الكبرى</span>
             </div>
             <h1 className="text-4xl md:text-5xl font-black font-sporty uppercase tracking-tighter">نافس المحترفين.. <br />واخطف الجوائز الكبرى</h1>
             <p className="text-blue-200 text-sm font-bold opacity-80 max-w-xl">
               انضم لأكبر بطولات الألعاب الإلكترونية في الجزائر والوطن العربي. جوائز مالية حقيقية، تنظيم احترافي، ومنافسة عادلة.
             </p>
          </div>
          
          <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] border border-white/10 flex flex-col items-center gap-2 min-w-[200px]">
             <Trophy className="w-12 h-12 text-[#FACC15]" />
             <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">إجمالي جوائز الشهر</p>
             <p className="text-3xl font-black text-white font-sporty tracking-tighter">$15,500</p>
          </div>
        </div>
      </div>

      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 flex-row-reverse">
        <div className="bg-white p-1 rounded-2xl shadow-sm border border-gray-100 flex flex-row-reverse">
          {[
            { id: 'Upcoming', label: 'القادمة' },
            { id: 'Live', label: 'المباشرة' },
            { id: 'Finished', label: 'المنتهية' }
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-8 py-3 rounded-xl text-xs font-black transition-all ${
                activeTab === tab.id ? 'bg-[#0B1E3A] text-white shadow-xl' : 'text-gray-400 hover:text-[#0B1E3A]'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-4 flex-row-reverse">
           <div className="text-right">
             <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">رصيدك</p>
             <p className="text-xl font-black text-[#1E3A8A] font-sporty italic">${userBalance.toFixed(2)}</p>
           </div>
           <Link to="/deposit" className="bg-[#22C55E] p-2.5 rounded-xl text-white hover:bg-green-600 transition-all shadow-lg shadow-green-500/10">
             <Zap className="w-5 h-5 fill-current" />
           </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
        {filtered.length > 0 ? filtered.map((t) => (
          <div key={t.id} className="bg-white rounded-[2.5rem] overflow-hidden shadow-sm border border-gray-100 flex flex-col group hover:shadow-2xl hover:border-blue-200 transition-all duration-500">
            <div className="h-44 bg-gray-200 relative overflow-hidden">
               <img src={t.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={t.title} />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
               {t.status === 'Live' && (
                 <div className="absolute top-4 right-4 bg-red-600 text-white text-[9px] font-black px-4 py-1 rounded-full animate-pulse border border-white/20 shadow-lg uppercase tracking-widest">
                   مباشر الآن
                 </div>
               )}
               <div className="absolute bottom-4 right-4 text-white">
                 <p className="text-[10px] font-black uppercase tracking-widest text-[#FACC15]">{t.game}</p>
                 <h3 className="text-lg font-black">{t.title}</h3>
               </div>
            </div>
            <div className="p-8 flex-1 flex flex-col space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-1">إجمالي الجائزة</p>
                  <p className="text-xl font-black text-[#22C55E] font-sporty tracking-tighter">{t.prize}</p>
                </div>
                <div className="bg-gray-50 p-4 rounded-2xl border border-gray-100 text-center">
                  <p className="text-[9px] text-gray-400 font-black uppercase mb-1">رسوم الدخول</p>
                  <p className="text-xl font-black text-[#0B1E3A] font-sporty tracking-tighter">${t.entryFee}</p>
                </div>
              </div>

              <div className="space-y-3">
                <div className="flex items-center justify-between flex-row-reverse text-[10px] font-bold text-gray-500">
                   <div className="flex items-center gap-2 flex-row-reverse"><Users className="w-3.5 h-3.5 text-blue-500" /> المشاركون</div>
                   <span className="text-[#0B1E3A] font-black">{t.players} / {t.max}</span>
                </div>
                <div className="w-full bg-gray-100 h-1.5 rounded-full overflow-hidden">
                   <div 
                    className="bg-[#1E3A8A] h-full transition-all duration-1000" 
                    style={{ width: `${(t.players / t.max) * 100}%` }}
                   ></div>
                </div>
              </div>

              <div className="flex items-center gap-2 text-[10px] text-gray-400 font-black uppercase tracking-widest pb-4 border-b border-gray-50 flex-row-reverse">
                <Calendar className="w-4 h-4 text-blue-400" /> الموعد: غداً، 21:00 بتوقيت الجزائر
              </div>

              <button 
                onClick={() => handleJoin(t.id, t.entryFee)}
                className={`w-full py-5 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all uppercase tracking-[0.2em] shadow-xl ${
                t.status === 'Live' 
                  ? 'bg-red-600 text-white hover:bg-red-700 shadow-red-500/20' 
                  : 'btn-1xbet'
              }`}>
                <span>{t.status === 'Live' ? 'مشاهدة البطولة' : 'انضم الآن'}</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="col-span-full py-32 text-center space-y-6 bg-white rounded-[3rem] border border-dashed border-gray-200">
            <div className="w-24 h-24 bg-gray-50 rounded-full flex items-center justify-center mx-auto">
               <Zap className="w-12 h-12 text-gray-200" />
            </div>
            <div className="space-y-1">
              <p className="text-xl font-black text-gray-400 uppercase tracking-widest">لا توجد بطولات حالياً في هذا القسم</p>
              <p className="text-xs text-gray-300 font-bold">يرجى العودة لاحقاً أو استكشاف الأقسام الأخرى.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Tournaments;
