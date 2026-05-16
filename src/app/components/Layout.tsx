import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/pillars', label: 'Our Principles' },
  { to: '/thesis', label: 'Vertical AGI Thesis' },
  { to: '/what-we-look-for', label: 'What We Look For' },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a2828', color: '#f0ede6' }}>
      <header className="w-full border-b border-white/10 px-6 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
        <NavLink to="/" className="text-sm font-bold tracking-widest uppercase text-white/90 hover:text-white transition-colors shrink-0">
          Linea Ventures
        </NavLink>
        <nav className="flex gap-5 sm:gap-8 overflow-x-auto pb-0.5 sm:pb-0 scrollbar-none">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-xs sm:text-sm font-medium transition-colors pb-0.5 border-b whitespace-nowrap ${
                  isActive
                    ? 'text-white border-white/60'
                    : 'text-white/50 border-transparent hover:text-white/80 hover:border-white/30'
                }`
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
}
