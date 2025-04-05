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
    const user: User = { 
      ...insertUser, 
      id,
      role: insertUser.role || "viewer", // Set default role if not provided
      createdAt: new Date(),
      lastLogin: null
    };
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
    
    const defaultForm: Omit<ContactForm, 'id'> = {
      name: form.name,
      email: form.email !== undefined ? form.email : null,
      phone: form.phone,
      city: form.city,
      landSize: form.landSize,
      landDimensionNorthFeet: form.landDimensionNorthFeet,
      landDimensionNorthInches: form.landDimensionNorthInches,
      landDimensionSouthFeet: form.landDimensionSouthFeet,
      landDimensionSouthInches: form.landDimensionSouthInches,
      landDimensionEastFeet: form.landDimensionEastFeet,
      landDimensionEastInches: form.landDimensionEastInches,
      landDimensionWestFeet: form.landDimensionWestFeet,
      landDimensionWestInches: form.landDimensionWestInches,
      landFacing: form.landFacing,
      projectType: form.projectType,
      message: form.message ?? null,
      createdAt: new Date(),
      isProcessed: false
    };
    
    const contactForm: ContactForm = { 
      ...defaultForm,
      id
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
    const defaultProject: Omit<Project, 'id'> = {
      title: project.title,
      description: project.description,
      projectType: project.projectType,
      imageUrl: project.imageUrl,
      completedDate: project.completedDate,
      featured: project.featured ?? false
    };
    
    const newProject: Project = { 
      ...defaultProject, 
      id
    };
    
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
        imageUrl: "https://i.postimg.cc/ZnDBFR3h/a-3d-render-of-a-modern-posh-3bhk-home-exterior-th-dei-WOEw-TTs-Gokm-Ig-Xwsa-A-MZR3p-Mgb-T2u-Pc-LRo6-h6uw.png",
        completedDate: "Jan 2023",
        featured: true
      },
      {
        title: "Tech Park Office Complex",
        description: "A 50,000 sq. ft. modern office space with sustainable design elements and smart building features.",
        projectType: "commercial",
        imageUrl: "https://i.postimg.cc/q7dtGWtg/anujkumar4655-3-D-view-2-Story-Building-Wooden-Exterior-Car-in-t-20736489-be69-4047-b1f9-70cc5f89c239.png",
        completedDate: "Oct 2022",
        featured: true
      },
      {
        title: "Modern School Campus",
        description: "A comprehensive educational facility with classrooms, laboratories, and sports facilities.",
        projectType: "institutional",
        imageUrl: "https://i.postimg.cc/Fs7JFy5F/a-photo-of-a-modern-duplex-house-with-two-stories-Pf9j7z-DASUGb3-K3-TItu-In-A-M0-E3v-Wcs-Rvq-Rct-Flj3o-Gb-A.png",
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
