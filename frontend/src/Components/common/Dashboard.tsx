import * as React from "react"
import { Trophy, Users, FolderOpen, Code2, Star, Terminal, Menu, Zap, Activity } from "lucide-react"

// Menu items for COC Admin
const menuItems = [
  {
    title: "ACHIEVEMENTS",
    id: "achievements",
    icon: Trophy,
  },
  {
    title: "MEMBERS",
    id: "members",
    icon: Users,
  },
  {
    title: "PROJECTS",
    id: "projects",
    icon: FolderOpen,
  },
  {
    title: "DSA QUESTIONS",
    id: "dsa-questions",
    icon: Code2,
  },
]

export default function Dashboard() {
  const [activeSection, setActiveSection] = React.useState("dashboard")
  const [sidebarOpen, setSidebarOpen] = React.useState(true)
  const [statsLoaded, setStatsLoaded] = React.useState(false)

  React.useEffect(() => {
    const timer = setTimeout(() => setStatsLoaded(true), 1000)
    return () => clearTimeout(timer)
  }, [])

  const renderContent = () => {
    switch (activeSection) {
      case "dashboard":
        return (
          <div className="flex flex-1 flex-col gap-8 p-8">
            {/* Page Header */}
            <div className="bg-black border-[6px] border-black p-8 shadow-[12px_12px_0_0_#00FFFF] animate-slide-in">
              <div className="flex items-center gap-6 mb-6">
                <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#00FFFF] animate-pulse-glow">
                  <Terminal className="w-8 h-8 text-black" />
                </div>
                <div>
                  <h1 className="text-5xl font-black text-white mb-2 tracking-tight">COC ADMIN DASHBOARD</h1>
                  <p className="text-cyan-400 text-lg font-bold tracking-wider">MANAGE YOUR CODING COMMUNITY</p>
                </div>
              </div>
              <div className="w-full h-2 bg-cyan-400 border-2 border-black"></div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
              <div className="bg-black border-[4px] border-black p-6 shadow-[8px_8px_0_0_#00FFFF] hover:shadow-[12px_12px_0_0_#FF4081] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 animate-bounce-in min-h-[140px] flex flex-col justify-between group">
                <div className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">TOTAL MEMBERS</h3>
                  <div className="w-8 h-8 bg-cyan-400 border-2 border-black flex items-center justify-center group-hover:bg-pink-400 transition-colors">
                    <Users className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-1 group-hover:text-pink-400 transition-colors">
                    {statsLoaded ? "247" : "--"}
                  </div>
                  <p className="text-xs text-white font-bold">
                    {statsLoaded ? "+12 THIS WEEK" : "LOADING FROM BACKEND..."}
                  </p>
                </div>
              </div>

              <div
                className="bg-black border-[4px] border-black p-6 shadow-[8px_8px_0_0_#00FFFF] hover:shadow-[12px_12px_0_0_#FF4081] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 animate-bounce-in min-h-[140px] flex flex-col justify-between group"
                style={{ animationDelay: "0.1s" }}
              >
                <div className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">ACTIVE PROJECTS</h3>
                  <div className="w-8 h-8 bg-cyan-400 border-2 border-black flex items-center justify-center group-hover:bg-pink-400 transition-colors">
                    <FolderOpen className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-1 group-hover:text-pink-400 transition-colors">
                    {statsLoaded ? "42" : "--"}
                  </div>
                  <p className="text-xs text-white font-bold">
                    {statsLoaded ? "+8 IN PROGRESS" : "LOADING FROM BACKEND..."}
                  </p>
                </div>
              </div>

              <div
                className="bg-black border-[4px] border-black p-6 shadow-[8px_8px_0_0_#00FFFF] hover:shadow-[12px_12px_0_0_#FF4081] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 animate-bounce-in min-h-[140px] flex flex-col justify-between group"
                style={{ animationDelay: "0.2s" }}
              >
                <div className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">DSA QUESTIONS</h3>
                  <div className="w-8 h-8 bg-cyan-400 border-2 border-black flex items-center justify-center group-hover:bg-pink-400 transition-colors">
                    <Code2 className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-1 group-hover:text-pink-400 transition-colors">
                    {statsLoaded ? "1,337" : "--"}
                  </div>
                  <p className="text-xs text-white font-bold">
                    {statsLoaded ? "+89 SOLVED TODAY" : "LOADING FROM BACKEND..."}
                  </p>
                </div>
              </div>

              <div
                className="bg-black border-[4px] border-black p-6 shadow-[8px_8px_0_0_#00FFFF] hover:shadow-[12px_12px_0_0_#FF4081] hover:translate-x-1 hover:translate-y-1 transition-all duration-300 animate-bounce-in min-h-[140px] flex flex-col justify-between group"
                style={{ animationDelay: "0.3s" }}
              >
                <div className="flex flex-row items-center justify-between space-y-0 pb-3">
                  <h3 className="text-sm font-black text-white uppercase tracking-wider">ACHIEVEMENTS</h3>
                  <div className="w-8 h-8 bg-cyan-400 border-2 border-black flex items-center justify-center group-hover:bg-pink-400 transition-colors">
                    <Trophy className="w-4 h-4 text-black" />
                  </div>
                </div>
                <div>
                  <div className="text-4xl font-black text-cyan-400 mb-1 group-hover:text-pink-400 transition-colors">
                    {statsLoaded ? "156" : "--"}
                  </div>
                  <p className="text-xs text-white font-bold">
                    {statsLoaded ? "+23 UNLOCKED" : "LOADING FROM BACKEND..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-black border-[6px] border-black p-8 shadow-[12px_12px_0_0_#FF4081] animate-slide-in">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-pink-400 border-4 border-black flex items-center justify-center animate-pulse-glow">
                    <Activity className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight">LIVE ACTIVITY</h2>
                </div>
                <p className="text-cyan-400 font-bold tracking-wider">REAL-TIME COMMUNITY UPDATES</p>
                <div className="w-full h-1 bg-pink-400 border-2 border-black mt-3"></div>
              </div>
              <div className="space-y-4">
                {[
                  { user: "ALEX_DEV", action: "completed DSA challenge", time: "2 min ago", icon: Code2 },
                  { user: "SARAH_CODE", action: "joined new project", time: "5 min ago", icon: FolderOpen },
                  { user: "MIKE_HACK", action: "earned achievement", time: "8 min ago", icon: Trophy },
                ].map((activity, index) => (
                  <div
                    key={index}
                    className="flex items-center gap-4 p-4 bg-white border-4 border-black hover:bg-cyan-400 transition-colors group"
                  >
                    <div className="w-8 h-8 bg-black border-2 border-black flex items-center justify-center group-hover:bg-pink-400">
                      <activity.icon className="w-4 h-4 text-white group-hover:text-black" />
                    </div>
                    <div className="flex-1">
                      <p className="font-black text-black text-sm">
                        <span className="text-pink-500">{activity.user}</span> {activity.action}
                      </p>
                      <p className="text-xs font-bold text-gray-600">{activity.time}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-black border-[6px] border-black p-8 shadow-[12px_12px_0_0_#00FFFF]">
              <div className="mb-8">
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-12 h-12 bg-cyan-400 border-4 border-black flex items-center justify-center animate-pulse-glow">
                    <Zap className="w-6 h-6 text-black" />
                  </div>
                  <h2 className="text-3xl font-black text-white tracking-tight">QUICK ACTIONS</h2>
                </div>
                <p className="text-cyan-400 font-bold tracking-wider">MANAGE YOUR COMMUNITY EFFICIENTLY</p>
                <div className="w-full h-1 bg-cyan-400 border-2 border-black mt-3"></div>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
                {menuItems.map((item, index) => (
                  <button
                    key={item.id}
                    onClick={() => setActiveSection(item.id)}
                    className="p-6 bg-cyan-400 border-4 border-black font-black text-black hover:bg-pink-400 transition-all duration-300 shadow-[6px_6px_0_0_#000] hover:shadow-[3px_3px_0_0_#000] hover:translate-x-1 hover:translate-y-1 active:translate-x-2 active:translate-y-2 active:shadow-[2px_2px_0_0_#000] group"
                  >
                    <div className="flex flex-col items-center gap-3">
                      <div className="w-8 h-8 bg-black flex items-center justify-center group-hover:bg-white transition-colors">
                        <item.icon className="w-5 h-5 text-white group-hover:text-black" />
                      </div>
                      <span className="text-sm font-black tracking-wider">{item.title}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        )

      case "achievements":
      case "members":
      case "projects":
      case "dsa-questions":
        const currentItem = menuItems.find((item) => item.id === activeSection)
        return (
          <div className="flex flex-1 flex-col gap-8 p-8">
            <div className="bg-black border-[6px] border-black p-8 shadow-[12px_12px_0_0_#00FFFF] animate-slide-in">
              <div className="flex items-center gap-6 mb-6">
                {currentItem && (
                  <div className="w-16 h-16 bg-white border-4 border-black flex items-center justify-center shadow-[4px_4px_0_0_#00FFFF] animate-pulse-glow">
                    <currentItem.icon className="w-8 h-8 text-black" />
                  </div>
                )}
                <div>
                  <h1 className="text-5xl font-black text-white mb-2 tracking-tight">
                    {currentItem?.title} MANAGEMENT
                  </h1>
                  <p className="text-cyan-400 text-lg font-bold tracking-wider">
                    MANAGE {currentItem?.title} EFFICIENTLY
                  </p>
                </div>
              </div>
              <div className="w-full h-2 bg-cyan-400 border-2 border-black"></div>
            </div>

            <div className="bg-black border-[6px] border-black p-12 shadow-[12px_12px_0_0_#00FFFF] animate-bounce-in">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  {currentItem && (
                    <div className="w-24 h-24 bg-white border-4 border-black flex items-center justify-center mx-auto mb-6 shadow-[4px_4px_0_0_#00FFFF] animate-pulse-glow">
                      <currentItem.icon className="w-12 h-12 text-black" />
                    </div>
                  )}
                  <h3 className="text-3xl font-black text-white mb-3 tracking-tight">COMING SOON</h3>
                  <p className="text-cyan-400 text-lg font-bold tracking-wider">THIS MODULE IS UNDER DEVELOPMENT</p>
                  <div className="w-32 h-1 bg-cyan-400 border-2 border-black mx-auto mt-4"></div>
                </div>
              </div>
            </div>
          </div>
        )

      default:
        return null
    }
  }

  return (
    <div className="min-h-screen bg-white relative overflow-hidden flex">
      <div className="absolute inset-0">
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `
              linear-gradient(to right, #000 1px, transparent 1px),
              linear-gradient(to bottom, #000 1px, transparent 1px)
            `,
            backgroundSize: "40px 40px",
          }}
        />

        {/* Enhanced geometric shapes with animations */}
        <div className="absolute top-32 left-16 w-12 h-12 bg-cyan-400 border-4 border-black animate-float"></div>
        <div
          className="absolute top-60 right-24 w-8 h-20 bg-pink-400 border-4 border-black animate-float"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-32 left-32 w-16 h-16 bg-cyan-400 border-4 border-black transform rotate-45 animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-60 right-40 w-20 h-4 bg-black animate-float"
          style={{ animationDelay: "3s" }}
        ></div>
        <div
          className="absolute top-1/2 left-1/4 w-6 h-24 bg-pink-400 border-4 border-black animate-float"
          style={{ animationDelay: "4s" }}
        ></div>
        <div
          className="absolute top-1/4 right-1/3 w-14 h-14 bg-black border-4 border-cyan-400 rounded-full animate-float"
          style={{ animationDelay: "5s" }}
        ></div>

        {/* Large background accent shapes */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-400 opacity-10 transform rotate-12"></div>
        <div className="absolute bottom-0 left-0 w-48 h-48 bg-pink-400 opacity-10 transform -rotate-12"></div>
      </div>

      {/* Enhanced floating geometric elements */}
      {[...Array(12)].map((_, i) => (
        <div
          key={i}
          className="absolute animate-float"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 6}s`,
          }}
        >
          <div
            className={`w-3 h-3 border-2 border-black ${i % 3 === 0 ? "bg-cyan-400" : i % 3 === 1 ? "bg-pink-400" : "bg-black"} ${i % 4 === 0 ? "rounded-full" : ""}`}
          />
        </div>
      ))}

      {/* Sidebar */}
      <div className={`${sidebarOpen ? "w-72" : "w-20"} transition-all duration-300 flex-shrink-0 relative z-10`}>
        <div className="bg-black border-[4px] border-black h-full shadow-[8px_8px_0_0_#00FFFF]">
          <div className="p-6">
            <div className="bg-cyan-400 border-4 border-black p-4 animate-pulse-glow">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-black border-2 border-black flex items-center justify-center">
                  <Terminal className="w-6 h-6 text-white" />
                </div>
                {sidebarOpen && (
                  <div className="flex flex-col">
                    <span className="text-lg font-black text-black tracking-tight">COC ADMIN</span>
                    <span className="text-sm font-bold text-black">MANAGEMENT PANEL</span>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="px-4">
            <div className="space-y-3">
              <button
                onClick={() => setActiveSection("dashboard")}
                className={`w-full h-14 transition-all duration-300 font-black text-sm tracking-wider flex items-center ${
                  sidebarOpen ? "px-4" : "justify-center"
                } ${
                  activeSection === "dashboard"
                    ? "bg-cyan-400 text-black border-4 border-black shadow-[4px_4px_0_0_#000] animate-pulse-glow"
                    : "bg-white text-black border-4 border-black hover:bg-pink-400 shadow-[2px_2px_0_0_#00FFFF] hover:shadow-[4px_4px_0_0_#FF4081]"
                }`}
              >
                <Star className="w-5 h-5" />
                {sidebarOpen && <span className="ml-3">DASHBOARD</span>}
              </button>

              {menuItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActiveSection(item.id)}
                  className={`w-full h-14 transition-all duration-300 font-black text-sm tracking-wider flex items-center ${
                    sidebarOpen ? "px-4" : "justify-center"
                  } ${
                    activeSection === item.id
                      ? "bg-cyan-400 text-black border-4 border-black shadow-[4px_4px_0_0_#000] animate-pulse-glow"
                      : "bg-white text-black border-4 border-black hover:bg-pink-400 shadow-[2px_2px_0_0_#00FFFF] hover:shadow-[4px_4px_0_0_#FF4081]"
                  }`}
                >
                  <item.icon className="w-5 h-5" />
                  {sidebarOpen && <span className="ml-3">{item.title}</span>}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col relative z-10">
        {/* Header */}
        <header className="bg-black border-[4px] border-black p-6 shadow-[8px_8px_0_0_#00FFFF] mb-4 animate-slide-in">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="w-12 h-12 bg-cyan-400 border-4 border-black flex items-center justify-center hover:bg-pink-400 transition-all duration-300 shadow-[2px_2px_0_0_#000] hover:shadow-[4px_4px_0_0_#000] hover:translate-x-1 hover:translate-y-1"
            >
              <Menu className="w-5 h-5 text-black" />
            </button>
            <div className="flex items-center gap-3">
              <span className="text-white font-black text-lg tracking-tight">COC ADMIN</span>
              <span className="text-white font-black">/</span>
              <span className="text-cyan-400 font-black uppercase tracking-wider">
                {activeSection === "dsa-questions" ? "DSA QUESTIONS" : activeSection}
              </span>
            </div>
          </div>
        </header>

        {renderContent()}
      </div>
    </div>
  )
}
