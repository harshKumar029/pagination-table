import React, { useRef, useEffect, useState } from 'react';
import logo from '../assets/logo.svg';
import { useLocation } from 'react-router-dom';
import { useAppContext } from '../ContextApi';
import Dashboard from '../assets/sidebar/Dashboard.svg';
import Link from '../assets/sidebar/Report.svg';
import Support from '../assets/sidebar/Support.svg';
import Setting from '../assets/sidebar/Setting.svg';
import Logout from '../assets/sidebar/Logout.svg';

const SideBar = () => {
  const location = useLocation();
  const { isOpen, setIsOpen } = useAppContext();
  const sidebarRef = useRef(null);

  // Local state to track active menu item label
  // Initialize with current path match or default to first item
  const menuItems = [
    { icon: Dashboard, label: "Dashboard", path: "/dashboard" },
    { icon: Link, label: "Reports", path: "/Links" },
    { icon: Support, label: "Support", path: "/support" },
    { icon: Logout, label: "Logout", action: 'logout' },
    { icon: Setting, label: "Setting", path: "/setting" },
  ];

  // Find initial active label based on location.pathname or default to first menu label
  const initialActiveLabel = menuItems.find(item => item.path === location.pathname)?.label || menuItems[0].label;
  const [activeLabel, setActiveLabel] = useState(initialActiveLabel);

  const handleLogout = async () => {
    const confirmLogout = window.confirm('Are you sure you want to logout?');
    if (!confirmLogout) return;

    try {
      setIsOpen(false);
      // Add your logout logic here if needed
    } catch (error) {
      console.error('Error signing out:', error);
      alert('Failed to log out. Please try again.');
    }
  };

  const handleClickOutside = (event) => {
    if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className='z-50'>
      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`fixed left-0 top-0 h-full lg:w-[15%] md:w-[22%] w-52 bg-[#2a2a2a] border-r transition-transform duration-300 ease-in-out transform ${isOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0`}
      >
        <div className="border-r-[0.5px] border-[#bababa] text-[#ADB5BD] h-full flex flex-col">
          <div className="w-fit mx-auto">
            <div className='flex justify-between ml-1 mt-6'>
              <img className="w-38 bg-[#8383831f] p-1 rounded-md" src={logo} alt="logo" />
            </div>
            <div className="space-y-4 mt-16">

              <ul className="menu-list max-w-fit mt-5">
                {menuItems.map((item, index) => (
                  <React.Fragment key={index}>
                    {item.label === 'Setting' && (
                      <hr className="border-t- border-opacity-40 mt-5 border-gray-400 my-2" />
                    )}
                    <li
                      className={`menu-item flex items-center px-4 py-[.9rem] cursor-pointer transition-all hover:bg-[#3f3f3f] ${
                        activeLabel === item.label
                          ? 'border-l-[3px] rounded-r-md border-green-500 hover:bg-[#3f3f3f]'
                          : ''
                      }`}
                      onClick={() => {
                        if (item.action === 'logout') {
                          handleLogout();
                        } else {
                          setActiveLabel(item.label);
                          // Do nothing else, no navigation
                        }
                      }}
                    >
                      <img
                        src={item.icon}
                        alt={item.label}
                        className="w-[1.3rem] mr-2"
                      />
                      <span className="font-medium text-[17px]">{item.label}</span>
                    </li>
                  </React.Fragment>
                ))}
              </ul>
            </div>
          </div>

          <div className="mt-auto">
            <hr className='border-t border-[#ADB5BD] mb-1' />
            <div className="w-fit mx-auto space-y-4 py-2">
              <p className="font-medium text-center text-sm">GrowMeOrganic<br/> All rights reserved</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SideBar;