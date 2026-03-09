import React from 'react';

export default function BillingSettings() {
  const invoices = [
    { id: 'INV-2026-001', date: '01 Mar, 2026', amount: '499,00 €', status: 'Pagado' },
    { id: 'INV-2026-002', date: '01 Feb, 2026', amount: '499,00 €', status: 'Pagado' },
    { id: 'INV-2026-003', date: '01 Ene, 2026', amount: '499,00 €', status: 'Pagado' },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h3 className="font-bold text-lg text-white">Plan Actual</h3>
            <p className="text-sm text-slate-500 mt-1">Usted está en el plan Business Pro.</p>
          </div>
          <span className="bg-primary/10 text-primary text-[10px] font-black uppercase px-3 py-1.5 rounded-full border border-primary/20">Activo</span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Valor Mensual</p>
            <p className="text-xl font-black text-white">499,00 €</p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Próxima Factura</p>
            <p className="text-xl font-black text-white">01 Abr, 2026</p>
          </div>
          <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800">
            <p className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-1">Usuarios</p>
            <p className="text-xl font-black text-white">12 / 20</p>
          </div>
        </div>

        <div className="flex gap-3">
          <button className="flex-1 py-2.5 bg-primary text-navy-dark font-bold rounded-xl hover:opacity-90 transition-opacity">Mejorar Plan</button>
          <button className="px-6 py-2.5 bg-slate-800 text-white font-bold rounded-xl hover:bg-slate-700 transition-colors">Cancelar Suscripción</button>
        </div>
      </div>

      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-white">Métodos de Pago</h3>
        <div className="p-4 bg-slate-900/50 rounded-xl border border-slate-800 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-12 h-8 bg-slate-800 rounded flex items-center justify-center border border-slate-700">
              <span className="text-[10px] font-black text-white italic">VISA</span>
            </div>
            <div>
              <p className="text-sm font-bold text-white">Visa terminada en 4242</p>
              <p className="text-xs text-slate-500">Expira en 12/2028</p>
            </div>
          </div>
          <button className="text-primary text-sm font-bold hover:underline">Editar</button>
        </div>
        <button className="mt-4 flex items-center gap-2 text-sm font-bold text-slate-400 hover:text-white transition-colors">
          <span className="material-symbols-outlined text-lg">add</span>
          Añadir nuevo método
        </button>
      </div>

      <div className="bg-navy-card p-6 rounded-2xl border border-slate-800 shadow-sm">
        <h3 className="font-bold text-lg mb-6 text-white">Historial de Facturación</h3>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="text-left border-b border-slate-800">
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Factura</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Fecha</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Valor</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider">Estado</th>
                <th className="pb-4 text-xs font-bold text-slate-500 uppercase tracking-wider text-right">Acción</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {invoices.map((invoice, idx) => (
                <tr key={idx} className="group">
                  <td className="py-4 text-sm font-bold text-white">{invoice.id}</td>
                  <td className="py-4 text-sm text-slate-400">{invoice.date}</td>
                  <td className="py-4 text-sm font-bold text-white">{invoice.amount}</td>
                  <td className="py-4">
                    <span className="bg-emerald-500/10 text-emerald-500 text-[10px] font-black uppercase px-2 py-1 rounded-full">
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4 text-right">
                    <button className="p-2 text-slate-400 hover:text-primary transition-colors">
                      <span className="material-symbols-outlined text-lg">download</span>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
