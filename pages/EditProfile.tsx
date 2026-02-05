
import React, { useState, useEffect } from 'react';
import { Camera, Save, ArrowLeft, Gamepad2, User, Mail, Globe, Award } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';

const EditProfile = () => {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    displayName: 'Alex_Pro',
    email: 'alex@example.com',
    country: 'Algeria',
    avatar: 'https://picsum.photos/200',
    parchisiId: 'PR-992140',
    parchisiLevel: '42',
    fifaId: '',
    fifaLevel: '0'
  });

  useEffect(() => {
    const saved = localStorage.getItem('user_profile');
    if (saved) {
      setProfile(JSON.parse(saved));
    }
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem('user_profile', JSON.stringify(profile));
    // Simulate sync to other parts of the app
    window.dispatchEvent(new Event('storage'));
    alert('تم حفظ البيانات بنجاح!');
    navigate('/profile');
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-8 text-right" dir="rtl">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-black text-[#0B1E3A] uppercase tracking-tighter">إعدادات الحساب الاحترافي</h1>
        <Link to="/profile" className="p-3 bg-white rounded-2xl border border-gray-100 hover:bg-gray-50 transition-all shadow-sm">
          <ArrowLeft className="w-5 h-5 text-[#0B1E3A]" />
        </Link>
      </div>

      <form onSubmit={handleSave} className="grid lg:grid-cols-3 gap-8">
        {/* Right Column: General Info */}
        <div className="lg:col-span-2 space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-100 space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
              <div className="p-3 bg-blue-50 rounded-2xl text-[#1E3A8A]">
                <User className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-[#0B1E3A]">المعلومات العامة</h2>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">الاسم المستعار (Display Name)</label>
                <input 
                  type="text" 
                  value={profile.displayName}
                  onChange={(e) => setProfile({...profile, displayName: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">البريد الإلكتروني</label>
                <input 
                  type="email" 
                  value={profile.email}
                  onChange={(e) => setProfile({...profile, email: e.target.value})}
                  className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none transition-all" 
                />
              </div>
              <div className="space-y-2">
                <label className="block text-xs font-black text-gray-400 uppercase tracking-widest">الدولة</label>
                <div className="relative">
                  <select 
                    value={profile.country}
                    onChange={(e) => setProfile({...profile, country: e.target.value})}
                    className="w-full p-4 bg-gray-50 border-2 border-transparent focus:border-[#1E3A8A] rounded-2xl text-sm font-bold outline-none appearance-none"
                  >
                    <option value="Algeria">الجزائر</option>
                    <option value="Egypt">مصر</option>
                    <option value="UAE">الإمارات</option>
                    <option value="Morocco">المغرب</option>
                  </select>
                  <Globe className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-100 space-y-8">
            <div className="flex items-center gap-4 border-b border-gray-50 pb-4">
              <div className="p-3 bg-orange-50 rounded-2xl text-orange-600">
                <Gamepad2 className="w-6 h-6" />
              </div>
              <h2 className="text-xl font-black text-[#0B1E3A]">هوية الألعاب (In-Game IDs)</h2>
            </div>

            <div className="space-y-6">
              {/* Parchisi Game Identity */}
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-[#0B1E3A] text-white rounded-xl flex items-center justify-center font-black">L</span>
                    <span className="font-bold text-[#0B1E3A]">Parchisi (Ludo)</span>
                  </div>
                  <Award className="w-5 h-5 text-[#FACC15]" />
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase">المعرف (Game ID)</label>
                    <input 
                      type="text" 
                      placeholder="e.g. PR-12345" 
                      value={profile.parchisiId}
                      onChange={(e) => setProfile({...profile, parchisiId: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:border-[#1E3A8A] outline-none"
                    />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase">المستوى الحالي (Level)</label>
                    <input 
                      type="number" 
                      value={profile.parchisiLevel}
                      onChange={(e) => setProfile({...profile, parchisiLevel: e.target.value})}
                      className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs font-bold focus:border-[#1E3A8A] outline-none"
                    />
                  </div>
                </div>
              </div>

              {/* FIFA Game Identity */}
              <div className="p-6 bg-gray-50 rounded-3xl border border-gray-100 space-y-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="w-10 h-10 bg-red-600 text-white rounded-xl flex items-center justify-center font-black italic">EA</span>
                    <span className="font-bold text-[#0B1E3A]">FC 24 / FIFA</span>
                  </div>
                  <span className="text-[9px] bg-white border px-2 py-0.5 rounded-full font-bold text-gray-400">قريباً</span>
                </div>
                <div className="grid md:grid-cols-2 gap-4 opacity-50">
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase">المعرف (EA ID)</label>
                    <input type="text" disabled className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs" />
                  </div>
                  <div className="space-y-1">
                    <label className="text-[10px] font-black text-gray-400 uppercase">المستوى</label>
                    <input type="number" disabled className="w-full p-3 bg-white border border-gray-200 rounded-xl text-xs" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Left Column: Avatar & Save */}
        <div className="space-y-8">
          <div className="bg-white rounded-[2.5rem] p-8 shadow-xl shadow-blue-900/5 border border-gray-100 flex flex-col items-center gap-6">
            <h3 className="text-xs font-black text-gray-400 uppercase tracking-widest text-center">صورة البروفايل</h3>
            <div className="relative group">
              <div className="w-40 h-40 rounded-[3rem] bg-gradient-to-br from-[#0B1E3A] to-[#1E3A8A] p-1.5 shadow-2xl relative overflow-hidden">
                <img src={profile.avatar} className="w-full h-full object-cover rounded-[2.5rem]" alt="avatar" />
              </div>
              <button className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity rounded-[3rem]">
                <Camera className="w-10 h-10 text-white" />
              </button>
            </div>
            <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">أنقر لتغيير الصورة</p>
          </div>

          <button 
            type="submit"
            className="w-full py-6 bg-[#22C55E] text-white font-black uppercase tracking-[0.2em] rounded-[2rem] shadow-2xl shadow-green-500/20 hover:bg-green-600 transition-all flex items-center justify-center gap-3 transform hover:-translate-y-1 active:scale-95"
          >
            <Save className="w-6 h-6" /> حفظ التعديلات
          </button>
          
          <div className="bg-[#0B1E3A] rounded-[2rem] p-6 text-white text-center space-y-2">
             <p className="text-[10px] font-black text-blue-400 uppercase tracking-widest">تنبيه أمني</p>
             <p className="text-[11px] text-gray-300 leading-relaxed">
               المعرفات الخاصة بك تستخدم للتحقق من هويتك في المباريات. تأكد من صحتها لتجنب خسارة جوائزك.
             </p>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditProfile;
