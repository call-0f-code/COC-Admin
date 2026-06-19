import express from 'express';
import * as emailTemplateCtrl from '../controllers/emailTemplate.controller';

export default function emailRouter() {
  const router = express.Router();

  // List all email templates
  router.get('/templates', emailTemplateCtrl.listTemplates);

  // Get a single email template by ID
  router.get('/templates/:id', emailTemplateCtrl.getTemplate);

  // Create a new email template
  router.post('/templates', emailTemplateCtrl.createTemplate);

  // Update an email template
  router.patch('/templates/:id', emailTemplateCtrl.updateTemplate);

  // Delete an email template
  router.delete('/templates/:id', emailTemplateCtrl.deleteTemplate);

  return router;
}
