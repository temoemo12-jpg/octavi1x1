
import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route, Link, useLocation, useNavigate, Navigate } from 'react-router-dom';
import { 
  Gamepad2, 
  Wallet, 
  Trophy, 
  User as UserIcon, 
  LogOut, 
  PlusCircle, 
  ShieldCheck, 
  Crown, 
  Home as HomeIcon,
  ArrowRightLeft
} from 'lucide-react';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Deposit from './pages/Deposit';
import Withdraw from './pages/Withdraw';
import CreateMatch from './pages/CreateMatch';
import MatchRoom from './pages/MatchRoom';
import Tournaments from './pages/Tournaments';
import Profile from './pages/Profile';
import EditProfile from './pages/EditProfile';
import VIPPage from './pages/VIPPage';
import Admin from './pages/Admin';
import AboutUs from './pages/AboutUs';
import PrivacyPolicy from './pages/PrivacyPolicy';
import HowToPlay from './pages/HowToPlay';
import FinanceGuide from './pages/FinanceGuide';
import LinkGame from './pages/LinkGame';
import WalletHub from './pages/WalletHub';

// Protected Route Component
// Fix: Children made optional to fix TS error in Route elements usage
const ProtectedRoute = ({ children }: { children?: React.ReactNode }) => {
  const isLoggedIn = !!localStorage.getItem('user_profile');
  if (!isLoggedIn) {
    return <Navigate to="/" replace />;
  }
  return <>{children}</>;
};

export const Logo = () => {
  const isLoggedIn = !!localStorage.getItem('user_profile');
  return (
    <Link to={isLoggedIn ? "/dashboard" : "/"} className="logo-wrapper">
      <div className="logo-en-box">
        <span className="logo-en">1x1.online</span>
      </div>
      <div className="logo-ar-container">
        <div className="yellow-waves"></div>
        <span className="logo-ar">1 ضد 1</span>
      </div>
    </Link>
  );
};

