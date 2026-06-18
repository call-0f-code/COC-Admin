import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  listEmailTemplates,
  createEmailTemplate,
  updateEmailTemplate,
  deleteEmailTemplate,
} from "../utils/api/emailTemplateApi";
import { handleApiError } from "../utils/handleApiError";
import type {
  CreateEmailTemplatePayload,
  UpdateEmailTemplatePayload,
} from "../types/emailTemplate";

const QUERY_KEY = ["emailTemplates"];

export function useEmailTemplates() {
  const queryClient = useQueryClient();

  const { data: templates = [], isLoading, isError } = useQuery({
    queryKey: QUERY_KEY,
    queryFn: listEmailTemplates,
    staleTime: 30_000,
  });

  const invalidate = () =>
    queryClient.invalidateQueries({ queryKey: QUERY_KEY });

  const create = useMutation({
    mutationFn: (payload: CreateEmailTemplatePayload) =>
      createEmailTemplate(payload),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: number; payload: UpdateEmailTemplatePayload }) =>
      updateEmailTemplate(id, payload),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  const remove = useMutation({
    mutationFn: (id: number) => deleteEmailTemplate(id),
    onSuccess: invalidate,
    onError: handleApiError,
  });

  return { templates, isLoading, isError, create, update, remove };
}
