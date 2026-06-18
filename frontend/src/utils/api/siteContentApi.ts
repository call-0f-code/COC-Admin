import api from "./api";
import type { SiteContent, SiteAction } from "../../types/siteContent";

export const getSiteContent = async (): Promise<SiteContent> => {
  const res = await api.get("/site-content");

  // The response is double-wrapped: { success, data: { success, data: { hero, gallery, actions } } }
  // Unwrap both layers to reach the actual payload.
  const outer = res.data?.data ?? res.data; // unwrap admin-backend envelope
  const inner = outer?.data ?? outer;       // unwrap COC-API envelope

  // Normalize field names to match the SiteContent type used by components.
  const normalized: SiteContent = {
    heroImageUrl: inner?.hero?.imageUrl ?? null,
    heroCaption:  inner?.hero?.caption  ?? null,
    heroAltText:  inner?.hero?.altText  ?? null,
    galleryPhotos: (inner?.gallery ?? []).map((p: {
      id: string;
      imageUrl: string;
      altText?: string | null;
      caption?: string | null;
      sortOrder?: number | null;
    }) => ({
      id:        p.id,
      url:       p.imageUrl,
      altText:   p.altText   ?? null,
      caption:   p.caption   ?? null,
      sortOrder: p.sortOrder ?? null,
    })),
    // Actions are returned as-is; key casing may differ between environments.
    actions: (inner?.actions ?? []).map((a: SiteAction) => ({
      ...a,
  
    })),
  };

  return normalized;
};

export const updateSiteContent = async (formData: FormData): Promise<SiteContent> => {
  const res = await api.patch("/site-content", formData);
  return res.data.data ?? res.data;
};

export const updateSiteAction = async (
  key: string,
  payload: { isVisible?: boolean; label?: string; url?: string }
): Promise<SiteContent> => {
  const res = await api.patch(`/site-content/actions/${key}`, payload);
  return res.data.data ?? res.data;
};

export const addGalleryPhoto = async (formData: FormData): Promise<SiteContent> => {
  const res = await api.post("/site-content/gallery", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data ?? res.data;
};

export const updateGalleryPhoto = async (
  photoId: string,
  formData: FormData
): Promise<SiteContent> => {
  const res = await api.patch(`/site-content/gallery/${photoId}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return res.data.data ?? res.data;
};

export const deleteGalleryPhoto = async (photoId: string): Promise<void> => {
  await api.delete(`/site-content/gallery/${photoId}`);
};
