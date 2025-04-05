import { pgTable, text, serial, integer, timestamp, boolean } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// User schema (keeping original)
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

// Project types enum
export const projectTypeEnum = z.enum([
  "residential",
  "commercial",
  "institutional"
]);

export type ProjectType = z.infer<typeof projectTypeEnum>;

// Contact form schema
export const contactForms = pgTable("contact_forms", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email"),
  phone: text("phone").notNull(),
  city: text("city").notNull(),
  landSize: text("land_size").notNull(),
  landDimensionNorthFeet: text("land_dimension_north_feet").notNull(),
  landDimensionNorthInches: text("land_dimension_north_inches").notNull(),
  landDimensionSouthFeet: text("land_dimension_south_feet").notNull(),
  landDimensionSouthInches: text("land_dimension_south_inches").notNull(),
  landDimensionEastFeet: text("land_dimension_east_feet").notNull(),
  landDimensionEastInches: text("land_dimension_east_inches").notNull(),
  landDimensionWestFeet: text("land_dimension_west_feet").notNull(),
  landDimensionWestInches: text("land_dimension_west_inches").notNull(),
  landFacing: text("land_facing").notNull(),
  projectType: text("project_type").notNull(),
  message: text("message"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  isProcessed: boolean("is_processed").default(false).notNull(),
});

export const insertContactFormSchema = createInsertSchema(contactForms).pick({
  name: true,
  email: true,
  phone: true,
  city: true,
  landSize: true,
  landDimensionNorthFeet: true,
  landDimensionNorthInches: true,
  landDimensionSouthFeet: true,
  landDimensionSouthInches: true,
  landDimensionEastFeet: true,
  landDimensionEastInches: true,
  landDimensionWestFeet: true,
  landDimensionWestInches: true,
  landFacing: true,
  projectType: true,
  message: true,
});

// Project schema
export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  description: text("description").notNull(),
  projectType: text("project_type").notNull(),
  imageUrl: text("image_url").notNull(),
  completedDate: text("completed_date").notNull(),
  featured: boolean("featured").default(false).notNull(),
});

export const insertProjectSchema = createInsertSchema(projects);

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type InsertContactForm = z.infer<typeof insertContactFormSchema>;
export type ContactForm = typeof contactForms.$inferSelect;
export type Project = typeof projects.$inferSelect;
export type InsertProject = z.infer<typeof insertProjectSchema>;
