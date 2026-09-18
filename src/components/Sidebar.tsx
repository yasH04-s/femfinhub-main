import React from 'react';
import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  Sparkles,
  Landmark,
  Lock,
  GraduationCap, 
  DollarSign, 
  LineChart, 
  Users, 
  AlarmClock, 
  MessageSquare, 
  LifeBuoy,
  Settings,
  X 
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile';

interface SidebarProps {
  sidebarOpen: boolean;
  setSidebarOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const Sidebar: React.FC<SidebarProps> = ({ sidebarOpen, setSidebarOpen }) => {
  const isMobile = useIsMobile();

  const navItems = [
    { name: 'Dashboard', icon: <LayoutDashboard className="h-5 w-5" />, path: '/dashboard' },
    { name: 'AI Credit Score', icon: <Sparkles className="h-5 w-5 text-emerald-500" />, path: '/credit-evaluation' },
    { name: 'Funding & Schemes', icon: <Landmark className="h-5 w-5 text-teal-500" />, path: '/funding' },
    { name: 'Loan Transparency', icon: <Lock className="h-5 w-5 text-purple-500" />, path: '/loan-transparency' },
    { name: 'Learning & Mentors', icon: <GraduationCap className="h-5 w-5" />, path: '/learning' },
    { name: 'Community Forums', icon: <Users className="h-5 w-5" />, path: '/community' },
    { name: 'WhatsApp & AI Bot', icon: <MessageSquare className="h-5 w-5 text-green-600" />, path: '/chatbot' },
    { name: 'Expenses & Cashflow', icon: <DollarSign className="h-5 w-5" />, path: '/expenses' },
    { name: 'Investments', icon: <LineChart className="h-5 w-5" />, path: '/investments' },
    { name: 'Emergency Support', icon: <AlarmClock className="h-5 w-5 text-red-500" />, path: '/emergency' },
    { name: 'Help & FAQ', icon: <LifeBuoy className="h-5 w-5" />, path: '/help' },
    { name: 'Settings', icon: <Settings className="h-5 w-5" />, path: '/settings' },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isMobile && sidebarOpen && (
        <div 
          className="fixed inset-0 z-40 bg-background/80 backdrop-blur-sm"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col bg-sidebar border-r transition-transform duration-300 ease-in-out",
          isMobile && !sidebarOpen && "-translate-x-full",
          isMobile && sidebarOpen && "translate-x-0",
          !isMobile && !sidebarOpen && "-translate-x-full md:translate-x-0 md:w-16",
          !isMobile && sidebarOpen && "md:w-64"
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 border-b">
          <NavLink to="/" className="flex items-center gap-2">
            <span className={cn(
              "font-extrabold text-xl bg-clip-text text-transparent bg-gradient-to-r from-emerald-600 to-teal-500",
              !sidebarOpen && !isMobile && "hidden md:block md:w-16 md:overflow-hidden"
            )}>
              {sidebarOpen || isMobile ? "FemFinHub" : "FFH"}
            </span>
          </NavLink>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={() => setSidebarOpen(false)}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>
        
        <ScrollArea className="flex-1 px-3 py-4">
          <nav className="flex flex-col gap-1">
            {navItems.map((item) => (
              <NavLink
                key={item.name}
                to={item.path}
                className={({ isActive }) => cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2 transition-all text-sm font-medium",
                  isActive 
                    ? "bg-emerald-600 text-white font-bold shadow-md shadow-emerald-600/20" 
                    : "text-muted-foreground hover:bg-emerald-50 dark:hover:bg-emerald-950/40 hover:text-emerald-700 dark:hover:text-emerald-300",
                  !sidebarOpen && !isMobile && "justify-center md:px-2"
                )}
                onClick={isMobile ? () => setSidebarOpen(false) : undefined}
              >
                {item.icon}
                <span className={cn(
                  !sidebarOpen && !isMobile && "hidden"
                )}>
                  {item.name}
                </span>
              </NavLink>
            ))}
          </nav>
        </ScrollArea>
      </aside>
    </>
  );
};

export default Sidebar;
