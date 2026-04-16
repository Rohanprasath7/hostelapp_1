import { useNavigate } from 'react-router-dom';
import { Users, CreditCard, AlertTriangle, Bed, Plus, ArrowRight, Calendar, Map, BarChart3, Wrench, CheckCircle2, Clock } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Dashboard() {
  const navigate = useNavigate();

  const stats = [
    { label: 'Total Residents', value: '142', icon: Users, color: 'text-primary', change: '+12.5% this month' },
    { label: 'Pending Payments', value: '12', icon: CreditCard, color: 'text-error', change: '-4.2% from June' },
    { label: 'Open Complaints', value: '04', icon: AlertTriangle, color: 'text-error', change: '2 new today' },
    { label: 'Available Rooms', value: '08', icon: Bed, color: 'text-tertiary', change: '85% occupancy' },
  ];

  const activities = [
    { name: 'Alex Rivera', action: 'Rent payment confirmed', amount: '+$850.00', time: 'Today, 08:45 AM', icon: CreditCard, iconBg: 'bg-surface', iconColor: 'text-primary' },
    { name: 'Room 402B', action: 'Maintenance request: Leakage', status: 'PENDING', time: 'Yesterday, 10:00 PM', icon: Wrench, iconBg: 'bg-surface', iconColor: 'text-error' },
    { name: 'Sarah Jenkins', action: 'New check-in registered', room: 'Room 105', time: 'July 12, 06:12 PM', icon: Users, iconBg: 'bg-surface', iconColor: 'text-tertiary' },
  ];

  return (
    <div className="space-y-8">
      {/* Page Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-bold text-on-surface">Dashboard Overview</h1>
          <p className="text-sm text-on-surface-variant">Welcome back, Alexander Wright</p>
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

      {/* Stats Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}
            className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm flex flex-col gap-2"
          >
            <div className="flex justify-between items-start">
              <span className="text-[13px] font-medium text-on-surface-variant">{stat.label}</span>
              <stat.icon className={stat.color} size={20} />
            </div>
            <p className="text-2xl font-bold text-on-surface">{stat.value}</p>
            <span className={cn(
              "text-xs font-semibold",
              stat.change.includes('+') || stat.change.includes('occupancy') ? "text-tertiary" : "text-error"
            )}>
              {stat.change}
            </span>
          </motion.div>
        ))}
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart Area (Mocked as a card with bars) */}
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white p-6 rounded-2xl border border-surface-container-high shadow-sm">
            <h3 className="text-lg font-bold text-on-surface mb-6">Revenue Growth</h3>
            <div className="h-[240px] flex items-end gap-3 pt-4 border-t border-surface-container-high">
              {[40, 60, 45, 80, 65, 90, 75, 85, 50, 70, 60, 95].map((height, i) => (
                <div 
                  key={i} 
                  className="flex-1 bg-primary/80 rounded-t-sm transition-all hover:bg-primary"
                  style={{ height: `${height}%` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Quick Actions */}
          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => navigate('/payments')}
              className="bg-white border border-surface-container-high p-6 rounded-2xl flex items-center gap-4 hover:bg-surface transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                <CreditCard size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-on-surface">Add Payment</p>
                <p className="text-xs text-on-surface-variant">Record new transaction</p>
              </div>
            </button>
            <button 
              onClick={() => navigate('/rooms')}
              className="bg-white border border-surface-container-high p-6 rounded-2xl flex items-center gap-4 hover:bg-surface transition-colors group"
            >
              <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center text-tertiary group-hover:bg-tertiary group-hover:text-white transition-colors">
                <Bed size={24} />
              </div>
              <div className="text-left">
                <p className="font-bold text-on-surface">Room Map</p>
                <p className="text-xs text-on-surface-variant">Check availability</p>
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
            {activities.map((activity, i) => (
              <div key={i} className="flex items-center justify-between pb-4 border-b border-surface-container-high last:border-0 last:pb-0">
                <div className="flex items-center gap-4">
                  <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center border border-surface-container-high", activity.iconBg, activity.iconColor)}>
                    <activity.icon size={20} />
                  </div>
                  <div>
                    <p className="text-sm font-bold text-on-surface">{activity.name}</p>
                    <p className="text-[11px] text-on-surface-variant">{activity.time}</p>
                  </div>
                </div>
                <div className="text-right">
                  {activity.amount && (
                    <p className={cn("text-sm font-bold", activity.amount.startsWith('+') ? "text-tertiary" : "text-error")}>
                      {activity.amount}
                    </p>
                  )}
                  {activity.status && (
                    <span className="text-[10px] font-bold text-error uppercase tracking-wider">
                      {activity.status}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
