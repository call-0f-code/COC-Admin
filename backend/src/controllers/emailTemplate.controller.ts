import { Request, Response } from 'express';
import api from '../utils/api';
import { ApiError } from '../utils/apiError';

// ─── LIST ────────────────────────────────────────────────────────────────────

export const listTemplates = async (_req: Request, res: Response) => {
  const response = await api.get('/email/templates');

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// ─── GET ONE ─────────────────────────────────────────────────────────────────

export const getTemplate = async (req: Request, res: Response) => {
  const { id } = req.params;
  const response = await api.get(`/email/templates/${id}`);

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// ─── CREATE ───────────────────────────────────────────────────────────────────

export const createTemplate = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError('Admin ID missing', 400);

  const { name, subject, htmlBody, textBody } = req.body;

  if (!name || !subject || !htmlBody) {
    throw new ApiError('name, subject, and htmlBody are required', 400);
  }

  const response = await api.post('/email/templates', {
    name,
    subject,
    htmlBody,
    textBody,
    createdById: adminId,
  });

  res.status(201).json({
    success: true,
    data: response.data,
  });
};

// ─── UPDATE ───────────────────────────────────────────────────────────────────

export const updateTemplate = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError('Admin ID missing', 400);

  const { id } = req.params;
  const { name, subject, htmlBody, textBody } = req.body;

  const response = await api.patch(`/email/templates/${id}`, {
    name,
    subject,
    htmlBody,
    textBody,
    updatedById: adminId,
  });

  res.status(200).json({
    success: true,
    data: response.data,
  });
};

// ─── DELETE ───────────────────────────────────────────────────────────────────

export const deleteTemplate = async (req: Request, res: Response) => {
  const adminId = req.adminId;
  if (!adminId) throw new ApiError('Admin ID missing', 400);

  const { id } = req.params;

  await api.delete(`/email/templates/${id}`, { data: { adminId } });

  res.status(200).json({
    success: true,
    message: 'Template deleted successfully',
  });
};
