import { useRef, useState } from "react";
import { motion } from "framer-motion";
import { ImagePlus, Save, Loader2, X } from "lucide-react";
import { useSiteContent } from "../../hooks/useSiteContent";
import { globalToast } from "../../utils/toast";
import type { SiteContent } from "../../types/siteContent";

interface Props {
  siteContent: SiteContent;
}

export const HeroEditor: React.FC<Props> = ({ siteContent }) => {
  const { updateHero } = useSiteContent();
  const fileRef = useRef<HTMLInputElement>(null);

  const [caption, setCaption] = useState(siteContent.heroCaption ?? "");
  const [altText, setAltText] = useState(siteContent.heroAltText ?? "");
  const [preview, setPreview] = useState<string | null>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const isSaving = updateHero.isPending;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setSelectedFile(file);
    setPreview(URL.createObjectURL(file));
  };

  const clearFile = () => {
    setSelectedFile(null);
    setPreview(null);
    if (fileRef.current) fileRef.current.value = "";
  };

  const handleSave = () => {
    const formData = new FormData();
    formData.append(
      "siteContentData",
      JSON.stringify({ heroCaption: caption, heroAltText: altText })
    );
    if (selectedFile) formData.append("image", selectedFile);

    updateHero.mutate(formData, {
      onSuccess: () => {
        globalToast.success("Hero section updated");
        clearFile();
      },
    });
  };

  const displayImage = preview ?? siteContent.heroImageUrl;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-4 border-black rounded-none shadow-[8px_8px_0_#00FFFF,12px_12px_0_#000] p-8 space-y-6"
    >
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight">Hero / Group Photo</h2>
        <p className="text-sm font-mono text-gray-500 mt-1">Main photo shown at the top of the public page</p>
      </div>

      {/* Image preview */}
      <div
        className="relative border-4 border-dashed border-black w-full min-h-[220px] flex items-center justify-center bg-gray-50 cursor-pointer group overflow-hidden"
        onClick={() => fileRef.current?.click()}
      >
        {displayImage ? (
          <>
            <img
              src={displayImage}
              alt={altText || "Hero"}
              className="w-full max-h-72 object-cover"
            />
            <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all">
              <span className="text-white font-black uppercase tracking-widest">Change Photo</span>
            </div>
            {preview && (
              <button
                onClick={(e) => { e.stopPropagation(); clearFile(); }}
                className="absolute top-2 right-2 bg-black text-white p-1 border-2 border-white hover:bg-cyan-400 hover:text-black transition-all"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </>
        ) : (
          <div className="flex flex-col items-center gap-3 text-gray-400">
            <ImagePlus className="w-12 h-12" />
            <span className="font-bold uppercase tracking-wider text-sm">Click to upload hero image</span>
          </div>
        )}
      </div>

      <input
        ref={fileRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleFileChange}
      />

      {/* Caption */}
      <div className="space-y-1">
        <label className="text-xs font-black uppercase tracking-widest text-gray-600">Caption</label>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          placeholder="e.g. COC 2024 — Annual Group Photo"
          className="w-full border-2 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF] transition-all"
        />
      </div>

      {/* Alt text */}
      <div className="space-y-1">
        <label className="text-xs font-black uppercase tracking-widest text-gray-600">Alt Text</label>
        <input
          type="text"
          value={altText}
          onChange={(e) => setAltText(e.target.value)}
          placeholder="e.g. Group photo of COC members at tech event"
          className="w-full border-2 border-black px-4 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400 focus:shadow-[2px_2px_0_#00FFFF] transition-all"
        />
      </div>

      <button
        onClick={handleSave}
        disabled={isSaving}
        className="flex items-center gap-2 bg-black text-cyan-400 border-4 border-black px-6 py-3 font-black uppercase tracking-wider shadow-[4px_4px_0_#00FFFF] hover:bg-cyan-400 hover:text-black transition-all"
      >
        {isSaving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
        Save Hero
      </button>
    </motion.div>
  );
};
