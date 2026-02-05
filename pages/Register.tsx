
import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { User, Mail, Lock, ShieldCheck, UserPlus, Loader2, CheckCircle2, Dice5, ExternalLink, ArrowRight, Users } from 'lucide-react';
import { Logo } from '../App';

const Register = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isOAuthRedirecting, setIsOAuthRedirecting] = useState(false);
  const [showOAuthApproval, setShowOAuthApproval] = useState(false);
  const [linkedData, setLinkedData] = useState<any>(null);
  const [referredByCode, setReferredByCode] = useState<string | null>(null);
  
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  useEffect(() => {
    // التقاط كود الإحالة من الرابط (مثال: ?ref=KING123)
    const ref = searchParams.get('ref');
    if (ref) setReferredByCode(ref);
  }, [searchParams]);

  const startOAuthFlow = () => {
    setIsOAuthRedirecting(true);
    setTimeout(() => {
      setIsOAuthRedirecting(false);
      setShowOAuthApproval(true);
    }, 1500);
  };

  const handleApprove = () => {
    setShowOAuthApproval(false);
    setIsOAuthRedirecting(true);

    setTimeout(() => {
      const mockData = {
        displayName: 'Hero_Ludo_DZ',
        avatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HeroLudo',
        gameId: `PR-${Math.floor(100000 + Math.random() * 900000)}`,
        level: '12',
        game: 'Ludo Party'
      };
      setLinkedData(mockData);
      setIsOAuthRedirecting(false);
      setFormData({
        ...formData,
        username: mockData.displayName,
        email: `${mockData.displayName.toLowerCase()}@player.com`
      });
    }, 2000);
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    
    const userProfile = {
      displayName: linkedData ? linkedData.displayName : formData.username,
      email: linkedData ? `${linkedData.displayName.toLowerCase()}@player.com` : formData.email,
      country: 'Algeria',
      avatar: linkedData ? linkedData.avatar : `https://api.dicebear.com/7.x/avataaars/svg?seed=${formData.username}`,
      parchisiId: linkedData ? linkedData.gameId : `PR-${Math.floor(100000 + Math.random() * 900000)}`,
      parchisiLevel: linkedData ? linkedData.level : '1',
      poolId: `PL-${Math.floor(100000 + Math.random() * 900000)}`,
      poolLevel: '1',
      vipTier: 'NONE',
      referralCode: (linkedData ? linkedData.displayName : formData.username).toUpperCase() + Math.floor(100 + Math.random() * 900),
      referralCount: 0,
      referralEarnings: 0, // أرباح الإحالة تبدأ من صفر
      referredBy: referredByCode, // ربط الحساب بالشخص الذي دعاه
      linkedGames: [],
      isLinked: !!linkedData
    };

    localStorage.setItem('user_profile', JSON.stringify(userProfile));
    localStorage.setItem('user_balance', '0');
    
    window.dispatchEvent(new Event('storage'));
    navigate('/link-game');
  };

  return (
    <div className="min-h-screen bg-[#0B1E3A] flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
        <div className="absolute top-1/4 right-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[180px]"></div>
      </div>

      <div className="max-w-md w-full relative z-10">
        <div className="text-center mb-10 scale-125">
          <Logo />
        </div>
        
        {referredByCode && (
          <div className="mb-6 bg-white/10 backdrop-blur-md p-4 rounded-2xl border border-white/20 flex items-center gap-3 flex-row-reverse animate-in slide-in-from-top">
            <Users className="w-5 h-5 text-[#FACC15]" />
            <p className="text-[10px] text-white font-bold uppercase tracking-widest">
              أنت الآن تنضم عبر رابط إحالة <span className="text-[#FACC15]">{referredByCode}</span>
            </p>
          </div>
        )}

        <div className="bg-white rounded-[2.5rem] shadow-3xl overflow-hidden border-t-8 border-[#FACC15] text-right" dir="rtl">
          <div className="bg-[#1E3A8A] p-8 text-white flex justify-between items-center flex-row-reverse">
            <div className="text-right">
              <h2 className="text-3xl font-black uppercase font-sporty leading-none">عضوية جديدة</h2>
              <p className="text-[10px] text-blue-200 mt-2 font-bold uppercase tracking-widest leading-none">انضم إلى مجتمع المحترفين</p>
            </div>
            <UserPlus className="w-10 h-10 text-[#FACC15] opacity-50" />
          </div>
          
          <div className="p-8 space-y-8">
            {/* Ludo OAuth Button */}
            {!linkedData && !isOAuthRedirecting && (
              <div className="space-y-4">
                <button 
                  onClick={startOAuthFlow}
                  className="w-full group flex items-center justify-between p-4 bg-red-600 rounded-2xl shadow-xl shadow-red-500/20 hover:bg-red-700 transition-all text-white"
                >
                  <div className="flex items-center gap-4 flex-row-reverse">
                    <div className="w-12 h-12 bg-white rounded-xl shadow-lg flex items-center justify-center"><Dice5 className="w-7 h-7 text-red-600" /></div>
                    <div className="text-right">
                      <p className="text-lg font-black leading-none">Continue with Part Ludo</p>
                      <p className="text-[9px] font-bold opacity-80 uppercase mt-1">الربط السريع للحساب</p>
                    </div>
                  </div>
                  <ExternalLink className="w-5 h-5 opacity-40" />
                </button>
                <div className="relative flex justify-center text-[9px] uppercase font-black tracking-widest text-gray-300">أو يدويًا</div>
              </div>
            )}

            {isOAuthRedirecting && (
              <div className="py-8 text-center space-y-4">
                <Loader2 className="w-12 h-12 text-red-600 animate-spin mx-auto" />
                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest italic">Redirecting to Part Ludo...</p>
              </div>
            )}

            <form onSubmit={handleRegister} className="space-y-6">
              <div className="space-y-4">
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">اسم المستخدم</label>
                  <div className="relative">
                    <User className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="text" 
                      placeholder="Gamer_DZ" 
                      value={formData.username}
                      onChange={(e) => setFormData({...formData, username: e.target.value})}
                      className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none transition-all"
                      required
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">البريد الإلكتروني</label>
                  <div className="relative">
                    <Mail className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="email" 
                      placeholder="name@example.com" 
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none transition-all"
                      required
                    />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">كلمة المرور</label>
                  <div className="relative">
                    <Lock className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input 
                      type="password" 
                      placeholder="••••••••" 
                      className="w-full pr-12 pl-4 py-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none transition-all"
                      required
                    />
                  </div>
                </div>
              </div>

              <button type="submit" className="w-full py-5 btn-1xbet shadow-xl text-xl flex items-center justify-center gap-3">
                <span>إنشاء الحساب والمتابعة</span>
                <ArrowRight className="w-6 h-6" />
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
