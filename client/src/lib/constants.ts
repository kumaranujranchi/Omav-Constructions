import { ServiceType, ClientSolutionType, ProcessStepType, ResourceItemType } from './types';

// Services data
export const services: ServiceType[] = [
  {
    id: 'residential',
    title: 'Residential & Commercial Construction',
    icon: 'fas fa-building',
    shortDescription: 'End-to-end building construction solutions for homes, apartments, offices, and commercial spaces.',
    fullDescription: 'From individual homes to commercial complexes, we provide comprehensive construction solutions – from ground-breaking to final finishing. Our focus on quality craftsmanship, strict safety standards, and timely completion ensures every project is durable, functional, and aesthetically pleasing.',
    features: [
      'Residential Buildings (houses, villas, apartments)',
      'Commercial Projects (offices, retail spaces, etc.)',
      'Institutional Projects (schools, hospitals, etc.)',
      'Complete MEP (Mechanical, Electrical, Plumbing) services',
      'Foundation to finishing execution'
    ],
    benefits: [
      'One-stop solution for all construction needs',
      'Quality materials and craftsmanship',
      'Adherence to safety standards',
      'Timely project completion',
      'Cost-effective solutions'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'architectural',
    title: 'Architectural Design & Planning',
    icon: 'fas fa-drafting-compass',
    shortDescription: 'In-house architecture services including concept design, blueprints, and regulatory approvals.',
    fullDescription: 'Our architectural design and planning services encompass everything from conceptual designs to detailed construction drawings and regulatory approvals. Our team of skilled architects combines creativity with functionality to create spaces that are both beautiful and practical.',
    features: [
      'Concept design and development',
      'Detailed architectural drawings',
      '3D modeling and visualizations',
      'Construction documentation',
      'Regulatory compliance and approvals',
      'Site analysis and feasibility studies'
    ],
    benefits: [
      'Seamless integration of design and construction',
      'Creative solutions tailored to client needs',
      'Expert navigation of building codes and regulations',
      'Sustainable and energy-efficient designs',
      'Cost-effective planning'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1574964250186-74d8036dee1c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1074&q=80'
  },
  {
    id: 'interior',
    title: 'Interior Design & Turnkey Solutions',
    icon: 'fas fa-couch',
    shortDescription: 'Interior design, fit-outs, and turnkey project execution for fully finished living and working spaces.',
    fullDescription: 'Transform your space with our comprehensive interior design and turnkey solutions. From initial concept to final execution, we handle every aspect of interior design including spatial planning, material selection, custom furniture, lighting, and decor to create spaces that reflect your taste and meet your functional needs.',
    features: [
      'Complete interior design services',
      'Custom furniture design and manufacturing',
      'Material and finish selection',
      'Lighting design and implementation',
      'Turnkey project execution',
      'Procurement and installation'
    ],
    benefits: [
      'Cohesive design aesthetic throughout the space',
      'Expert material selection for durability and style',
      'Space optimization for functionality',
      'Hassle-free execution with single-point responsibility',
      'Quality control on all aspects of interiors'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1618221195710-dd6b41faaea6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'consultancy',
    title: 'Building Consultancy & Project Management',
    icon: 'fas fa-tasks',
    shortDescription: 'Construction consultancy, project supervision, cost planning, and comprehensive engineering services.',
    fullDescription: 'Our consulting and project management services provide expert guidance throughout your construction project. We offer technical expertise, strategic planning, and meticulous oversight to ensure your project is completed on time, within budget, and to the highest quality standards.',
    features: [
      'Comprehensive project management',
      'Cost estimation and budgeting',
      'Schedule development and tracking',
      'Quality assurance and control',
      'Risk assessment and mitigation',
      'Contract administration',
      'Technical consulting on construction methods'
    ],
    benefits: [
      'Professional oversight throughout the project lifecycle',
      'Optimization of project costs and timelines',
      'Reduction of construction risks',
      'Coordination between all stakeholders',
      'Adherence to quality standards and specifications'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  }
];

// Client solutions data
export const clientSolutions: ClientSolutionType[] = [
  {
    id: 'homeowners',
    title: 'For Homeowners',
    description: 'Building your dream home requires careful planning, quality execution, and attention to detail. At Omav Construction, we understand that your home is not just a structure but a reflection of your aspirations and lifestyle.',
    icon: 'fas fa-home',
    benefits: [
      'Transparent budgeting with no hidden costs',
      'Personalized design that reflects your lifestyle',
      'Quality materials and craftsmanship',
      'Regular updates and site visits',
      'On-time delivery and handover',
      'Post-construction support'
    ],
    features: [
      'Customized home designs',
      'Budget-friendly options without compromising quality',
      'Energy-efficient building solutions',
      'Smart home integration options',
      'Premium finishes and fixtures',
      'Landscaping and exterior development'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'developers',
    title: 'For Real Estate Developers',
    description: 'Developing successful residential or commercial projects requires experienced partners who understand the complexities of large-scale construction. Our team provides the expertise and resources needed to execute developments of any size.',
    icon: 'fas fa-city',
    benefits: [
      'Scalable construction capabilities',
      'Regulatory compliance expertise',
      'Efficient project management',
      'Cost-effective material sourcing',
      'Quality control across multiple units',
      'Timely completion for faster ROI'
    ],
    features: [
      'Multi-unit residential development',
      'Commercial complex construction',
      'Mixed-use development expertise',
      'Phased construction planning',
      'Value engineering services',
      'Sustainable development options'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80'
  },
  {
    id: 'commercial',
    title: 'For Commercial Clients',
    description: 'Your business space should reflect your brand, enhance productivity, and provide functionality specific to your industry needs. We create commercial spaces that balance aesthetics, efficiency, and practicality.',
    icon: 'fas fa-building',
    benefits: [
      'Customized commercial spaces',
      'Minimal business disruption',
      'Industry-specific solutions',
      'Energy-efficient design options',
      'Future-ready infrastructure',
      'Maintenance support'
    ],
    features: [
      'Office space planning and construction',
      'Retail outlet development',
      'Industrial facility construction',
      'Restaurant and hospitality spaces',
      'Healthcare facility construction',
      'Educational institution development'
    ],
    imageUrl: 'https://images.unsplash.com/photo-1497366811353-6870744d04b2?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80'
  }
];

// Process steps data
export const processSteps: ProcessStepType[] = [
  {
    number: 1,
    title: 'Requirements Gathering',
    description: 'We begin with a detailed consultation to understand your vision, requirements, and budget constraints, creating a solid foundation for your project.',
    imageUrl: 'https://i.postimg.cc/jd9kg4QG/Requirements-Gathering.png'
  },
  {
    number: 2,
    title: 'Design & Quotation',
    description: 'Our architects and designers create detailed plans and 3D visualizations, accompanied by a transparent, itemized quotation for your approval.',
    imageUrl: 'https://i.postimg.cc/sDwZsT0N/Design-Quotation.png'
  },
  {
    number: 3,
    title: 'Execution & Tracking',
    description: 'Once approved, our skilled team begins construction with regular quality checks and progress updates, ensuring adherence to timelines and standards.',
    imageUrl: 'https://i.postimg.cc/Wz9bLHbm/Execution-Tracking.png'
  },
  {
    number: 4,
    title: 'Handover & Support',
    description: 'Following a thorough final inspection, we hand over your completed project with all documentation and provide ongoing maintenance support.',
    imageUrl: 'https://i.postimg.cc/V68NjtVt/Handover-Support.png'
  }
];

// Resources data
export const resources: ResourceItemType[] = [
  {
    id: 'cost-estimator',
    title: 'Construction Cost Estimator',
    description: 'Get a quick estimate for your construction project based on size, location, and specifications.',
    type: 'calculator',
    icon: 'fas fa-calculator',
    link: '/resources/cost-estimator'
  },
  {
    id: 'project-tracker',
    title: 'Client Project Tracker',
    description: 'Existing clients can log in to track their project progress, view updates, and communicate with the team.',
    type: 'tracker',
    icon: 'fas fa-tasks',
    link: '/resources/project-tracker'
  },
  {
    id: 'knowledge-center',
    title: 'Knowledge Center',
    description: 'Educational articles, guides, and FAQs about construction, design tips, budgeting, and more.',
    type: 'article',
    icon: 'fas fa-book-open',
    link: '/resources/knowledge-center'
  }
];
