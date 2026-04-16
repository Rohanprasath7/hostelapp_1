import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, CreditCard, AlertCircle, Calendar, ChevronDown, Send, FileText, Edit3, Plus } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function Payments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');

  const transactions = [
    { id: '88210', name: 'Elias Miller', room: 'Room B-204', amount: '$1,200', status: 'Overdue', statusColor: 'bg-error/10 text-error', initials: 'EM', initialsBg: 'bg-error/10', initialsColor: 'text-error' },
    { id: '88211', name: 'Sarah Chen', room: 'Room A-105', amount: '$1,200', status: 'Settled', statusColor: 'bg-tertiary/10 text-tertiary', initials: 'SC', initialsBg: 'bg-tertiary/10', initialsColor: 'text-tertiary' },
    { id: '88212', name: 'James Wilson', room: 'Room C-402', amount: '$950', status: 'Pending', statusColor: 'bg-primary/10 text-primary', initials: 'JW', initialsBg: 'bg-primary/10', initialsColor: 'text-primary' },
    { id: '88213', name: 'Maria Garcia', room: 'Room B-210', amount: '$1,450', status: 'Settled', statusColor: 'bg-tertiary/10 text-tertiary', initials: 'MG', initialsBg: 'bg-tertiary/10', initialsColor: 'text-tertiary' },
  ];

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Financial Ledger</h1>
          <p className="text-on-surface-variant text-sm">Real-time revenue monitoring and guest billing</p>
        </div>
        
        <div className="flex items-center gap-1 p-1 bg-white border border-surface-container-high rounded-xl w-fit">
          {['All', 'Pending', 'Overdue'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={cn(
                "px-4 py-1.5 rounded-lg font-bold text-xs transition-all",
                activeTab === tab 
                  ? "bg-primary text-white shadow-sm" 
                  : "text-on-surface-variant hover:bg-surface"
              )}
            >
              {tab}
            </button>
          ))}
        </div>
      </header>

      {/* Insights Grid */}
      <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Total Revenue Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-8 rounded-2xl border border-surface-container-high shadow-sm relative overflow-hidden group"
        >
          <div className="relative z-10">
            <span className="text-on-surface-variant font-bold tracking-wider uppercase text-[11px] mb-2 block">MTD REVENUE</span>
            <div className="flex items-baseline gap-2 mb-8">
              <span className="text-4xl font-bold tracking-tight text-on-surface">$42,890</span>
              <span className="text-tertiary font-bold text-sm flex items-center">
                <Plus size={14} /> 12%
              </span>
            </div>
            <div className="flex gap-3">
              <button className="bg-white border border-surface-container-high px-5 py-2.5 rounded-xl font-bold text-xs transition-all flex items-center gap-2 hover:bg-surface">
                <Download size={16} /> Report
              </button>
              <button className="bg-primary text-white px-5 py-2.5 rounded-xl font-bold text-xs transition-all active:scale-95 hover:bg-primary-container">
                Quick Settle
              </button>
            </div>
          </div>
        </motion.div>

        {/* Overdue Alert Card */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-8 rounded-2xl border border-surface-container-high shadow-sm flex flex-col justify-between"
        >
          <div>
            <div className="flex items-center justify-between mb-4">
              <AlertCircle className="text-error" size={28} />
              <span className="bg-error/10 text-error px-3 py-1 rounded-lg text-[10px] font-bold tracking-wider uppercase">Action Required</span>
            </div>
            <h3 className="text-on-surface font-bold text-3xl tracking-tight mb-1">$3,420</h3>
            <p className="text-on-surface-variant text-xs font-medium leading-relaxed">
              Total overdue balance across 12 resident accounts.
            </p>
          </div>
          <button className="w-full bg-error text-white py-3 rounded-xl font-bold text-xs mt-6 active:scale-95 transition-transform shadow-sm hover:bg-error/90">
            Send Reminders
          </button>
        </motion.div>
      </section>

      {/* Ledger Table Section */}
      <section className="bg-white rounded-2xl border border-surface-container-high overflow-hidden shadow-sm">
        <div className="px-6 py-4 flex justify-between items-center border-b border-surface-container-high bg-surface/30">
          <h2 className="text-lg font-bold text-on-surface">Recent Transactions</h2>
          <button className="bg-white border border-surface-container-high px-3 py-1.5 rounded-lg flex items-center gap-2 text-xs font-bold text-on-surface hover:bg-surface transition-all">
            <Calendar size={14} />
            October 2023
            <ChevronDown size={14} />
          </button>
        </div>

        <div className="divide-y divide-surface-container-high">
          {transactions.map((tx, i) => (
            <motion.div 
              key={tx.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.05 }}
              onClick={() => navigate(`/payments/receipt/${tx.id}`)}
              className="px-6 py-5 flex items-center justify-between hover:bg-surface transition-colors cursor-pointer group"
            >
              <div className="flex items-center gap-4">
                <div className={cn("w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs", tx.initialsBg, tx.initialsColor)}>
                  {tx.initials}
                </div>
                <div>
                  <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{tx.name}</div>
                  <div className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-wider mt-0.5">{tx.room}</div>
                </div>
              </div>
              <div className="flex items-center gap-6">
                <div className="text-right">
                  <div className="font-bold text-on-surface">{tx.amount}</div>
                  <span className={cn("px-2 py-0.5 rounded-lg text-[9px] font-bold tracking-wider uppercase inline-flex items-center gap-1 mt-1", tx.statusColor)}>
                    {tx.status}
                  </span>
                </div>
                <ChevronDown className="-rotate-90 text-on-surface-variant/30 group-hover:text-primary transition-colors" size={16} />
              </div>
            </motion.div>
          ))}
        </div>

        <div className="p-6 flex justify-center border-t border-surface-container-high">
          <button className="text-primary font-bold text-xs hover:underline">
            View All Historical Transactions
          </button>
        </div>
      </section>

      {/* FAB */}
      <button className="fixed right-6 bottom-28 lg:bottom-10 w-14 h-14 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={24} />
      </button>
    </div>
  );
}
