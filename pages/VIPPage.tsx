
import React from 'react';
import { Crown, CheckCircle, Zap, ShieldCheck, Star, Sparkles, MessageSquare, ArrowRight, TrendingUp, UserPlus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const VIPPage = () => {
  const navigate = useNavigate();
  const plans = [
    {
      id: 'STARTER',
      name: 'Starter Pro',
      price: '$25',
      color: 'bg-white border-blue-100',
      tagline: 'للمبتدئين الطموحين',
      features: ['رفع المستوى (1.5x)', 'عمولة منصة 5% فقط', 'إطار برونزي متوهج', 'رابط إحالة مميز'],
      btnClass: 'border-2 border-[#0B1E3A] text-[#0B1E3A] hover:bg-gray-50'
    },
    {
      id: 'PRO',
      name: 'Silver Elite',
      price: '$45',
      color: 'bg-blue-50 border-blue-200',
      tagline: 'الخيار الأكثر شعبية',
      features: ['رفع المستوى (2.5x)', 'عمولة منصة 2% فقط', 'إطار فضي متوهج', 'رابط إحالة + مكافأة 1%', 'دعم فني سريع'],
      btnClass: 'bg-[#1E3A8A] text-white hover:bg-[#0B1E3A]',
      popular: true
    },
    {
      id: 'ELITE',
      name: 'Gold Legend',
      price: '$70',
      color: 'bg-yellow-50 border-yellow-200',
      tagline: 'للمحترفين الحقيقيين',
      features: ['رفع المستوى (5x)', 'عمولة منصة 0%', 'إطار ذهبي متحرك', 'رابط إحالة + مكافأة 3%', 'سحب فوري بدون مراجعة'],
      btnClass: 'bg-[#0B1E3A] text-white hover:bg-black shadow-xl shadow-blue-900/20'
    },
    {
      id: 'ULTIMATE',
      name: 'Diamond King',
      price: '$90',
      color: 'bg-[#0B1E3A] text-white border-transparent',
      tagline: 'السيطرة الكاملة',
      features: ['رفع المستوى (10x)', 'عمولة منصة 0%', 'إطار ماسي مشع', 'رابط إحالة + مكافأة 5%', 'مدير حساب شخصي', 'دخول حصري لبطولات VIP'],
      btnClass: 'btn-1xbet text-lg py-5'
    }
  ];

  const handleUpgrade = (tier: string) => {
    const profile = JSON.parse(localStorage.getItem('user_profile') || '{}');
    localStorage.setItem('user_profile', JSON.stringify({ ...profile, vipTier: tier }));
    window.dispatchEvent(new Event('storage'));
    alert(`تهانينا! تم ترقية حسابك إلى باقة ${tier} بنجاح.`);
    navigate('/profile');
  };

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-12 space-y-16 text-right" dir="rtl">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-[#FACC15]/10 rounded-full border border-[#FACC15]/20">
          <Crown className="w-5 h-5 text-[#FACC15]" />
          <span className="text-xs font-black uppercase text-[#A16207] tracking-widest">تجربة كبار الشخصيات VIP</span>
        </div>
        <h1 className="text-5xl md:text-6xl font-black text-[#0B1E3A] uppercase tracking-tighter">ارفع مستواك.. ضاعف أرباحك</h1>
        <p className="text-gray-500 max-w-2xl mx-auto text-lg font-bold">باقات شهرية مصممة لزيادة أرباحك وإلغاء العمولات تماماً.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {plans.map((plan) => (
          <div key={plan.id} className={`relative rounded-[2.5rem] p-8 shadow-2xl border flex flex-col transition-all duration-500 hover:-translate-y-2 ${plan.color} ${plan.popular ? 'ring-4 ring-[#FACC15]/20 scale-105 z-10' : ''}`}>
            {plan.popular && (
              <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-[#FACC15] text-[#0B1E3A] px-6 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-xl">
                الأكثر طلباً
              </div>
            )}
            
            <div className="mb-8 space-y-2">
              <h3 className={`text-sm font-black uppercase tracking-widest ${plan.id === 'ULTIMATE' ? 'text-blue-400' : 'text-gray-400'}`}>{plan.name}</h3>
              <div className="flex items-baseline gap-1 flex-row-reverse">
                <span className="text-4xl font-black">{plan.price}</span>
                <span className="text-xs font-bold opacity-60">/ شهرياً</span>
              </div>
              <p className="text-[10px] font-bold uppercase tracking-widest opacity-80">{plan.tagline}</p>
            </div>

            <div className="space-y-4 flex-1">
              {plan.features.map((feature) => (
                <div key={feature} className="flex items-start gap-3 flex-row-reverse">
                  <CheckCircle className={`w-4 h-4 shrink-0 mt-0.5 ${plan.id === 'ULTIMATE' ? 'text-[#FACC15]' : 'text-green-500'}`} />
                  <span className="text-xs font-bold leading-relaxed">{feature}</span>
                </div>
              ))}
            </div>

            <button 
              onClick={() => handleUpgrade(plan.id)}
              className={`w-full mt-10 py-4 rounded-2xl font-black text-[11px] uppercase tracking-widest transition-all ${plan.btnClass}`}
            >
              <span>اشترك في {plan.name}</span>
            </button>
          </div>
        ))}
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {[
          { icon: Zap, title: 'عمولة 0%', desc: 'باقات المستوى العالي تلغي عمولة المنصة (10%) تماماً من كل رهان تفوز به.' },
          { icon: TrendingUp, title: 'تطور سريع', desc: 'ارفع مستوى ملفك الشخصي بسرعة خيالية لتظهر كلاعب محترف أمام الخصوم.' },
          { icon: UserPlus, title: 'إحالات مربحة', desc: 'شارك رابطك الخاص واربح عمولة إضافية من المنصة مقابل كل عضو جديد ينضم.' }
        ].map((box, i) => (
          <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm text-center space-y-3">
             <div className="w-14 h-14 bg-[#0B1E3A] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
               <box.icon className="w-7 h-7 text-[#FACC15]" />
             </div>
             <h4 className="text-lg font-black text-[#0B1E3A]">{box.title}</h4>
             <p className="text-xs text-gray-500 font-bold leading-relaxed">{box.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default VIPPage;
