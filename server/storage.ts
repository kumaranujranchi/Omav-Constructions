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
  getProjectsByStatus(status: string): Promise<Project[]>;
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
  
  async getProjectsByStatus(status: string): Promise<Project[]> {
    return Array.from(this.projects.values()).filter(
      project => project.status === status
    );
  }

  async createProject(project: InsertProject): Promise<Project> {
    const id = this.currentProjectId++;
    const defaultProject: Omit<Project, 'id'> = {
      title: project.title,
      description: project.description,
      fullDescription: project.fullDescription ?? null,
      projectType: project.projectType,
      status: project.status ?? "completed",
      location: project.location ?? null,
      startDate: project.startDate ?? null,
      completedDate: project.completedDate ?? null,
      imageUrl: project.imageUrl,
      images: project.images ?? null,
      timeline: project.timeline ?? null,
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
        fullDescription: "This stunning 3-story luxury villa in Patna represents the pinnacle of modern residential construction. Built on a 5000 sq. ft. plot, the home features open floor plans, floor-to-ceiling windows, premium marble flooring, and smart home integration throughout. The project was completed 2 months ahead of schedule while maintaining the highest quality standards.",
        projectType: "residential",
        status: "completed",
        location: "Patna, Bihar",
        startDate: "March 2022",
        completedDate: "January 2023",
        imageUrl: "https://i.postimg.cc/ZnDBFR3h/a-3d-render-of-a-modern-posh-3bhk-home-exterior-th-dei-WOEw-TTs-Gokm-Ig-Xwsa-A-MZR3p-Mgb-T2u-Pc-LRo6-h6uw.png",
        images: [
          "https://i.postimg.cc/ZnDBFR3h/a-3d-render-of-a-modern-posh-3bhk-home-exterior-th-dei-WOEw-TTs-Gokm-Ig-Xwsa-A-MZR3p-Mgb-T2u-Pc-LRo6-h6uw.png",
          "https://i.postimg.cc/Fs7JFy5F/a-photo-of-a-modern-duplex-house-with-two-stories-Pf9j7z-DASUGb3-K3-TItu-In-A-M0-E3v-Wcs-Rvq-Rct-Flj3o-Gb-A.png",
          "https://i.postimg.cc/q7dtGWtg/anujkumar4655-3-D-view-2-Story-Building-Wooden-Exterior-Car-in-t-20736489-be69-4047-b1f9-70cc5f89c239.png"
        ],
        timeline: JSON.stringify([
          { id: "1", date: "March 2022", title: "Project Initiation", description: "Site survey completed and foundation work began" },
          { id: "2", date: "May 2022", title: "Foundation Complete", description: "RCC foundation work finished with quality inspection" },
          { id: "3", date: "August 2022", title: "Structure Complete", description: "All three floors structure completed including roofing" },
          { id: "4", date: "November 2022", title: "Interior Work", description: "Electrical, plumbing, and interior finishing work" },
          { id: "5", date: "January 2023", title: "Project Handover", description: "Final inspection completed and keys handed over to client" }
        ]),
        featured: true
      },
      {
        title: "Tech Park Office Complex",
        description: "A 50,000 sq. ft. modern office space with sustainable design elements and smart building features.",
        fullDescription: "This state-of-the-art office complex spans 50,000 sq. ft. and incorporates sustainable design principles including solar panels, rainwater harvesting, and energy-efficient HVAC systems. The building features open collaborative spaces, private offices, conference facilities, and a rooftop garden.",
        projectType: "commercial",
        status: "completed",
        location: "Ranchi, Jharkhand",
        startDate: "January 2021",
        completedDate: "October 2022",
        imageUrl: "https://i.postimg.cc/q7dtGWtg/anujkumar4655-3-D-view-2-Story-Building-Wooden-Exterior-Car-in-t-20736489-be69-4047-b1f9-70cc5f89c239.png",
        images: [
          "https://i.postimg.cc/q7dtGWtg/anujkumar4655-3-D-view-2-Story-Building-Wooden-Exterior-Car-in-t-20736489-be69-4047-b1f9-70cc5f89c239.png",
          "https://i.postimg.cc/ZnDBFR3h/a-3d-render-of-a-modern-posh-3bhk-home-exterior-th-dei-WOEw-TTs-Gokm-Ig-Xwsa-A-MZR3p-Mgb-T2u-Pc-LRo6-h6uw.png"
        ],
        timeline: JSON.stringify([
          { id: "1", date: "January 2021", title: "Project Start", description: "Site clearance and excavation work began" },
          { id: "2", date: "June 2021", title: "Foundation Complete", description: "Deep foundation and basement parking completed" },
          { id: "3", date: "February 2022", title: "Structural Work", description: "All 5 floors structural work completed" },
          { id: "4", date: "July 2022", title: "MEP Installation", description: "Mechanical, electrical, and plumbing systems installed" },
          { id: "5", date: "October 2022", title: "Handover", description: "Building handed over with all certifications" }
        ]),
        featured: true
      },
      {
        title: "Modern School Campus",
        description: "A comprehensive educational facility with classrooms, laboratories, and sports facilities.",
        fullDescription: "This modern school campus features 30 smart classrooms, 5 fully-equipped science laboratories, a library, computer labs, an auditorium, sports grounds, and administrative buildings. The campus is designed to provide an optimal learning environment with natural lighting and ventilation.",
        projectType: "institutional",
        status: "completed",
        location: "Gaya, Bihar",
        startDate: "June 2021",
        completedDate: "August 2022",
        imageUrl: "https://i.postimg.cc/Fs7JFy5F/a-photo-of-a-modern-duplex-house-with-two-stories-Pf9j7z-DASUGb3-K3-TItu-In-A-M0-E3v-Wcs-Rvq-Rct-Flj3o-Gb-A.png",
        images: [
          "https://i.postimg.cc/Fs7JFy5F/a-photo-of-a-modern-duplex-house-with-two-stories-Pf9j7z-DASUGb3-K3-TItu-In-A-M0-E3v-Wcs-Rvq-Rct-Flj3o-Gb-A.png",
          "https://i.postimg.cc/q7dtGWtg/anujkumar4655-3-D-view-2-Story-Building-Wooden-Exterior-Car-in-t-20736489-be69-4047-b1f9-70cc5f89c239.png"
        ],
        timeline: JSON.stringify([
          { id: "1", date: "June 2021", title: "Project Initiation", description: "Ground breaking ceremony and site preparation" },
          { id: "2", date: "October 2021", title: "Foundation Work", description: "Foundation for all buildings completed" },
          { id: "3", date: "March 2022", title: "Structure Complete", description: "All building structures and roofing completed" },
          { id: "4", date: "June 2022", title: "Finishing Work", description: "Interior work and facility installations" },
          { id: "5", date: "August 2022", title: "Inauguration", description: "Campus inaugurated and ready for academic session" }
        ]),
        featured: true
      },
      {
        title: "Luxury Apartment Complex",
        description: "A premium 12-floor apartment complex with modern amenities currently under construction in Patna.",
        fullDescription: "This premium residential project features 48 luxury apartments across 12 floors. Each apartment offers spacious 3 and 4 BHK configurations with modern amenities including a swimming pool, gym, clubhouse, landscaped gardens, and 24/7 security. Currently in the advanced construction phase.",
        projectType: "residential",
        status: "running",
        location: "Patna, Bihar",
        startDate: "September 2024",
        completedDate: null,
        imageUrl: "https://i.postimg.cc/ZnDBFR3h/a-3d-render-of-a-modern-posh-3bhk-home-exterior-th-dei-WOEw-TTs-Gokm-Ig-Xwsa-A-MZR3p-Mgb-T2u-Pc-LRo6-h6uw.png",
        images: [
          "https://i.postimg.cc/ZnDBFR3h/a-3d-render-of-a-modern-posh-3bhk-home-exterior-th-dei-WOEw-TTs-Gokm-Ig-Xwsa-A-MZR3p-Mgb-T2u-Pc-LRo6-h6uw.png",
          "https://i.postimg.cc/Fs7JFy5F/a-photo-of-a-modern-duplex-house-with-two-stories-Pf9j7z-DASUGb3-K3-TItu-In-A-M0-E3v-Wcs-Rvq-Rct-Flj3o-Gb-A.png"
        ],
        timeline: JSON.stringify([
          { id: "1", date: "September 2024", title: "Project Launch", description: "Excavation and site preparation started" },
          { id: "2", date: "November 2024", title: "Foundation Work", description: "Deep foundation and basement construction in progress" },
          { id: "3", date: "December 2024", title: "Current Phase", description: "Foundation work ongoing, 60% completed" }
        ]),
        featured: false
      },
      {
        title: "Shopping Mall Development",
        description: "A modern shopping mall with entertainment zone currently being built in Ranchi.",
        fullDescription: "This upcoming shopping destination will feature 200+ retail outlets, a multiplex cinema, food court, gaming zone, and ample parking. The mall spans 150,000 sq. ft. across 4 floors and will become a landmark shopping destination in the region.",
        projectType: "commercial",
        status: "running",
        location: "Ranchi, Jharkhand",
        startDate: "June 2024",
        completedDate: null,
        imageUrl: "https://i.postimg.cc/q7dtGWtg/anujkumar4655-3-D-view-2-Story-Building-Wooden-Exterior-Car-in-t-20736489-be69-4047-b1f9-70cc5f89c239.png",
        images: [
          "https://i.postimg.cc/q7dtGWtg/anujkumar4655-3-D-view-2-Story-Building-Wooden-Exterior-Car-in-t-20736489-be69-4047-b1f9-70cc5f89c239.png"
        ],
        timeline: JSON.stringify([
          { id: "1", date: "June 2024", title: "Project Start", description: "Site acquisition and clearance completed" },
          { id: "2", date: "August 2024", title: "Excavation", description: "Excavation for basement parking completed" },
          { id: "3", date: "November 2024", title: "Foundation", description: "Foundation work 80% completed" },
          { id: "4", date: "December 2024", title: "Current Phase", description: "Ground floor structure work in progress" }
        ]),
        featured: false
      },
      {
        title: "Government Hospital Extension",
        description: "Extension wing for district hospital with 200 additional beds and modern medical facilities.",
        fullDescription: "This government project adds a new wing to the existing district hospital with 200 beds, 4 operation theaters, ICU, emergency ward, and modern diagnostic facilities. The project follows all healthcare construction standards and regulations.",
        projectType: "institutional",
        status: "running",
        location: "Muzaffarpur, Bihar",
        startDate: "March 2024",
        completedDate: null,
        imageUrl: "https://i.postimg.cc/Fs7JFy5F/a-photo-of-a-modern-duplex-house-with-two-stories-Pf9j7z-DASUGb3-K3-TItu-In-A-M0-E3v-Wcs-Rvq-Rct-Flj3o-Gb-A.png",
        images: [
          "https://i.postimg.cc/Fs7JFy5F/a-photo-of-a-modern-duplex-house-with-two-stories-Pf9j7z-DASUGb3-K3-TItu-In-A-M0-E3v-Wcs-Rvq-Rct-Flj3o-Gb-A.png"
        ],
        timeline: JSON.stringify([
          { id: "1", date: "March 2024", title: "Project Initiation", description: "Site preparation and planning approval received" },
          { id: "2", date: "May 2024", title: "Foundation", description: "Foundation and basement work completed" },
          { id: "3", date: "September 2024", title: "Structure Work", description: "Ground and first floor structure completed" },
          { id: "4", date: "December 2024", title: "Current Phase", description: "Second floor structure work in progress, MEP planning underway" }
        ]),
        featured: false
      }
    ];
    
    sampleProjects.forEach(project => {
      this.createProject(project);
    });
  }
}

export const storage = new MemStorage();
