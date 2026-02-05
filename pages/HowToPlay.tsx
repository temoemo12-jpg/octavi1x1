
import React from 'react';
import { Gamepad2, Play, Trophy, Users, CheckCircle2, Video, ArrowLeft, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const HowToPlay = () => {
  const steps = [
    {
      title: 'إنشاء حساب وربط اللعبة',
      desc: 'سجل في المنصة واربط هويتك في اللعبة (لودو أو بلياردو) لضمان دقة التحكيم.',
      icon: Users,
      color: 'bg-blue-600'
    },
    {
      title: 'شحن رصيدك',
      desc: 'قم بإيداع المبلغ الذي ترغب في المراهنة به عبر وسائل الدفع المتاحة (BaridiMob, CCP, Binance).',
      icon: Zap,
      color: 'bg-[#FACC15]'
    },
    {
      title: 'اختيار تحدي أو إنشائه',
      desc: 'ادخل لوحة التحكم، اختر لعبتك المفضلة، وانضم لتحدي قائم أو أنشئ تحدياً جديداً بمبلغ من اختيارك.',
      icon: Gamepad2,
      color: 'bg-green-600'
    },
    {
      title: 'المباراة والتسجيل',
      desc: 'العب المباراة في تطبيق اللعبة الرسمي. تأكد من تسجيل فيديو للمباراة بالكامل كدليل على فوزك.',
      icon: Video,
      color: 'bg-red-600'
    },
    {
      title: 'رفع النتيجة والتحكيم',
      desc: 'ارفع الفيديو في غرفة المباراة، وسيقوم نظام الذكاء الاصطناعي بمراجعته وتأكيد الفائز خلال ثوانٍ.',
      icon: CheckCircle2,
      color: 'bg-purple-600'
    },
    {
      title: 'سحب الأرباح',
      desc: 'بمجرد تأكيد الفوز، يضاف المبلغ لمحفظتك فوراً ويمكنك سحبه في أي وقت.',
      icon: Trophy,
      color: 'bg-yellow-600'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12 space-y-16 text-right" dir="rtl">
      <div className="text-center space-y-4">
        <h1 className="text-5xl font-black text-[#0B1E3A] font-sporty italic uppercase">كيف تبدأ الربح؟</h1>
        <p className="text-gray-500 font-bold text-lg">دليلك الكامل خطوة بخطوة من التسجيل حتى استلام أول ربح.</p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 relative">
        {/* Animated Connecting Line (Desktop) */}
        <div className="hidden lg:block absolute top-1/2 left-0 w-full h-1 bg-gray-100 -z-10"></div>
        
        {steps.map((step, i) => (
          <div key={i} className="bg-white p-8 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6 relative group hover:scale-105 transition-all">
            <div className={`w-16 h-16 ${step.color} text-white rounded-[1.5rem] flex items-center justify-center shadow-lg transform -rotate-12 group-hover:rotate-0 transition-transform`}>
              <step.icon className="w-8 h-8" />
            </div>
            <div className="absolute top-8 left-8 text-6xl font-black text-gray-50 opacity-10 font-sporty">0{i + 1}</div>
            <div className="space-y-2">
              <h3 className="text-xl font-black text-[#0B1E3A]">{step.title}</h3>
              <p className="text-sm text-gray-500 font-bold leading-relaxed">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-[#0B1E3A] rounded-[3rem] p-12 text-white overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-full opacity-10 pointer-events-none">
          <div className="absolute -top-10 -right-10 w-64 h-64 bg-[#FACC15] rounded-full blur-[100px]"></div>
        </div>
        
        <div className="relative z-10 flex flex-col md:flex-row items-center gap-10 flex-row-reverse">
          <div className="flex-1 space-y-6">
            <h2 className="text-3xl font-black font-sporty uppercase italic text-[#FACC15]">ملاحظات هامة جداً!</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3 flex-row-reverse">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                <p className="font-bold text-sm">تسجيل الفيديو إلزامي في كل مباراة. لا يقبل الـ Screenshot كدليل كافٍ للفوز في المباريات المالية الكبيرة.</p>
              </div>
              <div className="flex items-start gap-3 flex-row-reverse">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                <p className="font-bold text-sm">تأكد من إظهار اسمك واسم الخصم بوضوح في الفيديو.</p>
              </div>
              <div className="flex items-start gap-3 flex-row-reverse">
                <CheckCircle2 className="w-5 h-5 text-green-500 shrink-0 mt-1" />
                <p className="font-bold text-sm">الذكاء الاصطناعي يكتشف التلاعب التلقائي في الفيديو. لا تحاول تعديله.</p>
              </div>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-xl p-8 rounded-[2rem] border border-white/10 text-center space-y-4">
             <Trophy className="w-16 h-16 text-[#FACC15] mx-auto" />
             <p className="text-xs font-black uppercase tracking-widest text-blue-300">جاهز للتحدي؟</p>
             <Link to="/register" className="btn-1xbet px-10 py-4 rounded-xl block">
               <span>سجل الآن</span>
             </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowToPlay;
