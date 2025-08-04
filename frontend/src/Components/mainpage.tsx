
import * as React from "react";
import { Trophy, Users, FolderOpen, Code2, Star, Terminal, Menu } from "lucide-react";

// Define type for icons
import { LucideIcon } from "lucide-react";

interface MenuItem {
  title: string;
  id: string;
  icon: LucideIcon;
}

// Menu items for COC Admin
const menuItems: MenuItem[] = [
  {
    title: "Achievements",
    id: "achievements",
    icon: Trophy,
  },
  {
    title: "Members",
    id: "members",
    icon: Users,
  },
  {
    title: "Projects",
    id: "projects",
    icon: FolderOpen,
  },
  {
    title: "DSA Questions",
    id: "dsa-questions",
    icon: Code2,
  },
];

export default function FrontPage(): JSX.Element {
  const [activeSection, setActiveSection] = React.useState<string>("dashboard");
  const [sidebarOpen, setSidebarOpen] = React.useState<boolean>(true);

  const renderContent = (): JSX.Element | null => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="flex flex-1 flex-col gap-8 p-8">
            {/* Page Header */}
            <div
              className="rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95))",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center gap-6 mb-6">
                <div
                  className="w-16 h-16 rounded-2xl flex items-center justify-center relative"
                  style={{
                    background: "linear-gradient(135deg, #10b981, #059669)",
                    boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                  }}
                >
                  <Terminal className="h-8 w-8 text-white" />
                </div>
                <div>
                  <h1
                    className="text-5xl font-bold text-white mb-2"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #e5e7eb)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    COC Admin Dashboard
                  </h1>
                  <p className="text-gray-400 text-lg">Manage your coding community with modern tools</p>
                </div>
              </div>
            </div>

            {/* Stats Cards */}
            <div className="grid auto-rows-min gap-6 md:grid-cols-2 lg:grid-cols-4">
              {["Total Members", "Active Projects", "DSA Questions", "Achievements"].map((title, index) => {
                const icons = [Users, FolderOpen, Code2, Trophy];
                const colors = [
                  "linear-gradient(135deg, #3b82f6, #2563eb)",
                  "linear-gradient(135deg, #10b981, #059669)",
                  "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                  "linear-gradient(135deg, #f59e0b, #d97706)",
                ];
                const Icon = icons[index];
                return (
                  <div
                    key={index}
                    className="rounded-2xl p-6 backdrop-blur-sm hover:scale-105 transition-all duration-300"
                    style={{
                      background: "linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9))",
                      boxShadow: "0 10px 30px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      border: "1px solid rgba(255, 255, 255, 0.1)",
                    }}
                  >
                    <div className="flex flex-row items-center justify-between space-y-0 pb-3">
                      <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider">{title}</h3>
                      <div
                        className="p-2 rounded-lg"
                        style={{
                          background: colors[index],
                          boxShadow: `0 4px 12px ${colors[index].replace("linear-gradient(135deg,", "").replace(")", "")}`,
                        }}
                      >
                        <Icon className="h-4 w-4 text-white" />
                      </div>
                    </div>
                    <div>
                      <div className="text-3xl font-bold text-white mb-1">--</div>
                      <p className="text-xs text-gray-500">Loading from backend...</p>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Quick Actions */}
            <div
              className="rounded-3xl p-8 backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9))",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="mb-8">
                <h2 className="text-2xl font-bold text-white mb-2">Quick Actions</h2>
                <p className="text-gray-400">Manage your community efficiently</p>
              </div>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                {menuItems.map((item, index) => {
                  const colors = [
                    "linear-gradient(135deg, #3b82f6, #2563eb)",
                    "linear-gradient(135deg, #10b981, #059669)",
                    "linear-gradient(135deg, #8b5cf6, #7c3aed)",
                    "linear-gradient(135deg, #f59e0b, #d97706)",
                  ];
                  return (
                    <button
                      key={item.id}
                      onClick={() => setActiveSection(item.id)}
                      className="p-6 rounded-2xl transition-all duration-300 text-white font-medium hover:scale-105 hover:-translate-y-1 group"
                      style={{
                        background: colors[index],
                        boxShadow: "0 10px 25px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                      }}
                    >
                      <div className="flex flex-col items-center gap-3">
                        <item.icon className="h-8 w-8 group-hover:scale-110 transition-transform" />
                        <span className="text-sm font-semibold">{item.title}</span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
        );

      case "achievements":
      case "members":
      case "projects":
      case "dsa-questions":
        const currentItem = menuItems.find((item) => item.id === activeSection);
        return (
          <div className="flex flex-1 flex-col gap-8 p-8">
            <div
              className="rounded-3xl p-8 relative overflow-hidden backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(30, 30, 30, 0.9), rgba(20, 20, 20, 0.95))",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center gap-6 mb-6">
                {currentItem && (
                  <div
                    className="w-16 h-16 rounded-2xl flex items-center justify-center"
                    style={{
                      background: "linear-gradient(135deg, #10b981, #059669)",
                      boxShadow: "0 10px 20px rgba(16, 185, 129, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)",
                    }}
                  >
                    <currentItem.icon className="h-8 w-8 text-white" />
                  </div>
                )}
                <div>
                  <h1
                    className="text-5xl font-bold text-white mb-2"
                    style={{
                      background: "linear-gradient(135deg, #ffffff, #e5e7eb)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {currentItem?.title} Management
                  </h1>
                  <p className="text-gray-400 text-lg">Manage {currentItem?.title.toLowerCase()} efficiently</p>
                </div>
              </div>
            </div>

            <div
              className="rounded-3xl p-12 backdrop-blur-sm"
              style={{
                background: "linear-gradient(135deg, rgba(30, 30, 30, 0.8), rgba(20, 20, 20, 0.9))",
                boxShadow: "0 20px 40px rgba(0, 0, 0, 0.2), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  {currentItem && (
                    <div
                      className="w-24 h-24 rounded-2xl flex items-center justify-center mx-auto mb-6"
                      style={{
                        background: "linear-gradient(135deg, #374151, #1f2937)",
                        boxShadow: "0 10px 20px rgba(0, 0, 0, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.1)",
                      }}
                    >
                      <currentItem.icon className="h-12 w-12 text-gray-400" />
                    </div>
                  )}
                  <h3 className="text-2xl font-bold text-white mb-3">Coming Soon</h3>
                  <p className="text-gray-400 text-lg">This module is under development</p>
                </div>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div
      className="min-h-screen relative overflow-hidden flex"
      style={{
        background: "linear-gradient(135deg, #0f172a 0%, #1e293b 50%, #0f172a 100%)",
      }}
    >
      {/* Sidebar */}
      <div
        className={`${sidebarOpen ? "w-72" : "w-20"} transition-all duration-300 flex-shrink-0 relative`}
        style={{
          background: "linear-gradient(180deg, rgba(30, 41, 59, 0.9), rgba(15, 23, 42, 0.95))",
          backdropFilter: "blur(20px)",
          borderRight: "1px solid rgba(255, 255, 255, 0.1)",
        }}
      >
        <div className="p-6">
          <div
            className="flex items-center gap-4 p-4 rounded-2xl relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(5, 150, 105, 0.1))",
              border: "1px solid rgba(16, 185, 129, 0.2)",
              backdropFilter: "blur(10px)",
            }}
          >
            <div
              className="flex h-12 w-12 items-center justify-center rounded-xl"
              style={{
                background: "linear-gradient(135deg, #10b981, #059669)",
                boxShadow: "0 8px 16px rgba(16, 185, 129, 0.3)",
              }}
            >
              <Terminal className="h-6 w-6 text-white" />
            </div>
            {sidebarOpen && (
              <div className="flex flex-col">
                <span className="text-lg font-bold text-white">COC Admin</span>
                <span className="text-sm text-gray-400">Management Panel</span>
              </div>
            )}
          </div>
        </div>

        <div className="px-4">
          <div className="space-y-2">
            <button
              onClick={() => setActiveSection("dashboard")}
              className={`w-full h-14 rounded-xl transition-all duration-300 text-white hover:scale-105 flex items-center ${
                sidebarOpen ? "px-4" : "justify-center"
              } ${
                activeSection === "dashboard"
                  ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25"
                  : "hover:bg-white/5"
              }`}
              style={{
                backdropFilter: "blur(10px)",
                border:
                  activeSection === "dashboard"
                    ? "1px solid rgba(16, 185, 129, 0.3)"
                    : "1px solid rgba(255, 255, 255, 0.1)",
              }}
            >
              <Star className="h-5 w-5" />
              {sidebarOpen && <span className="ml-3 font-medium">Dashboard</span>}
            </button>

            {menuItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveSection(item.id)}
                className={`w-full h-14 rounded-xl transition-all duration-300 text-white hover:scale-105 flex items-center ${
                  sidebarOpen ? "px-4" : "justify-center"
                } ${
                  activeSection === item.id
                    ? "bg-gradient-to-r from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25"
                    : "hover:bg-white/5"
                }`}
                style={{
                  backdropFilter: "blur(10px)",
                  border:
                    activeSection === item.id
                      ? "1px solid rgba(16, 185, 129, 0.3)"
                      : "1px solid rgba(255, 255, 255, 0.1)",
                }}
              >
                <item.icon className="h-5 w-5" />
                {sidebarOpen && <span className="ml-3 font-medium">{item.title}</span>}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <header
          className="flex h-20 shrink-0 items-center gap-4 px-8 backdrop-blur-sm"
          style={{
            background: "rgba(30, 41, 59, 0.8)",
            borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
          }}
        >
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="rounded-xl text-white hover:bg-white/10 transition-all duration-300 p-3"
            style={{
              backdropFilter: "blur(10px)",
              border: "1px solid rgba(255, 255, 255, 0.1)",
            }}
          >
            <Menu className="h-5 w-5" />
          </button>
          <div className="flex items-center gap-3">
            <span className="text-white font-semibold text-lg">COC Admin</span>
            <span className="text-gray-400">/</span>
            <span className="text-gray-300 capitalize">
              {activeSection === "dsa-questions" ? "DSA Questions" : activeSection}
            </span>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  );
}
