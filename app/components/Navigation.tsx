'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { MessageCircle, BookOpen, Trophy, Users, User, Home, FileText } from 'lucide-react';

export default function Navigation() {
  const pathname = usePathname();

  const navItems = [
    { href: '/', label: 'Home', icon: Home },
    { href: '/chatbot', label: 'AI Chat', icon: MessageCircle },
    { href: '/courses', label: 'Courses', icon: BookOpen },
    { href: '/tools/readiness', label: 'Tools', icon: Trophy },
    { href: '/tools/technical', label: 'Technical', icon: FileText },
    { href: '/profile', label: 'Profile', icon: Trophy },
    { href: '/messaging', label: 'Messages', icon: MessageCircle },
    { href: '/advisors', label: 'Advisors', icon: Users },
  ];

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-gray-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:border-gray-800 dark:bg-gray-950/95">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center space-x-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg text-white font-bold" style={{ background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' }}>
              FZ
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent" style={{ backgroundImage: 'linear-gradient(to right, #A0CEFD, #E4F2FF)' }}>
              Fizzy
            </span>
          </Link>
          
          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex items-center space-x-1 px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                    isActive
                      ? 'text-white dark:text-[#E4F2FF]'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200'
                  }`}
                  {...(isActive && { style: { backgroundColor: '#A0CEFD' } })}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center space-x-4">
            <Link
              href="/profile"
              className="flex items-center justify-center h-10 w-10 rounded-full text-white hover:opacity-90 transition-opacity"
              style={{ background: 'linear-gradient(to bottom right, #A0CEFD, #E4F2FF)' }}
            >
              <User className="h-5 w-5" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}

