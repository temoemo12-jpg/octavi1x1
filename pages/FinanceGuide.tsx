
import React from 'react';
import { Wallet, ArrowRightLeft, ShieldCheck, Landmark, Coins, CreditCard, History, Info, HelpCircle, MapPin } from 'lucide-react';

const FinanceGuide = () => {
  return (
    <div className="max-w-5xl mx-auto p-4 md:p-12 space-y-12 text-right" dir="rtl">
      <div className="text-center space-y-4">
        <div className="inline-flex items-center gap-2 px-6 py-2 bg-green-50 rounded-full border border-green-100">
          <ShieldCheck className="w-5 h-5 text-green-600" />
          <span className="text-xs font-black uppercase text-green-700 tracking-widest">منظومة مالية آمنة 100%</span>
        </div>
        <h1 className="text-5xl font-black text-[#0B1E3A] font-sporty italic uppercase">دليل الإيداع والسحب</h1>
        <p className="text-gray-500 font-bold text-lg">شرح مفصل للاعبينا في المغرب، الجزائر، وباقي دول العالم.</p>
      </div>

      <div className="grid md:grid-cols-2 gap-8">
        {/* Deposit Guide */}
        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 space-y-8">
          <div className="flex items-center gap-4 flex-row-reverse border-b border-gray-50 pb-6">
            <div className="p-4 bg-green-50 text-green-600 rounded-2xl shadow-sm"><Wallet className="w-8 h-8" /></div>
            <h2 className="text-2xl font-black text-[#0B1E3A] font-sporty">الإيداع (شحن)</h2>
          </div>
          
          <div className="space-y-6">
            <div className="space-y-4">
               <div className="bg-gray-50 p-4 rounded-2xl border-r-4 border-orange-500 text-right">
                  <p className="font-black text-[10px] text-orange-600 uppercase mb-1">المغرب (MA)</p>
                  <p className="text-xs font-bold text-[#0B1E3A]">دعم كامل لـ CIH Bank، التجاري وفا بنك، بريد بنك، وبنقاليك. التحويل فوري عبر التطبيق.</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-2xl border-r-4 border-green-500 text-right">
                  <p className="font-black text-[10px] text-green-600 uppercase mb-1">الجزائر (DZ)</p>
                  <p className="text-xs font-bold text-[#0B1E3A]">شحن عبر BaridiMob أو CCP مع تفعيل فوري بعد إرسال الوصل.</p>
               </div>
               <div className="bg-gray-50 p-4 rounded-2xl border-r-4 border-blue-500 text-right">
                  <p className="font-black text-[10px] text-blue-600 uppercase mb-1">دولي (Global)</p>
                  <p className="text-xs font-bold text-[#0B1E3A]">استخدم USDT (TRC20) من Binance أو أي محفظة كريبتو لسرعة مطلقة.</p>
               </div>
            </div>
          </div>
        </div>

        {/* Withdraw Guide */}
        <div className="bg-white rounded-[3rem] p-10 shadow-xl border border-gray-100 space-y-8">
          <div className="flex items-center gap-4 flex-row-reverse border-b border-gray-50 pb-6">
            <div className="p-4 bg-blue-50 text-blue-600 rounded-2xl shadow-sm"><ArrowRightLeft className="w-8 h-8" /></div>
            <h2 className="text-2xl font-black text-[#0B1E3A] font-sporty">السحب (كاش)</h2>
          </div>

          <div className="space-y-6">
            <div className="space-y-4">
               <div className="p-4 border border-gray-100 rounded-2xl text-right">
                 <h4 className="font-black text-xs text-[#0B1E3A] mb-1">السحب في المغرب</h4>
                 <p className="text-[10px] text-gray-500 font-bold">يمكنك سحب أرباحك مباشرة إلى حساب CIH أو أي بنك مغربي آخر عبر الـ RIB الخاص بك.</p>
               </div>
               <div className="p-4 border border-gray-100 rounded-2xl text-right">
                 <h4 className="font-black text-xs text-[#0B1E3A] mb-1">السحب في الجزائر</h4>
                 <p className="text-[10px] text-gray-500 font-bold">تحويل مباشر إلى حسابك في بريدي موب بمجرد وصول طلبك للمراجعة.</p>
               </div>
               <div className="p-4 border border-gray-100 rounded-2xl text-right">
                 <h4 className="font-black text-xs text-[#0B1E3A] mb-1">العملات الرقمية</h4>
                 <p className="text-[10px] text-gray-500 font-bold">السحب عبر USDT متاح للجميع ويتم تنفيذه في أقل من 30 دقيقة.</p>
               </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-[#0B1E3A] p-10 rounded-[3rem] text-white space-y-8 relative overflow-hidden">
         <MapPin className="absolute -bottom-10 -left-10 w-40 h-40 text-white opacity-5" />
         <h3 className="text-2xl font-black text-[#FACC15] font-sporty uppercase text-center">لماذا يثق بنا اللاعبون؟</h3>
         <div className="grid md:grid-cols-3 gap-8">
            <div className="space-y-2 text-center">
               <ShieldCheck className="w-10 h-10 text-green-500 mx-auto" />
               <h4 className="font-black text-xs">أمان بنكي</h4>
               <p className="text-[10px] font-bold text-gray-400">تشفير كامل لجميع المعاملات المالية.</p>
            </div>
            <div className="space-y-2 text-center">
               <History className="w-10 h-10 text-blue-400 mx-auto" />
               <h4 className="font-black text-xs">سرعة التنفيذ</h4>
               <p className="text-[10px] font-bold text-gray-400">فريق مخصص لمراجعة الطلبات على مدار الساعة.</p>
            </div>
            <div className="space-y-2 text-center">
               <HelpCircle className="w-10 h-10 text-yellow-500 mx-auto" />
               <h4 className="font-black text-xs">دعم محلي</h4>
               <p className="text-[10px] font-bold text-gray-400">فهم عميق لوسائل الدفع في المغرب والجزائر.</p>
            </div>
         </div>
      </div>
    </div>
  );
};

export default FinanceGuide;
