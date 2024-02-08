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
    label: 'Role',
    icon: 'layout',
    link: '/admin/role',
  },
 
  {
    label: 'Users',
    icon: 'layout',
    link: '/admin/users',
  },
  {
    label: 'Add User',
    icon: 'file-text',
    link: '/admin/user',
  },
  {
    label: 'Driver',
    isTitle: true
  },
  {
    label: 'Drivers',
    icon: 'layout',
    link: '/admin/drivers',
  },
  {
    label: 'Add Driver',
    icon: 'file-text',
    link: '/admin/driver/register',
  },
  {
    label: 'Owner',
    isTitle: true
  },
  {
    label: 'Owners',
    icon: 'layout',
    link: '/admin/owners',
  },
  {
    label: 'Add Owner',
    icon: 'file-text',
    link: '/admin/owner',
  },
 
];
