
export interface MenuItem {
  id?: number;
  label?: string;
  name:string;
  icon?: string;
  link?: string;
  expanded?: boolean;
  subItems?: any;
  isTitle?: boolean;
  badge?: any;
  parentId?: number;
  modules:[MenuItem];
}
