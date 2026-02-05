
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { KeyRound, Mail, ShieldCheck, Loader2, CheckCircle2, Dice5, Lock, ExternalLink, ShieldAlert } from 'lucide-react';
import { Logo } from '../App';

const Login = () => {
  const navigate = useNavigate();
  const [isOAuthRedirecting, setIsOAuthRedirecting] = useState(false);
  const [showOAuthApproval, setShowOAuthApproval] = useState(false);
  const [linkedData, setLinkedData] = useState<any>(null);

  // 1. محاكاة التوجيه لصفحة Ludo الرسمية
  const startOAuthFlow = () => {
    setIsOAuthRedirecting(true);
    setTimeout(() => {
      setIsOAuthRedirecting(false);
      setShowOAuthApproval(true);
    }, 1500);
  };

  // 2. محاكاة الموافقة واستقبال الـ Token وجلب البيانات
  const handleApprove = () => {
    setShowOAuthApproval(false);
    setIsOAuthRedirecting(true); // إعادة التحميل لتمثيل العودة بـ Token

    setTimeout(() => {
      const mockData = {
        displayName: 'Ludo_King_DZ',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LudoKing',
        gameId: `PR-${Math.floor(100000 + Math.random() * 900000)}`,
        level: '58',
        game: 'Ludo Party',
        token: 'eyJhY2Nlc3NfdG9rZW4iOiIxbXgxLWx1ZG8tc2VjcmV0LWtleS05OTIifQ=='
      };
      setLinkedData(mockData);
      setIsOAuthRedirecting(false);
    }, 2000);
  };

  const finalizeLogin = () => {
    if (!linkedData) return;

    const userProfile = {
      displayName: linkedData.displayName,
      email: `${linkedData.displayName.toLowerCase()}@game.com`,
      country: 'Algeria',
      avatar: linkedData.avatar,
      parchisiId: linkedData.gameId,
      parchisiLevel: linkedData.level,
      poolId: 'PL-000000',
      poolLevel: '1',
      vipTier: 'NONE',
      referralCode: linkedData.displayName.toUpperCase() + '123',
      referralCount: 0,
      isLinked: true
    };

    localStorage.setItem('user_profile', JSON.stringify(userProfile));
    localStorage.setItem('user_balance', '50.00'); 
    
    window.dispatchEvent(new Event('storage'));
    navigate('/dashboard');
  };

  if (showOAuthApproval) {
    return (
      <div className="fixed inset-0 bg-white z-[200] flex flex-col items-center justify-center p-6 text-right" dir="rtl">
        <div className="max-w-md w-full space-y-8 animate-in fade-in zoom-in duration-300">
          <div className="flex justify-center mb-8">
            <div className="bg-red-600 p-4 rounded-3xl shadow-2xl">
              <Dice5 className="w-16 h-16 text-white" />
            </div>
          </div>
          <div className="text-center space-y-2">
            <h2 className="text-2xl font-black text-[#0B1E3A]">تسجيل دخول Part Ludo</h2>
            <p className="text-sm text-gray-500 font-bold">يطلب تطبيق <span className="text-blue-600 font-black">1x1.online</span> الوصول إلى بياناتك:</p>
          </div>
          
          <div className="bg-gray-50 p-6 rounded-3xl border border-gray-100 space-y-4">
             <div className="flex items-center gap-3 flex-row-reverse border-b border-gray-200 pb-3">
               <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
               <span className="text-sm font-bold text-gray-700">الوصول إلى معرف اللاعب (Player ID)</span>
             </div>
             <div className="flex items-center gap-3 flex-row-reverse border-b border-gray-200 pb-3">
               <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
               <span className="text-sm font-bold text-gray-700">عرض مستوى الحساب (Account Level)</span>
             </div>
             <div className="flex items-center gap-3 flex-row-reverse">
               <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center"><CheckCircle2 className="w-5 h-5" /></div>
               <span className="text-sm font-bold text-gray-700">مزامنة صورة البروفايل والاسم</span>
             </div>
          </div>

          <div className="flex flex-col gap-3">
             <button onClick={handleApprove} className="w-full py-5 bg-red-600 text-white font-black rounded-2xl text-lg hover:bg-red-700 transition-all shadow-xl shadow-red-500/20">
               الموافقة والمتابعة
             </button>
             <button onClick={() => setShowOAuthApproval(false)} className="w-full py-4 bg-gray-100 text-gray-400 font-black rounded-2xl text-xs uppercase tracking-widest hover:bg-gray-200 transition-all">
               إلغاء
             </button>
          </div>
          
          <div className="flex items-center justify-center gap-2 pt-4 border-t border-gray-100">
             <ShieldCheck className="w-4 h-4 text-gray-300" />
             <span className="text-[10px] text-gray-400 font-bold uppercase">اتصال آمن عبر Part Ludo SDK</span>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0B1E3A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-blue-500 rounded-full blur-[150px]"></div>
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] bg-yellow-500 rounded-full blur-[150px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10 scale-125">
          <Logo />
        </div>
        
        <div className="bg-white rounded-[2.5rem] shadow-3xl overflow-hidden border-t-8 border-[#FACC15] text-right" dir="rtl">
          <div className="bg-[#1E3A8A] p-8 text-white text-center">
            <h2 className="text-3xl font-black uppercase font-sporty leading-none">تسجيل الدخول الذكي</h2>
            <p className="text-[10px] text-blue-200 mt-2 font-bold uppercase tracking-[0.2em]">اربط حسابك وابدأ التحدي فوراً</p>
          </div>
          
          <div className="p-8 space-y-8">
            {/* Ludo OAuth Button */}
            {!linkedData && !isOAuthRedirecting && (
              <div className="space-y-4">
                <button 
                  onClick={startOAuthFlow}
                  className="w-full group flex items-center justify-between p-4 bg-red-600 rounded-2xl shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all transform hover:-translate-y-1 active:scale-95 text-white"
                >
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center transform group-hover:rotate-12 transition-transform">
                      <Dice5 className="w-7 h-7 text-red-600" />
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-black leading-none">Continue with Part Ludo</p>
                      <p className="text-[9px] font-bold opacity-80 uppercase mt-1">المزامنة التلقائية للمستوى والـ ID</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-40" />
                </button>
                
                <p className="text-[9px] text-gray-400 font-bold uppercase tracking-widest text-center">أو استخدام الطريقة التقليدية</p>
              </div>
            )}

            {/* Linking Loader */}
            {isOAuthRedirecting && (
              <div className="py-12 text-center space-y-6 animate-in fade-in">
                <div className="relative w-20 h-20 mx-auto">
                   <Loader2 className="w-20 h-20 text-red-600 animate-spin" />
                   <div className="absolute inset-0 flex items-center justify-center">
                     <Lock className="w-8 h-8 text-[#0B1E3A]" />
                   </div>
                </div>
                <div className="space-y-2">
                  <h3 className="text-lg font-black text-[#0B1E3A]">جارِ التحقق من الرمز (Token)...</h3>
                  <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest italic">Secure Handshake with Part Ludo Servers</p>
                </div>
              </div>
            )}

            {/* Linked Data Profile Card */}
            {linkedData && (
              <div className="animate-in zoom-in duration-500 space-y-6">
                <div className="bg-green-50 rounded-[2rem] p-6 border-2 border-dashed border-green-200 relative">
                  <div className="absolute -top-3 -left-3 bg-green-500 text-white p-1 rounded-full shadow-lg">
                    <CheckCircle2 className="w-5 h-5" />
                  </div>
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border-4 border-white shadow-xl">
                      <img src={linkedData.avatar} alt="Linked Avatar" className="w-full h-full object-cover" />
                    </div>
                    <div className="text-right flex-1">
                      <p className="text-[10px] font-black text-red-600 uppercase tracking-widest">Part Ludo Account Linked</p>
                      <h3 className="text-xl font-black text-[#0B1E3A]">{linkedData.displayName}</h3>
                      <div className="flex gap-2 mt-1 flex-row-reverse">
                        <span className="text-[9px] bg-white px-2 py-0.5 rounded-full font-bold border">ID: {linkedData.gameId}</span>
                        <span className="text-[9px] bg-[#FACC15] px-2 py-0.5 rounded-full font-black">Level {linkedData.level}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <button 
                  onClick={finalizeLogin}
                  className="w-full py-5 btn-1xbet shadow-xl text-xl"
                >
                  <span>دخول بـ {linkedData.displayName}</span>
                </button>
                
                <button 
                  onClick={() => setLinkedData(null)}
                  className="w-full text-[10px] font-black text-gray-400 uppercase tracking-widest hover:text-red-500"
                >
                  إلغاء والربط بحساب آخر
                </button>
              </div>
            )}

            {!linkedData && !isOAuthRedirecting && (
              <>
                <div className="space-y-6">
                  <div className="space-y-2">
                    <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">البريد الإلكتروني</label>
                    <div className="relative">
                      <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="email" placeholder="name@example.com" className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none" />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center flex-row-reverse">
                      <label className="block text-[10px] font-black text-gray-400 uppercase tracking-[0.2em]">كلمة المرور</label>
                      <Link to="#" className="text-[10px] font-black text-[#1E3A8A] hover:underline uppercase tracking-widest">نسيت كلمة السر؟</Link>
                    </div>
                    <div className="relative">
                      <KeyRound className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <input type="password" placeholder="••••••••" className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none" />
                    </div>
                  </div>
                </div>

                <button onClick={() => navigate('/dashboard')} className="w-full py-5 bg-[#0B1E3A] text-white font-black rounded-2xl text-xl uppercase tracking-widest hover:bg-[#1E3A8A] transition-all shadow-xl shadow-blue-900/10">
                  دخول مباشر
                </button>
              </>
            )}
            
            <div className="text-center pt-4 border-t border-gray-50">
              <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                ليس لديك حساب؟ <Link to="/register" className="text-[#1E3A8A] font-black hover:underline ml-1">أنشئ حساباً الآن</Link>
              </p>
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-center gap-4 mt-8 opacity-20 text-white">
           <ShieldCheck className="w-5 h-5" />
           <span className="text-[10px] font-black uppercase tracking-[0.3em]">الربط مؤمن بتقنية OAuth 2.0</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
