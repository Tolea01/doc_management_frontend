'use client';

import { publicRoutes } from '@config/routes.config';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FaHome, FaRegUser } from 'react-icons/fa';
import { IoMdMenu } from 'react-icons/io';
import { IoDocumentSharp, IoDocumentTextSharp } from 'react-icons/io5';
import { LuLogOut } from 'react-icons/lu';
import { MdDocumentScanner, MdMenuOpen, MdOutlineSettings } from 'react-icons/md';
import './style.css';

export default function Sidebar() {
  const pathname = usePathname();

  const [isSidebarOpen, setISidebarOpen] = useState<boolean>(false);

  const showSidebar = ![...publicRoutes, '/401', '/403', '/404'].includes(pathname);

  const toggleSidebar = () => {
    setISidebarOpen(!isSidebarOpen);
  };

  return showSidebar ? (
    <div className={`sidebar-container ${isSidebarOpen ? 'w-[300px]' : 'w-20'}`}>
      <div className="sidebar">
        <div>
          <div onClick={toggleSidebar} className="menu-button">
            {isSidebarOpen ? <IoMdMenu size={25} /> : <MdMenuOpen size={25} />}
            <span className="menu-tooltip">Meniu</span>
          </div>

          <div className="sidebar-items">
            <div className="px-1">
              <ul className="sidebar-items-list">
                <li>
                  <a href="#" className="sidebar-link group">
                    <FaHome size={25} />
                    <span className="link-tooltip group-hover:visible">
                      Pagina principală
                    </span>
                  </a>
                </li>

                <li>
                  <a href="#" className="sidebar-link group">
                    <IoDocumentSharp size={25} />
                    <span className="link-tooltip group-hover:visible">
                      Documente de intrare
                    </span>
                  </a>
                </li>

                <li>
                  <a href="#" className="sidebar-link group">
                    <IoDocumentTextSharp size={25} />
                    <span className="link-tooltip group-hover:visible">
                      Documente de ieșire
                    </span>
                  </a>
                </li>

                <li>
                  <a href="#" className="sidebar-link group">
                    <MdDocumentScanner size={25} />
                    <span className="link-tooltip group-hover:visible">
                      Documente interne
                    </span>
                  </a>
                </li>

                <li>
                  <a href="#" className="sidebar-link group">
                    <MdOutlineSettings size={25} />
                    <span className="link-tooltip group-hover:visible">
                      Setări profil
                    </span>
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <form action="#">
            <button type="submit" className="logout-button group">
              <LuLogOut size={25} />
              <span className="logout-tooltip group-hover:visible">Logout</span>
            </button>
          </form>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="sidebar-expanded">
          <div className="expanded-content">
            <ul className="expanded-links">
              <li>
                <a href="#" className="expanded-link">
                  Pagina principală
                </a>
              </li>
              <li>
                <a href="#" className="expanded-link">
                  Documente de intrare
                </a>
              </li>
              <li>
                <a href="#" className="expanded-link">
                  Documente de ieșire
                </a>
              </li>
              <li>
                <a href="#" className="expanded-link">
                  Documente interne
                </a>
              </li>
              <li>
                <a href="#" className="expanded-link">
                  Setări profil
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  ) : null;
}
