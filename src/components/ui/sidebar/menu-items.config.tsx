import DASHBOARD_PAGES from '@config/pages-url.config';
import { UserRole } from '@enums/user-role.enum';
import { FaHome, FaRegUser } from 'react-icons/fa';
import { FaPerson } from 'react-icons/fa6';
import { IoDocumentSharp, IoDocumentTextSharp } from 'react-icons/io5';
import { MdDocumentScanner, MdOutlineSettings } from 'react-icons/md';
import { PiChatCircleDotsBold } from 'react-icons/pi';
import { MenuItem } from '../../../types/menu.types';

export const menuItems: Record<UserRole, MenuItem[]> = {
  [UserRole.ADMIN]: [
    {
      path: new DASHBOARD_PAGES(UserRole.ADMIN).HOME,
      label: 'Pagina principală',
      icon: <FaHome size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.ADMIN).USERS,
      label: 'Gestionare utilizatori',
      icon: <FaRegUser size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.ADMIN).MESSAGES,
      label: 'Mesaje',
      icon: <PiChatCircleDotsBold size={26} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.ADMIN).SETTINGS,
      label: 'Setări profil',
      icon: <MdOutlineSettings size={25} />,
    },
  ],

  [UserRole.DIRECTOR]: [
    {
      path: new DASHBOARD_PAGES(UserRole.DIRECTOR).HOME,
      label: 'Pagina principală',
      icon: <FaHome size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.DIRECTOR).ENTRY_DOCUMENTS,
      label: 'Documente de intrare',
      icon: <IoDocumentSharp size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.DIRECTOR).EXIT_DOCUMENTS,
      label: 'Documente de ieșire',
      icon: <IoDocumentTextSharp size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.DIRECTOR).INTERNAL_DOCUMENTS,
      label: 'Documente interne',
      icon: <MdDocumentScanner size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.DIRECTOR).PERSONS,
      label: 'Gestionare persoane',
      icon: <FaPerson size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.DIRECTOR).MESSAGES,
      label: 'Mesaje',
      icon: <PiChatCircleDotsBold size={26} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.DIRECTOR).SETTINGS,
      label: 'Setări profil',
      icon: <MdOutlineSettings size={25} />,
    },
  ],

  [UserRole.SECRETARY]: [
    {
      path: new DASHBOARD_PAGES(UserRole.SECRETARY).HOME,
      label: 'Pagina principală',
      icon: <FaHome size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.SECRETARY).ENTRY_DOCUMENTS,
      label: 'Documente de intrare',
      icon: <IoDocumentSharp size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.SECRETARY).EXIT_DOCUMENTS,
      label: 'Documente de ieșire',
      icon: <IoDocumentTextSharp size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.SECRETARY).INTERNAL_DOCUMENTS,
      label: 'Documente interne',
      icon: <MdDocumentScanner size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.SECRETARY).PERSONS,
      label: 'Gestionare persoane',
      icon: <FaPerson size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.SECRETARY).MESSAGES,
      label: 'Mesaje',
      icon: <PiChatCircleDotsBold size={26} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.SECRETARY).SETTINGS,
      label: 'Setări profil',
      icon: <MdOutlineSettings size={25} />,
    },
  ],

  [UserRole.HEAD_OF_DIRECTION]: [
    {
      path: new DASHBOARD_PAGES(UserRole.HEAD_OF_DIRECTION).HOME,
      label: 'Pagina principală',
      icon: <FaHome size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.HEAD_OF_DIRECTION).ENTRY_DOCUMENTS,
      label: 'Documente de intrare',
      icon: <IoDocumentSharp size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.HEAD_OF_DIRECTION).EXIT_DOCUMENTS,
      label: 'Documente de ieșire',
      icon: <IoDocumentTextSharp size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.HEAD_OF_DIRECTION).INTERNAL_DOCUMENTS,
      label: 'Documente interne',
      icon: <MdDocumentScanner size={25} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.HEAD_OF_DIRECTION).MESSAGES,
      label: 'Mesaje',
      icon: <PiChatCircleDotsBold size={26} />,
    },
    {
      path: new DASHBOARD_PAGES(UserRole.HEAD_OF_DIRECTION).SETTINGS,
      label: 'Setări profil',
      icon: <MdOutlineSettings size={25} />,
    },
  ],

  [UserRole.ALL]: [],
};

menuItems[UserRole.ALL] = [
  ...menuItems[UserRole.ADMIN],
  ...menuItems[UserRole.DIRECTOR],
  ...menuItems[UserRole.SECRETARY],
  ...menuItems[UserRole.HEAD_OF_DIRECTION],
];
