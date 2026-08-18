import React, { useState } from "react";
import { TrackedApp, Platform } from "../types";
import { Search, Plus, Lightbulb, Loader2, Smartphone, Laptop, Glasses } from "lucide-react";

interface AddAppModalProps {
  onClose: () => void;
  onAddApp: (app: TrackedApp) => void;
  country: string;
}

export const AddAppModal: React.FC<AddAppModalProps> = ({
  onClose,
  onAddApp,
  country,
}) => {
  const [activeTab, setActiveTab] = useState<"search" | "idea">("search");

  // Search state
  const [searchQuery, setSearchQuery] = useState("");
  const [searching, setSearching] = useState(false);
  const [searchResults, setSearchResults] = useState<any[]>([]);

  // Idea state
  const [ideaName, setIdeaName] = useState("");
  const [ideaCategory, setIdeaCategory] = useState("Productivity");
  const [ideaPlatform, setIdeaPlatform] = useState<Platform>("iOS");
  const [ideaKeywords, setIdeaKeywords] = useState("");

  const handleSearchSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!searchQuery.trim()) return;

    setSearching(true);
    try {
      const response = await fetch(
        `/api/appstore/search?term=${encodeURIComponent(searchQuery)}&country=${country}&limit=8`
      );
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data.results || []);
      }
    } catch (err) {
      console.error("App Store Search error:", err);
    } finally {
      setSearching(false);
    }
  };

  const handleSelectSearchResult = (item: any) => {
    const newApp: TrackedApp = {
      id: `app-${item.trackId}`,
      trackId: item.trackId,
      name: item.trackName,
      developer: item.artistName,
      category: item.primaryGenreName || item.genres?.[0] || "Productivity",
      iconUrl: item.artworkUrl512 || item.artworkUrl100,
      bundleId: item.bundleId || `com.${item.artistName.toLowerCase().replace(/\s+/g, "")}.${item.trackId}`,
      platform: "iOS",
      country: country,
      isTemporary: false,
      averageUserRating: item.averageUserRating || 4.6,
      userRatingCount: item.userRatingCount || 1200,
      metadata: {
        title: item.trackName.slice(0, 30),
        subtitle: (item.genres?.[0] ? `${item.genres[0]} App` : "iOS App").slice(0, 30),
        keywordField: item.trackName.toLowerCase().split(" ").join(",").slice(0, 100),
      },
      competitors: [],
      keywords: [
        {
          id: `kw-${Date.now()}-1`,
          keyword: item.trackName.toLowerCase().split(" ")[0] || "app",
          currentRank: 1,
          previousRank: 1,
          popularity: 82,
          difficulty: 45,
          estimatedInstalls: 420,
          tags: ["Core"],
          lastUpdated: "Just now",
          history: [{ date: "Today", rank: 1 }],
        },
      ],
    };

    onAddApp(newApp);
    onClose();
  };

  const handleCreateIdeaSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!ideaName.trim()) return;

    const kwList = ideaKeywords
      .split("\n")
      .map((k) => k.trim())
      .filter((k) => k.length > 0);

    const newIdeaApp: TrackedApp = {
      id: `idea-${Date.now()}`,
      name: ideaName,
      developer: "Pre-Launch Developer",
      category: ideaCategory,
      iconUrl: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=180&auto=format&fit=crop&q=80",
      bundleId: `com.idea.${ideaName.toLowerCase().replace(/[^a-z0-9]/g, "")}`,
      platform: ideaPlatform,
      country: country,
      isTemporary: true,
      averageUserRating: 0,
      userRatingCount: 0,
      metadata: {
        title: ideaName.slice(0, 30),
        subtitle: `${ideaCategory} Application`.slice(0, 30),
        keywordField: kwList.join(",").slice(0, 100),
      },
      competitors: [],
      keywords: kwList.map((kw, idx) => ({
        id: `kw-idea-${idx}`,
        keyword: kw,
        currentRank: null,
        previousRank: null,
        popularity: 65,
        difficulty: 30,
        estimatedInstalls: 150,
        tags: ["Pre-Launch"],
        lastUpdated: "Just now",
        history: [],
      })),
    };

    onAddApp(newIdeaApp);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-zinc-900 border border-zinc-800 rounded-2xl w-full max-w-lg p-6 space-y-5 shadow-2xl">
        <div className="flex items-center justify-between border-b border-zinc-800 pb-3">
          <div className="flex items-center space-x-2">
            <Plus className="w-4 h-4 text-indigo-400" />
            <h3 className="text-base font-bold text-white">Track New Application</h3>
          </div>
          <button onClick={onClose} className="text-zinc-400 hover:text-white text-xs font-semibold cursor-pointer">
            ✕
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="flex items-center bg-zinc-950 border border-zinc-800 p-1 rounded-xl text-xs font-semibold">
          <button
            onClick={() => setActiveTab("search")}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === "search" ? "bg-indigo-600 text-white shadow-md" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Search className="w-3.5 h-3.5" />
            <span>Search App Store</span>
          </button>
          <button
            onClick={() => setActiveTab("idea")}
            className={`flex-1 py-2 rounded-lg transition-colors flex items-center justify-center space-x-1.5 cursor-pointer ${
              activeTab === "idea" ? "bg-amber-500 text-black shadow-md font-bold" : "text-zinc-400 hover:text-white"
            }`}
          >
            <Lightbulb className="w-3.5 h-3.5" />
            <span>Pre-Launch Idea</span>
          </button>
        </div>

        {/* Tab 1: Search App Store */}
        {activeTab === "search" && (
          <div className="space-y-4">
            <form onSubmit={handleSearchSubmit} className="flex items-center space-x-2">
              <input
                type="text"
                placeholder="Type app name (e.g. Fantastical, Notion, Flighty)..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-zinc-950 border border-zinc-800 rounded-xl px-3.5 py-2.5 text-xs text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
              />
              <button
                type="submit"
                disabled={searching}
                className="bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-colors shrink-0"
              >
                {searching ? <Loader2 className="w-4 h-4 animate-spin" /> : "Search"}
              </button>
            </form>

            <div className="space-y-2 max-h-64 overflow-y-auto">
              {searchResults.map((item) => (
                <div
                  key={item.trackId}
                  onClick={() => handleSelectSearchResult(item)}
                  className="flex items-center justify-between p-3 bg-zinc-950 hover:bg-zinc-800/80 border border-zinc-800 rounded-xl cursor-pointer transition-colors"
                >
                  <div className="flex items-center space-x-3 min-w-0">
                    <img
                      src={item.artworkUrl100}
                      alt={item.trackName}
                      className="w-10 h-10 rounded-xl object-cover border border-zinc-700"
                    />
                    <div className="min-w-0">
                      <p className="font-bold text-white text-xs truncate">{item.trackName}</p>
                      <p className="text-[10px] text-zinc-400 truncate">{item.artistName} • {item.primaryGenreName}</p>
                    </div>
                  </div>
                  <button className="text-[11px] bg-indigo-600 hover:bg-indigo-500 text-white font-semibold px-3 py-1.5 rounded-lg shrink-0">
                    Track App
                  </button>
                </div>
              ))}

              {searchResults.length === 0 && !searching && (
                <p className="text-center text-xs text-zinc-500 py-6">
                  Search above to import any published app directly from Apple App Store.
                </p>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: Idea App */}
        {activeTab === "idea" && (
          <form onSubmit={handleCreateIdeaSubmit} className="space-y-4 text-xs">
            <div>
              <label className="block text-zinc-300 font-semibold mb-1">App Idea Name</label>
              <input
                type="text"
                required
                value={ideaName}
                onChange={(e) => setIdeaName(e.target.value)}
                placeholder="e.g. Vision Log - Spatial Journal"
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-white focus:outline-none focus:border-amber-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Category</label>
                <select
                  value={ideaCategory}
                  onChange={(e) => setIdeaCategory(e.target.value)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-white focus:outline-none"
                >
                  <option value="Productivity">Productivity</option>
                  <option value="Lifestyle">Lifestyle</option>
                  <option value="Health & Fitness">Health & Fitness</option>
                  <option value="Utilities">Utilities</option>
                  <option value="Finance">Finance</option>
                </select>
              </div>

              <div>
                <label className="block text-zinc-300 font-semibold mb-1">Target Platform</label>
                <select
                  value={ideaPlatform}
                  onChange={(e) => setIdeaPlatform(e.target.value as Platform)}
                  className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-white focus:outline-none"
                >
                  <option value="iOS">iOS</option>
                  <option value="iPadOS">iPadOS</option>
                  <option value="macOS">macOS</option>
                  <option value="visionOS">visionOS</option>
                  <option value="watchOS">watchOS</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-zinc-300 font-semibold mb-1">Seed Keywords (one per line)</label>
              <textarea
                rows={3}
                value={ideaKeywords}
                onChange={(e) => setIdeaKeywords(e.target.value)}
                placeholder={`spatial journal\n3d audio diary\nvisionos notes`}
                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl p-2.5 text-white focus:outline-none font-mono"
              />
            </div>

            <div className="flex items-center justify-end space-x-2 pt-2">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 rounded-xl text-zinc-400 hover:text-white"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-black font-bold rounded-xl shadow-lg shadow-amber-500/20"
              >
                Create Idea App
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};
