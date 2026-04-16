import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft, Download, Share2, Printer, CheckCircle2, QrCode, Wallet } from 'lucide-react';
import { motion } from 'motion/react';

export default function Receipt() {
  const { id } = useParams();
  const navigate = useNavigate();

  return (
    <div className="space-y-8 pb-12">
      <button 
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 text-primary font-bold hover:underline text-sm"
      >
        <ArrowLeft size={18} /> Back to Financial Ledger
      </button>

      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-white rounded-2xl overflow-hidden shadow-sm border border-surface-container-high relative"
      >
        {/* Decorative Header */}
        <div className="h-2 bg-primary"></div>

        <div className="p-8 sm:p-12 space-y-12">
          {/* Header */}
          <div className="flex flex-col gap-6 sm:flex-row sm:justify-between sm:items-center">
            <div>
              <h1 className="text-2xl font-bold text-secondary tracking-tight uppercase mb-1">SOVEREIGN STAY</h1>
              <p className="text-[10px] text-on-surface-variant/50 font-bold tracking-widest">PREMIUM PROPERTY MANAGEMENT</p>
            </div>
            <div className="flex flex-col items-start sm:items-end gap-2">
              <div className="bg-tertiary/10 text-tertiary px-4 py-1.5 rounded-lg flex items-center gap-2">
                <CheckCircle2 size={14} />
                <span className="text-[10px] font-bold uppercase tracking-wider">Transaction Successful</span>
              </div>
              <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest">Receipt #SS-2024-{id}</p>
            </div>
          </div>

          {/* Metadata Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-px bg-surface-container-high rounded-xl overflow-hidden border border-surface-container-high">
            <div className="bg-white p-6">
              <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider mb-2">Resident Details</p>
              <p className="text-lg font-bold text-on-surface leading-tight">Alexander Sterling</p>
              <p className="text-xs text-on-surface-variant font-medium">Resident ID: #AS-9920</p>
            </div>
            <div className="bg-white p-6">
              <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider mb-2">Room & Facility</p>
              <p className="text-lg font-bold text-on-surface leading-tight">Executive Suite 402</p>
              <p className="text-xs text-on-surface-variant font-medium">North Wing • Floor 4</p>
            </div>
            <div className="bg-white p-6">
              <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider mb-2">Transaction Date</p>
              <p className="text-lg font-bold text-on-surface leading-tight">Oct 24, 2023</p>
              <p className="text-xs text-on-surface-variant font-medium">14:22 GMT+5:30</p>
            </div>
          </div>

          {/* Table */}
          <div className="space-y-6">
            <div className="flex items-center justify-between py-3 border-b border-surface-container-high px-1">
              <span className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Description</span>
              <span className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-wider">Amount</span>
            </div>
            <div className="py-2 px-1 flex justify-between items-start">
              <div>
                <p className="font-bold text-on-surface text-xl">Monthly Stay (Nov 2023)</p>
                <p className="text-sm text-on-surface-variant mt-1 leading-relaxed">Includes Utilities & High-Speed Internet</p>
              </div>
              <p className="font-bold text-on-surface text-xl">$1,250.00</p>
            </div>
            <div className="py-4 px-6 flex justify-between items-center bg-surface rounded-xl border border-surface-container-high">
              <div className="flex items-center gap-3">
                <Wallet className="text-primary" size={18} />
                <span className="text-xs font-bold text-on-surface-variant uppercase tracking-wider">Payment Method: <span className="text-on-surface font-bold">UPI (GPay)</span></span>
              </div>
              <div className="text-right">
                <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-wider">Subtotal</p>
                <p className="font-bold text-on-surface">$1,250.00</p>
              </div>
            </div>
          </div>

          {/* Total */}
          <div className="flex flex-col items-end gap-1 pt-8 border-t border-surface-container-high">
            <p className="text-[11px] font-bold text-on-surface-variant/50 uppercase tracking-widest">Grand Total Paid</p>
            <div className="flex items-baseline gap-1">
              <span className="text-2xl font-bold text-primary">$</span>
              <span className="text-6xl font-bold text-primary tracking-tight">1,250.00</span>
            </div>
          </div>

          {/* Footer */}
          <div className="pt-12 border-t border-surface-container-high flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-surface rounded-xl flex items-center justify-center border border-surface-container-high">
                <QrCode className="text-secondary" size={32} />
              </div>
              <div className="text-left">
                <p className="text-[11px] font-bold text-on-surface uppercase tracking-wider">Verify Transaction</p>
                <p className="text-[10px] text-on-surface-variant/60 max-w-[180px] leading-relaxed uppercase font-bold">Scan to verify authenticity on Sovereign Secure Ledger.</p>
              </div>
            </div>
            <div className="text-center sm:text-right">
              <p className="text-[10px] text-on-surface-variant/40 font-bold uppercase tracking-widest italic mb-1">Digitally Signed by Sovereign Stay</p>
              <p className="text-[10px] text-on-surface-variant/20 font-bold uppercase tracking-widest">No physical signature required.</p>
            </div>
          </div>
        </div>
      </motion.div>

      {/* Actions */}
      <div className="flex flex-col sm:flex-row gap-4 justify-center">
        <button className="flex-1 h-14 bg-primary text-white rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 shadow-sm active:scale-95 transition-all hover:bg-primary-container">
          <Download size={18} /> Download PDF
        </button>
        <button className="flex-1 h-14 bg-white border border-surface-container-high text-primary rounded-xl font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-3 active:scale-95 transition-all hover:bg-surface">
          <Share2 size={18} /> Share Receipt
        </button>
        <button 
          onClick={() => window.print()}
          className="w-14 h-14 bg-white border border-surface-container-high text-on-surface-variant rounded-xl flex items-center justify-center active:scale-95 transition-all hover:bg-surface"
        >
          <Printer size={20} />
        </button>
      </div>
    </div>
  );
}
