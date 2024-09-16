import {
  ChemistIcon,
  DashboardIcon,
  DoctorIcon,
  HospitalIcon,
  MedicineIcon,
  MessageIcon,
  SettingIcon,
  StatisticsIcon,
} from '@/icons';

// Router
import { ROUTER } from './router';

export const NAVBAR_LINKS = [
  { name: 'Dashboard', href: ROUTER.DASHBOARD, icon: DashboardIcon },
  {
    name: 'Statistics',
    href: '#',
    icon: StatisticsIcon,
    active: true,
  },
  { name: 'Chemists', href: ROUTER.CHEMISTS, icon: ChemistIcon, active: true },
  { name: 'Hospitals', href: '#', icon: HospitalIcon },
  { name: 'Doctors', href: '#', icon: DoctorIcon },
  { name: 'Medicines', href: '#', icon: MedicineIcon },
];

export const SUPPORT_LINKS = [
  { name: 'Messages', href: '#', icon: MessageIcon },
  {
    name: 'Settings',
    href: '#',
    icon: SettingIcon,
    active: true,
  },
];
