// nodemailer.ts
import { Resend } from 'resend';
import config from '../config/index';

export const sendApprovalEmail = async (email: string, memberName: string) => {

  const resend = new Resend(config.RESEND_API_KEY);

  const html = `
<div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">

    <!-- Header -->
    <div style="text-align: center; margin-bottom: 25px;
        background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
        padding: 35px 20px; border-radius: 12px; color: white;">
        
        <h1 style="margin: 0; font-size: 28px; letter-spacing: -0.5px;">
            Welcome Aboard!
        </h1>
        <p style="margin: 10px 0 0 0; font-size: 16px; opacity: 0.9;">
            Your membership has been successfully approved
        </p>
    </div>

    <!-- Main Greeting Block -->
    <div style="
        background: white; 
        padding: 25px; 
        border-radius: 10px;
        box-shadow: 0 2px 10px rgba(0,0,0,0.08);
        text-align: center;
        margin: 25px 0;">
        
        <p style="color: #1f2937; margin: 0; font-size: 20px;">
            Hello <strong style="color:#6366f1;">${memberName}</strong>
        </p>
        <p style="color: #6b7280; margin: 12px 0 0 0; font-size: 16px;">
            Welcome to <strong>Call Of Code</strong>
        </p>

        <div style="
            background: linear-gradient(135deg, #ecfdf5 0%, #d1fae5 100%);
            padding: 18px; margin-top: 18px; border-radius: 8px;
            border-left: 4px solid #10b981; text-align: left;">
            
            <p style="margin: 0; color: #047857; font-weight: 600; font-size: 15px;">
                ✓ Account Status: Active
            </p>
            <p style="margin: 6px 0 0 0; color: #10b981; font-size: 14px;">
                Your account is now fully activated and ready to use.
            </p>
        </div>
    </div>

    <!-- What's Next Section -->
    <div style="
        background-color: #f9fafb; padding: 20px; 
        border-radius: 10px; margin: 20px 0;">
        
        <h3 style="color: #1f2937; margin-top: 0; font-size: 18px;">
            🚀 Getting Started
        </h3>

        <ul style="color: #6b7280; margin: 0; padding-left: 20px; font-size: 15px; line-height: 1.55;">
            <li><strong>Log in</strong> to your account to get started</li>
            <li>Complete your profile setup</li>
            <li>Explore events, features, & resources</li>
            <li>Connect with other members</li>
        </ul>
    </div>

    <!-- CTA Button -->
    <div style="text-align: center; margin: 30px 0;">
        <a href="https://members.callofcode.in/signup"
           style="display: inline-block;
                  background: linear-gradient(135deg, #6366f1 0%, #4f46e5 100%);
                  color: white; padding: 14px 38px;
                  text-decoration: none; border-radius: 8px;
                  font-weight: 600; font-size: 16px;
                  box-shadow: 0 4px 12px rgba(99,102,241,0.3);">
            Access Your Account
        </a>
    </div>

    <!-- Footer -->
    <div style="text-align: center; margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee;">
        <p style="color: #999; font-size: 14px; margin: 0;">
            This is an automated message, please do not reply to this email.
        </p>
        <p style="color: #999; font-size: 14px; margin: 10px 0 0 0;">
            Need help? Contact us at 
            <a href="mailto:${config.CONTACT_EMAIL_ID}" style="color: #6366f1; text-decoration: none;">
                ${config.CONTACT_EMAIL_ID}
            </a>
        </p>
    </div>

</div>
  `;

  const text = `Hello ${memberName},\n\nYour membership has been approved.\nYour account is now active. Login at: https://members.callofcode.in/signup\n\nNeed help? Contact us at  ${config.CONTACT_EMAIL_ID}`;

  try {
    const res = await resend.emails.send({
      from: `"Call Of Code" <${config.EMAIL_ID}>`,
      to: email,
      subject: 'Membership Approved - Call Of Code',
      html,
      text,
    });

    return res;
  } catch (err) {
    throw err;
  }
};
