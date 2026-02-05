
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { ShieldCheck, MessageSquare, Trophy, ArrowRight, StopCircle, CheckCircle2, Loader2, Copy, Swords, Gift } from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

const MatchRoom = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState('WAITING_AGREEMENT');
  const [isOpponentTyping, setIsOpponentTyping] = useState(false);
  const [matchDuration, setMatchDuration] = useState(0);
  const [chatMessages, setChatMessages] = useState<any[]>([
    { sender: 'نظام 1x1', text: 'بانتظار موافقة الخصم على البدء...', type: 'system' }
  ]);
  const [message, setMessage] = useState('');
  const chatEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [chatMessages, isOpponentTyping]);

  useEffect(() => {
    if (step === 'WAITING_AGREEMENT') {
      const typingTimeout = setTimeout(() => setIsOpponentTyping(true), 2000);
      const msgTimeout = setTimeout(() => {
        setIsOpponentTyping(false);
        setChatMessages(prev => [...prev, { sender: 'Shadow_King', text: 'أنا جاهز! لنبدأ التحدي.', type: 'opponent' }]);
        setStep('READY_TO_START');
      }, 5000);
      return () => { clearTimeout(typingTimeout); clearTimeout(msgTimeout); };
    }
  }, [step]);

  return (
    <div className="max-w-7xl mx-auto p-4 md:p-6 space-y-6 text-right" dir="rtl">
      <div className="bg-[#0B1E3A] rounded-[2.5rem] p-8 text-white relative overflow-hidden shadow-2xl border-b-8 border-[#FACC15]">
        <div className="relative z-10 flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="flex items-center gap-4 flex-row-reverse">
            <div className="bg-[#FACC15] p-3 rounded-xl shadow-lg">
              <ShieldCheck className="w-8 h-8 text-[#0B1E3A]" />
            </div>
            <div>
              <h1 className="text-2xl font-black font-sporty italic uppercase">مواجهة Ludo Star</h1>
              <p className="text-[10px] font-bold text-blue-300 uppercase tracking-widest">MATCH ID: #99214</p>
            </div>
          </div>
          <div className="flex items-center gap-6">
            <div className="text-center bg-white/5 px-6 py-2 rounded-2xl border border-white/10">
              <p className="text-[8px] font-black text-blue-400 mb-0.5">المؤقت</p>
              <div className="text-2xl font-black font-sporty text-[#FACC15]">00:00</div>
            </div>
            <div className="text-center bg-white/5 px-6 py-2 rounded-2xl border border-white/10">
              <p className="text-[8px] font-black text-blue-400 mb-0.5">الجائزة</p>
              <div className="text-2xl font-black font-sporty text-[#22C55E]">$18.00</div>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        <div className="lg:col-span-8 bg-white rounded-[2.5rem] p-10 shadow-sm min-h-[500px] flex flex-col justify-center text-center">
          {step === 'WAITING_AGREEMENT' && (
             <div className="space-y-6">
                <Loader2 className="w-16 h-16 text-[#0B1E3A] animate-spin mx-auto" />
                <h3 className="text-2xl font-black font-sporty italic">بانتظار الخصم...</h3>
             </div>
          )}
          {step === 'READY_TO_START' && (
             <div className="space-y-8 animate-in fade-in">
                <h3 className="text-3xl font-black font-sporty italic">الخصم جاهز للمواجهة!</h3>
                <button onClick={() => setStep('LIVE')} className="btn-1xbet px-16 py-5 text-xl">
                  <span>ابدأ المباراة الآن</span>
                </button>
             </div>
          )}
          {step === 'LIVE' && (
             <div className="space-y-10">
                <div className="w-40 h-40 bg-red-600 rounded-full flex items-center justify-center mx-auto border-8 border-red-200 animate-pulse">
                  <span className="text-white font-black text-2xl font-sporty">LIVE</span>
                </div>
                <h3 className="text-3xl font-black font-sporty">المباراة جارية حالياً</h3>
                <button className="px-12 py-4 bg-red-600 text-white rounded-2xl font-black uppercase shadow-xl hover:bg-red-700">إنهاء وتسليم النتيجة</button>
             </div>
          )}
        </div>

        <div className="lg:col-span-4 bg-white rounded-[2.5rem] shadow-sm flex flex-col h-[600px] overflow-hidden border">
           <div className="p-4 bg-gray-50 border-b flex justify-between items-center flex-row-reverse">
             <h3 className="text-[10px] font-black uppercase text-[#0B1E3A] flex items-center gap-2">
               <MessageSquare className="w-4 h-4 text-blue-500" /> دردشة الغرفة
             </h3>
             <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
           </div>
           
           <div className="flex-1 p-4 space-y-4 overflow-y-auto bg-gray-50/30">
              {chatMessages.map((msg, i) => (
                <div key={i} className={`flex flex-col ${msg.type === 'opponent' ? 'items-start' : 'items-end'}`}>
                  <div className={`px-4 py-2 rounded-2xl text-xs ${msg.type === 'system' ? 'bg-blue-50 text-blue-700 italic mx-auto' : msg.type === 'opponent' ? 'bg-white border text-gray-700' : 'bg-[#0B1E3A] text-white'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
              {isOpponentTyping && (
                <div className="flex flex-col items-start animate-in fade-in">
                  <div className="bg-white px-4 py-3 rounded-2xl text-xs border flex items-center gap-2">
                    <div className="flex gap-1">
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce"></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                      <div className="w-1.5 h-1.5 bg-blue-600 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                    </div>
                    <span className="text-[10px] font-black text-gray-400 uppercase italic">الخصم يكتب...</span>
                  </div>
                </div>
              )}
              <div ref={chatEndRef} />
           </div>

           <form onSubmit={(e) => {
             e.preventDefault();
             if(!message.trim()) return;
             setChatMessages(prev => [...prev, { text: message, type: 'user' }]);
             setMessage('');
           }} className="p-4 bg-white border-t relative">
             <input type="text" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="اكتب للخصم..." className="w-full pr-4 pl-12 py-4 bg-gray-50 rounded-2xl text-xs border-none outline-none text-right" />
             <button type="submit" className="absolute left-6 top-1/2 -translate-y-1/2 bg-[#0B1E3A] text-white p-2 rounded-xl">
               <ArrowRight className="w-4 h-4" />
             </button>
           </form>
        </div>
      </div>
    </div>
  );
};
export default MatchRoom;
