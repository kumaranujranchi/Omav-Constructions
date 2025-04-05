import { 
  users, type User, type InsertUser,
  contactForms, type ContactForm, type InsertContactForm,
  projects, type Project, type InsertProject
} from "@shared/schema";

// Extended storage interface to handle all data models
export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Contact form methods
  getContactForms(): Promise<ContactForm[]>;
  getContactForm(id: number): Promise<ContactForm | undefined>;
  createContactForm(form: InsertContactForm): Promise<ContactForm>;
  markContactFormAsProcessed(id: number): Promise<ContactForm | undefined>;
  
  // Project methods 
  getProjects(): Promise<Project[]>;
  getProjectsByType(type: string): Promise<Project[]>;
  getProject(id: number): Promise<Project | undefined>;
  getFeaturedProjects(): Promise<Project[]>;
  createProject(project: InsertProject): Promise<Project>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private contactForms: Map<number, ContactForm>;
  private projects: Map<number, Project>;
  private currentUserId: number;
  private currentContactFormId: number;
  private currentProjectId: number;

  constructor() {
    this.users = new Map();
    this.contactForms = new Map();
    this.projects = new Map();
    this.currentUserId = 1;
    this.currentContactFormId = 1;
    this.currentProjectId = 1;
    
    // Initialize with sample projects data
    this.initializeProjects();
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }
  
  // Contact form methods
  async getContactForms(): Promise<ContactForm[]> {
    return Array.from(this.contactForms.values());
  }
  
  async getContactForm(id: number): Promise<ContactForm | undefined> {
    return this.contactForms.get(id);
  }
  
  async createContactForm(form: InsertContactForm): Promise<ContactForm> {
    const id = this.currentContactFormId++;
    const contactForm: ContactForm = { 
      ...form, 
      id, 
      createdAt: new Date(), 
      isProcessed: false
    };
    this.contactForms.set(id, contactForm);
    return contactForm;
  }
  
  async markContactFormAsProcessed(id: number): Promise<ContactForm | undefined> {
    const form = this.contactForms.get(id);
    if (form) {
      const updatedForm = { ...form, isProcessed: true };
      this.contactForms.set(id, updatedForm);
      return updatedForm;
    }
    return undefined;
  }
  
  // Project methods
  async getProjects(): Promise<Project[]> {
    return Array.from(this.projects.values());
  }
  
  async getProjectsByType(type: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.projectType === type
    );
  }
  
  async getProject(id: number): Promise<Project | undefined> {
    return this.projects.get(id);
  }
  
  async getFeaturedProjects(): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.featured
    );
  }
  
  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const newProject: Project = { ...project, id };
    this.projects.set(id, newProject);
    return newProject;
  }
  
  // Initialize with sample projects
  private initializeProjects() {
    const sampleProjects: InsertProject[] = [
      {
        title: "Modern Villa in Patna",
        description: "A 3-story luxury residence with custom interiors, delivered 2 months ahead of schedule.",
        projectType: "residential",
        imageUrl: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c",
        completedDate: "Jan 2023",
        featured: true
      },
      {
        title: "Tech Park Office Complex",
        description: "A 50,000 sq. ft. modern office space with sustainable design elements and smart building features.",
        projectType: "commercial",
        imageUrl: "https://images.unsplash.com/photo-1497366754035-f200968a6e72",
        completedDate: "Oct 2022",
        featured: true
      },
      {
        title: "Modern School Campus",
        description: "A comprehensive educational facility with classrooms, laboratories, and sports facilities.",
        projectType: "institutional",
        imageUrl: "https://images.unsplash.com/photo-1562010494-8e325089f3a5",
        completedDate: "Aug 2022",
        featured: true
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }
}

export const storage = new MemStorage();
