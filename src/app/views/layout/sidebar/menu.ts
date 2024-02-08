import { MenuItem } from './menu.model';

export const MENU: MenuItem[] = [
  {
    label: 'Main',
    isTitle: true
  },
  {
    label: 'Dashboard',
    icon: 'home',
    link: '/dashboard'
  },
  {
    label: 'Admin',
    isTitle: true
  },
  {
    label: 'Add User',
    icon: 'file-text',
    link: '/admin/user',
  },
  {
    label: 'Users',
    icon: 'layout',
    link: '/admin/users',
  },
  {
    label: 'Role',
    icon: 'layout',
    link: '/admin/role',
  },
  {
    label: 'Driver',
    isTitle: true
  },
  {
    label: 'Add Driver',
    icon: 'file-text',
    link: '/admin/driver/register',
  },
  {
    label: 'Drivers',
    icon: 'layout',
    link: '/admin/drivers',
  },
  {
    label: 'Owner',
    isTitle: true
  },
  {
    label: 'Add Owner',
    icon: 'file-text',
    link: '/admin/owner',
  },
  {
    label: 'Owners',
    icon: 'layout',
    link: '/admin/owners',
  },
  
 
];
