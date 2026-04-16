import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight, UserPlus, Loader2 } from 'lucide-react';
import { motion } from 'motion/react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Residents() {
  const navigate = useNavigate();
  const [activeFilter, setActiveFilter] = useState('All');
  const [residents, setResidents] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const q = query(collection(db, 'residents'), orderBy('name', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setResidents(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const filteredResidents = residents.filter(r => {
    const matchesSearch = r.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
                         r.room.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = activeFilter === 'All' || r.status === activeFilter;
    return matchesSearch && matchesFilter;
  });

  const filters = ['All', 'Active', 'Pending', 'Checked Out'];

  return (
    <div className="space-y-8">
      <header>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Resident Directory</h1>
        <p className="text-on-surface-variant text-sm">Manage and monitor your resident ledger.</p>
      </header>

      {/* Search & Filters */}
      <section className="space-y-4">
        <div className="relative group">
          <div className="absolute inset-y-0 left-4 flex items-center pointer-events-none text-on-surface-variant/50">
            <Search size={18} />
          </div>
          <input 
            type="text" 
            placeholder="Search for residents..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-11 pr-4 py-3 bg-white border border-surface-container-high rounded-xl focus:border-primary focus:ring-1 focus:ring-primary/20 transition-all focus:ring-0 text-sm font-medium"
          />
        </div>

        <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
          {filters.map((filter) => (
            <button
              key={filter}
              onClick={() => setActiveFilter(filter)}
              className={cn(
                "px-5 py-2 rounded-lg text-xs font-bold whitespace-nowrap transition-all active:scale-95",
                activeFilter === filter 
                  ? "bg-primary text-white shadow-sm" 
                  : "bg-white border border-surface-container-high text-on-surface-variant hover:bg-surface"
              )}
            >
              {filter}
            </button>
          ))}
        </div>
      </section>

      {/* Residents List */}
      <section className="space-y-4">
        <div className="flex items-center justify-between px-1">
          <h2 className="text-[11px] font-bold tracking-wider text-on-surface-variant/50 uppercase">Resident Ledger</h2>
          <span className="text-[11px] font-bold text-primary">{filteredResidents.length} Total</span>
        </div>

        {loading ? (
          <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant/40">
            <Loader2 className="animate-spin mb-2" size={32} />
            <span className="text-xs font-bold uppercase tracking-widest">Loading Ledger...</span>
          </div>
        ) : filteredResidents.length === 0 ? (
          <div className="text-center py-12 bg-white rounded-2xl border border-dashed border-surface-container-high">
            <p className="text-on-surface-variant text-sm font-medium">No residents found.</p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredResidents.map((resident, i) => (
              <motion.div
                key={resident.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                onClick={() => navigate(`/residents/${resident.id}`)}
                className="group bg-white p-4 rounded-2xl border border-surface-container-high flex items-center justify-between transition-all hover:border-primary/30 hover:shadow-md cursor-pointer active:scale-[0.99] relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-8 -mt-8 group-hover:bg-primary/10 transition-colors"></div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-xl bg-surface flex items-center justify-center border border-surface-container-high overflow-hidden group-hover:border-primary/30 transition-colors">
                    {resident.image ? (
                      <img src={resident.image} alt={resident.name} className="w-full h-full object-cover" referrerPolicy="no-referrer" />
                    ) : (
                      <span className="text-lg font-bold text-primary">{resident.name[0]}</span>
                    )}
                  </div>
                  <div>
                    <h3 className="font-bold text-on-surface group-hover:text-primary transition-colors">{resident.name}</h3>
                    <div className="flex items-center gap-2 mt-0.5">
                      <span className="text-[11px] font-bold text-on-surface-variant/60">
                        {resident.room}
                      </span>
                      <span className="w-1 h-1 bg-on-surface-variant/20 rounded-full"></span>
                      <span className="text-[11px] font-bold text-secondary/60">
                        {resident.nationality}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-center gap-4 relative z-10">
                  <div className="text-right mr-2">
                    <p className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Balance</p>
                    <p className="text-sm font-bold text-on-surface">{resident.currency}{resident.balance?.toLocaleString()}</p>
                  </div>
                  <span className={cn(
                    "px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider",
                    resident.status === 'Active' ? 'bg-tertiary/10 text-tertiary' : 
                    resident.status === 'Pending' ? 'bg-primary/10 text-primary' : 
                    'bg-on-surface-variant/10 text-on-surface-variant'
                  )}>
                    {resident.status}
                  </span>
                  <ChevronRight size={18} className="text-on-surface-variant/30 group-hover:text-primary transition-colors" />
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </section>

      {/* FAB */}
      <button 
        onClick={() => navigate('/onboard')}
        className="fixed right-6 bottom-28 lg:bottom-10 w-14 h-14 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40"
      >
        <UserPlus size={24} />
      </button>
    </div>
  );
}
