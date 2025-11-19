// app/types/checklist.ts

export interface ChecklistItem {
  id: string;         
  text: string;       
  completed: boolean;  
}

export interface Category {
  id: string;                
  name: string;            
  description?: string;    
  items: ChecklistItem[];    
}
export type Checklist = Category[];
