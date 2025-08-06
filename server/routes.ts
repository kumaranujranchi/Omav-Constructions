import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertContactFormSchema } from "@shared/schema";
import { fromZodError } from "zod-validation-error";
import { setupAuth } from "./auth";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Setup Authentication
  setupAuth(app);
  
  // API Routes
  
  // Get featured projects
  app.get('/api/projects/featured', async (req: Request, res: Response) => {
    try {
      const projects = await storage.getFeaturedProjects();
      res.json(projects);
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      res.status(500).json({ message: 'Error fetching featured projects' });
    }
  });
  
  // Get all projects
  app.get('/api/projects', async (req: Request, res: Response) => {
    try {
      let projects;
      const { type } = req.query;
      
      if (type && typeof type === 'string') {
        projects = await storage.getProjectsByType(type);
      } else {
        projects = await storage.getProjects();
      }
      
      res.json(projects);
    } catch (error) {
      console.error('Error fetching projects:', error);
      res.status(500).json({ message: 'Error fetching projects' });
    }
  });
  
  // Get a specific project by ID
  app.get('/api/projects/:id', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid project ID' });
      }
      
      const project = await storage.getProject(id);
      
      if (!project) {
        return res.status(404).json({ message: 'Project not found' });
      }
      
      res.json(project);
    } catch (error) {
      console.error('Error fetching project:', error);
      res.status(500).json({ message: 'Error fetching project' });
    }
  });
  
  // Submit contact form
  app.post('/api/contact', async (req: Request, res: Response) => {
    try {
      const result = insertContactFormSchema.safeParse(req.body);
      
      if (!result.success) {
        const errorMessage = fromZodError(result.error).message;
        return res.status(400).json({ message: errorMessage });
      }
      
      const contactForm = await storage.createContactForm(result.data);
      res.status(201).json({ message: 'Form submitted successfully', id: contactForm.id });
    } catch (error) {
      console.error('Error submitting contact form:', error);
      res.status(500).json({ message: 'Error submitting contact form' });
    }
  });



  // ---- Admin Dashboard Routes ----
  
  // Get all contact form submissions
  app.get('/api/admin/dashboard/contact-forms', async (req: Request, res: Response) => {
    try {
      const contactForms = await storage.getContactForms();
      res.json(contactForms);
    } catch (error) {
      console.error('Error fetching contact forms:', error);
      res.status(500).json({ message: 'Error fetching contact forms' });
    }
  });
  
  // Mark contact form as processed
  app.patch('/api/admin/dashboard/contact-forms/:id/process', async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      
      if (isNaN(id)) {
        return res.status(400).json({ message: 'Invalid contact form ID' });
      }
      
      const contactForm = await storage.markContactFormAsProcessed(id);
      
      if (!contactForm) {
        return res.status(404).json({ message: 'Contact form not found' });
      }
      
      res.json(contactForm);
    } catch (error) {
      console.error('Error processing contact form:', error);
      res.status(500).json({ message: 'Error processing contact form' });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
