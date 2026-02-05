
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  PlusCircle, 
  Trophy, 
  Zap, 
  TrendingUp, 
  ShieldCheck, 
  Search, 
  CircleDot, 
  ChevronLeft, 
  Crown, 
  AlertCircle, 
  Star, 
  Award, 
  Dice5, 
  Filter,
  ChevronDown
} from 'lucide-react';

const Dashboard = () => {
  const navigate = useNavigate();
  const [balance, setBalance] = useState(0);
  const [selectedGame, setSelectedGame] = useState<string>('all');
  const [isInMatch, setIsInMatch] = useState(false);
  const [profile, setProfile] = useState<any>(null);
  const [isVerifying, setIsVerifying] = useState(true);

  useEffect(() => {
    const savedBalance = localStorage.getItem('user_balance');
    if (savedBalance) setBalance(parseFloat(savedBalance));
    
    const matchStatus = localStorage.getItem('is_in_match');
    setIsInMatch(matchStatus === 'true');

    const savedProfile = localStorage.getItem('user_profile');
    if (savedProfile) {
      const parsedProfile = JSON.parse(savedProfile);
      setProfile(parsedProfile);
      
      if (!parsedProfile.linkedGames || parsedProfile.linkedGames.length === 0) {
        navigate('/link-game');
      } else {
        setIsVerifying(false);
      }
    } else {
      navigate('/login');
    }
  }, [navigate]);

  if (isVerifying) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-[#F1F5F9] space-y-4">
        <div className="relative w-16 h-16">
          <div className="absolute inset-0 border-4 border-blue-200 rounded-full"></div>
          <div className="absolute inset-0 border-4 border-[#0B1E3A] border-t-transparent rounded-full animate-spin"></div>
        </div>
        <p className="font-black text-[#0B1E3A] uppercase tracking-widest text-[10px]">التحقق من حالة الحساب...</p>
      </div>
    );
  }

  const openChallenges = [
    { id: 'CH-901', creator: 'الملك_بشرى', fee: 10, game: 'Ludo Party', level: 45, players: '1/2' },
    { id: 'CH-902', creator: 'ماستر_بلاير', fee: 25, game: '8 Ball Pool', level: 32, players: '1/2' },
    { id: 'CH-903', creator: 'يوسف_DZ', fee: 5, game: 'Ludo Party', level: 12, players: '1/2' },
    { id: 'CH-904', creator: 'GamerX', fee: 50, game: '8 Ball Pool', level: 50, players: '1/2' },
    { id: 'CH-905', creator: 'Zino_07', fee: 100, game: '8 Ball Pool', level: 68, players: '1/2' },
    { id: 'CH-906', creator: 'Amine_Ludo', fee: 20, game: 'Ludo Party', level: 30, players: '1/2' },
  ];

  const handleJoinChallenge = (id: string, fee: number, game: string) => {
    if (isInMatch) {
      alert("عذراً! لديك تحدي نشط حالياً. يجب إنهاء مباراتك الحالية قبل الانضمام لتحدي آخر.");
      navigate('/match-room');
      return;
    }

    const currentBalance = parseFloat(localStorage.getItem('user_balance') || '0');
    if (currentBalance < fee) {
      alert(`رصيدك غير كافٍ! رسوم الانضمام لهذه المجموعة هي $${fee}، بينما رصيدك الحالي هو $${currentBalance.toFixed(2)}. يرجى شحن رصيدك أولاً.`);
      navigate('/deposit');
      return;
    }

    const confirmJoin = window.confirm(`هل أنت متأكد من الانضمام لتحدي ${game}؟ سيتم خصم $${fee} من رصيدك فوراً.`);
    
    if (confirmJoin) {
      const winnerTakes = fee * 2 * 0.9;
      const newBalance = currentBalance - fee;

      localStorage.setItem('user_balance', newBalance.toString());
      localStorage.setItem('is_in_match', 'true');
      localStorage.setItem('current_match_prize', winnerTakes.toFixed(2));
      localStorage.setItem('current_match_game', game);
      
      setBalance(newBalance);
      setIsInMatch(true);
      
      window.dispatchEvent(new Event('storage'));
      navigate('/match-room');
    }
  };

  const filteredChallenges = selectedGame !== 'all'
    ? openChallenges.filter(c => c.game === selectedGame)
    : openChallenges;

  const ludoLevel = parseInt(profile?.parchisiLevel || '1');
  const poolLevel = parseInt(profile?.poolLevel || '1');
  const ludoProgress = (ludoLevel % 10) * 10;
  const poolProgress = (poolLevel % 10) * 10;

  return (
    <div className="p-4 md:p-6 space-y-8 max-w-[1400px] mx-auto text-right" dir="rtl">
      {/* Active Match Banner */}
      {isInMatch && (
        <div className="bg-red-600 text-white p-4 rounded-2xl flex items-center justify-between animate-pulse shadow-lg shadow-red-500/20">
          <div className="flex items-center gap-3">
             <AlertCircle className="w-6 h-6" />
             <p className="font-black text-sm uppercase tracking-tight">لديك مباراة جارية الآن! لا يمكنك الانضمام لتحديات أخرى.</p>
          </div>
          <Link to="/match-room" className="bg-white text-red-600 px-6 py-2 rounded-xl font-black text-xs uppercase hover:bg-gray-100 transition-all">العودة للغرفة</Link>
        </div>
      )}

      {/* Top Welcome Bar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        <div className="lg:col-span-3 bg-[#0B1E3A] rounded-[2rem] p-8 text-white flex flex-col md:flex-row justify-between items-center relative overflow-hidden shadow-2xl border-b-4 border-[#FACC15]">
          <div className="absolute top-0 left-0 w-full h-full opacity-5 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
          
          <div className="z-10 flex items-center gap-6 flex-row-reverse">
             <div className="relative">
                <div className="w-20 h-20 rounded-2xl overflow-hidden border-2 border-[#FACC15] shadow-xl transition-transform hover:scale-105">
                   <img src={profile?.avatar || 'https://picsum.photos/200'} className="w-full h-full object-cover" alt="Profile" />
                </div>
                {profile?.vipTier !== 'NONE' && (
                  <div className="absolute -top-2 -right-2 bg-[#FACC15] p-1.5 rounded-lg shadow-lg">
                    <Crown className="w-4 h-4 text-[#0B1E3A]" />
                  </div>
                )}
             </div>
             <div className="space-y-1 text-right">
                <h1 className="text-3xl font-black font-sporty uppercase italic">أهلاً، {profile?.displayName || 'اللاعب'}!</h1>
                <div className="flex items-center gap-2 flex-row-reverse">
                   <span className="bg-blue-500/20 text-blue-300 text-[10px] font-black px-2 py-0.5 rounded border border-blue-500/30 uppercase tracking-widest">
                     مستوى {Math.max(ludoLevel, poolLevel)}
                   </span>
                   <p className="text-blue-200 text-xs font-bold opacity-80">هل أنت مستعد لمواجهة جديدة؟</p>
                </div>
             </div>
          </div>

          <div className="mt-8 md:mt-0 flex items-center gap-6 z-10 flex-row-reverse">
            <div className="text-right">
              <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest leading-none mb-1">الرصيد المتاح</p>
              <p className="text-5xl font-black text-[#FACC15] tracking-tighter font-sporty italic">${balance.toLocaleString(undefined, { minimumFractionDigits: 2 })}</p>
            </div>
            <Link to="/wallet" className="bg-[#22C55E] hover:bg-green-600 text-white p-4 rounded-2xl transition-all shadow-xl shadow-green-500/20 active:scale-95 group">
              <PlusCircle className="w-10 h-10 transition-transform group-hover:rotate-90" />
            </Link>
          </div>
        </div>

        <div className="bg-white rounded-[2.5rem] p-6 border border-gray-100 shadow-sm flex flex-col justify-center text-center space-y-2 relative overflow-hidden group">
           <div className="absolute top-0 right-0 w-24 h-24 bg-yellow-50 rounded-full -mr-12 -mt-12 opacity-0 group-hover:opacity-100 transition-opacity"></div>
           <Trophy className="w-10 h-10 text-[#FACC15] mx-auto relative z-10" />
           <p className="text-[10px] font-black text-gray-400 uppercase relative z-10 tracking-widest">ترتيبك العالمي</p>
           <p className="text-3xl font-black text-[#0B1E3A] font-sporty italic relative z-10">#1,242</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 animate-in slide-in-from-bottom duration-500">
        {/* Main Content: Levels and VIP */}
        <div className="lg:col-span-8 space-y-8">
          <div className="flex items-center justify-between flex-row-reverse">
            <h2 className="text-2xl font-black text-[#0B1E3A] font-sporty uppercase flex items-center gap-3 flex-row-reverse">
               <Award className="w-7 h-7 text-[#FACC15]" /> المستويات ونادي الـ VIP
            </h2>
          </div>

          {/* Progress Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-red-600"></div>
               <div className="flex justify-between items-center flex-row-reverse">
                  <Dice5 className="w-10 h-10 text-red-600 transform group-hover:rotate-12 transition-transform" />
                  <div className="text-right">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">Ludo Party</p>
                     <h3 className="text-2xl font-black text-[#0B1E3A] font-sporty italic">المستوى {ludoLevel}</h3>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black flex-row-reverse">
                     <span className="text-gray-400">التقدم للمستوى {ludoLevel + 1}</span>
                     <span className="text-red-600">{ludoProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                     <div className="bg-red-600 h-full transition-all duration-1000" style={{ width: `${ludoProgress}%` }}></div>
                  </div>
               </div>
            </div>

            <div className="bg-white p-8 rounded-[2.5rem] border border-gray-100 shadow-sm space-y-6 relative overflow-hidden group">
               <div className="absolute top-0 left-0 w-2 h-full bg-[#0B1E3A]"></div>
               <div className="flex justify-between items-center flex-row-reverse">
                  <div className="w-10 h-10 bg-black rounded-full flex items-center justify-center border-2 border-white shadow-lg group-hover:scale-110 transition-transform">
                    <span className="text-white font-black text-xs">8</span>
                  </div>
                  <div className="text-right">
                     <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">8 Ball Pool</p>
                     <h3 className="text-2xl font-black text-[#0B1E3A] font-sporty italic">المستوى {poolLevel}</h3>
                  </div>
               </div>
               <div className="space-y-2">
                  <div className="flex justify-between text-[10px] font-black flex-row-reverse">
                     <span className="text-gray-400">التقدم للمستوى {poolLevel + 1}</span>
                     <span className="text-[#0B1E3A]">{poolProgress}%</span>
                  </div>
                  <div className="w-full bg-gray-100 h-3 rounded-full overflow-hidden">
                     <div className="bg-[#0B1E3A] h-full transition-all duration-1000" style={{ width: `${poolProgress}%` }}></div>
                  </div>
               </div>
            </div>
          </div>

          {/* VIP Benefits Showcase */}
          <div className="bg-gradient-to-br from-[#0B1E3A] to-[#1E3A8A] rounded-[3rem] p-10 text-white relative overflow-hidden shadow-2xl">
             <div className="relative z-10 flex flex-col md:flex-row items-center justify-between gap-10">
                <div className="space-y-6 text-right flex-1">
                   <h3 className="text-4xl font-black font-sporty italic tracking-tight">ضاعف أرباحك مع VIP</h3>
                   <p className="text-blue-100 text-sm font-bold leading-relaxed max-w-lg">
                      عند اشتراكك في باقات VIP، ستحصل على عمولة 0% من المنصة، سحب فوري للأرباح.
                   </p>
                   <Link to="/vip" className="inline-block py-4 px-12 bg-[#FACC15] text-[#0B1E3A] rounded-2xl text-[12px] font-black uppercase hover:bg-yellow-500 transition-all shadow-xl">اشترك الآن</Link>
                </div>
                <Crown className="w-24 h-24 text-[#FACC15] drop-shadow-[0_0_20px_rgba(250,204,21,0.5)]" />
             </div>
          </div>
        </div>

        {/* Sidebar: Open Challenges */}
        <div className="lg:col-span-4 space-y-6">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-gray-100 overflow-hidden sticky top-24">
            <div className="bg-[#0B1E3A] p-6 text-white text-center">
               <h3 className="text-xl font-black font-sporty italic uppercase">التحديات المتاحة</h3>
               <p className="text-[9px] text-blue-300 font-bold uppercase tracking-widest mt-1">اختر خصمك الآن</p>
            </div>
            
            <div className="p-4 space-y-4 max-h-[700px] overflow-y-auto">
               {/* Advanced Filter Dropdown */}
               <div className="space-y-3 pb-2 border-b border-gray-50 mb-2">
                 <label className="flex items-center gap-2 flex-row-reverse text-[10px] font-black text-gray-400 uppercase tracking-widest px-1">
                    <Filter className="w-3 h-3 text-blue-600" /> تصفية حسب اللعبة
                 </label>
                 <div className="relative">
                    <select 
                      value={selectedGame}
                      onChange={(e) => setSelectedGame(e.target.value)}
                      className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-[11px] font-black uppercase tracking-widest outline-none appearance-none cursor-pointer pr-4 pl-10 transition-all"
                    >
                      <option value="all">كل الألعاب المتاحة</option>
                      <option value="Ludo Party">Ludo Party (لودو)</option>
                      <option value="8 Ball Pool">8 Ball Pool (بلياردو)</option>
                    </select>
                    <ChevronDown className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                 </div>
               </div>

               <div className="relative mb-4">
                 <Search className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                 <input type="text" placeholder="بحث باسم اللاعب..." className="w-full pr-10 pl-3 py-3 bg-gray-50 border border-gray-100 rounded-xl text-[11px] font-bold outline-none focus:border-blue-400 transition-all text-right" dir="rtl" />
               </div>

               {filteredChallenges.length > 0 ? filteredChallenges.map((challenge) => (
                 <div key={challenge.id} className="p-4 rounded-3xl border border-gray-100 hover:border-[#1E3A8A] transition-all space-y-4 group bg-white shadow-sm hover:shadow-lg">
                    <div className="flex items-center justify-between flex-row-reverse">
                       <div className="flex items-center gap-4 flex-row-reverse text-right">
                          {/* Distinct Game Logo positioning */}
                          <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shadow-lg transition-transform group-hover:scale-110 group-hover:rotate-3 ${challenge.game === 'Ludo Party' ? 'bg-red-600' : 'bg-[#0B1E3A]'} text-white`}>
                            {challenge.game === 'Ludo Party' ? (
                              <Dice5 className="w-8 h-8" />
                            ) : (
                              <div className="w-8 h-8 bg-black rounded-full flex items-center justify-center border-2 border-white shadow-inner relative">
                                <span className="text-white font-black text-[12px]">8</span>
                                <div className="absolute top-0 right-0 w-2 h-2 bg-white/30 rounded-full"></div>
                              </div>
                            )}
                          </div>

                          <div className="text-right">
                             <h4 className="text-sm font-black text-[#0B1E3A] uppercase font-sporty italic leading-none group-hover:text-blue-600 transition-colors">{challenge.creator}</h4>
                             <div className="flex items-center gap-2 mt-1.5 flex-row-reverse">
                                <span className="text-[9px] font-black text-gray-400 uppercase">LV.{challenge.level}</span>
                                <span className={`text-[7px] font-black px-2 py-0.5 rounded-full uppercase tracking-tighter ${challenge.game === 'Ludo Party' ? 'bg-red-50 text-red-600' : 'bg-blue-50 text-[#1E3A8A]'}`}>
                                  {challenge.game}
                                </span>
                             </div>
                          </div>
                       </div>
                       <div className="flex items-center gap-1 text-[8px] font-black text-green-600 uppercase">
                         <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
                         متاح
                       </div>
                    </div>
                    
                    <div className="flex items-center justify-between flex-row-reverse border-t border-gray-50 pt-3">
                       <div className="text-right">
                          <p className="text-[8px] font-black text-gray-400 uppercase leading-none mb-1">صافي الربح</p>
                          <p className="text-xl font-black text-[#22C55E] font-sporty leading-none italic tracking-tighter">${(challenge.fee * 2 * 0.9).toFixed(2)}</p>
                       </div>
                       <div className="text-right border-r pr-4">
                          <p className="text-[8px] font-black text-gray-400 uppercase leading-none mb-1">الرهان</p>
                          <p className="text-xl font-black text-[#0B1E3A] font-sporty leading-none italic tracking-tighter">${challenge.fee}</p>
                       </div>
                       <button 
                         onClick={() => handleJoinChallenge(challenge.id, challenge.fee, challenge.game)}
                         className={`btn-1xbet px-8 py-3 rounded-xl text-[11px] shadow-lg ${isInMatch ? 'opacity-50 pointer-events-none' : ''}`}
                       >
                         <span>تحدي</span>
                       </button>
                    </div>
                 </div>
               )) : (
                 <div className="py-12 text-center space-y-3 opacity-50 bg-gray-50 rounded-3xl border-2 border-dashed border-gray-100">
                    <Search className="w-8 h-8 text-gray-300 mx-auto" />
                    <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">لا توجد تحديات متاحة</p>
                 </div>
               )}
            </div>

            <div className="p-4 bg-gray-50 border-t border-gray-100">
               <Link to="/create-match" className="w-full flex items-center justify-center gap-2 py-5 bg-[#0B1E3A] text-white rounded-2xl text-[12px] font-black uppercase hover:bg-blue-900 transition-all shadow-xl shadow-blue-900/10 group">
                  <PlusCircle className="w-5 h-5 group-hover:rotate-90 transition-transform" /> إنشاء تحدي جديد
               </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
