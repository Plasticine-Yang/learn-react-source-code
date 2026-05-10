export interface ModuleSection {
  id: string;
  title: string;
  file: string;
}

export interface ModuleMeta {
  id: string;
  title: string;
  description: string;
  estimatedHours: number;
  sections: ModuleSection[];
}
