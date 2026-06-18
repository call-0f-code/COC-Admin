import { motion } from "framer-motion";
import { ExternalLink, Users } from "lucide-react";
import type { SiteContent, SiteAction } from "../../types/siteContent";

interface Props {
  siteContent: SiteContent;
}

export const SitePreview: React.FC<Props> = ({ siteContent }) => {
  const recruitment = siteContent.actions?.find(
    (a: SiteAction) => a.key === "recruitment"
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="border-4 border-black bg-white shadow-[8px_8px_0_#00FFFF,12px_12px_0_#000] overflow-hidden"
    >
      {/* Browser chrome mock */}
      <div className="bg-black px-4 py-2 flex items-center gap-3 border-b-4 border-cyan-400">
        <div className="flex gap-1.5">
          <div className="w-3 h-3 rounded-full bg-red-500 border border-black" />
          <div className="w-3 h-3 rounded-full bg-yellow-400 border border-black" />
          <div className="w-3 h-3 rounded-full bg-green-400 border border-black" />
        </div>
        <div className="flex-1 bg-gray-800 text-gray-400 text-xs font-mono px-3 py-1 rounded-sm">
          callofcode.in
        </div>
        <span className="text-cyan-400 text-xs font-black uppercase tracking-wider">PREVIEW</span>
      </div>

      {/* Simulated public site */}
      <div className="bg-gray-50 min-h-[520px]">

        {/* Fake nav */}
        <div className="bg-white border-b-2 border-gray-200 px-8 py-3 flex items-center justify-between">
          <span className="font-black text-lg tracking-tight">COC</span>
          <div className="flex items-center gap-6 text-sm font-medium text-gray-600">
            <span>About</span>
            <span>Members</span>
            <span>Projects</span>
            {recruitment?.isVisible && (
              <a
                href={recruitment.url ?? "#"}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 bg-cyan-400 text-black font-black px-4 py-1.5 border-2 border-black shadow-[3px_3px_0_#000] hover:shadow-[1px_1px_0_#000] hover:translate-x-0.5 hover:translate-y-0.5 transition-all text-xs uppercase tracking-wider"
              >
                {recruitment.label ?? "Join Us"}
                <ExternalLink className="w-3 h-3" />
              </a>
            )}
          </div>
        </div>

        {/* Hero section */}
        <div className="relative">
          {siteContent.heroImageUrl ? (
            <div className="relative">
              <img
                src={siteContent.heroImageUrl}
                alt={siteContent.heroAltText ?? "Group photo"}
                className="w-full max-h-72 object-cover"
              />
              {siteContent.heroCaption && (
                <div className="absolute bottom-0 left-0 right-0 bg-black/70 text-white text-sm px-6 py-2 font-medium">
                  {siteContent.heroCaption}
                </div>
              )}
            </div>
          ) : (
            <div className="w-full h-56 bg-gray-200 border-b-2 border-gray-300 flex flex-col items-center justify-center text-gray-400 gap-2">
              <Users className="w-14 h-14" />
              <span className="text-sm font-medium">No hero image uploaded yet</span>
            </div>
          )}
        </div>

        {/* Gallery grid */}
        {siteContent.galleryPhotos?.length > 0 && (
          <div className="px-8 py-8">
            <h2 className="font-black text-xl mb-4 uppercase tracking-tight">Gallery</h2>
            <div className="grid grid-cols-3 gap-3">
              {siteContent.galleryPhotos.map((photo) => (
                <div key={photo.id} className="overflow-hidden border border-gray-200 rounded-sm">
                  <img
                    src={photo.url}
                    alt={photo.altText ?? ""}
                    className="w-full h-28 object-cover"
                  />
                  {photo.caption && (
                    <p className="text-xs text-gray-500 px-2 py-1 truncate">{photo.caption}</p>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recruitment CTA section (when visible) */}
        {recruitment?.isVisible && (
          <div className="mx-8 mb-8 bg-black text-white p-8 border-4 border-black shadow-[6px_6px_0_#00FFFF] text-center">
            <h3 className="text-xl font-black uppercase tracking-wider mb-2">
              We're Recruiting!
            </h3>
            <p className="text-gray-300 text-sm mb-4">
              Join Call of Code and grow with us.
            </p>
            <a
              href={recruitment.url ?? "#"}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-cyan-400 text-black font-black px-6 py-2 border-2 border-cyan-400 hover:bg-white transition-all text-sm uppercase"
            >
              {recruitment.label ?? "Apply Now"}
              <ExternalLink className="w-4 h-4" />
            </a>
          </div>
        )}

        {/* Empty state */}
        {!siteContent.heroImageUrl && !siteContent.galleryPhotos?.length && !recruitment?.isVisible && (
          <div className="text-center py-20 text-gray-400">
            <p className="font-mono text-sm">No public content configured yet.</p>
            <p className="font-mono text-xs mt-1">Use the Manage tab to add content.</p>
          </div>
        )}
      </div>
    </motion.div>
  );
};
