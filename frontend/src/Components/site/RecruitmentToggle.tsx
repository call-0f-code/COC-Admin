import { useState } from "react";
import { motion } from "framer-motion";
import { ToggleLeft, ToggleRight, Link2, Tag, Save, Loader2 } from "lucide-react";
import { useSiteContent } from "../../hooks/useSiteContent";
import { globalToast } from "../../utils/toast";
import type { SiteAction } from "../../types/siteContent";

interface Props {
  action: SiteAction;
}

export const RecruitmentToggle: React.FC<Props> = ({ action }) => {
  const { toggleAction } = useSiteContent();
  const [label, setLabel] = useState(action.label ?? "");
  const [url, setUrl] = useState(action.url ?? "");

  const isSaving = toggleAction.isPending;

  const handleToggle = () =>  {
    console.log(action)
    toggleAction.mutate(
      { key: action.key, payload: { isVisible: !action.isVisible, label, url } },
      {
        onSuccess: () =>
          globalToast.success(
            !action.isVisible ? "Recruitment button enabled" : "Recruitment button hidden"
          ),
      }
    );
  };

  const handleSave = () => {
    toggleAction.mutate(
      { key: action.key, payload: { label, url, isVisible: action.isVisible } },
      { onSuccess: () => globalToast.success("Recruitment settings saved") }
    );
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-4 border-black rounded-none shadow-[8px_8px_0_#00FFFF,12px_12px_0_#000] p-8 space-y-6"
    >
      {/* Header row */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-black uppercase tracking-tight">Recruitment Button</h2>
          <p className="text-sm font-mono text-gray-500 mt-1">
            Controls the public-site recruitment CTA
          </p>
        </div>

        {/* Toggle */}
        <button
          onClick={handleToggle}
          disabled={isSaving}
          className={`flex items-center gap-2 px-5 py-3 border-4 border-black font-black text-sm uppercase tracking-wider transition-all shadow-[4px_4px_0_#000]
            ${action.isVisible
              ? "bg-cyan-400 text-black hover:bg-black hover:text-cyan-400"
              : "bg-black text-white hover:bg-cyan-400 hover:text-black"
            }`}
        >
          {isSaving ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : action.isVisible ? (
            <ToggleRight className="w-6 h-6" />
          ) : (
            <ToggleLeft className="w-6 h-6" />
          )}
          {action.isVisible ? "VISIBLE" : "HIDDEN"}
        </button>
      </div>

      {/* Status pill */}
      <div
        className={`inline-flex items-center gap-2 px-4 py-1 border-2 border-black font-bold text-xs uppercase tracking-widest
          ${action.isVisible ? "bg-cyan-400" : "bg-gray-200"}`}
      >
        <span
          className={`w-2 h-2 rounded-full ${action.isVisible ? "bg-black" : "bg-gray-500"}`}
        />
        {action.isVisible ? "Live on public site" : "Not visible to visitors"}
      </div>

      <div className="border-t-4 border-black pt-6 space-y-4">
        {/* Label field */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-600">
            <Tag className="w-4 h-4" />
            Button Label
          </label>
          <input
            type="text"
            value={label}
            onChange={(e) => setLabel(e.target.value)}
            placeholder="e.g. Join COC"
            className="w-full border-2 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF] transition-all"
          />
        </div>

        {/* URL field */}
        <div className="space-y-1">
          <label className="flex items-center gap-2 text-xs font-black uppercase tracking-widest text-gray-600">
            <Link2 className="w-4 h-4" />
            Target URL
          </label>
          <input
            type="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="https://forms.gle/..."
            className="w-full border-2 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF] transition-all"
          />
        </div>

        <button
          onClick={handleSave}
          disabled={isSaving}
          className="flex items-center gap-2 bg-black text-cyan-400 border-4 border-black px-6 py-3 font-black uppercase tracking-wider shadow-[4px_4px_0_#00FFFF] hover:bg-cyan-400 hover:text-black transition-all"
        >
          {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
          Save Settings
        </button>
      </div>
    </motion.div>
  );
};
