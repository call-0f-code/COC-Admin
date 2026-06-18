import api from "./api";
import type {
  EmailTemplate,
  CreateEmailTemplatePayload,
  UpdateEmailTemplatePayload,
} from "../../types/emailTemplate";

// ─── normalise response envelope ─────────────────────────────────────────────

function unwrap<T>(raw: unknown): T {
  const r = raw as Record<string, unknown>;
  return (r?.data ?? r) as T;
}

// ─── API functions ────────────────────────────────────────────────────────────

export const listEmailTemplates = async (): Promise<EmailTemplate[]> => {
  const res = await api.get("/email/templates");
  const payload = unwrap<unknown>(res.data);
  // COC-API may return { templates: [...] } or a bare array
  if (Array.isArray(payload)) return payload as EmailTemplate[];
  const p = payload as Record<string, unknown>;
  return (p?.templates ?? p?.data ?? []) as EmailTemplate[];
};

export const getEmailTemplate = async (id: number): Promise<EmailTemplate> => {
  const res = await api.get(`/email/templates/${id}`);
  const payload = unwrap<unknown>(res.data);
  const p = payload as Record<string, unknown>;
  return (p?.template ?? payload) as EmailTemplate;
};

export const createEmailTemplate = async (
  body: CreateEmailTemplatePayload
): Promise<EmailTemplate> => {
  const res = await api.post("/email/templates", body);
  const payload = unwrap<unknown>(res.data);
  const p = payload as Record<string, unknown>;
  return (p?.template ?? payload) as EmailTemplate;
};

export const updateEmailTemplate = async (
  id: number,
  body: UpdateEmailTemplatePayload
): Promise<EmailTemplate> => {
  const res = await api.patch(`/email/templates/${id}`, body);
  const payload = unwrap<unknown>(res.data);
  const p = payload as Record<string, unknown>;
  return (p?.template ?? payload) as EmailTemplate;
};

export const deleteEmailTemplate = async (id: number): Promise<void> => {
  await api.delete(`/email/templates/${id}`);
};
