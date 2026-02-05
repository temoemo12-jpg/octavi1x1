
import React from 'react';
import { Users, Target, ShieldCheck, Award, TrendingUp, Globe } from 'lucide-react';

const AboutUs = () => {
  return (
    <div className="max-w-6xl mx-auto p-4 md:p-12 space-y-16 text-right" dir="rtl">
      {/* Hero Section */}
      <section className="bg-[#0B1E3A] rounded-[3rem] p-12 md:p-20 text-white relative overflow-hidden text-center">
        <div className="absolute inset-0 opacity-10 bg-[url('https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2070')] bg-cover"></div>
        <div className="relative z-10 space-y-6">
          <h1 className="text-5xl md:text-7xl font-black font-sporty uppercase tracking-tighter italic">من نحن</h1>
          <p className="text-xl md:text-2xl text-blue-200 font-bold max-w-3xl mx-auto leading-relaxed">
            المنصة العربية الأولى المتخصصة في المباريات التنافسية (1 ضد 1) والبطولات الإلكترونية بجوائز مالية حقيقية.
          </p>
        </div>
      </section>

      {/* Mission & Vision */}
      <div className="grid md:grid-cols-2 gap-12">
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600">
            <Target className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-[#0B1E3A] font-sporty">مهمتنا</h2>
          <p className="text-gray-600 font-bold leading-relaxed text-lg">
            تمكين اللاعبين الموهوبين في الجزائر والوطن العربي من تحويل مهاراتهم في الألعاب إلى عوائد مالية مجزية عبر توفير بيئة تنافسية آمنة، عادلة، وشفافة تعتمد على أعلى معايير التكنولوجيا والتحكيم الذكي.
          </p>
        </div>
        <div className="bg-white p-10 rounded-[2.5rem] shadow-xl border border-gray-100 space-y-6">
          <div className="w-16 h-16 bg-yellow-50 rounded-2xl flex items-center justify-center text-[#FACC15]">
            <Globe className="w-8 h-8" />
          </div>
          <h2 className="text-3xl font-black text-[#0B1E3A] font-sporty">رؤيتنا</h2>
          <p className="text-gray-600 font-bold leading-relaxed text-lg">
            أن نصبح المنصة الرائدة عالمياً في تنظيم بطولات الألعاب الإلكترونية المصغرة، وأن نبني مجتمعاً يجمع بين المتعة والاحترافية، حيث يتم تقدير المهارة الحقيقية وتتويجها بجوائز تليق بجهود اللاعبين.
          </p>
        </div>
      </div>

      {/* Values Grid */}
      <section className="space-y-12">
        <div className="text-center space-y-2">
          <h2 className="text-4xl font-black text-[#0B1E3A] font-sporty uppercase">قيمنا الأساسية</h2>
          <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">ما يميزنا في 1x1.online</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { icon: ShieldCheck, title: 'الأمان المالي', desc: 'نضمن حقوق جميع الأطراف عبر نظام حجز مالي مشفر حتى نهاية المباراة.' },
            { icon: Award, title: 'العدالة والنزاهة', desc: 'نستخدم الذكاء الاصطناعي للتحقق من نتائج المباريات وضمان عدم وجود غش.' },
            { icon: TrendingUp, title: 'النمو المستمر', desc: 'نطور أدواتنا وخدماتنا باستمرار لتلبية تطلعات مجتمع اللاعبين المحترفين.' },
          ].map((val, i) => (
            <div key={i} className="bg-white p-8 rounded-[2rem] border border-gray-100 text-center space-y-4 hover:shadow-2xl transition-all">
              <div className="w-14 h-14 bg-[#0B1E3A] rounded-2xl flex items-center justify-center mx-auto shadow-xl">
                <val.icon className="w-7 h-7 text-[#FACC15]" />
              </div>
              <h4 className="text-xl font-black text-[#0B1E3A]">{val.title}</h4>
              <p className="text-sm text-gray-500 font-bold leading-relaxed">{val.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-[#FACC15] rounded-[3rem] p-12 text-center space-y-6 shadow-2xl shadow-yellow-500/20">
        <h2 className="text-4xl font-black text-[#0B1E3A] font-sporty uppercase">جاهز لتكون جزءاً من قصتنا؟</h2>
        <p className="text-[#0B1E3A] font-bold text-lg max-w-2xl mx-auto opacity-80">
          انضم إلى أكثر من 25,000 لاعب نشط اليوم وابدأ رحلتك التنافسية في عالم الربح الحقيقي.
        </p>
        <button className="bg-[#0B1E3A] text-white px-12 py-5 rounded-2xl font-black text-xl hover:bg-black transition-all shadow-xl">
          سجل الآن مجاناً
        </button>
      </section>
    </div>
  );
};

export default AboutUs;
