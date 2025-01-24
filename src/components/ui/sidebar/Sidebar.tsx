'use client';

import { errorCatch } from '@api/api.helper';
import Loader from '@components/loaders/Loader';
import { publicRoutes } from '@config/routes.config';
import { authService } from '@services/auth/auth.service';
import { useMutation } from '@tanstack/react-query';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { IoMdMenu } from 'react-icons/io';
import { LuLogOut } from 'react-icons/lu';
import { MdMenuOpen } from 'react-icons/md';
import { toast } from 'sonner';
import { useAuth } from '../../../hooks/useAuth';
import { menuItems } from './menu-items.config';
import './style.css';
import { MenuItem } from '../../../types/menu.types';
import { AppRouterInstance } from 'next/dist/shared/lib/app-router-context.shared-runtime';

export default function Sidebar() {
  const pathname: string = usePathname();
  const [isSidebarOpen, setISidebarOpen] = useState<boolean>(false);
  const { role, loading } = useAuth();
  const router: AppRouterInstance = useRouter();

  const { mutate } = useMutation({
    mutationKey: ['logout'],
    mutationFn: () => authService.logout(),
    onSuccess() {
      router.push('/auth/login');
    },
    onError(error: Error) {
      toast.error(errorCatch(error));
    },
  });

  const showSidebar: boolean = ![...publicRoutes, '/401', '/403', '/404'].includes(
    pathname,
  );

  const toggleSidebar = () => {
    setISidebarOpen(!isSidebarOpen);
  };

  if (loading) {
    return <Loader />;
  }

  if (!showSidebar || !role) return null;

  return (
    <div className={`sidebar-container ${isSidebarOpen ? 'md:w-[300px]' : 'md:w-20'}`}>
      <div className="sidebar">
        <div>
          <div onClick={toggleSidebar} className="menu-button">
            {isSidebarOpen ? <IoMdMenu size={25} /> : <MdMenuOpen size={25} />}
            <span className="menu-tooltip">Meniu</span>
          </div>

          <div className="sidebar-items">
            <div className="px-1">
              <ul className="sidebar-items-list">
                {menuItems[role].map((item: MenuItem, index: number) => {
                  const isActive = pathname === item.path;

                  return (
                    <li key={index}>
                      <a
                        href={item.path}
                        className={`sidebar-link group ${isActive ? 'active' : ''}`}
                      >
                        {item.icon}
                        <span className="link-tooltip group-hover:visible">
                          {item.label}
                        </span>
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>

        <div className="sidebar-footer">
          <div>
            <button
              type="button"
              onClick={() => mutate()}
              className="logout-button group"
            >
              <LuLogOut size={25} />
              <span className="logout-tooltip group-hover:visible">Logout</span>
            </button>
          </div>
        </div>
      </div>

      {isSidebarOpen && (
        <div className="sidebar-expanded">
          <div className="expanded-content">
            <ul className="expanded-links">
              {menuItems[role].map((item, index) => {
                const isActive = pathname === item.path;

                return (
                  <li key={index}>
                    <a
                      href={item.path}
                      className={`expanded-link ${isActive ? 'active' : ''}`}
                    >
                      {item.label}
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}
