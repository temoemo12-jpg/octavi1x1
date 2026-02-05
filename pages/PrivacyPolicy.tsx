
import React from 'react';
import { FileText, ShieldCheck, Lock, Eye, Scale, HelpCircle } from 'lucide-react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto p-4 md:p-12 space-y-12 text-right" dir="rtl">
      <div className="text-center space-y-4">
        <div className="w-20 h-20 bg-blue-50 rounded-[2rem] flex items-center justify-center mx-auto shadow-xl">
          <FileText className="w-10 h-10 text-[#1E3A8A]" />
        </div>
        <h1 className="text-4xl font-black text-[#0B1E3A] font-sporty italic uppercase">سياسة الاستخدام والخصوصية</h1>
        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs">آخر تحديث: يونيو 2024</p>
      </div>

      <div className="space-y-8">
        {/* Section 1 */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-4 flex-row-reverse">
            <ShieldCheck className="w-7 h-7 text-green-600" />
            <h2 className="text-2xl font-black text-[#0B1E3A]">اتفاقية اللعب العادل</h2>
          </div>
          <div className="text-gray-600 font-bold leading-relaxed space-y-4">
            <p>يلتزم جميع مستخدمي منصة 1x1.online بقواعد اللعب النظيف. يمنع منعاً باتاً:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>استخدام أي برامج خارجية أو "هاك" للتأثير على نتيجة المباراة.</li>
              <li>التلاعب بالنتائج أو الاتفاق المسبق مع الخصم (Match-fixing).</li>
              <li>انتحال الشخصية أو استخدام حسابات متعددة لنفس الشخص.</li>
            </ul>
            <p className="text-red-600 text-sm italic">ملاحظة: خرق هذه القوانين يؤدي إلى حظر الحساب نهائياً ومصادرة الأرصدة المتبقية.</p>
          </div>
        </section>

        {/* Section 2 */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-4 flex-row-reverse">
            <Lock className="w-7 h-7 text-blue-600" />
            <h2 className="text-2xl font-black text-[#0B1E3A]">حماية البيانات والخصوصية</h2>
          </div>
          <div className="text-gray-600 font-bold leading-relaxed space-y-4">
            <p>نحن نقدر خصوصيتك ونتعهد بحماية بياناتك الشخصية:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>يتم تشفير جميع بيانات الدفع والمعاملات المالية باستخدام تقنية SSL 256-bit.</li>
              <li>لا نقوم بمشاركة بريدك الإلكتروني أو هوياتك في الألعاب مع أي طرف ثالث لأغراض تسويقية.</li>
              <li>يتم تخزين بياناتك في خوادم سحابية آمنة ومحمية ببروتوكولات دفاعية متطورة.</li>
            </ul>
          </div>
        </section>

        {/* Section 3 */}
        <section className="bg-white p-8 rounded-[2.5rem] shadow-sm border border-gray-100 space-y-6">
          <div className="flex items-center gap-4 flex-row-reverse">
            <Scale className="w-7 h-7 text-[#FACC15]" />
            <h2 className="text-2xl font-black text-[#0B1E3A]">سياسة العمولة والرسوم</h2>
          </div>
          <div className="text-gray-600 font-bold leading-relaxed space-y-4">
            <p>تعتمد المنصة نموذج عمل واضح ومباشر:</p>
            <ul className="list-disc pr-6 space-y-2">
              <li>تقتطع المنصة عمولة تشغيلية قدرها 10% من إجمالي مبلغ الرهان في المباريات العادية.</li>
              <li>أعضاء الـ VIP يستفيدون من عمولات مخفضة تصل إلى 0% حسب نوع الباقة.</li>
              <li>لا توجد رسوم خفية عند الإيداع أو السحب، باستثناء رسوم التحويل التي قد تفرضها جهات الدفع (مثل BaridiMob أو Binance).</li>
            </ul>
          </div>
        </section>
      </div>

      <div className="bg-blue-50 p-8 rounded-[2rem] text-center border-r-8 border-blue-600">
        <div className="flex items-center justify-center gap-4 mb-4">
          <HelpCircle className="w-6 h-6 text-blue-600" />
          <h3 className="text-lg font-black text-[#1E3A8A]">لديك استفسار حول السياسة؟</h3>
        </div>
        <p className="text-sm text-blue-800 font-bold mb-6">فريق الدعم القانوني متاح للرد على أي توضيح تحتاجه بخصوص شروطنا.</p>
        <button className="bg-[#1E3A8A] text-white px-8 py-3 rounded-xl font-black text-xs uppercase hover:bg-[#0B1E3A] transition-all shadow-lg">
          تواصل مع الدعم
        </button>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
