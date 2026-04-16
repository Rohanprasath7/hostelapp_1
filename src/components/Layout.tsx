import { Outlet, NavLink, useLocation } from 'react-router-dom';
import { LayoutDashboard, Users, CreditCard, Bed, User, Bell } from 'lucide-react';
import { cn } from '../lib/utils';
import { motion, AnimatePresence } from 'motion/react';

export default function Layout() {
  const location = useLocation();

  const navItems = [
    { icon: LayoutDashboard, label: 'Dashboard', path: '/' },
    { icon: Users, label: 'Residents', path: '/residents' },
    { icon: CreditCard, label: 'Payments', path: '/payments' },
    { icon: Bed, label: 'Rooms', path: '/rooms' },
    { icon: User, label: 'Profile', path: '/profile' },
  ];

  return (
    <div className="min-h-screen bg-secondary flex justify-center items-center overflow-hidden">
      {/* Phone Frame for Desktop */}
      <div className="w-full h-full lg:max-w-[450px] lg:h-[90vh] lg:rounded-[3rem] lg:border-[8px] lg:border-secondary-container lg:shadow-2xl bg-surface flex flex-col relative overflow-hidden">
        
        {/* Top Bar (Status Bar style for mobile) */}
        <header className="h-16 bg-white border-b border-surface-container-high flex items-center justify-between px-6 sticky top-0 z-50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-7 h-7 bg-primary rounded-lg flex items-center justify-center">
              <Bed size={16} className="text-white" />
            </div>
            <span className="text-base font-bold tracking-tight text-secondary">SOVEREIGN</span>
          </div>
          
          <div className="flex items-center gap-3">
            <NavLink to="/notifications" className="p-2 rounded-full hover:bg-surface transition-colors text-on-surface-variant relative">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-1.5 h-1.5 bg-primary rounded-full border border-white"></span>
            </NavLink>
            <div className="w-8 h-8 rounded-full bg-surface-container-highest overflow-hidden border border-surface-container-high">
              <img 
                src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100&h=100" 
                alt="Admin" 
                className="w-full h-full object-cover"
                referrerPolicy="no-referrer"
              />
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 overflow-y-auto no-scrollbar p-5 pb-24">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, ease: "easeInOut" }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>

        {/* Bottom Navigation */}
        <nav className="absolute bottom-0 left-0 w-full flex justify-around items-center px-2 pt-3 pb-8 bg-white/80 backdrop-blur-md border-t border-surface-container-high shadow-lg z-50">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                cn(
                  "flex flex-col items-center justify-center px-3 py-1 rounded-xl transition-all duration-200",
                  isActive 
                    ? "text-primary" 
                    : "text-on-surface-variant hover:text-primary"
                )
              }
            >
              {({ isActive }) => (
                <>
                  <item.icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                  <span className="text-[9px] font-bold uppercase mt-1">
                    {item.label}
                  </span>
                </>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </div>
  );
}
