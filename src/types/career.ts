export interface Resource {
  title: string;
  url: string;
}

export interface RoadmapStep {
  title: string;
  description: string;
  resources: Resource[];
  completed?: boolean;
}

export interface Tool {
  name: string;
  icon: string;
}

export interface Project {
  title: string;
  description: string;
}

export interface Role {
  title: string;
  salary: string;
}

export interface Career {
  id: string;
  title: string;
  overview: string;
  roadmap: RoadmapStep[];
  tools: Tool[];
  projects: Project[];
  roles: Role[];
}

export interface SubDomain {
  id: string;
  name: string;
  icon: string;
  careers: Career[];
}

export interface Domain {
  id: string;
  name: string;
  icon: string;
  subDomains: SubDomain[];
}

export interface CareerData {
  domains: Domain[];
} 