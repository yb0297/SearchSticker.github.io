import { sql } from "drizzle-orm";
import { pgTable, text, varchar, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const stickers = pgTable("stickers", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  name: text("name").notNull(),
  macAddress: text("mac_address").notNull().unique(),
  batteryLevel: integer("battery_level").notNull(),
  rssi: integer("rssi").notNull(),
  assetName: text("asset_name"),
  location: text("location"),
  lastSeen: timestamp("last_seen").notNull(),
  status: text("status").notNull(),
});

export const insertStickerSchema = createInsertSchema(stickers).omit({
  id: true,
});

export type InsertSticker = z.infer<typeof insertStickerSchema>;
export type Sticker = typeof stickers.$inferSelect;
