import { Resend } from "resend";
import dotenv from "dotenv";
import { MailTemplates } from "../const/mailTemplates";

dotenv.config();

if (!process.env.RESEND_API_KEY || !process.env.MAIL_FROM) {
  throw new Error("Missing RESEND_API_KEY or MAIL_FROM environment variables");
}

const resend = new Resend(process.env.RESEND_API_KEY);
const mailFrom = process.env.MAIL_FROM as string;

export async function sendEmailOtp(email: string, otp: string): Promise<void> {
  const { error } = await resend.emails.send({
      from: mailFrom,
      to: email,
      subject: MailTemplates.OTP.SUBJECT,
      text: MailTemplates.OTP.TEXT(otp),
      html: MailTemplates.OTP.HTML(otp),
    });

    if (error) {
    throw new Error(`Failed to send OTP email: ${error.message}`);
  }
}

export async function sendMentorStatusChangeEmail(
  email: string,
  status: string
): Promise<void> {
  const { error } = await resend.emails.send({
    from: mailFrom,
    to: email,
    subject: MailTemplates.MENTOR_STATUS_CHANGE.SUBJECT,
    text: MailTemplates.MENTOR_STATUS_CHANGE.TEXT(status),
    html: MailTemplates.MENTOR_STATUS_CHANGE.HTML(status),
  });

  if (error) {
    throw new Error(`Failed to send mentor status email: ${error.message}`);
  }
}

export async function sendPasswordResetEmail(
  email: string,
  resetLink: string
): Promise<void> {
  const { error } = await resend.emails.send({
    from: mailFrom,
    to: email,
    subject: MailTemplates.PASSWORD_RESET.SUBJECT,
    text: MailTemplates.PASSWORD_RESET.TEXT(resetLink),
    html: MailTemplates.PASSWORD_RESET.HTML(resetLink),
  });

  if (error) {
    throw new Error(`Failed to send password reset email: ${error.message}`);
  }
}
