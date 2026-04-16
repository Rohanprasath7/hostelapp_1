import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Download, CreditCard, AlertCircle, Calendar, ChevronDown, Send, FileText, Edit3, Plus, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, orderBy, limit } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Payments() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('All');
  const [transactions, setTransactions] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, 'payments'), orderBy('createdAt', 'desc'), limit(20));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setTransactions(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const stats = {
    mtdRevenue: transactions.reduce((acc, tx) => acc + (tx.status === 'Settled' ? tx.amount : 0), 0),
    overdueBalance: transactions.reduce((acc, tx) => acc + (tx.status === 'Overdue' ? tx.amount : 0), 0),
    overdueCount: transactions.filter(tx => tx.status === 'Overdue').length
  };

  const filteredTransactions = transactions.filter(tx => {
    if (activeTab === 'All') return true;
    return tx.status === activeTab;
  });

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Financial Ledger</h1>
          <p className="text-on-surface-variant text-sm">Real-time revenue monitoring and guest billing</p>
        </div>
        
        <div className="flex items-center gap-1 p-1 bg-white border border-surface-container-high rounded-xl w-fit">
          {['All', 'Settled', 'Pending', 'Overdue'].map((tab) => (
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
              <span className="text-4xl font-bold tracking-tight text-on-surface">${stats.mtdRevenue.toLocaleString()}</span>
              <span className="text-tertiary font-bold text-sm flex items-center">
                <Plus size={14} /> Live
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
            <h3 className="text-on-surface font-bold text-3xl tracking-tight mb-1">${stats.overdueBalance.toLocaleString()}</h3>
            <p className="text-on-surface-variant text-xs font-medium leading-relaxed">
              Total overdue balance across {stats.overdueCount} resident accounts.
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
            {new Date().toLocaleString('default', { month: 'long', year: 'numeric' })}
            <ChevronDown size={14} />
          </button>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant/40">
            <Loader2 className="animate-spin mb-2" size={32} />
            <span className="text-xs font-bold uppercase tracking-widest">Syncing Ledger...</span>
          </div>
        ) : (
          <div className="divide-y divide-surface-container-high">
            {filteredTransactions.map((tx, i) => (
              <motion.div 
                key={tx.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/payments/receipt/${tx.id}`)}
                className="px-6 py-5 flex items-center justify-between hover:bg-surface transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs",
                    tx.status === 'Settled' ? 'bg-tertiary/10 text-tertiary' : 
                    tx.status === 'Overdue' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                  )}>
                    {tx.residentName?.[0] || 'R'}
                  </div>
                  <div>
                    <div className="font-bold text-on-surface group-hover:text-primary transition-colors">{tx.residentName}</div>
                    <div className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-wider mt-0.5">{tx.roomNumber}</div>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-right">
                    <div className="font-bold text-on-surface">{tx.currency}{tx.amount.toLocaleString()}</div>
                    <span className={cn(
                      "px-2 py-0.5 rounded-lg text-[9px] font-bold tracking-wider uppercase inline-flex items-center gap-1 mt-1",
                      tx.status === 'Settled' ? 'bg-tertiary/10 text-tertiary' : 
                      tx.status === 'Overdue' ? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                    )}>
                      {tx.status}
                    </span>
                  </div>
                  <ChevronDown className="-rotate-90 text-on-surface-variant/30 group-hover:text-primary transition-colors" size={16} />
                </div>
              </motion.div>
            ))}
          </div>
        )}

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
