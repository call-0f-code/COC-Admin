import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  getSiteContent,
  updateSiteContent,
  updateSiteAction,
  addGalleryPhoto,
  updateGalleryPhoto,
  deleteGalleryPhoto,
} from "../utils/api/siteContentApi";
import { handleApiError } from "../utils/handleApiError";

const QUERY_KEY = ["siteContent"];

export function useSiteContent() {
  const queryClient = useQueryClient();

  const { data: siteContent, isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: getSiteContent,
    staleTime: 30_000,
  });

  const invalidate = () => queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const updateHero = useMutation({
    mutationFn: (formData: FormData) => updateSiteContent(formData),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  const toggleAction = useMutation({
    mutationFn: ({
      key,
      payload,
    }: {
      key: string;
      payload: { isVisible?: boolean; label?: string; url?: string };
    }) => updateSiteAction(key, payload),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  const addPhoto = useMutation({
    mutationFn: (formData: FormData) => addGalleryPhoto(formData),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  const updatePhoto = useMutation({
    mutationFn: ({ photoId, formData }: { photoId: string; formData: FormData }) =>
      updateGalleryPhoto(photoId, formData),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  const deletePhoto = useMutation({
    mutationFn: (photoId: string) => deleteGalleryPhoto(photoId),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  return {
    siteContent,
    isLoading,
    isError,
    updateHero,
    toggleAction,
    addPhoto,
    updatePhoto,
    deletePhoto,
  };
}
