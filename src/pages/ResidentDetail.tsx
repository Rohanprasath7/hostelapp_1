import { useParams, useNavigate } from 'react-router-dom';
import { Phone, MessageSquare, ArrowLeft, Download, Receipt, Zap, CheckCircle2, Bed, Calendar } from 'lucide-react';
import { motion } from 'motion/react';
import { cn } from '../lib/utils';

export default function ResidentDetail() {
  const { id } = useParams();
  const navigate = useNavigate();

  // Mock data based on ID
  const resident = {
    name: 'Alexander Chen',
    room: 'Room 402-B',
    joined: 'Oct 12, 2023',
    status: 'Active',
    balance: '$0.00',
    deposit: '$1,200.00',
    lastPayment: 'Mar 01, 2024',
    email: 'a.chen.design@email.com',
    phone: '+1 (555) 092-4412',
    emergency: 'Linda Chen (Mother)',
    emergencyPhone: '+1 (555) 092-8831',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=300&h=300',
    history: [
      { title: 'March Monthly Rent', date: 'Mar 01, 2024', inv: 'INV-9902', amount: '$850.00', status: 'Paid Full', type: 'rent' },
      { title: 'February Monthly Rent', date: 'Feb 01, 2024', inv: 'INV-8122', amount: '$850.00', status: 'Paid Full', type: 'rent' },
      { title: 'Utility Surcharge (Winter)', date: 'Jan 15, 2024', inv: 'INV-7751', amount: '$42.50', status: 'Paid Full', type: 'utility' },
      { title: 'January Monthly Rent', date: 'Jan 01, 2024', inv: 'INV-7100', amount: '$850.00', status: 'Paid Full', type: 'rent' },
    ]
  };

  return (
    <div className="space-y-8 pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary font-bold hover:underline mb-4 text-sm"
      >
        <ArrowLeft size={18} /> Back to Directory
      </button>

      {/* Profile Header */}
      <section className="flex flex-col md:flex-row items-center md:items-start gap-8">
        <div className="relative">
          <div className="w-40 h-40 rounded-3xl overflow-hidden shadow-lg border-4 border-white">
            <img 
              src={resident.image} 
              alt={resident.name} 
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
        </div>
        <div className="flex-1 text-center md:text-left">
          <div className="flex flex-col md:flex-row md:items-center gap-3">
            <h2 className="text-4xl font-bold tracking-tight text-on-surface">{resident.name}</h2>
            <span className="bg-tertiary/10 text-tertiary px-3 py-1 rounded-lg text-[10px] font-bold uppercase tracking-wider w-fit mx-auto md:mx-0">
              {resident.status}
            </span>
          </div>
          <div className="flex justify-center md:justify-start gap-4 text-on-surface-variant font-bold text-[11px] uppercase tracking-wider mt-2">
            <span className="flex items-center gap-1.5"><Bed size={14} /> {resident.room}</span>
            <span className="flex items-center gap-1.5"><Calendar size={14} /> Joined {resident.joined}</span>
          </div>
          <div className="flex gap-3 pt-6 justify-center md:justify-start">
            <button className="bg-primary text-white px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 shadow-sm active:scale-95 transition-all hover:bg-primary-container">
              <Phone size={18} /> Call Resident
            </button>
            <button className="bg-white border border-surface-container-high text-primary px-6 py-3 rounded-xl font-bold text-sm flex items-center gap-2 active:scale-95 transition-all hover:bg-surface">
              <MessageSquare size={18} /> Message
            </button>
          </div>
        </div>
      </section>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Financial Overview */}
        <div className="lg:col-span-1 space-y-6">
          <section className="bg-white rounded-2xl border border-surface-container-high p-8 shadow-sm">
            <span className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-wider block mb-2">Current Balance</span>
            <div className="text-4xl font-bold text-primary mb-1">{resident.balance}</div>
            <span className="text-tertiary font-bold text-[11px] uppercase tracking-wider">Clear Balance</span>
            
            <div className="grid grid-cols-2 gap-4 pt-6 mt-6 border-t border-surface-container-high">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider block mb-1">Security Deposit</span>
                <p className="font-bold text-on-surface">{resident.deposit}</p>
              </div>
              <div className="text-right">
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider block mb-1">Last Payment</span>
                <p className="font-bold text-on-surface">{resident.lastPayment}</p>
              </div>
            </div>
          </section>

          {/* Identity Details */}
          <section className="bg-white rounded-2xl border border-surface-container-high p-8 shadow-sm space-y-6">
            <h3 className="font-bold text-lg text-on-surface">Identity Details</h3>
            <div className="space-y-4">
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider block mb-1">Email Address</span>
                <p className="font-bold text-on-surface text-sm">{resident.email}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider block mb-1">Phone Number</span>
                <p className="font-bold text-on-surface text-sm">{resident.phone}</p>
              </div>
              <div>
                <span className="text-[10px] font-bold text-on-surface-variant/40 uppercase tracking-wider block mb-1">Emergency Contact</span>
                <p className="font-bold text-on-surface text-sm">{resident.emergency}</p>
                <p className="text-xs text-on-surface-variant font-medium mt-0.5">{resident.emergencyPhone}</p>
              </div>
            </div>
          </section>
        </div>

        {/* Payment History */}
        <section className="lg:col-span-2 bg-white rounded-2xl border border-surface-container-high p-8 shadow-sm">
          <div className="flex justify-between items-center mb-8">
            <h3 className="font-bold text-lg text-on-surface">Payment History Ledger</h3>
            <button className="text-primary font-bold text-[11px] uppercase tracking-wider hover:underline flex items-center gap-1.5">
              <Download size={14} /> Download PDF
            </button>
          </div>
          <div className="space-y-2">
            {resident.history.map((item, i) => (
              <div 
                key={i} 
                onClick={() => navigate(`/payments/receipt/${item.inv}`)}
                className="flex items-center justify-between py-4 hover:bg-surface px-4 rounded-xl transition-colors cursor-pointer group border border-transparent hover:border-surface-container-high"
              >
                <div className="flex items-center gap-4">
                  <div className={cn(
                    "w-11 h-11 rounded-xl flex items-center justify-center",
                    item.type === 'rent' ? 'bg-tertiary/10 text-tertiary' : 'bg-primary/10 text-primary'
                  )}>
                    {item.type === 'rent' ? <Receipt size={20} /> : <Zap size={20} />}
                  </div>
                  <div>
                    <p className="font-bold text-on-surface group-hover:text-primary transition-colors">{item.title}</p>
                    <p className="text-[10px] text-on-surface-variant font-bold uppercase tracking-wider mt-0.5">
                      {item.date} • {item.inv}
                    </p>
                  </div>
                </div>
                <div className="text-right">
                  <p className="font-bold text-on-surface text-lg">{item.amount}</p>
                  <div className="flex items-center justify-end gap-1.5 text-tertiary mt-0.5">
                    <CheckCircle2 size={12} />
                    <span className="text-[10px] font-bold uppercase tracking-wider">{item.status}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
