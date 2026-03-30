import { NavLink, Outlet } from 'react-router-dom'
import {
  LayoutDashboard,
  Megaphone,
  Search,
  GitMerge,
} from 'lucide-react'

const navItems = [
  { to: '/kpi', label: 'Main KPI 분석', icon: LayoutDashboard },
  { to: '/marketing', label: '마케팅 성과', icon: Megaphone },
  { to: '/search', label: '검색/유입 추이', icon: Search },
  { to: '/funnel', label: '상담 퍼널', icon: GitMerge },
]

export function Layout() {
  return (
    <div className="flex h-screen bg-[#f8fafb]">
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-60 flex-col bg-white border-r border-gray-200">
        <div className="flex items-center gap-2.5 px-5 h-16">
          <div className="w-8 h-8 rounded-lg bg-primary-500 flex items-center justify-center text-white font-extrabold text-sm">
            M
          </div>
          <span className="text-lg font-bold text-primary-600">Minish View</span>
        </div>
        <nav className="flex-1 px-3 pt-2 space-y-1">
          {navItems.map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              className={({ isActive }) =>
                `flex items-center gap-2.5 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`
              }
            >
              <item.icon size={18} />
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-100 text-xs text-gray-400">
          미니쉬치과병원
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Outlet />
      </main>

      {/* Mobile Bottom Tab Bar */}
      <nav className="lg:hidden fixed bottom-0 inset-x-0 bg-white border-t border-gray-200 flex z-50">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              `flex-1 flex flex-col items-center gap-0.5 py-2 text-[10px] font-medium transition-colors ${
                isActive ? 'text-primary-600' : 'text-gray-400'
              }`
            }
          >
            <item.icon size={20} />
            <span>{item.label}</span>
          </NavLink>
        ))}
      </nav>
    </div>
  )
}
