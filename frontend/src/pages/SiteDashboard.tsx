import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings2, Eye, Loader2, AlertCircle } from "lucide-react";
import { useSiteContent } from "../hooks/useSiteContent";
import { RecruitmentToggle } from "../Components/site/RecruitmentToggle";
import { HeroEditor } from "../Components/site/HeroEditor";
import { GalleryManager } from "../Components/site/GalleryManager";
import { SitePreview } from "../Components/site/SitePreview";
import { Header } from "../Components/common/Header";
import type { SiteAction } from "../types/siteContent";

type Tab = "manage" | "preview";

export default function SiteDashboard() {
  const [activeTab, setActiveTab] = useState<Tab>("manage");
  const { siteContent, isLoading, isError } = useSiteContent();

  const recruitmentAction = siteContent?.actions?.find(
    (a: SiteAction) => a.key === "Recruitment_Button"
  );

  const tabs: { id: Tab; label: string; icon: React.ReactNode }[] = [
    { id: "manage", label: "Manage", icon: <Settings2 className="w-4 h-4" /> },
    { id: "preview", label: "Preview", icon: <Eye className="w-4 h-4" /> },
  ];

  return (
    <div className="relative overflow-hidden pt-[80px] space-y-6">
      {/* Fixed header */}
      <Header title="" subtitle="SITE_CONTENT" onBack={undefined} />

      {/* Tab switcher */}
      <div className="px-8 pt-2">
        <div className="inline-flex border-4 border-black shadow-[4px_4px_0_#000]">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-6 py-2.5 font-black uppercase tracking-wider text-sm transition-all
                ${activeTab === tab.id
                  ? "bg-cyan-400 text-black"
                  : "bg-white text-black hover:bg-gray-100"
                }
                ${tab.id !== tabs[0].id ? "border-l-4 border-black" : ""}
              `}
            >
              {tab.icon}
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Loading */}
      {isLoading && (
        <div className="flex items-center justify-center py-24">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="w-10 h-10 animate-spin text-cyan-400" />
            <span className="font-black uppercase tracking-widest text-sm">Loading site content...</span>
          </div>
        </div>
      )}

      {/* Error */}
      {isError && !isLoading && (
        <div className="mx-8">
          <div className="border-4 border-black bg-white p-8 shadow-[6px_6px_0_#FF4444,10px_10px_0_#000] flex items-center gap-4">
            <AlertCircle className="w-8 h-8 text-red-500 shrink-0" />
            <div>
              <p className="font-black uppercase">Failed to load site content</p>
              <p className="text-sm font-mono text-gray-500 mt-1">
                Check that the COC-Admin backend can reach the COC-API.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Content */}
      {siteContent && !isLoading && (
        <AnimatePresence mode="wait">
          {activeTab === "manage" ? (
            <motion.div
              key="manage"
              initial={{ opacity: 0, x: -12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 12 }}
              transition={{ duration: 0.18 }}
              className="px-8 pb-16 space-y-8"
            >
              {/* Recruitment toggle */}
              {recruitmentAction ? (
                <RecruitmentToggle action={recruitmentAction} />
              ) : (
                <div className="border-4 border-black bg-white p-6 shadow-[6px_6px_0_#00FFFF,10px_10px_0_#000]">
                  <p className="font-mono text-sm text-gray-500">
                    No <span className="font-bold">recruitment</span> site action found on the server.
                    Create one via the COC-API first.
                  </p>
                </div>
              )}

              {/* Hero editor */}
              <HeroEditor siteContent={siteContent} />

              {/* Gallery manager */}
              <GalleryManager photos={siteContent.galleryPhotos ?? []} />
            </motion.div>
          ) : (
            <motion.div
              key="preview"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.18 }}
              className="px-8 pb-16"
            >
              <div className="mb-4">
                <p className="text-xs font-mono text-gray-500 uppercase tracking-widest">
                  Live preview — reflects what visitors see on the public site right now
                </p>
              </div>
              <SitePreview siteContent={siteContent} />
            </motion.div>
          )}
        </AnimatePresence>
      )}
    </div>
  );
}
