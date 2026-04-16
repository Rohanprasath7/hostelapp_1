import { CreditCard, AlertTriangle, Megaphone, CheckCircle2, LogOut, ChevronRight, MessageSquare, Filter, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Notifications() {
  const notifications = [
    { title: 'Pending Payment: Room 302', desc: 'Guest Arjun Sharma has an outstanding balance of ₹4,500 due today.', time: '2h ago', icon: CreditCard, color: 'text-error', bg: 'bg-error/10' },
    { title: 'New Complaint: Water Leakage', desc: 'Room 104 reported a major leakage in the bathroom. Assigned to Maintenance.', time: 'NEW', icon: AlertTriangle, color: 'text-primary', bg: 'bg-surface', isNew: true },
    { title: 'Hostel Announcement Sent', desc: 'Monthly dinner schedule has been broadcasted to all residents successfully.', time: '5h ago', icon: Megaphone, color: 'text-tertiary', bg: 'bg-tertiary/10' },
  ];

  const yesterday = [
    { title: 'Maintenance Resolved', desc: 'AC Repair in Room 502 has been marked as completed by the technician.', time: 'Yesterday', icon: CheckCircle2, color: 'text-on-surface-variant', bg: 'bg-surface' },
    { title: 'Guest Check-out', desc: 'Guest Priya Verma from Room 201 has checked out.', time: 'Yesterday', icon: LogOut, color: 'text-secondary', bg: 'bg-secondary/10' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Notifications</h1>
        <p className="text-on-surface-variant text-sm">Keep track of your hostel operations and guest interactions.</p>
      </header>

      {/* Stats Section */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="bg-white rounded-xl p-2 pl-6 flex items-center justify-between shadow-sm border border-surface-container-high">
          <div className="flex gap-2">
            <button className="px-4 py-1.5 rounded-lg bg-primary text-white text-xs font-bold shadow-sm">All Alerts</button>
            <button className="px-4 py-1.5 rounded-lg bg-surface text-on-surface-variant text-xs font-bold hover:bg-surface-container-high border border-surface-container-high">Financial</button>
          </div>
          <button className="w-10 h-10 rounded-lg flex items-center justify-center text-on-surface-variant hover:bg-surface">
            <Settings size={18} />
          </button>
        </div>

        <div className="bg-secondary p-6 rounded-2xl flex items-center justify-center gap-6 text-white shadow-lg shadow-secondary/20">
          <span className="text-5xl font-bold tracking-tight">12</span>
          <span className="text-[11px] font-bold uppercase tracking-wider opacity-70 leading-relaxed">Unread<br/>Messages</span>
        </div>
      </section>

      {/* Feed */}
      <div className="space-y-10">
        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/40">Today</h2>
            <div className="flex-grow h-px bg-surface-container-high"></div>
          </div>
          <div className="space-y-4">
            {notifications.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className={cn(
                  "group bg-white p-5 rounded-2xl flex items-center gap-5 transition-all border border-surface-container-high hover:border-primary/30 hover:shadow-md active:scale-[0.99]",
                  item.isNew && "border-l-4 border-l-primary"
                )}
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-surface-container-high", item.bg, item.color)}>
                  <item.icon size={22} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-on-surface text-base group-hover:text-primary transition-colors">{item.title}</h3>
                    <span className={cn("text-[10px] font-bold uppercase tracking-wider", item.isNew ? "text-primary" : "text-on-surface-variant/40")}>
                      {item.time}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <ChevronRight size={18} className="text-on-surface-variant/20 group-hover:text-primary transition-colors" />
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <div className="flex items-center gap-4 mb-6">
            <h2 className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/40">Yesterday</h2>
            <div className="flex-grow h-px bg-surface-container-high"></div>
          </div>
          <div className="space-y-4">
            {yesterday.map((item, i) => (
              <div
                key={i}
                className="bg-white p-5 rounded-2xl flex items-center gap-5 opacity-70 border border-surface-container-high hover:opacity-100 transition-all"
              >
                <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center shrink-0 border border-surface-container-high", item.bg, item.color)}>
                  <item.icon size={22} />
                </div>
                <div className="flex-grow">
                  <div className="flex justify-between items-start">
                    <h3 className="font-bold text-on-surface text-base">{item.title}</h3>
                    <span className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/40">
                      {item.time}
                    </span>
                  </div>
                  <p className="text-on-surface-variant text-sm mt-1 leading-relaxed">{item.desc}</p>
                </div>
                <CheckCircle2 size={18} className="text-on-surface-variant/20" />
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* FAB */}
      <button className="fixed right-6 bottom-28 lg:bottom-10 w-14 h-14 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40">
        <MessageSquare size={24} />
      </button>
    </div>
  );
}
