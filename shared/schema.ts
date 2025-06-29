import { pgTable, text, serial, integer, boolean, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  role: text("role").notNull().default("admin"),
});

export const categories = pgTable("categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  icon: text("icon").notNull(),
});

export const maids = pgTable("maids", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  age: integer("age").notNull(),
  categoryId: integer("category_id").notNull(),
  experience: integer("experience").notNull(),
  available: boolean("available").notNull().default(true),
  phone: text("phone").notNull(),
  email: text("email"),
});

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  bookingNumber: text("booking_number").notNull().unique(),
  customerName: text("customer_name").notNull(),
  customerPhone: text("customer_phone").notNull(),
  customerEmail: text("customer_email").notNull(),
  categoryId: integer("category_id").notNull(),
  preferredDate: text("preferred_date").notNull(),
  preferredTime: text("preferred_time").notNull(),
  address: text("address").notNull(),
  requirements: text("requirements"),
  status: text("status").notNull().default("pending"), // pending, approved, assigned, canceled
  assignedMaidId: integer("assigned_maid_id"),
  createdAt: timestamp("created_at").notNull().defaultNow(),
});

export const pages = pgTable("pages", {
  id: serial("id").primaryKey(),
  slug: text("slug").notNull().unique(),
  title: text("title").notNull(),
  content: text("content").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertCategorySchema = createInsertSchema(categories).pick({
  name: true,
  description: true,
  icon: true,
});

export const insertMaidSchema = createInsertSchema(maids).pick({
  name: true,
  age: true,
  categoryId: true,
  experience: true,
  phone: true,
  email: true,
});

export const insertBookingSchema = createInsertSchema(bookings).pick({
  customerName: true,
  customerPhone: true,
  customerEmail: true,
  categoryId: true,
  preferredDate: true,
  preferredTime: true,
  address: true,
  requirements: true,
});

export const insertPageSchema = createInsertSchema(pages).pick({
  slug: true,
  title: true,
  content: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Category = typeof categories.$inferSelect;
export type InsertCategory = z.infer<typeof insertCategorySchema>;

export type Maid = typeof maids.$inferSelect;
export type InsertMaid = z.infer<typeof insertMaidSchema>;

export type Booking = typeof bookings.$inferSelect;
export type InsertBooking = z.infer<typeof insertBookingSchema>;

export type Page = typeof pages.$inferSelect;
export type InsertPage = z.infer<typeof insertPageSchema>;
