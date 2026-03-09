import { useState, useEffect } from 'react';
import { motion } from 'motion/react';

interface CalendarEvent {
  id: number;
  title: string;
  date: string; // ISO YYYY-MM-DD
  type: 'project' | 'payment' | 'contract';
  status: string;
  extra?: string;
}

const TYPE_STYLES: Record<string, string> = {
  project:  'bg-blue-500/20 text-blue-300 border-blue-500/30',
  payment:  'bg-amber-500/20 text-amber-300 border-amber-500/30',
  contract: 'bg-primary/20 text-primary border-primary/30',
};

const TYPE_ICONS: Record<string, string> = {
  project:  'work',
  payment:  'payments',
  contract: 'description',
};

const WEEKDAYS = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
const MONTHS = [
  'Enero','Febrero','Marzo','Abril','Mayo','Junio',
  'Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre',
];

// Mock events — in production these come from the real DB
const MOCK_EVENTS: CalendarEvent[] = [
  { id: 1, title: 'Rediseño E-commerce — Entrega', date: '2024-05-15', type: 'project', status: 'En Progreso', extra: 'TechNova' },
  { id: 2, title: 'App Móvil Delivery — Fin',      date: '2024-03-20', type: 'project', status: 'Completado', extra: 'Logistics Corp' },
  { id: 3, title: 'Pago Agencia Mova',              date: '2024-03-24', type: 'payment', status: 'Pagado',    extra: '$2,400' },
  { id: 4, title: 'Pago SkyTech Corp',              date: '2024-03-22', type: 'payment', status: 'Pendiente', extra: '$1,150' },
  { id: 5, title: 'Contrato Acme Corp',             date: '2024-04-12', type: 'contract', status: 'Firmado', extra: '$15,000' },
  { id: 6, title: 'Contrato Global Tech',           date: '2024-04-05', type: 'contract', status: 'En Revisión', extra: '$8,200' },
];

function getDaysInMonth(year: number, month: number) {
  return new Date(year, month + 1, 0).getDate();
}

function getFirstDayOfMonth(year: number, month: number) {
  return new Date(year, month, 1).getDay();
}

