import express from "express";
import { createServer as createViteServer } from "vite";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = 3000;

  app.use(express.json());

  // In-memory store for orders (for demo purposes)
  const orders = new Map<string, { 
    id: string, 
    name: string, 
    whatsapp: string, 
    status: 'pending' | 'approved',
    timestamp: number 
  }>();

  // API Routes
  app.post("/api/payment/submit", (req, res) => {
    const { name, whatsapp } = req.body;
    const orderId = Math.random().toString(36).substring(2, 15);
    
    const newOrder = {
      id: orderId,
      name,
      whatsapp,
      status: 'pending' as const,
      timestamp: Date.now()
    };
    
    orders.set(orderId, newOrder);

    // Simulate sending email to rajverma123orai@gmail.com
    const approvalLink = `${process.env.APP_URL || `http://localhost:${PORT}`}/api/payment/approve/${orderId}`;
    
    console.log("-----------------------------------------");
    console.log(`EMAIL SENT TO: rajverma123orai@gmail.com`);
    console.log(`SUBJECT: New Payment Received from ${name}`);
    console.log(`DETAILS:`);
    console.log(`Name: ${name}`);
    console.log(`WhatsApp: ${whatsapp}`);
    console.log(`APPROVAL LINK: ${approvalLink}`);
    console.log("-----------------------------------------");

    res.json({ orderId, status: 'pending' });
  });

  app.get("/api/payment/status/:orderId", (req, res) => {
    const { orderId } = req.params;
    const order = orders.get(orderId);
    
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
