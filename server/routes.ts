import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertStickerSchema } from "@shared/schema";

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Get all stickers
  app.get("/api/stickers", async (_req, res) => {
    try {
      const stickers = await storage.getAllStickers();
      res.json(stickers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Get single sticker by ID
  app.get("/api/stickers/:id", async (req, res) => {
    try {
      const sticker = await storage.getSticker(req.params.id);
      if (!sticker) {
        return res.status(404).json({ message: "Sticker not found" });
      }
      res.json(sticker);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  // Create new sticker
  app.post("/api/stickers", async (req, res) => {
    try {
      const validatedData = insertStickerSchema.parse(req.body);
      const sticker = await storage.createSticker(validatedData);
      res.status(201).json(sticker);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Update sticker
  app.patch("/api/stickers/:id", async (req, res) => {
    try {
      const sticker = await storage.updateSticker(req.params.id, req.body);
      if (!sticker) {
        return res.status(404).json({ message: "Sticker not found" });
      }
      res.json(sticker);
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  });

  // Delete sticker
  app.delete("/api/stickers/:id", async (req, res) => {
    try {
      const deleted = await storage.deleteSticker(req.params.id);
      if (!deleted) {
        return res.status(404).json({ message: "Sticker not found" });
      }
      res.status(204).send();
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
