export interface EmailTemplate {
  id: number;
  name: string;
  subject: string;
  htmlBody: string;
  textBody?: string | null;
  createdById?: string | null;
  updatedById?: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface CreateEmailTemplatePayload {
  name: string;
  subject: string;
  htmlBody: string;
  textBody?: string;
}

export interface UpdateEmailTemplatePayload {
  name?: string;
  subject?: string;
  htmlBody?: string;
  textBody?: string;
}
