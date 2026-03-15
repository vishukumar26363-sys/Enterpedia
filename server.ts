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
  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER || 'rajverma123orai@gmail.com',
      pass: process.env.EMAIL_PASS // User must set this as an App Password
    }
  });

  app.use(express.json());

  // Health check
  app.get("/api/health", (req, res) => {
    res.json({ status: "ok", timestamp: Date.now() });
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
    const { name, whatsapp, productTitle, price } = req.body;
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

    const appUrl = process.env.APP_URL || `https://${req.get('host')}`;
    const approvalLink = `${appUrl}/api/payment/approve/${orderId}`;
    
    // Send Real Email
    const mailOptions = {
      from: process.env.EMAIL_USER || 'rajverma123orai@gmail.com',
      to: 'rajverma123orai@gmail.com',
      subject: `🚀 New Order: ₹${price} from ${name}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e5e7eb; border-radius: 12px; overflow: hidden;">
          <div style="background: #000; color: #fff; padding: 24px; text-align: center;">
            <h1 style="margin: 0; font-size: 24px;">New Payment Received</h1>
          </div>
          <div style="padding: 24px; color: #374151;">
            <p style="font-size: 16px; margin-bottom: 24px;">You have received a new payment request for <strong>${productTitle}</strong>.</p>
            
            <div style="background: #f9fafb; padding: 20px; border-radius: 8px; margin-bottom: 24px;">
              <p style="margin: 0 0 10px 0;"><strong>Customer:</strong> ${name}</p>
              <p style="margin: 0 0 10px 0;"><strong>WhatsApp:</strong> ${whatsapp}</p>
              <p style="margin: 0 0 10px 0;"><strong>Product:</strong> ${productTitle}</p>
              <p style="margin: 0; font-size: 18px; color: #059669;"><strong>Amount Paid:</strong> ₹${price}</p>
            </div>

            <p style="text-align: center; margin-bottom: 24px;">
              <a href="${approvalLink}" style="display: inline-block; background: #000; color: #fff; padding: 16px 32px; border-radius: 8px; text-decoration: none; font-weight: bold; font-size: 16px;">
                ✅ CONFIRM & APPROVE PAYMENT
              </a>
            </p>
            
            <p style="font-size: 12px; color: #9ca3af; text-align: center;">
              Clicking the button above will immediately unlock the download for the customer.
            </p>
          </div>
        </div>
      `
    };

    try {
      if (process.env.EMAIL_PASS) {
        await transporter.sendMail(mailOptions);
        console.log(`Email sent successfully to rajverma123orai@gmail.com for order ${orderId}`);
      } else {
        console.warn("EMAIL_PASS not set. Email not sent. Logging to console instead:");
        console.log("-----------------------------------------");
        console.log(`APPROVAL LINK: ${approvalLink}`);
        console.log("-----------------------------------------");
      }
    } catch (error) {
      console.error("Error sending email:", error);
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
