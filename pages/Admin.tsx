
import React, { useState, useEffect } from 'react';
import { Settings, Plus, Trash2, Image as ImageIcon, Save, ArrowRight, ShieldCheck, AlertCircle } from 'lucide-react';

const Admin = () => {
  const [banners, setBanners] = useState<string[]>([
    'https://images.unsplash.com/photo-1542751371-adc38448a05e?q=80&w=2070&auto=format&fit=crop',
    'https://images.unsplash.com/photo-1511512578047-dfb367046420?auto=format&fit=crop&q=80&w=2070',
    'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?q=80&w=2070&auto=format&fit=crop',
  ]);
  const [newUrl, setNewUrl] = useState('');
  const [isSaved, setIsSaved] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('admin_banners');
    if (saved) {
      setBanners(JSON.parse(saved));
    }
  }, []);

  const handleAddBanner = () => {
    if (!newUrl.trim()) return;
    setBanners([...banners, newUrl]);
    setNewUrl('');
    setIsSaved(false);
  };

  const handleRemoveBanner = (index: number) => {
    const updated = banners.filter((_, i) => i !== index);
    setBanners(updated);
    setIsSaved(false);
  };

  const saveBanners = () => {
    localStorage.setItem('admin_banners', JSON.stringify(banners));
    setIsSaved(true);
    setTimeout(() => setIsSaved(false), 3000);
    window.dispatchEvent(new Event('storage')); // تحديث الهوم في نفس الوقت
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-10 text-right" dir="rtl">
      <div className="bg-white rounded-[3rem] shadow-2xl border border-gray-100 overflow-hidden">
        <div className="bg-[#0B1E3A] p-10 text-white flex justify-between items-center border-b-4 border-[#FACC15]">
          <div className="space-y-1">
            <h1 className="text-3xl font-black font-sporty uppercase italic">لوحة تحكم المشرف (Admin)</h1>
            <p className="text-blue-300 text-[10px] font-bold uppercase tracking-widest">إدارة محتوى الموقع والبنرات الإعلانية</p>
          </div>
          <ShieldCheck className="w-10 h-10 text-[#FACC15] opacity-50" />
        </div>

        <div className="p-10 space-y-12">
          {/* Banner Management */}
          <section className="space-y-6">
            <div className="flex items-center justify-between flex-row-reverse border-b border-gray-100 pb-4">
               <h2 className="text-xl font-black text-[#0B1E3A] flex items-center gap-3 flex-row-reverse">
                 <ImageIcon className="w-6 h-6 text-blue-600" /> إدارة بنرات الصفحة الرئيسية
               </h2>
               <span className="bg-gray-100 px-4 py-1 rounded-full text-[10px] font-black uppercase text-gray-500">{banners.length} بنرات حالياً</span>
            </div>

            <div className="space-y-4">
              <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest">إضافة صورة جديدة (رابط URL)</label>
              <div className="flex gap-4">
                 <input 
                  type="text" 
                  value={newUrl}
                  onChange={(e) => setNewUrl(e.target.value)}
                  placeholder="أدخل رابط الصورة (HTTPS)..." 
                  className="flex-1 p-4 bg-gray-50 border-2 border-transparent focus:border-blue-400 rounded-2xl text-sm font-bold outline-none"
                 />
                 <button 
                  onClick={handleAddBanner}
                  className="bg-[#0B1E3A] text-white px-8 rounded-2xl font-black hover:bg-blue-900 transition-all flex items-center gap-2"
                 >
                   <Plus className="w-5 h-5" /> أضف
                 </button>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6">
               {banners.map((url, index) => (
                 <div key={index} className="relative group rounded-3xl overflow-hidden border border-gray-100 shadow-sm aspect-video">
                    <img src={url} className="w-full h-full object-cover" alt={`Banner ${index}`} />
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                       <button 
                        onClick={() => handleRemoveBanner(index)}
                        className="p-4 bg-red-600 text-white rounded-2xl hover:bg-red-700 transition-all shadow-xl"
                       >
                         <Trash2 className="w-6 h-6" />
                       </button>
                    </div>
                    <div className="absolute bottom-3 right-3 bg-white/20 backdrop-blur-md px-3 py-1 rounded-full text-[9px] text-white font-black uppercase">
                       ID: {index + 1}
                    </div>
                 </div>
               ))}
            </div>

            {banners.length === 0 && (
              <div className="py-20 text-center bg-gray-50 rounded-[2.5rem] border-2 border-dashed border-gray-200">
                 <p className="text-gray-400 font-bold">لا توجد بنرات حالياً. سيظهر الموقع فارغاً!</p>
              </div>
            )}
          </section>

          <div className="bg-blue-50 p-8 rounded-3xl flex items-start gap-4 flex-row-reverse border-r-8 border-blue-600">
             <AlertCircle className="w-6 h-6 text-blue-600 shrink-0 mt-1" />
             <div className="space-y-1">
               <h4 className="font-black text-[#0B1E3A] text-sm">ملاحظة هامة للمشرف</h4>
               <p className="text-[11px] text-blue-800/80 font-bold leading-relaxed uppercase italic">
                 استخدم صوراً بمقاس 21:9 أو 16:9 للحصول على أفضل جودة عرض في السلايدر. يفضل استخدام خدمات استضافة الصور الموثوقة لضمان سرعة التحميل.
               </p>
             </div>
          </div>

          <button 
            onClick={saveBanners}
            className={`w-full py-6 rounded-[2rem] font-black text-xl flex items-center justify-center gap-3 transition-all ${
              isSaved ? 'bg-green-600 text-white' : 'bg-[#0B1E3A] text-white shadow-2xl hover:bg-blue-900'
            }`}
          >
            {isSaved ? <ShieldCheck className="w-7 h-7" /> : <Save className="w-7 h-7" />}
            <span>{isSaved ? 'تم حفظ التغييرات بنجاح!' : 'حفظ كافة الإعدادات'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Admin;
