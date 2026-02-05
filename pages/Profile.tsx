
import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { 
  User as UserIcon, 
  Settings, 
  Trophy, 
  Zap, 
  ShieldCheck, 
  Crown,
  Award,
  Gamepad2,
  Calendar,
  MapPin,
  Share2,
  Copy,
  CircleDot,
  LogOut,
  Dice5,
  Flame,
  CheckCircle2,
  ShieldAlert,
  ChevronLeft,
  ExternalLink,
  Users,
  TrendingUp,
  ArrowUpRight,
  Gift,
  Coins,
  Loader2
} from 'lucide-react';

const Profile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState<any>({
    displayName: 'Gamer_DZ',
    email: 'alex@example.com',
    country: 'Algeria',
    avatar: 'https://picsum.photos/200',
    parchisiId: 'PR-992140',
    parchisiLevel: '1',
    poolId: 'PL-882190',
    poolLevel: '1',
    vipTier: 'NONE',
    referralCode: 'GAMER123',
    referralCount: 5,
    referralEarnings: 15.25,
    linkedGames: []
  });

  const [isWithdrawingEarnings, setIsWithdrawingEarnings] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const getFrameClass = () => {
    switch (profile.vipTier) {
      case 'STARTER': return 'frame-starter';
      case 'PRO': return 'frame-pro';
      case 'ELITE': return 'frame-elite';
      case 'ULTIMATE': return 'frame-ultimate';
      default: return 'border-4 border-white/20';
    }
  };

  const copyReferral = () => {
    const link = `${window.location.origin}/#/register?ref=${profile.referralCode}`;
    navigator.clipboard.writeText(link);
    alert('تم نسخ رابط الإحالة الخاص بك! شاركه مع أصدقائك واربح 1% من كل فوز لهم مدى الحياة.');
  };

  const withdrawReferralEarnings = () => {
    if (profile.referralEarnings < 5) {
      alert('الحد الأدنى لسحب أرباح الإحالة هو $5.00');
      return;
    }
    
    setIsWithdrawingEarnings(true);
    setTimeout(() => {
      const currentBalance = parseFloat(localStorage.getItem('user_balance') || '0');
      const updatedProfile = {
        ...profile,
        referralEarnings: 0
      };
      
      localStorage.setItem('user_balance', (currentBalance + profile.referralEarnings).toString());
      localStorage.setItem('user_profile', JSON.stringify(updatedProfile));
      setProfile(updatedProfile);
      window.dispatchEvent(new Event('storage'));
      
      setIsWithdrawingEarnings(false);
      alert('تم تحويل أرباح الإحالة إلى رصيدك الرئيسي بنجاح!');
    }, 2000);
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm('هل أنت متأكد من رغبتك في تسجيل الخروج؟');
    if (confirmLogout) {
      // مسح كافة البيانات المتعلقة بالجلسة لضمان الخروج التام
      localStorage.removeItem('user_profile');
      localStorage.removeItem('user_balance');
      localStorage.removeItem('user_won_balance');
      localStorage.removeItem('is_in_match');
      localStorage.removeItem('current_match_prize');
      localStorage.removeItem('current_match_game');
      localStorage.removeItem('match_current_step');
      localStorage.removeItem('match_start_timestamp');
      localStorage.removeItem('match_chat_history');
      localStorage.removeItem('match_opponent_is_ready');
      
      // إرسال حدث التخزين لتحديث واجهة التطبيق (Header, Navigation)
      window.dispatchEvent(new Event('storage'));
      
      // التوجيه الفوري لصفحة الهبوط (Home)
      navigate('/');
    }
  };

  const gameIcons: Record<string, any> = {
    'Ludo Party': Dice5,
    '8 Ball Pool': CircleDot,
    'Free Fire': Flame
  };

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-8 space-y-8 text-right" dir="rtl">
      {/* Profile Main Header */}
      <div className="bg-[#0B1E3A] rounded-[3.5rem] p-8 md:p-12 text-white relative overflow-hidden shadow-2xl border-b-8 border-[#FACC15]">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>
        <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full -ml-48 -mt-48 blur-[100px]"></div>
        
        <div className="flex flex-col md:flex-row items-center gap-10 relative z-10 flex-row-reverse">
          <div className="relative group">
            <div className={`w-44 h-44 rounded-full overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.5)] transition-all duration-700 transform group-hover:scale-105 ${getFrameClass()}`}>
              <img src={profile.avatar} className="w-full h-full object-cover" alt="Avatar" />
            </div>
            {profile.vipTier !== 'NONE' && (
              <div className="absolute -bottom-4 -right-2 bg-[#FACC15] text-[#0B1E3A] p-4 rounded-2xl shadow-2xl flex items-center justify-center transform rotate-12">
                <Crown className="w-8 h-8" />
              </div>
            )}
          </div>

          <div className="text-center md:text-right space-y-6 flex-1">
            <div className="space-y-2">
              <div className="flex flex-col md:flex-row md:items-center gap-4 justify-center md:justify-start flex-row-reverse">
                <h1 className="text-5xl font-black tracking-tighter uppercase font-sporty italic">{profile.displayName}</h1>
                <div className="flex gap-2 flex-row-reverse">
                  {profile.vipTier !== 'NONE' && (
                    <span className="bg-[#FACC15] text-[#0B1E3A] text-[10px] font-black px-5 py-2 rounded-full uppercase tracking-widest shadow-xl shadow-yellow-500/20 border-2 border-white/20">
                      VIP {profile.vipTier}
                    </span>
                  )}
                </div>
              </div>
              <div className="flex items-center justify-center md:justify-start gap-6 text-blue-300 text-xs font-bold flex-row-reverse opacity-80">
                <span className="flex items-center gap-2 flex-row-reverse"><MapPin className="w-4 h-4" /> {profile.country}</span>
                <span className="flex items-center gap-2 flex-row-reverse"><Calendar className="w-4 h-4" /> لاعب منذ 2024</span>
              </div>
            </div>
            
            <div className="flex flex-wrap justify-center md:justify-start gap-4 flex-row-reverse">
              <Link to="/edit-profile" className="px-8 py-4 bg-white/10 text-white rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-white/20 transition-all border border-white/10 flex items-center gap-2 flex-row-reverse">
                <Settings className="w-5 h-5" /> تعديل الحساب
              </Link>
              <button onClick={copyReferral} className="px-8 py-4 bg-[#FACC15] text-[#0B1E3A] rounded-2xl text-[11px] font-black uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl shadow-yellow-500/10 flex items-center gap-2 flex-row-reverse">
                <Share2 className="w-5 h-5" /> دعوة الأصدقاء
              </button>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-8 bg-white/5 backdrop-blur-2xl p-8 rounded-[2.5rem] border border-white/10 text-center min-w-[320px] shadow-inner">
            <div className="space-y-1">
              <p className="text-4xl font-black text-[#FACC15] font-sporty italic tracking-tighter">0</p>
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">فوز</p>
            </div>
            <div className="border-r border-white/10 pr-8 space-y-1">
              <p className="text-4xl font-black text-white font-sporty italic tracking-tighter">{profile.referralCount}</p>
              <p className="text-[10px] font-black text-blue-300 uppercase tracking-widest">صديق مدعو</p>
            </div>
          </div>
        </div>
      </div>

      {/* Referral Hub */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-7 space-y-6">
          <div className="bg-white rounded-[3rem] p-8 shadow-xl border border-gray-100 relative overflow-hidden group">
            <div className="absolute top-0 left-0 w-2 h-full bg-[#FACC15]"></div>
            <div className="flex items-center justify-between mb-8 flex-row-reverse">
               <h2 className="text-2xl font-black text-[#0B1E3A] font-sporty uppercase flex items-center gap-3 flex-row-reverse">
                 <Gift className="w-8 h-8 text-[#FACC15]" /> مركز أرباح الإحالات
               </h2>
               <div className="p-3 bg-yellow-50 rounded-2xl">
                 <TrendingUp className="w-6 h-6 text-[#A16207]" />
               </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <div className="bg-gray-50 p-6 rounded-[2rem] border border-gray-100 flex flex-col items-center justify-center text-center space-y-1">
                 <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest">رصيد الإحالة الحالي</p>
                 <p className="text-5xl font-black text-[#0B1E3A] font-sporty italic tracking-tighter">
                   ${(profile.referralEarnings || 0).toLocaleString(undefined, { minimumFractionDigits: 2 })}
                 </p>
                 <p className="text-[9px] text-green-600 font-bold uppercase mt-2">عمولة 1% من أرباح أصدقائك</p>
               </div>

               <div className="flex flex-col gap-4">
                  <div className="flex-1 bg-blue-50/50 p-4 rounded-[1.5rem] border border-blue-100 text-right">
                    <p className="text-[9px] font-black text-blue-400 uppercase tracking-widest mb-1">الأصدقاء النشطون</p>
                    <p className="text-2xl font-black text-[#0B1E3A] font-sporty tracking-tighter">{profile.referralCount} لاعب</p>
                  </div>
                  <button 
                    onClick={withdrawReferralEarnings}
                    disabled={isWithdrawingEarnings || (profile.referralEarnings || 0) < 5}
                    className="w-full py-5 bg-[#0B1E3A] text-white rounded-[1.5rem] font-black text-xs uppercase tracking-widest flex items-center justify-center gap-2 hover:bg-[#1E3A8A] transition-all disabled:opacity-50 shadow-xl shadow-blue-900/10 group"
                  >
                    {isWithdrawingEarnings ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                    )}
                    <span>سحب الأرباح للرصيد الرئيسي</span>
                  </button>
               </div>
            </div>

            <div className="mt-8 p-6 bg-yellow-50/50 rounded-[2rem] border border-dashed border-yellow-200 flex items-start gap-4 flex-row-reverse">
               <ShieldCheck className="w-6 h-6 text-[#A16207] shrink-0 mt-0.5" />
               <p className="text-[11px] text-[#A16207] font-bold leading-relaxed">
                 استمر في دعوة الأصدقاء المحترفين. في كل مرة يفوز صديق لك في تحدي مالي، تحصل أنت تلقائياً على 1% من جائزته، وتضاف هنا فوراً. لا حدود لعدد الأصدقاء أو الأرباح!
               </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-5 space-y-6">
           <div className="bg-[#0B1E3A] rounded-[3rem] p-8 text-white relative overflow-hidden h-full flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 rounded-full -mr-16 -mt-16"></div>
              <div className="space-y-4 relative z-10">
                <div className="w-12 h-12 bg-[#FACC15] rounded-xl flex items-center justify-center">
                  <Coins className="w-6 h-6 text-[#0B1E3A]" />
                </div>
                <h3 className="text-2xl font-black font-sporty uppercase italic">شارك رابطك وابدأ الكسب</h3>
                <p className="text-blue-200 text-xs font-bold leading-relaxed">أفضل وسيلة لزيادة دخلك في المنصة دون لعب هي دعوة اللاعبين النشطين. أرباحك منهم مستمرة للأبد.</p>
              </div>
              
              <div className="mt-8 space-y-4 relative z-10">
                 <div className="bg-white/10 p-4 rounded-2xl border border-white/20 flex items-center justify-between flex-row-reverse">
                    <span className="font-black text-lg text-[#FACC15] tracking-widest">{profile.referralCode}</span>
                    <button onClick={copyReferral} className="p-2 bg-white/5 hover:bg-white/10 rounded-lg text-white transition-all">
                      <Copy className="w-4 h-4" />
                    </button>
                 </div>
                 <button onClick={copyReferral} className="w-full py-4 bg-[#FACC15] text-[#0B1E3A] rounded-2xl font-black text-xs uppercase tracking-widest hover:bg-yellow-500 transition-all shadow-xl">
                   انسخ رابط الإحالة المباشر
                 </button>
              </div>
           </div>
        </div>
      </div>

      {/* Linked Games Section */}
      <div className="space-y-6">
        <div className="flex items-center justify-between flex-row-reverse">
          <h2 className="text-2xl font-black text-[#0B1E3A] font-sporty uppercase flex items-center gap-3 flex-row-reverse">
            <ShieldCheck className="w-8 h-8 text-blue-600" /> هويات الألعاب الموثقة
          </h2>
          <Link to="/link-game" className="flex items-center gap-2 text-xs font-black text-blue-600 hover:underline flex-row-reverse">
            <ExternalLink className="w-4 h-4" /> ربط لعبة جديدة
          </Link>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profile.linkedGames && profile.linkedGames.length > 0 ? profile.linkedGames.map((g: any, idx: number) => {
            const Icon = gameIcons[g.game] || Gamepad2;
            return (
              <div key={idx} className="bg-white rounded-[2.5rem] p-6 shadow-xl border border-gray-100 relative group overflow-hidden">
                <div className="absolute top-0 left-0 w-1.5 h-full bg-blue-600"></div>
                <div className="flex items-center justify-between mb-4 flex-row-reverse">
                  <div className="flex items-center gap-3 flex-row-reverse">
                    <div className="p-3 bg-gray-50 rounded-2xl text-[#0B1E3A]">
                      <Icon className="w-6 h-6" />
                    </div>
                    <div className="text-right">
                      <h3 className="font-black text-sm uppercase font-sporty italic">{g.game}</h3>
                      <div className="flex items-center gap-1 text-[8px] font-black text-green-600 uppercase tracking-widest">
                        <CheckCircle2 className="w-3 h-3" /> موثق (AI Verified)
                      </div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-3">
                  <div className="bg-gray-50 p-4 rounded-2xl text-right">
                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1">اسم اللاعب</p>
                    <p className="text-sm font-black text-[#0B1E3A]">{g.playerName}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-2xl text-right">
                    <p className="text-[8px] font-black text-gray-400 uppercase mb-1">المعرف (ID)</p>
                    <p className="text-sm font-black text-blue-600 font-sporty">{g.playerId || 'N/A'}</p>
                  </div>
                </div>
              </div>
            );
          }) : (
            <div className="col-span-full py-16 text-center space-y-4 bg-gray-50 rounded-[3rem] border-2 border-dashed border-gray-200">
               <ShieldAlert className="w-12 h-12 text-gray-300 mx-auto" />
               <p className="text-sm font-black text-gray-400 uppercase tracking-widest">لا توجد ألعاب موثقة حالياً</p>
               <Link to="/link-game" className="btn-1xbet px-8 py-3 rounded-xl inline-block"><span>ابدأ التوثيق</span></Link>
            </div>
          )}
        </div>
      </div>

      {/* Account Control Section */}
      <div className="bg-white rounded-[2.5rem] p-10 shadow-xl border-2 border-red-50 space-y-8">
        <div className="flex items-center gap-4 flex-row-reverse border-b border-gray-50 pb-6">
          <div className="p-4 bg-red-50 text-red-600 rounded-2xl">
            <ShieldAlert className="w-8 h-8" />
          </div>
          <div className="text-right">
            <h3 className="text-2xl font-black text-[#0B1E3A] font-sporty uppercase">إدارة الجلسة</h3>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">الأمان وتسجيل الخروج</p>
          </div>
        </div>

        <button 
          onClick={handleLogout}
          className="w-full group flex items-center justify-between p-6 bg-red-600 rounded-[2rem] shadow-2xl shadow-red-500/30 hover:bg-red-700 transition-all transform hover:-translate-y-1 active:scale-95 text-white"
        >
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center transform group-hover:-rotate-12 transition-transform">
              <LogOut className="w-8 h-8 text-white" />
            </div>
            <div className="text-right">
              <p className="text-2xl font-black font-sporty italic uppercase leading-none">تسجيل الخروج</p>
              <p className="text-[10px] font-bold opacity-70 uppercase mt-1 tracking-widest">إنهاء الجلسة الحالية</p>
            </div>
          </div>
          <ChevronLeft className="w-8 h-8 transition-transform group-hover:-translate-x-2" />
        </button>
      </div>
    </div>
  );
};

export default Profile;
