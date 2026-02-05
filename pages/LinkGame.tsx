
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Dice5, CircleDot, ShieldCheck, CheckCircle2, Gamepad2, Upload, Loader2, ArrowRight } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const LinkGame = () => {
  const navigate = useNavigate();
  const [selectedGame, setSelectedGame] = useState('Ludo Star');
  const [playerName, setPlayerName] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [notification, setNotification] = useState({ show: false, message: '' });

  const handleLink = () => {
    if(!playerName.trim()) return;
    setIsProcessing(true);
    setTimeout(() => {
      const profile = JSON.parse(localStorage.getItem('user_profile') || '{}');
      const linked = profile.linkedGames || [];
      linked.push({ game: selectedGame, playerName, status: 'verified' });
      localStorage.setItem('user_profile', JSON.stringify({ ...profile, linkedGames: linked }));
      window.dispatchEvent(new Event('storage'));
      
      setNotification({ show: true, message: `Successfully linked ${selectedGame} account as ${playerName}` });
      setIsProcessing(false);
      setTimeout(() => navigate('/dashboard'), 3000);
    }, 2000);
  };

  return (
    <div className="max-w-4xl mx-auto p-4 md:p-10 space-y-10 text-right" dir="rtl">
      {notification.show && (
        <div className="fixed top-20 left-1/2 -translate-x-1/2 z-[300] w-[90%] max-w-lg bg-green-600 text-white px-6 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-in slide-in-from-top border border-white/20">
          <CheckCircle2 className="w-6 h-6" />
          <p className="text-sm font-black text-center flex-1">{notification.message}</p>
        </div>
      )}

      <div className="bg-white rounded-[3rem] shadow-3xl overflow-hidden">
        <div className="bg-[#0B1E3A] p-10 text-white flex justify-between items-center border-b-4 border-[#FACC15]">
          <div>
            <h1 className="text-3xl font-black font-sporty italic uppercase">ربط حسابات الألعاب</h1>
            <p className="text-blue-300 text-[10px] font-bold uppercase">التحقق الذكي للهوية</p>
          </div>
          <Gamepad2 className="w-12 h-12 text-[#FACC15]" />
        </div>

        <div className="p-10 space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {['Ludo Star', '8 Ball Pool'].map(g => (
              <button key={g} onClick={() => setSelectedGame(g)} className={`p-8 rounded-[2.5rem] border-4 transition-all flex flex-col items-center gap-4 ${selectedGame === g ? 'border-[#1E3A8A] bg-blue-50/50' : 'border-gray-50'}`}>
                {g === 'Ludo Star' ? <Dice5 className="w-10 h-10 text-red-600" /> : <CircleDot className="w-10 h-10 text-[#0B1E3A]" />}
                <span className="text-xl font-black font-sporty uppercase italic">{g}</span>
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <label className="block text-[10px] font-black text-gray-400 uppercase">اسم اللاعب داخل اللعبة</label>
            <input type="text" value={playerName} onChange={(e) => setPlayerName(e.target.value)} placeholder="مثال: Player_DZ" className="w-full p-5 bg-gray-50 rounded-2xl border-none outline-none font-bold" />
          </div>

          <button onClick={handleLink} disabled={isProcessing} className="w-full py-6 btn-1xbet text-2xl shadow-2xl">
            {isProcessing ? <Loader2 className="w-8 h-8 animate-spin mx-auto" /> : <span>تأكيد وربط الحساب</span>}
          </button>
        </div>
      </div>
    </div>
  );
};
export default LinkGame;
