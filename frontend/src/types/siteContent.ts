export interface GalleryPhoto {
  id: string;
  url: string;
  caption?: string | null;
  altText?: string | null;
  sortOrder?: number | null;
}

export interface SiteAction {
  id: number;
  key: string;
  label?: string | null;
  url?: string | null;
  isVisible: boolean;
}

export interface SiteContent {
  heroImageUrl?: string | null;
  heroCaption?: string | null;
  heroAltText?: string | null;
  galleryPhotos: GalleryPhoto[];
  actions: SiteAction[];
}
