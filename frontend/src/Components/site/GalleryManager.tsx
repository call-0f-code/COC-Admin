import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ImagePlus, Trash2, Edit2, Check, X, Loader2 } from "lucide-react";
import { useSiteContent } from "../../hooks/useSiteContent";
import { globalToast } from "../../utils/toast";
import type { GalleryPhoto } from "../../types/siteContent";

interface Props {
  photos: GalleryPhoto[];
}

interface EditState {
  photoId: string;
  caption: string;
  altText: string;
  file: File | null;
  preview: string | null;
}

export const GalleryManager: React.FC<Props> = ({ photos }) => {
  const { addPhoto, updatePhoto, deletePhoto } = useSiteContent();
  const addFileRef = useRef<HTMLInputElement>(null);
  const editFileRef = useRef<HTMLInputElement>(null);

  const [editState, setEditState] = useState<EditState | null>(null);
  const [addCaption, setAddCaption] = useState("");
  const [addAlt, setAddAlt] = useState("");
  const [addFile, setAddFile] = useState<File | null>(null);
  const [addPreview, setAddPreview] = useState<string | null>(null);

  // ─── Add ─────────────────────────────────────────────────────────────────────
  const handleAddFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setAddFile(file);
    setAddPreview(URL.createObjectURL(file));
  };

  const handleAdd = () => {
    if (!addFile) return globalToast.error("Please select an image");
    const fd = new FormData();
    fd.append("image", addFile);
    fd.append("photoData", JSON.stringify({ caption: addCaption, altText: addAlt }));
    addPhoto.mutate(fd, {
      onSuccess: () => {
        globalToast.success("Photo added to gallery");
        setAddFile(null);
        setAddPreview(null);
        setAddCaption("");
        setAddAlt("");
        if (addFileRef.current) addFileRef.current.value = "";
      },
    });
  };

  // ─── Edit ─────────────────────────────────────────────────────────────────────
  const startEdit = (photo: GalleryPhoto) => {
    setEditState({
      photoId: photo.id,
      caption: photo.caption ?? "",
      altText: photo.altText ?? "",
      file: null,
      preview: null,
    });
  };

  const handleEditFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file || !editState) return;
    setEditState({ ...editState, file, preview: URL.createObjectURL(file) });
  };

  const handleUpdate = () => {
    if (!editState) return;
    const fd = new FormData();
    fd.append(
      "photoData",
      JSON.stringify({ caption: editState.caption, altText: editState.altText })
    );
    if (editState.file) fd.append("image", editState.file);
    updatePhoto.mutate(
      { photoId: editState.photoId, formData: fd },
      {
        onSuccess: () => {
          globalToast.success("Photo updated");
          setEditState(null);
        },
      }
    );
  };

  // ─── Delete ───────────────────────────────────────────────────────────────────
  const handleDelete = (photoId: string) => {
    deletePhoto.mutate(photoId, {
      onSuccess: () => globalToast.success("Photo removed from gallery"),
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-white border-4 border-black rounded-none shadow-[8px_8px_0_#00FFFF,12px_12px_0_#000] p-8 space-y-8"
    >
      <div>
        <h2 className="text-2xl font-black uppercase tracking-tight">Gallery Photos</h2>
        <p className="text-sm font-mono text-gray-500 mt-1">
          {photos.length} photo{photos.length !== 1 ? "s" : ""} in the gallery
        </p>
      </div>

      {/* Existing photos grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        <AnimatePresence>
          {photos.map((photo) => {
            const isEditing = editState?.photoId === photo.id;
            const isDeleting = deletePhoto.isPending && deletePhoto.variables === photo.id;

            return (
              <motion.div
                key={photo.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="border-4 border-black bg-gray-50 relative group overflow-hidden"
              >
                {isEditing ? (
                  <div className="p-3 space-y-2">
                    {/* Preview */}
                    <div
                      className="h-28 border-2 border-dashed border-black flex items-center justify-center cursor-pointer overflow-hidden"
                      onClick={() => editFileRef.current?.click()}
                    >
                      <img
                        src={editState.preview ?? photo.url}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <input ref={editFileRef} type="file" accept="image/*" className="hidden" onChange={handleEditFile} />
                    <input
                      value={editState.caption}
                      onChange={(e) => setEditState({ ...editState!, caption: e.target.value })}
                      placeholder="Caption"
                      className="w-full border border-black px-2 py-1 text-xs font-mono"
                    />
                    <input
                      value={editState.altText}
                      onChange={(e) => setEditState({ ...editState!, altText: e.target.value })}
                      placeholder="Alt text"
                      className="w-full border border-black px-2 py-1 text-xs font-mono"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={handleUpdate}
                        disabled={updatePhoto.isPending}
                        className="flex-1 flex items-center justify-center gap-1 bg-cyan-400 border-2 border-black py-1 text-xs font-black uppercase"
                      >
                        {updatePhoto.isPending ? <Loader2 className="w-3 h-3 animate-spin" /> : <Check className="w-3 h-3" />}
                        Save
                      </button>
                      <button
                        onClick={() => setEditState(null)}
                        className="flex-1 flex items-center justify-center gap-1 bg-black text-white border-2 border-black py-1 text-xs font-black uppercase"
                      >
                        <X className="w-3 h-3" /> Cancel
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <img
                      src={photo.url}
                      alt={photo.altText ?? "Gallery"}
                      className="w-full h-36 object-cover"
                    />
                    {photo.caption && (
                      <p className="text-xs font-mono px-2 py-1 truncate border-t-2 border-black bg-white">
                        {photo.caption}
                      </p>
                    )}
                    {/* Hover actions */}
                    <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all">
                      <button
                        onClick={() => startEdit(photo)}
                        className="p-2 bg-cyan-400 border-2 border-black text-black hover:scale-110 transition-transform"
                      >
                        <Edit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(photo.id)}
                        disabled={isDeleting}
                        className="p-2 bg-white border-2 border-black text-black hover:bg-red-500 hover:text-white transition-all"
                      >
                        {isDeleting ? (
                          <Loader2 className="w-4 h-4 animate-spin" />
                        ) : (
                          <Trash2 className="w-4 h-4" />
                        )}
                      </button>
                    </div>
                  </>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Add new photo */}
      <div className="border-t-4 border-black pt-6 space-y-4">
        <h3 className="font-black uppercase tracking-wider text-sm">Add New Photo</h3>

        <div
          className="border-4 border-dashed border-black min-h-[140px] flex items-center justify-center cursor-pointer bg-gray-50 hover:bg-cyan-50 transition-all overflow-hidden"
          onClick={() => addFileRef.current?.click()}
        >
          {addPreview ? (
            <img src={addPreview} alt="preview" className="max-h-40 object-contain" />
          ) : (
            <div className="flex flex-col items-center gap-2 text-gray-400">
              <ImagePlus className="w-10 h-10" />
              <span className="text-xs font-bold uppercase tracking-widest">Click to select image</span>
            </div>
          )}
        </div>
        <input ref={addFileRef} type="file" accept="image/*" className="hidden" onChange={handleAddFile} />

        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-600">Caption</label>
            <input
              value={addCaption}
              onChange={(e) => setAddCaption(e.target.value)}
              placeholder="Optional caption"
              className="w-full border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
          <div className="space-y-1">
            <label className="text-xs font-black uppercase tracking-widest text-gray-600">Alt Text</label>
            <input
              value={addAlt}
              onChange={(e) => setAddAlt(e.target.value)}
              placeholder="Accessibility description"
              className="w-full border-2 border-black px-3 py-2 font-mono text-sm focus:outline-none focus:border-cyan-400"
            />
          </div>
        </div>

        <button
          onClick={handleAdd}
          disabled={addPhoto.isPending || !addFile}
          className="flex items-center gap-2 bg-black text-cyan-400 border-4 border-black px-6 py-3 font-black uppercase tracking-wider shadow-[4px_4px_0_#00FFFF] hover:bg-cyan-400 hover:text-black transition-all disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {addPhoto.isPending ? <Loader2 className="w-4 h-4 animate-spin" /> : <ImagePlus className="w-4 h-4" />}
          Add Photo
        </button>
      </div>
    </motion.div>
  );
};
