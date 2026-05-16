import { NavLink, Outlet } from 'react-router-dom';

const navItems = [
  { to: '/pillars', label: 'Our Pillars' },
  { to: '/thesis', label: 'Vertical AGI Thesis' },
  { to: '/what-we-look-for', label: 'What We Look For' },
];

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col" style={{ backgroundColor: '#0a2828', color: '#f0ede6' }}>
      <header className="w-full border-b border-white/10 px-8 py-5 flex items-center justify-between">
        <NavLink to="/" className="text-sm font-bold tracking-widest uppercase text-white/90 hover:text-white transition-colors">
          Linea Ventures
        </NavLink>
        <nav className="flex gap-8">
          {navItems.map(({ to, label }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                `text-sm font-medium transition-colors pb-0.5 border-b ${
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
