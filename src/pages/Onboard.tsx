import { User, Mail, Phone, Building2, CreditCard, ArrowRight, CheckCircle2, Info } from 'lucide-react';
import { motion } from 'motion/react';

export default function Onboard() {
  return (
    <div className="space-y-8 pb-12">
      <header>
        <div className="flex items-center gap-2 mb-4">
          <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider">Management</span>
          <ArrowRight size={12} className="text-on-surface-variant/30" />
          <span className="text-[10px] font-bold text-primary uppercase tracking-wider">New Resident Registration</span>
        </div>
        <h1 className="text-3xl font-bold tracking-tight text-on-surface mb-1">Onboard Resident</h1>
        <p className="text-on-surface-variant text-sm">Create a new ledger entry for an incoming guest.</p>
      </header>

      <form className="space-y-6">
        {/* Identity Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-surface-container-high relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-primary"></div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-primary">
            <User size={20} /> Personal Identity
          </h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Full Name</label>
              <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus-within:border-primary/30 transition-all">
                <User className="text-on-surface-variant/40 mr-3" size={18} />
                <input type="text" placeholder="Johnathan Doe" className="w-full bg-transparent border-none focus:ring-0 p-0 font-bold text-on-surface placeholder:text-on-surface-variant/30 text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Institutional Email</label>
              <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus-within:border-primary/30 transition-all">
                <Mail className="text-on-surface-variant/40 mr-3" size={18} />
                <input type="email" placeholder="j.doe@university.edu" className="w-full bg-transparent border-none focus:ring-0 p-0 font-bold text-on-surface placeholder:text-on-surface-variant/30 text-sm" />
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Phone Number</label>
              <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus-within:border-primary/30 transition-all">
                <Phone className="text-on-surface-variant/40 mr-3" size={18} />
                <input type="tel" placeholder="+1 (555) 000-0000" className="w-full bg-transparent border-none focus:ring-0 p-0 font-bold text-on-surface placeholder:text-on-surface-variant/30 text-sm" />
              </div>
            </div>
          </div>
        </section>

        {/* Placement Section */}
        <section className="bg-white rounded-2xl p-6 shadow-sm border border-surface-container-high relative overflow-hidden">
          <div className="absolute top-0 left-0 w-1.5 h-full bg-secondary"></div>
          <h3 className="text-lg font-bold mb-6 flex items-center gap-3 text-secondary">
            <Building2 size={20} /> Placement & Financials
          </h3>
          <div className="space-y-5">
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Room Assignment</label>
              <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus-within:border-primary/30 transition-all">
                <Building2 className="text-on-surface-variant/40 mr-3" size={18} />
                <select className="w-full bg-transparent border-none focus:ring-0 p-0 font-bold text-on-surface appearance-none text-sm">
                  <option>Select Room</option>
                  <option>Suite 402 - East Wing</option>
                  <option>Room 105 - Ground Floor</option>
                </select>
              </div>
            </div>
            <div className="space-y-1.5">
              <label className="block text-[10px] font-bold uppercase tracking-wider text-on-surface-variant/60 ml-1">Security Deposit</label>
              <div className="flex items-center bg-surface rounded-xl px-4 py-3 border border-surface-container-high focus-within:border-primary/30 transition-all">
                <CreditCard className="text-on-surface-variant/40 mr-3" size={18} />
                <span className="font-bold text-on-surface-variant mr-1 text-sm">$</span>
                <input type="number" placeholder="0.00" className="w-full bg-transparent border-none focus:ring-0 p-0 font-bold text-on-surface placeholder:text-on-surface-variant/30 text-sm" />
              </div>
            </div>
          </div>
        </section>

        <div className="flex flex-col gap-6 pt-4">
          <p className="text-[10px] font-bold text-on-surface-variant/50 uppercase tracking-wider text-center leading-relaxed">
            By registering, you confirm the resident has signed the architectural lease agreement and digital ledger terms.
          </p>
          <button type="submit" className="w-full py-4 rounded-xl bg-primary text-white font-bold shadow-lg shadow-primary/20 active:scale-[0.98] transition-all flex items-center justify-center gap-3 hover:bg-primary-container">
            Register Resident <CheckCircle2 size={18} />
          </button>
        </div>
      </form>

      {/* Inventory Context */}
      <section className="bg-white rounded-2xl border border-surface-container-high p-6 shadow-sm space-y-6">
        <h4 className="text-[11px] font-bold uppercase tracking-wider text-on-surface-variant/50">Current Inventory</h4>
        <div className="flex justify-between items-end">
          <div>
            <p className="text-[11px] font-bold text-on-surface-variant/60 uppercase tracking-wider mb-1">Available Beds</p>
            <p className="text-5xl font-bold text-primary tracking-tight">14</p>
          </div>
          <div className="text-right">
            <p className="text-[10px] font-bold text-tertiary uppercase tracking-wider mb-2">82% Occupied</p>
            <div className="w-32 h-1.5 bg-surface rounded-full overflow-hidden border border-surface-container-high">
              <div className="h-full bg-tertiary w-[82%]"></div>
            </div>
          </div>
        </div>
        <div className="pt-6 border-t border-surface flex gap-3">
          <Info className="text-primary shrink-0" size={18} />
          <p className="text-[11px] font-bold text-on-surface-variant/70 leading-relaxed uppercase tracking-wider">
            Rooms in the East Wing are currently undergoing floor maintenance. Avoid new assignments in the 400-block if possible.
          </p>
        </div>
      </section>

      {/* Visual Card */}
      <div className="rounded-2xl overflow-hidden relative h-56 shadow-sm border border-surface-container-high">
        <img 
          src="https://images.unsplash.com/photo-1555854817-5b2260d36c31?auto=format&fit=crop&q=80&w=1000" 
          alt="Interior" 
          className="w-full h-full object-cover"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-secondary/90 to-transparent flex flex-col justify-end p-6">
          <p className="text-white font-bold text-2xl tracking-tight">Architectural Comfort</p>
          <p className="text-white/60 text-[10px] font-bold uppercase tracking-wider mt-1">Standard Suite Layout View</p>
        </div>
      </div>
    </div>
  );
}
