import { GoogleGenAI } from "@google/genai";
import * as fs from "fs";
import * as path from "path";

const apiKey = process.env.GEMINI_API_KEY;
if (!apiKey) {
  console.error("No API key");
  process.exit(1);
}

const ai = new GoogleGenAI({ apiKey });

async function main() {
  const prompt = `Create a high-quality ultra-realistic 3D render of a premium digital product bundle scene on a pure black background.
📦 Box Structure:
Use multiple matte black 3D boxes (mix of small and large boxes in stacked pyramid layout)
Center box should be largest and slightly forward
Other boxes placed symmetrically around it
🎯 Center Box (IMPORTANT):
Place a clean, flat white "E" logo in the center
Logo must be clean, flat white (no red background)
Logo size should be perfectly centered and proportionate
🎨 Colors & Glow:
Remove red background completely
Add soft glow at bottom of boxes (color: subtle white / soft blue / neon purple)
Keep overall look dark, premium, minimal
🧱 Box Text:
Add different titles on boxes like: Marketing, Business, Social Media, E-commerce, AI Tools, Templates, Content
Use clean white modern font
💡 Lighting:
Cinematic lighting
Soft reflections and shadows
Subtle glow from inside boxes
📱 Background:
Pure black (#000000)
No gradient, no texture
💎 Style:
Ultra realistic 3D render
Premium SaaS / product showcase style
4K quality
🚫 Avoid:
No red background
No cartoon style
No messy colors`;

  try {
    console.log("Generating image...");
    const response = await ai.models.generateContent({
      model: 'gemini-3.1-flash-image-preview',
      contents: {
        parts: [
          { text: prompt }
        ]
      },
      config: {
        imageConfig: {
          aspectRatio: "16:9",
          imageSize: "1K"
        }
      }
    });

    const parts = response.candidates?.[0]?.content?.parts || [];
    for (const part of parts) {
      if (part.inlineData) {
        const buffer = Buffer.from(part.inlineData.data, 'base64');
        const outPath = path.join(process.cwd(), 'public', 'bundle-scene.png');
        fs.writeFileSync(outPath, buffer);
        console.log('Image generated at', outPath);
        return;
      }
    }
    console.log('No image data found in response');
  } catch (err) {
    console.error('Error generating image:', err);
  }
}

main();