export default function CalendarPage() {
  const today = new Date();
  const [currentYear, setCurrentYear]   = useState(today.getFullYear());
  const [currentMonth, setCurrentMonth] = useState(today.getMonth());
  const [events, setEvents]             = useState<CalendarEvent[]>([]);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [filterType, setFilterType]     = useState<'all' | 'project' | 'payment' | 'contract'>('all');

  useEffect(() => {
    // In production, fetch from API with date range
    fetchEvents();
  }, [currentYear, currentMonth]);

  const fetchEvents = async () => {
    try {
      const [projRes, payRes] = await Promise.all([
        fetch('/api/projects'),
        fetch('/api/payments'),
      ]);
      const projects = await projRes.json();
      const payments = await payRes.json();

      const projEvents: CalendarEvent[] = projects.map((p: { id: number; name: string; deadline: string; status: string; client_name: string }) => ({
        id: p.id,
        title: p.name,
        date: p.deadline,
        type: 'project' as const,
        status: p.status,
        extra: p.client_name,
      }));

      const payEvents: CalendarEvent[] = payments.map((p: { id: number; client_name: string; payment_date: string; status: string; amount: number }) => ({
        id: p.id + 1000,
        title: `Pago — ${p.client_name}`,
        date: p.payment_date,
        type: 'payment' as const,
        status: p.status,
        extra: `$${p.amount?.toLocaleString() ?? 0}`,
      }));

      setEvents([...projEvents, ...payEvents]);
    } catch {
      // Fallback to mock
      setEvents(MOCK_EVENTS);
    }
  };

  const prevMonth = () => {
    if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(y => y - 1); }
    else setCurrentMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(y => y + 1); }
    else setCurrentMonth(m => m + 1);
  };
  const goToToday = () => { setCurrentMonth(today.getMonth()); setCurrentYear(today.getFullYear()); };

  const daysInMonth  = getDaysInMonth(currentYear, currentMonth);
  const firstDayOfMonth = getFirstDayOfMonth(currentYear, currentMonth);

  const getEventsForDay = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.filter(e => e.date === dateStr && (filterType === 'all' || e.type === filterType));
  };

  const isToday = (day: number) => {
    return day === today.getDate() && currentMonth === today.getMonth() && currentYear === today.getFullYear();
  };

  const selectedEvents = selectedDate
    ? events.filter(e => e.date === selectedDate && (filterType === 'all' || e.type === filterType))
    : null;

  const upcomingEvents = events
    .filter(e => {
      const d = new Date(e.date);
      return d >= today && (filterType === 'all' || e.type === filterType);
    })
    .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
    .slice(0, 8);

  const formatSelectedDate = (dateStr: string) => {
    const d = new Date(dateStr + 'T00:00:00');
    return d.toLocaleDateString('es-ES', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Calendario de Operaciones</h2>
          <p className="text-slate-500 mt-1">Visualiza hitos de proyectos y fechas de cobro programadas.</p>
        </div>
        <div className="flex items-center gap-2 p-1 bg-slate-900 rounded-xl">
          {([['all', 'Todos'], ['project', 'Proyectos'], ['payment', 'Pagos'], ['contract', 'Contratos']] as const).map(([val, label]) => (
            <button
              key={val}
              onClick={() => setFilterType(val)}
              className={`px-3 py-1.5 text-xs font-bold rounded-lg transition-all cursor-pointer ${
                filterType === val ? 'bg-slate-700 text-white shadow-sm' : 'text-slate-500 hover:text-slate-300'
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Calendar Grid */}
        <div className="xl:col-span-2 bg-navy-card border border-slate-800 rounded-2xl overflow-hidden">
          {/* Calendar Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
            <button
              onClick={prevMonth}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Mes anterior"
            >
              <span className="material-symbols-outlined text-lg">chevron_left</span>
            </button>
            <div className="flex items-center gap-3">
              <h3 className="text-lg font-bold text-white">{MONTHS[currentMonth]} {currentYear}</h3>
              <button
                onClick={goToToday}
                className="text-xs px-3 py-1 bg-primary/10 text-primary border border-primary/20 rounded-lg font-semibold hover:bg-primary/20 transition-colors cursor-pointer"
              >
                Hoy
              </button>
            </div>
            <button
              onClick={nextMonth}
              className="p-2 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition-colors cursor-pointer"
              aria-label="Mes siguiente"
            >
              <span className="material-symbols-outlined text-lg">chevron_right</span>
            </button>
          </div>

          {/* Weekday headers */}
          <div className="grid grid-cols-7 border-b border-slate-800">
            {WEEKDAYS.map((d) => (
              <div key={d} className="py-3 text-center text-[11px] font-black text-slate-500 uppercase tracking-wider">
                {d}
              </div>
            ))}
          </div>

          {/* Day cells */}
          <div className="grid grid-cols-7">
            {/* Empty cells before first day */}
            {Array.from({ length: firstDayOfMonth }).map((_, i) => (
              <div key={`empty-${i}`} className="min-h-[88px] border-b border-r border-slate-800/50 bg-slate-900/20" />
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsForDay(day);
              const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
              const isSelected = selectedDate === dateStr;

              return (
                <motion.div
                  key={day}
                  whileHover={{ backgroundColor: 'rgba(255,255,255,0.03)' }}
                  onClick={() => setSelectedDate(isSelected ? null : dateStr)}
                  className={`min-h-[88px] border-b border-r border-slate-800/50 p-1.5 cursor-pointer transition-colors ${
                    isSelected ? 'bg-primary/5 border-primary/20' : ''
                  }`}
                >
                  <div className={`w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold mb-1 ${
                    isToday(day) ? 'bg-primary text-white' : 'text-slate-400'
                  }`}>
                    {day}
                  </div>
                  <div className="space-y-0.5">
                    {dayEvents.slice(0, 2).map((ev) => (
                      <div
                        key={ev.id}
                        className={`text-[9px] font-bold px-1.5 py-0.5 rounded border truncate ${TYPE_STYLES[ev.type]}`}
                        title={ev.title}
                      >
                        {ev.title}
                      </div>
                    ))}
                    {dayEvents.length > 2 && (
                      <div className="text-[9px] text-slate-500 font-semibold pl-1">
                        +{dayEvents.length - 2} más
                      </div>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Sidebar: selected day + upcoming events */}
        <div className="space-y-4">
          {/* Selected Day Detail */}
          {selectedDate && selectedEvents && (
            <motion.div
              initial={{ opacity: 0, y: -8 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-navy-card border border-primary/20 rounded-2xl overflow-hidden"
            >
              <div className="px-4 py-3 border-b border-slate-800 bg-primary/5">
                <p className="text-xs font-black text-primary uppercase tracking-widest">Eventos seleccionados</p>
                <p className="text-sm font-semibold text-white mt-0.5 capitalize">{formatSelectedDate(selectedDate)}</p>
              </div>
              {selectedEvents.length === 0 ? (
                <div className="py-8 text-center">
                  <span className="material-symbols-outlined text-3xl text-slate-700">event_busy</span>
                  <p className="text-slate-500 text-sm mt-2">Sin eventos este día</p>
                </div>
              ) : (
                <div className="divide-y divide-slate-800">
                  {selectedEvents.map((ev) => (
                    <div key={ev.id} className="flex items-start gap-3 px-4 py-3">
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${TYPE_STYLES[ev.type]}`}>
                        <span className="material-symbols-outlined text-sm">{TYPE_ICONS[ev.type]}</span>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">{ev.title}</p>
                        <p className="text-xs text-slate-500">{ev.extra} · {ev.status}</p>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* Upcoming Events */}
          <div className="bg-navy-card border border-slate-800 rounded-2xl overflow-hidden">
            <div className="px-4 py-3 border-b border-slate-800">
              <p className="text-xs font-black text-slate-500 uppercase tracking-widest">Próximos eventos</p>
            </div>
            {upcomingEvents.length === 0 ? (
              <div className="py-8 text-center">
                <span className="material-symbols-outlined text-3xl text-slate-700">event_available</span>
                <p className="text-slate-500 text-sm mt-2">Sin eventos próximos</p>
              </div>
            ) : (
              <div className="divide-y divide-slate-800 max-h-[420px] overflow-y-auto">
                {upcomingEvents.map((ev) => {
                  const d = new Date(ev.date + 'T00:00:00');
                  const diff = Math.ceil((d.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                  return (
                    <div
                      key={ev.id}
                      className="flex items-center gap-3 px-4 py-3 hover:bg-slate-800/30 cursor-pointer transition-colors"
                      onClick={() => setSelectedDate(ev.date)}
                    >
                      <div className={`p-1.5 rounded-lg flex-shrink-0 ${TYPE_STYLES[ev.type]}`}>
                        <span className="material-symbols-outlined text-sm">{TYPE_ICONS[ev.type]}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-semibold text-white truncate">{ev.title}</p>
                        <p className="text-xs text-slate-500">{ev.extra}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="text-xs font-bold text-slate-400">{d.toLocaleDateString('es-ES', { day: '2-digit', month: 'short' })}</p>
                        <p className={`text-[10px] font-semibold ${diff <= 3 ? 'text-red-400' : diff <= 7 ? 'text-amber-400' : 'text-slate-600'}`}>
                          {diff === 0 ? 'Hoy' : diff === 1 ? 'Mañana' : `en ${diff}d`}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>

          {/* Legend */}
          <div className="bg-navy-card border border-slate-800 rounded-2xl px-4 py-3">
            <p className="text-[10px] font-black text-slate-600 uppercase tracking-widest mb-2">Leyenda</p>
            <div className="space-y-1.5">
              {[['project', 'Proyectos'], ['payment', 'Pagos'], ['contract', 'Contratos']].map(([type, label]) => (
                <div key={type} className="flex items-center gap-2">
                  <span className={`inline-block w-3 h-3 rounded border ${TYPE_STYLES[type]}`}></span>
                  <span className="text-xs text-slate-400">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
