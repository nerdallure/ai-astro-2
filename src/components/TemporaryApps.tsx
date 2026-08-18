import React from "react";
import { TrackedApp } from "../types";
import { Lightbulb, Plus, Glasses, Laptop, Smartphone, Sparkles, TrendingUp } from "lucide-react";

interface TemporaryAppsProps {
  apps: TrackedApp[];
  onSelectApp: (app: TrackedApp) => void;
  onOpenAddApp: () => void;
}

export const TemporaryApps: React.FC<TemporaryAppsProps> = ({
  apps,
  onSelectApp,
  onOpenAddApp,
}) => {
  const temporaryApps = apps.filter((a) => a.isTemporary);

  return (
    <div className="p-4 sm:p-6 space-y-6">
      {/* Top Banner */}
      <div className="bg-gradient-to-r from-orange-950/40 via-zinc-900 to-amber-950/40 border border-zinc-800 rounded-2xl p-6 shadow-xl">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center space-x-2 text-orange-400 font-semibold text-xs mb-1">
              <Lightbulb className="w-4 h-4 text-orange-400" />
              <span>Pre-Launch Market Validation & Idea Keyword Sandbox</span>
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">
              Temporary Apps & Market Ideation
            </h1>
            <p className="text-xs text-zinc-400 mt-1 max-w-xl">
              Conduct market research and evaluate search volume for unreleased app ideas before writing a single line of code.
            </p>
          </div>

          <button
            onClick={onOpenAddApp}
            className="shrink-0 bg-orange-500 hover:bg-orange-400 text-black text-xs font-bold px-4 py-2.5 rounded-xl shadow-lg shadow-orange-500/20 transition-all flex items-center space-x-2 cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Create Temporary Idea App</span>
          </button>
        </div>
      </div>

      {/* Ideas Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {temporaryApps.map((app) => (
          <div
            key={app.id}
            onClick={() => onSelectApp(app)}
            className="bg-zinc-900/80 border border-zinc-800/90 hover:border-orange-500/50 rounded-2xl p-5 space-y-4 shadow-xl cursor-pointer transition-all group"
          >
            <div className="flex items-center justify-between">
              <span className="text-[9px] bg-orange-500/10 text-orange-400 border border-orange-500/20 px-2 py-0.5 rounded-full font-mono font-bold">
                Idea Sandbox
              </span>
              <span className="text-xs text-zinc-400 font-mono">{app.platform}</span>
            </div>

            <div className="flex items-center space-x-3">
              <img
                src={app.iconUrl}
                alt={app.name}
                className="w-12 h-12 rounded-xl object-cover border border-zinc-700 group-hover:scale-105 transition-transform"
              />
              <div className="min-w-0">
                <h3 className="font-bold text-white text-sm truncate">{app.name}</h3>
                <p className="text-[11px] text-zinc-400 truncate">{app.category}</p>
              </div>
            </div>

            <div className="bg-zinc-950 p-3 rounded-xl border border-zinc-800 space-y-1 text-xs">
              <p className="text-[10px] text-zinc-400 uppercase font-semibold">Planned Title:</p>
              <p className="font-mono text-zinc-200">{app.metadata.title}</p>
            </div>

            <div className="flex items-center justify-between text-xs pt-1 border-t border-zinc-800 text-zinc-400">
              <span>{app.keywords.length} Seed Keywords</span>
              <span className="text-orange-400 font-semibold group-hover:translate-x-0.5 transition-transform">
                Open Workspace →
              </span>
            </div>
          </div>
        ))}

        {temporaryApps.length === 0 && (
          <div className="bg-zinc-900/60 border border-dashed border-zinc-800 rounded-2xl p-8 text-center text-zinc-400 space-y-3 col-span-3">
            <Lightbulb className="w-8 h-8 text-orange-400 mx-auto" />
            <p className="text-xs">No pre-launch temporary apps created yet.</p>
            <button
              onClick={onOpenAddApp}
              className="bg-orange-500 text-black font-bold text-xs px-4 py-2 rounded-xl transition-colors"
            >
              + Create Pre-Launch App Idea
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
