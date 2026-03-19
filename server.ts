import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";
import nodemailer from "nodemailer";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Email Transporter (Configure with environment variables)
  const hasEmailConfig = !!(process.env.EMAIL_USER && process.env.EMAIL_PASS);
  
  let transporter: nodemailer.Transporter | null = null;
  
  if (hasEmailConfig) {
    transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });

    // Verify transporter connection
    transporter.verify((error) => {
      if (error) {
        console.error("❌ Email Transporter Error:", error.message);
        console.log("Please ensure EMAIL_USER and EMAIL_PASS (App Password) are correct in Settings.");
      } else {
        console.log("✅ Email Transporter is ready to send emails.");
      }
    });
  } else {
    console.log("⚠️ Email credentials (EMAIL_USER, EMAIL_PASS) not found. Emails will be logged to console instead of sent.");
  }

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      emailConfigured: !!process.env.EMAIL_PASS,
      timestamp: Date.now() 
    });
  });

  // In-memory store for orders (for demo purposes)
  const orders = new Map<string, { 
    id: string, 
    name: string, 
    whatsapp: string, 
    productTitle: string,
    price: number,
    status: 'pending' | 'approved',
    timestamp: number 
  }>();

  // API Routes
  app.post("/api/payment/submit", async (req, res) => {
    const { name, whatsapp, productTitle, price, screenshot } = req.body;
    const orderId = Math.random().toString(36).substring(2, 15);
    
    const newOrder = {
      id: orderId,
      name,
      whatsapp,
      productTitle,
      price,
      status: 'pending' as const,
      timestamp: Date.now()
    };
    
    orders.set(orderId, newOrder);
    console.log(`[New Order] ID: ${orderId} from ${name}`);

    // Construct absolute URL for approval link
    const rawAppUrl = process.env.APP_URL || `https://${req.get('host')}`;
    const appUrl = rawAppUrl.replace(/\/$/, ''); // Remove trailing slash if any
    const approvalLink = `${appUrl}/api/payment/approve/${orderId}`;
    
    // Prepare attachments if screenshot exists
    const attachments = [];
    if (screenshot && screenshot.includes('base64,')) {
      attachments.push({
        filename: `payment_screenshot_${orderId}.png`,
        content: screenshot.split('base64,')[1],
        encoding: 'base64'
      });
    }

    // Send Real Email
    const mailOptions = {
      from: `"Enterpedia Admin" <${process.env.EMAIL_USER || 'rajverma123orai@gmail.com'}>`,
      to: 'rajverma123orai@gmail.com',
      subject: `🚀 Enterpedia: New Order from ${name}`,
      attachments,
      html: `
        <div style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);">
          <div style="background: linear-gradient(135deg, #000000 0%, #1a1a1a 100%); color: #fff; padding: 32px 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 28px; letter-spacing: 1px;">Enterpedia</h1>
            <p style="margin: 8px 0 0 0; opacity: 0.8; font-size: 14px;">New Payment Notification</p>
          </div>
          <div style="padding: 32px; color: #1f2937; background-color: #ffffff;">
            <p style="font-size: 16px; line-height: 1.5; margin-bottom: 24px;">Hello Raj, you have a new order request for <strong>${productTitle}</strong>.</p>
            
            <div style="background: #f3f4f6; padding: 24px; border-radius: 12px; margin-bottom: 32px; border: 1px solid #f3f4f6;">
              <h3 style="margin: 0 0 16px 0; font-size: 14px; text-transform: uppercase; color: #6b7280; letter-spacing: 0.05em;">Customer Details</h3>
              <p style="margin: 0 0 12px 0; font-size: 16px;"><strong>Name:</strong> ${name}</p>
              <p style="margin: 0 0 12px 0; font-size: 16px;"><strong>WhatsApp:</strong> ${whatsapp}</p>
              <p style="margin: 0 0 12px 0; font-size: 16px;"><strong>Product:</strong> ${productTitle}</p>
              <p style="margin: 0; font-size: 20px; color: #059669; font-weight: bold;"><strong>Amount:</strong> ₹${price}</p>
            </div>

            ${screenshot ? `
            <div style="margin-bottom: 32px; text-align: center;">
              <p style="font-size: 14px; color: #6b7280; margin-bottom: 8px;">Payment Screenshot is attached to this email.</p>
            </div>
            ` : ''}

            <div style="text-align: center; margin-bottom: 32px;">
              <a href="${approvalLink}" style="display: inline-block; background: #000000; color: #ffffff; padding: 18px 40px; border-radius: 12px; text-decoration: none; font-weight: 600; font-size: 16px; box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1);">
                ✅ CONFIRM & APPROVE
              </a>
            </div>
            
            <p style="font-size: 13px; color: #6b7280; text-align: center; line-height: 1.4;">
              Once you click the button, the customer's waiting screen will automatically update to "Approved" and their download will unlock.
            </p>
            <p style="font-size: 11px; color: #9ca3af; text-align: center; margin-top: 10px;">
              Link: <a href="${approvalLink}" style="color: #9ca3af;">${approvalLink}</a>
            </p>
          </div>
          <div style="background: #f9fafb; padding: 16px; text-align: center; border-top: 1px solid #e5e7eb;">
            <p style="margin: 0; font-size: 12px; color: #9ca3af;">&copy; 2026 Enterpedia Admin Dashboard</p>
          </div>
        </div>
      `
    };

    try {
      if (transporter) {
        await transporter.sendMail(mailOptions);
        console.log(`✅ Email sent successfully to rajverma123orai@gmail.com for order ${orderId}`);
      } else {
        console.error("❌ Email credentials missing! Cannot send email.");
        console.log("-----------------------------------------");
        console.log(`FALLBACK APPROVAL LINK: ${approvalLink}`);
        console.log("-----------------------------------------");
      }
    } catch (error: any) {
      console.error("❌ Error sending email:", error.message);
    }

    res.json({ orderId, status: 'pending' });
  });

  app.get("/api/payment/status/:orderId", (req, res) => {
    const { orderId } = req.params;
    const order = orders.get(orderId);
    
    console.log(`[Status Check] Order ID: ${orderId} - Status: ${order ? order.status : 'Not Found'}`);
    
    if (!order) {
      return res.status(404).json({ error: "Order not found" });
    }
    
    res.json({ status: order.status });
  });

  app.get("/api/payment/approve/:orderId", (req, res) => {
    const { orderId } = req.params;
    const order = orders.get(orderId);
    
    if (!order) {
      return res.status(404).send("Order not found");
    }
    
    order.status = 'approved';
    orders.set(orderId, order);

    res.send(`
      <html>
        <head>
          <title>Payment Approved</title>
          <style>
            body { font-family: sans-serif; display: flex; flex-direction: column; align-items: center; justify-content: center; height: 100vh; margin: 0; background: #f0fdf4; }
            .card { background: white; padding: 2rem; border-radius: 1rem; shadow: 0 4px 6px -1px rgb(0 0 0 / 0.1); text-align: center; }
            h1 { color: #166534; }
            p { color: #374151; }
          </style>
        </head>
        <body>
          <div class="card">
            <h1>✅ Payment Approved</h1>
            <p>Order for <strong>${order.name}</strong> has been approved.</p>
            <p>The user can now close the payment page and download their file.</p>
          </div>
        </body>
      </html>
    `);
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
