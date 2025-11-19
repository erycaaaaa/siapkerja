import { User, Home, ClipboardCheck, BookOpen, Map, UserCircle } from 'lucide-react';

export function Header() {
  return (
    <header className="sticky top-0 z-50 bg-white shadow-[0_4px_12px_rgba(0,0,0,0.06)]">
      <div className="max-w-[1400px] mx-auto px-6">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-linear-to-br from-[#7091F5] to-[#6CCF8E] rounded-xl flex items-center justify-center">
              <ClipboardCheck className="w-6 h-6 text-white" />
            </div>
            <span className="text-gray-900 tracking-tight" style={{ fontSize: '20px', fontWeight: 700 }}>
              JobReady Hub
            </span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-900 hover:text-[#7091F5] transition-colors flex items-center gap-2">
              <Home className="w-4 h-4" />
              <span>Home</span>
            </a>
            <a href="#" className="text-[#7091F5] hover:text-[#7091F5] transition-colors flex items-center gap-2">
              <ClipboardCheck className="w-4 h-4" />
              <span>Checklist</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-[#7091F5] transition-colors flex items-center gap-2">
              <BookOpen className="w-4 h-4" />
              <span>Edukasi</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-[#7091F5] transition-colors flex items-center gap-2">
              <Map className="w-4 h-4" />
              <span>Roadmap</span>
            </a>
            <a href="#" className="text-gray-600 hover:text-[#7091F5] transition-colors flex items-center gap-2">
              <UserCircle className="w-4 h-4" />
              <span>Profil</span>
            </a>
          </nav>

          {/* User Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-linear-to-br from-[#7091F5] to-[#6CCF8E] flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
