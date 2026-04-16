import { useState, useEffect } from 'react';
import { Bed, Star, Wrench, CheckCircle2, Plus, Users, Calendar, MapPin, Loader2, Wifi, Tv, Wind, Shield, Coffee, X } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { collection, onSnapshot, query, orderBy, doc, setDoc, updateDoc, arrayUnion, arrayRemove } from 'firebase/firestore';
import { db } from '../lib/firebase';
import { cn } from '../lib/utils';

export default function Rooms() {
  const [activeFilter, setActiveFilter] = useState('All Units');
  const [rooms, setRooms] = useState<any[]>([]);
  const [roomTypes, setRoomTypes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [showManager, setShowManager] = useState(false);
  const [newAmenity, setNewAmenity] = useState('');
  const [selectedType, setSelectedType] = useState('Standard');

  useEffect(() => {
    const q = query(collection(db, 'rooms'), orderBy('number', 'asc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const data = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRooms(data);
      setLoading(false);
    }, (error) => {
      console.error("Firestore Error:", error);
      setLoading(false);
    });

    const unsubTypes = onSnapshot(collection(db, 'roomTypes'), (snapshot) => {
      setRoomTypes(snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() })));
    });

    return () => {
      unsubscribe();
      unsubTypes();
    };
  }, []);

  const handleAddAmenity = async () => {
    if (!newAmenity.trim()) return;
    const typeDoc = roomTypes.find(t => t.name === selectedType);
    if (typeDoc) {
      await updateDoc(doc(db, 'roomTypes', typeDoc.id), {
        amenities: arrayUnion(newAmenity.trim())
      });
    } else {
      await setDoc(doc(db, 'roomTypes', selectedType.toLowerCase()), {
        name: selectedType,
        amenities: [newAmenity.trim()]
      });
    }
    setNewAmenity('');
  };

  const handleRemoveAmenity = async (type: string, amenity: string) => {
    const typeDoc = roomTypes.find(t => t.name === type);
    if (typeDoc) {
      await updateDoc(doc(db, 'roomTypes', typeDoc.id), {
        amenities: arrayRemove(amenity)
      });
    }
  };

  const filteredRooms = rooms.filter(r => {
    if (activeFilter === 'All Units') return true;
    if (activeFilter === 'Maintenance') return r.status === 'Maintenance';
    return r.type === activeFilter.replace('s', ''); // Simple mapping for now
  });

  const filters = ['All Units', 'Standard', 'Suite', 'Deluxe', 'Maintenance'];

  const occupancyRate = rooms.length > 0 
    ? Math.round((rooms.reduce((acc, r) => acc + (r.occupied || 0), 0) / rooms.reduce((acc, r) => acc + (r.capacity || 1), 0)) * 100)
    : 0;

  const amenityIcons: Record<string, any> = {
    'Wi-Fi': <Wifi size={12} />,
    'AC': <Wind size={12} />,
    'TV': <Tv size={12} />,
    'Security': <Shield size={12} />,
    'Coffee': <Coffee size={12} />,
  };

  return (
    <div className="space-y-8 pb-12">
      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Inventory Ledger</h1>
          <p className="text-on-surface-variant text-sm">Real-time room occupancy and capacity management.</p>
        </div>
        <div className="flex gap-3">
          <button 
            onClick={() => setShowManager(!showManager)}
            className="bg-white border border-surface-container-high px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm text-xs font-bold text-on-surface hover:bg-surface transition-all"
          >
            <Wrench size={14} /> Manage Amenities
          </button>
          <div className="bg-white border border-surface-container-high px-4 py-2 rounded-xl flex items-center gap-2 shadow-sm">
            <span className="w-2 h-2 rounded-full bg-tertiary"></span>
            <span className="text-[11px] font-bold uppercase tracking-wider text-tertiary">Occupancy: {occupancyRate}%</span>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {showManager && (
          <motion.section
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="bg-white rounded-2xl border border-surface-container-high p-6 shadow-sm overflow-hidden"
          >
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-lg font-bold text-on-surface">Amenity Configuration</h2>
              <button onClick={() => setShowManager(false)} className="text-on-surface-variant hover:text-error transition-colors">
                <X size={20} />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {['Standard', 'Suite', 'Deluxe'].map(type => {
                const config = roomTypes.find(t => t.name === type);
                return (
                  <div key={type} className="space-y-4 p-4 bg-surface rounded-xl border border-surface-container-high">
                    <h3 className="font-bold text-sm text-primary">{type} Amenities</h3>
                    <div className="flex flex-wrap gap-2">
                      {config?.amenities?.map((amenity: string) => (
                        <span key={amenity} className="inline-flex items-center gap-1.5 px-2 py-1 bg-white border border-surface-container-high rounded-lg text-[10px] font-bold text-on-surface-variant">
                          {amenity}
                          <button onClick={() => handleRemoveAmenity(type, amenity)} className="hover:text-error transition-colors">
                            <X size={10} />
                          </button>
                        </span>
                      ))}
                      {(!config?.amenities || config.amenities.length === 0) && (
                        <span className="text-[10px] text-on-surface-variant/40 italic">No amenities configured</span>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="mt-8 pt-6 border-t border-surface flex flex-col md:flex-row gap-4 items-end">
              <div className="w-full md:w-1/3 space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Room Type</label>
                <select 
                  value={selectedType}
                  onChange={(e) => setSelectedType(e.target.value)}
                  className="w-full bg-surface rounded-xl px-4 py-2.5 border border-surface-container-high font-bold text-on-surface text-sm"
                >
                  <option value="Standard">Standard</option>
                  <option value="Suite">Suite</option>
                  <option value="Deluxe">Deluxe</option>
                </select>
              </div>
              <div className="w-full md:flex-1 space-y-1.5">
                <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">New Amenity Name</label>
                <input 
                  type="text" 
                  placeholder="e.g. High-Speed Wi-Fi"
                  value={newAmenity}
                  onChange={(e) => setNewAmenity(e.target.value)}
                  className="w-full bg-surface rounded-xl px-4 py-2.5 border border-surface-container-high font-bold text-on-surface placeholder:text-on-surface-variant/30 text-sm"
                />
              </div>
              <button 
                onClick={handleAddAmenity}
                className="bg-primary text-white px-6 py-2.5 rounded-xl font-bold text-sm active:scale-95 transition-all shadow-sm shadow-primary/20"
              >
                Add Amenity
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      <nav className="flex gap-2 overflow-x-auto no-scrollbar pb-2">
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
      </nav>

      {loading ? (
        <div className="flex flex-col items-center justify-center py-12 text-on-surface-variant/40">
          <Loader2 className="animate-spin mb-2" size={32} />
          <span className="text-xs font-bold uppercase tracking-widest">Syncing Inventory...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredRooms.map((room, i) => {
            const isFull = room.occupied >= room.capacity;
            const isVip = room.type === 'Deluxe';
            const typeConfig = roomTypes.find(t => t.name === room.type);

            return (
              <motion.div
                key={room.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={cn(
                  "relative overflow-hidden rounded-2xl p-6 border transition-all hover:shadow-md flex flex-col justify-between",
                  isVip ? "bg-secondary text-white border-secondary" : "bg-white border-surface-container-high"
                )}
              >
                <div>
                  <div className="flex justify-between items-start mb-6">
                    <div>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider mb-1 block",
                        isVip ? "text-white/60" : "text-on-surface-variant/50"
                      )}>
                        {room.wing}
                      </span>
                      <h3 className="text-3xl font-bold tracking-tight">{room.number}</h3>
                    </div>
                    {isVip ? <Star size={24} fill="currentColor" /> : (
                      room.status === 'Maintenance' ? <Wrench className="text-error" size={24} /> : 
                      <Bed className={cn(isFull ? "text-error" : "text-primary")} size={24} />
                    )}
                  </div>

                  <div className="mb-6">
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-[10px] font-bold uppercase tracking-wider opacity-60">
                        {room.status === 'Maintenance' ? 'Status' : 'Occupancy'}
                      </span>
                      <span className={cn(
                        "text-[10px] font-bold uppercase tracking-wider",
                        isFull ? "text-error" : 
                        room.status === 'Maintenance' ? "text-error" : 
                        room.occupied === 0 ? "text-tertiary" : 
                        isVip ? "text-white" : "text-primary"
                      )}>
                        {room.status === 'Maintenance' ? 'MAINTENANCE' : isFull ? 'FULL' : `${Math.round((room.occupied / room.capacity) * 100)}% OCCUPIED`}
                      </span>
                    </div>
                    <div className={cn("w-full h-1.5 rounded-full overflow-hidden", isVip ? "bg-white/20" : "bg-surface")}>
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${(room.occupied / room.capacity) * 100}%` }}
                        className={cn(
                          "h-full",
                          isVip ? "bg-white" : 
                          isFull ? "bg-error" : 
                          room.status === 'Maintenance' ? "bg-error opacity-30" : 
                          room.occupied === 0 ? "bg-tertiary" : "bg-primary"
                        )} 
                      />
                    </div>
                  </div>

                  {/* Amenities Section */}
                  {typeConfig?.amenities && typeConfig.amenities.length > 0 && (
                    <div className="mb-6 flex flex-wrap gap-2">
                      {typeConfig.amenities.map((amenity: string) => (
                        <div 
                          key={amenity} 
                          className={cn(
                            "flex items-center gap-1.5 px-2 py-1 rounded-lg text-[9px] font-bold uppercase tracking-wider",
                            isVip ? "bg-white/10 text-white" : "bg-surface text-on-surface-variant/70"
                          )}
                        >
                          {amenityIcons[amenity] || <CheckCircle2 size={10} />}
                          {amenity}
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-surface/10">
                  <div className="flex items-center gap-2">
                    <Users size={14} className={isVip ? "text-white/60" : "text-on-surface-variant/40"} />
                    <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{room.occupied} / {room.capacity} Guests</span>
                  </div>
                  <span className="text-[11px] font-bold uppercase tracking-wider opacity-80">{room.type}</span>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* FAB */}
      <button className="fixed right-6 bottom-28 lg:bottom-10 w-14 h-14 rounded-xl bg-primary text-white shadow-lg shadow-primary/20 flex items-center justify-center active:scale-90 transition-transform z-40">
        <Plus size={24} />
      </button>
    </div>
  );
}
