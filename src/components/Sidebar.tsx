import React from "react";
import {
  TrendingUp,
  Search,
  Users,
  Smartphone,
  Sparkles,
  Star,
  Lightbulb,
  Tag,
  Download,
  Upload,
  Bell,
} from "lucide-react";

export type StudioTab =
  | "tracker"
  | "research"
  | "competitors"
  | "simulator"
  | "ai-metadata"
  | "ratings"
  | "temporary"
  | "alerts";

interface SidebarProps {
  activeTab: StudioTab;
  onSelectTab: (tab: StudioTab) => void;
  keywordCount: number;
  competitorCount: number;
  unreadAlertsCount?: number;
  onExportCsv: () => void;
  onImportCsv: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  keywordCount,
  competitorCount,
  unreadAlertsCount = 0,
  onExportCsv,
  onImportCsv,
}) => {
  const navItems: {
    id: StudioTab;
    label: string;
    icon: React.ReactNode;
    badge?: string | number;
    highlight?: boolean;
    badgeColor?: string;
  }[] = [
    {
      id: "tracker",
      label: "Keyword Rank Tracker",
      icon: <TrendingUp className="w-4 h-4 text-emerald-400" />,
      badge: keywordCount,
    },
    {
      id: "alerts",
      label: "Rank Drop Alerts",
      icon: <Bell className="w-4 h-4 text-rose-400" />,
      badge: unreadAlertsCount > 0 ? unreadAlertsCount : undefined,
      badgeColor: "bg-rose-500 text-white font-bold animate-pulse",
    },
    {
      id: "research",
      label: "Keyword Research & ASA",
      icon: <Search className="w-4 h-4 text-blue-400" />,
    },
    {
      id: "competitors",
      label: "Competitors & Metadata",
      icon: <Users className="w-4 h-4 text-purple-400" />,
      badge: competitorCount,
    },
    {
      id: "simulator",
      label: "App Store Search Simulator",
      icon: <Smartphone className="w-4 h-4 text-indigo-400" />,
    },
    {
      id: "ai-metadata",
      label: "AI Metadata Optimizer",
      icon: <Sparkles className="w-4 h-4 text-amber-400" />,
      highlight: true,
    },
    {
      id: "ratings",
      label: "Global Ratings & Reviews",
      icon: <Star className="w-4 h-4 text-amber-300" />,
    },
    {
      id: "temporary",
      label: "Temporary Apps & Ideas",
      icon: <Lightbulb className="w-4 h-4 text-orange-400" />,
    },
  ];

  return (
    <aside className="w-64 bg-zinc-950 border-r border-zinc-800/80 flex flex-col justify-between shrink-0 hidden md:flex min-h-[calc(100vh-53px)]">
      {/* Navigation Group */}
      <div className="p-3 space-y-6">
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Astro ASO Suite
          </p>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => onSelectTab(item.id)}
                  className={`w-full flex items-center justify-between px-3 py-2 rounded-xl text-xs font-medium transition-all cursor-pointer ${
                    isActive
                      ? "bg-zinc-800/90 text-white shadow-sm border border-zinc-700/60 font-semibold"
                      : "text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900"
                  }`}
                >
                  <div className="flex items-center space-x-2.5">
                    {item.icon}
                    <span>{item.label}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    {item.badge !== undefined && (
                      <span
                        className={`text-[10px] font-mono px-1.5 py-0.5 rounded-full ${
                          item.badgeColor
                            ? item.badgeColor
                            : isActive
                            ? "bg-zinc-700 text-zinc-100"
                            : "bg-zinc-900 text-zinc-400 border border-zinc-800"
                        }`}
                      >
                        {item.badge}
                      </span>
                    )}
                    {item.highlight && !item.badge && (
                      <span className="text-[9px] bg-gradient-to-r from-amber-500 to-orange-500 text-black font-bold px-1.5 py-0.5 rounded-md shadow-sm">
                        AI
                      </span>
                    )}
                  </div>
                </button>
              );
            })}
          </nav>
        </div>

        {/* Quick Tools */}
        <div>
          <p className="px-3 text-[10px] font-bold uppercase tracking-wider text-zinc-400 mb-2">
            Keywords Management
          </p>
          <div className="space-y-1.5 px-1">
            <button
              onClick={onExportCsv}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors border border-dashed border-zinc-800 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 text-indigo-400" />
              <span>Export CSV (Notes & Tags)</span>
            </button>
            <button
              onClick={onImportCsv}
              className="w-full flex items-center space-x-2 px-2.5 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-900 transition-colors border border-dashed border-zinc-800 cursor-pointer"
            >
              <Upload className="w-3.5 h-3.5 text-purple-400" />
              <span>Import Keywords CSV</span>
            </button>
          </div>
        </div>
      </div>

      {/* Footer Info Box */}
      <div className="p-3 border-t border-zinc-900 bg-zinc-950/60">
        <div className="bg-zinc-900/80 border border-zinc-800/80 rounded-xl p-3 text-xs space-y-1.5">
          <div className="flex items-center space-x-2 text-indigo-400 font-semibold text-[11px]">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Apple Search Ads Sourced</span>
          </div>
          <p className="text-[11px] text-zinc-400 leading-relaxed">
            Real-time keyword ranks updated daily across 60+ countries.
          </p>
          <div className="pt-1 flex items-center justify-between text-[10px] text-zinc-400 font-mono">
            <span>Sync Status:</span>
            <span className="text-emerald-400 font-medium">● Live & Active</span>
          </div>
        </div>
      </div>
    </aside>
  );
};
