import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, CreditCard, AlertTriangle, Bed, Plus, ArrowRight, Calendar, Map, BarChart3, Wrench, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, limit, orderBy } from 'firebase/firestore';
import { db, auth } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();
  const [counts, setCounts] = useState({ residents: 0, payments: 0, complaints: 0, rooms: 0 });
  const [activities, setActivities] = useState<any[]>([]);

  useEffect(() => {
    // Listen for residents count
    const unsubResidents = onSnapshot(collection(db, 'residents'), (snap) => {
      setCounts(prev => ({ ...prev, residents: snap.size }));
    });

    // Listen for open complaints
    const unsubComplaints = onSnapshot(collection(db, 'complaints'), (snap) => {
      const open = snap.docs.filter(d => d.data().status !== 'Resolved').length;
      setCounts(prev => ({ ...prev, complaints: open }));
    });

    // Listen for rooms count
    const unsubRooms = onSnapshot(collection(db, 'rooms'), (snap) => {
      setCounts(prev => ({ ...prev, rooms: snap.size }));
    });

    // Listen for recent activity (complaints for now)
    const q = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'), limit(5));
    const unsubActivity = onSnapshot(q, (snap) => {
      const data = snap.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setActivities(data);
    });

    return () => {
      unsubResidents();
      unsubComplaints();
      unsubRooms();
      unsubActivity();
    };
  }, []);

  const stats = [
    { label: 'Total Residents', value: counts.residents.toString(), icon: Users, color: 'text-primary', change: 'Live Ledger' },
    { label: 'Pending Payments', value: '0', icon: CreditCard, color: 'text-error', change: 'Syncing...' },
    { label: 'Open Complaints', value: counts.complaints.toString().padStart(2, '0'), icon: AlertTriangle, color: 'text-error', change: 'Active Tickets' },
    { label: 'Available Rooms', value: counts.rooms.toString().padStart(2, '0'), icon: Bed, color: 'text-tertiary', change: 'Inventory' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Dashboard Overview</h1>
          <p className="text-sm text-on-surface-variant">Welcome back, {auth.currentUser?.displayName || 'Administrator'}</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => navigate('/onboard')}
            className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-bold shadow-sm active:scale-95 transition-all"
          >
            Add Resident
          </button>
        </div>
      </div>

      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm flex flex-col gap-2 relative overflow-hidden group hover:border-primary/30 transition-all"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-primary/5 rounded-bl-full -mr-4 -mt-4 group-hover:bg-primary/10 transition-colors"></div>
            <div className="flex justify-between items-start relative z-10">
              <span className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/50">{stat.label}</span>
              <stat.icon className={stat.color} size={18} />
            </div>
            <p className="text-3xl font-bold text-on-surface tracking-tight relative z-10">{stat.value}</p>
            <span className={cn(
              "text-[10px] font-bold uppercase tracking-wider relative z-10",
              stat.change.includes('+') || stat.change.includes('Live') ? "text-tertiary" : "text-error"
            )}>
              {stat.change}
            </span>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/payments')}
              className="bg-white border border-surface-container-high p-6 rounded-2xl flex items-center gap-4 hover:bg-surface transition-colors group shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors border border-surface-container-high">
                <CreditCard size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-on-surface">Add Payment</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/40">Record new transaction</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-white border border-surface-container-high p-6 rounded-2xl flex items-center gap-4 hover:bg-surface transition-colors group shadow-sm"
            >
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors border border-surface-container-high">
                <Bed size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-on-surface">Room Map</p>
                <p className="text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/40">Check availability</p>
              </div>
            </button>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-lg font-bold text-on-surface">Recent Activity</h3>
            <button className="text-primary text-xs font-bold hover:underline">View All</button>
          </div>
          <div className="space-y-6">
            {activities.length === 0 ? (
              <p className="text-xs text-on-surface-variant/50 text-center py-4 uppercase font-bold tracking-widest">No recent activity</p>
            ) : (
              activities.map((activity, i) => (
                <div key={activity.id} className="flex items-center justify-between pb-4 border-b border-surface-container-high last:border-0 last:pb-0">
                  <div className="flex items-center gap-4">
                    <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border border-surface-container-high bg-surface text-primary")}>
                      <AlertTriangle size={20} />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-on-surface">{activity.title}</p>
                      <p className="text-[11px] text-on-surface-variant">
                        {activity.createdAt ? new Date(activity.createdAt).toLocaleTimeString() : 'Just now'}
                      </p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={cn(
                      "text-[10px] font-bold uppercase tracking-wider",
                      activity.status === 'Open' ? 'text-error' : 'text-tertiary'
                    )}>
                      {activity.status}
                    </span>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