const Header = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const [user, setUser] = useState<any>(null);

  const checkStatus = () => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);
  };

  useEffect(() => {
    checkStatus();
    window.addEventListener('storage', checkStatus);
    const interval = setInterval(checkStatus, 1000); 
    return () => {
      window.removeEventListener('storage', checkStatus);
      clearInterval(interval);
    };
  }, []);

  if (isLoggedIn && user) {
    return (
      <header className="bg-[#0B1E3A] text-white sticky top-0 z-50 shadow-md border-b border-white/5 h-16 flex items-center justify-center px-4">
        <Logo />
      </header>
    );
  }

  return (
    <header className="bg-[#0B1E3A] text-white sticky top-0 z-50 shadow-lg border-b border-white/10">
      <div className="container mx-auto px-4 h-20 flex items-center justify-between flex-row-reverse">
        <div className="flex items-center gap-4 md:gap-10 flex-row-reverse">
          <Logo />
          <nav className="hidden md:flex gap-8 text-sm font-bold flex-row-reverse">
            <Link to="/how-to-play" className="hover:text-[#FACC15] transition-colors uppercase tracking-wider">كيفية اللعب</Link>
            <Link to="/about-us" className="hover:text-[#FACC15] transition-colors uppercase tracking-wider">من نحن</Link>
            <Link to="/finance-guide" className="hover:text-[#FACC15] transition-colors uppercase tracking-wider">المالية</Link>
          </nav>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Link to="/login" className="px-3 md:px-4 py-2 text-[10px] md:text-xs font-black uppercase hover:text-[#FACC15] transition-all tracking-widest text-white">دخول</Link>
            <Link to="/register" className="btn-1xbet px-4 md:px-6 py-2 md:py-2.5 rounded-lg text-[10px] md:text-xs shadow-md">
              <span>إنشاء حساب</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

const BottomNavigation = ({ isLoggedIn }: { isLoggedIn: boolean }) => {
  const location = useLocation();
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('user_profile');
    if (savedUser) setUser(JSON.parse(savedUser));
    else setUser(null);
  }, [location, isLoggedIn]);

  const isSetupPage = location.pathname === '/link-game';
  if (!isLoggedIn || !user || isSetupPage) return null;

  const navItems = [
    { icon: UserIcon, label: 'حسابي', path: '/profile', isAvatar: true },
    { icon: Gamepad2, label: 'تحدياتي', path: '/dashboard' },
    { icon: HomeIcon, label: 'الرئيسية', path: '/dashboard', isCenter: true },
    { icon: Trophy, label: 'بطولاتي', path: '/tournaments' },
    { icon: Wallet, label: 'الرصيد', path: '/wallet' },
  ];

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[100] px-4 pb-4 pointer-events-none">
      <div className="max-w-md mx-auto h-16 bg-white/80 backdrop-blur-xl border border-white/40 rounded-[2rem] shadow-[0_10px_40px_rgba(0,0,0,0.15)] flex items-center justify-around px-2 pointer-events-auto relative">
        {navItems.map((item, index) => {
          const isActive = location.pathname === item.path || (item.path === '/wallet' && (location.pathname === '/deposit' || location.pathname === '/withdraw'));
          
          if (item.isCenter) {
            return (
              <Link 
                key={index} 
                to={item.path} 
                className="relative -top-6 bg-gradient-to-tr from-[#0B1E3A] to-[#1E3A8A] p-3.5 rounded-full shadow-[0_10px_30px_rgba(11,30,58,0.3)] border-4 border-white transition-transform hover:scale-110 active:scale-95 group"
              >
                <item.icon className="w-7 h-7 text-[#FACC15]" />
              </Link>
            );
          }

          return (
            <Link 
              key={index} 
              to={item.path} 
              className={`flex flex-col items-center justify-center transition-all ${isActive ? 'text-[#1E3A8A]' : 'text-gray-400 hover:text-[#0B1E3A]'}`}
            >
              <div className="relative">
                {item.isAvatar ? (
                  <div className={`w-7 h-7 rounded-full overflow-hidden border-2 transition-all ${isActive ? 'border-[#FACC15] scale-110' : 'border-gray-200'}`}>
                    <img src={user.avatar} className="w-full h-full object-cover" alt="Profile" />
                  </div>
                ) : (
                  <item.icon className={`w-5 h-5 transition-all ${isActive ? 'scale-110 stroke-[2.5px]' : ''}`} />
                )}
              </div>
              <span className={`text-[7px] mt-1 font-black uppercase tracking-widest ${isActive ? 'text-[#0B1E3A]' : ''}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
};

const Layout = ({ children }: { children?: React.ReactNode }) => {
  const location = useLocation();
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('user_profile'));

  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem('user_profile'));
    };
    window.addEventListener('storage', handleStorageChange);
    const interval = setInterval(handleStorageChange, 1000);
    return () => {
      window.removeEventListener('storage', handleStorageChange);
      clearInterval(interval);
    };
  }, []);

  const isAuthPage = ['/login', '/register'].includes(location.pathname);
  const isSetupPage = location.pathname === '/link-game';
  
  if (isAuthPage) return <>{children}</>;

  return (
    <div className="flex flex-col min-h-screen" dir="rtl">
      <Header isLoggedIn={isLoggedIn} />
      
      <div className="flex flex-1">
        <main className={`flex-1 bg-[#F1F5F9] ${isLoggedIn && !isSetupPage ? 'pb-20' : ''}`}>
          {children}
        </main>
      </div>
      
      {!isLoggedIn && <Footer />}
      <BottomNavigation isLoggedIn={isLoggedIn} />
    </div>
  );
};

const Footer = () => (
  <footer className="bg-[#0B1E3A] text-gray-400 py-16 border-t border-white/5">
    <div className="container mx-auto px-6 text-right">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-6">
          <Logo />
          <p className="text-xs leading-relaxed font-medium mt-4 text-right">
            المنصة الرائدة في الوطن العربي للمباريات التنافسية. شارك في البطولات، تحدَّ اللاعبين، واربح جوائز مالية حقيقية.
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-white font-black text-lg">روابط سريعة</h3>
          <ul className="text-xs space-y-3 font-bold">
            <li><Link to="/how-to-play" className="hover:text-white">كيفية اللعب</Link></li>
            <li><Link to="/finance-guide" className="hover:text-white">دليل المالية</Link></li>
            <li><Link to="/about-us" className="hover:text-white">من نحن</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-white font-black text-lg">قوانين</h3>
          <ul className="text-xs space-y-3 font-bold">
            <li><Link to="/privacy-policy" className="hover:text-white">سياسة الخصوصية</Link></li>
          </ul>
        </div>
        <div className="space-y-4">
          <h3 className="text-white font-black text-lg">وسائل الدفع</h3>
          <div className="grid grid-cols-3 gap-2 opacity-60">
             <div className="bg-white/10 p-2 rounded text-[8px] text-center font-bold">CIH BANK</div>
             <div className="bg-white/10 p-2 rounded text-[8px] text-center font-bold">BARIDIMOB</div>
             <div className="bg-white/10 p-2 rounded text-[8px] text-center font-bold">USDT</div>
          </div>
        </div>
      </div>
      <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row justify-between items-center text-[10px] gap-6 text-center font-bold">
        <p>© 2024 1x1.online. جميع الحقوق محفوظة.</p>
        <div className="flex items-center gap-4">
          <span className="border border-red-500 text-red-500 px-2 py-0.5 rounded font-black text-[12px]">18+</span>
          <p>العب بمسؤولية.</p>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about-us" element={<AboutUs />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/how-to-play" element={<HowToPlay />} />
          <Route path="/finance-guide" element={<FinanceGuide />} />

          {/* Protected Member Routes */}
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/deposit" element={<ProtectedRoute><Deposit /></ProtectedRoute>} />
          <Route path="/withdraw" element={<ProtectedRoute><Withdraw /></ProtectedRoute>} />
          <Route path="/wallet" element={<ProtectedRoute><WalletHub /></ProtectedRoute>} />
          <Route path="/create-match" element={<ProtectedRoute><CreateMatch /></ProtectedRoute>} />
          <Route path="/match-room" element={<ProtectedRoute><MatchRoom /></ProtectedRoute>} />
          <Route path="/tournaments" element={<ProtectedRoute><Tournaments /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute><Profile /></ProtectedRoute>} />
          <Route path="/edit-profile" element={<ProtectedRoute><EditProfile /></ProtectedRoute>} />
          <Route path="/vip" element={<ProtectedRoute><VIPPage /></ProtectedRoute>} />
          <Route path="/link-game" element={<ProtectedRoute><LinkGame /></ProtectedRoute>} />
          
          <Route path="/admin-hidden-secure-panel" element={<ProtectedRoute><Admin /></ProtectedRoute>} />
          
          {/* Redirect any unknown route to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
