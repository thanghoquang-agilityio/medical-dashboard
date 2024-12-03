import {
  AppointmentIcon,
  ChemistIcon,
  DashboardIcon,
  DoctorIcon,
  HospitalIcon,
  MedicineIcon,
  MessageIcon,
  SettingIcon,
} from '@/icons';

// Router
import { PRIVATE_ROUTES } from './router';
import WalletIcon from '@/icons/WalletIcon';

export const NAVBAR_LINKS = [
  {
    name: 'Dashboard',
    href: PRIVATE_ROUTES.DASHBOARD,
    icon: DashboardIcon,
    isEnable: true,
  },
  {
    name: 'Appointments',
    href: PRIVATE_ROUTES.APPOINTMENTS,
    icon: AppointmentIcon,
    isEnable: true,
  },
  {
    name: 'Chemists',
    href: PRIVATE_ROUTES.CHEMISTS,
    icon: ChemistIcon,
    isEnable: true,
  },
  {
    name: 'Wallet',
    href: PRIVATE_ROUTES.WALLET,
    icon: WalletIcon,
    isEnable: true,
  },
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
  },
];
