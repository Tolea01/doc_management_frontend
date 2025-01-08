import { FaHome, FaRegUser } from 'react-icons/fa';
import { IoDocumentSharp, IoDocumentTextSharp } from 'react-icons/io5';
import { MdDocumentScanner, MdOutlineSettings } from 'react-icons/md';

export const menuItems = {
  admin: [
    { href: '/', label: 'Pagina principală', icon: <FaHome size={25} /> },
    {
      href: '/intrare',
      label: 'Documente de intrare',
      icon: <IoDocumentSharp size={25} />,
    },
    {
      href: '/iesire',
      label: 'Documente de ieșire',
      icon: <IoDocumentTextSharp size={25} />,
    },
    {
      href: '/intern',
      label: 'Documente interne',
      icon: <MdDocumentScanner size={25} />,
    },
    {
      href: '/user',
      label: 'Gestionare utilizatori',
      icon: <FaRegUser size={25} />,
    },
    { href: '/setari', label: 'Setări profil', icon: <MdOutlineSettings size={25} /> },
  ],
  director: [
    { href: '/', label: 'Pagina principală', icon: <FaHome size={25} /> },
    {
      href: '/intrare',
      label: 'Documente de intrare',
      icon: <IoDocumentSharp size={25} />,
    },
    {
      href: '/iesire',
      label: 'Documente de ieșire',
      icon: <IoDocumentTextSharp size={25} />,
    },
    {
      href: '/intern',
      label: 'Documente interne',
      icon: <MdDocumentScanner size={25} />,
    },
    { href: '/setari', label: 'Setări profil', icon: <MdOutlineSettings size={25} /> },
  ],
  secretary: [
    { href: '/', label: 'Pagina principală', icon: <FaHome size={25} /> },
    {
      href: '/intrare',
      label: 'Documente de intrare',
      icon: <IoDocumentSharp size={25} />,
    },
    {
      href: '/iesire',
      label: 'Documente de ieșire',
      icon: <IoDocumentTextSharp size={25} />,
    },
    {
      href: '/intern',
      label: 'Documente interne',
      icon: <MdDocumentScanner size={25} />,
    },
    { href: '/setari', label: 'Setări profil', icon: <MdOutlineSettings size={25} /> },
  ],
  headOfDirection: [
    { href: '/', label: 'Pagina principală', icon: <FaHome size={25} /> },
    {
      href: '/intrare',
      label: 'Documente de intrare',
      icon: <IoDocumentSharp size={25} />,
    },
    {
      href: '/iesire',
      label: 'Documente de ieșire',
      icon: <IoDocumentTextSharp size={25} />,
    },
    {
      href: '/intern',
      label: 'Documente interne',
      icon: <MdDocumentScanner size={25} />,
    },
    { href: '/setari', label: 'Setări profil', icon: <MdOutlineSettings size={25} /> },
  ],
};
