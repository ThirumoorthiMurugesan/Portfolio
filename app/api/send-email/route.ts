import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { name, projectTitle, description, email, phone } = body;

    if (!name || !projectTitle || !description || !email || !phone) {
      return NextResponse.json(
        { success: false, error: "All fields are required." },
        { status: 400 }
      );
    }

    // Standard SMTP transport using EMAIL_USER and EMAIL_PASSWORD from .env
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: process.env.EMAIL_USER, // Sends enquiry to self
      subject: `💼 Freelancing Enquiry: "${projectTitle}" from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #e2e8f0; border-radius: 16px; background-color: #ffffff; color: #1a202c; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);">
          <div style="text-align: center; margin-bottom: 25px;">
            <span style="font-size: 40px;">💼</span>
            <h2 style="color: #4f46e5; margin: 10px 0 5px 0; font-weight: 800; font-size: 22px;">New Freelance Project Inquiry</h2>
            <p style="color: #718096; margin: 0; font-size: 14px;">Received from your Portfolio Assistant</p>
          </div>
          
          <div style="border-top: 1px solid #edf2f7; border-bottom: 1px solid #edf2f7; padding: 20px 0; margin-bottom: 25px;">
            <table style="width: 100%; border-collapse: collapse;">
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4a5568; width: 140px; font-size: 14px; vertical-align: top;">Client Name:</td>
                <td style="padding: 8px 0; color: #1a202c; font-size: 14px; vertical-align: top;">${name}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4a5568; font-size: 14px; vertical-align: top;">Project Title:</td>
                <td style="padding: 8px 0; color: #1a202c; font-size: 14px; font-weight: 600; vertical-align: top;">${projectTitle}</td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4a5568; font-size: 14px; vertical-align: top;">Email:</td>
                <td style="padding: 8px 0; color: #4f46e5; font-size: 14px; vertical-align: top;"><a href="mailto:${email}" style="color: #4f46e5; text-decoration: none;">${email}</a></td>
              </tr>
              <tr>
                <td style="padding: 8px 0; font-weight: 600; color: #4a5568; font-size: 14px; vertical-align: top;">Phone Number:</td>
                <td style="padding: 8px 0; color: #1a202c; font-size: 14px; vertical-align: top;">${phone}</td>
              </tr>
            </table>
          </div>
          
          <div style="background-color: #f7fafc; padding: 20px; border-left: 4px solid #4f46e5; border-radius: 8px; margin-bottom: 25px;">
            <h4 style="margin: 0 0 10px 0; color: #4a5568; font-size: 13px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em;">Project Description</h4>
            <p style="margin: 0; color: #2d3748; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">${description}</p>
          </div>
          
          <div style="text-align: center; font-size: 12px; color: #a0aec0; border-top: 1px solid #edf2f7; padding-top: 20px;">
            <p style="margin: 0; color: #2d3748; line-height: 1.6; font-size: 14px; white-space: pre-wrap;">This inquiry was routed directly via your portfolio chat system.</p>
            <p style="margin: 0; font-weight: 600; color: #718096;">© ${new Date().getFullYear()} Thirumoorthi Murugesan</p>
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ success: true, message: "Enquiry sent successfully!" });
  } catch (error: any) {
    console.error("Error sending email:", error);
    return NextResponse.json(
      { success: false, error: error.message || "Failed to send email" },
      { status: 500 }
    );
  }
}
