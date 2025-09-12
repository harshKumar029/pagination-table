import React, { ReactNode } from 'react';
import Userimg from "../assets/avtar.avif";
import Setting from '../assets/Setting.svg';
import { useAppContext } from '../ContextApi';
import { Link } from 'react-router-dom';

interface HeaderProps {
  title: string;
  children?: ReactNode;
}

const Header: React.FC<HeaderProps> = ({ title, children }) => {
  const { setIsOpen } = useAppContext();

  return (
    <div className='top-0'>
      <div className="flex items-center justify-between p-4 sm:px-8 bg-white border-b border-[#DEE2E6]">
        {/* Sidebar toggle button (mobile) */}
        <button
          className="md:hidden"
          onClick={() => setIsOpen((prev: boolean) => !prev)}
        >
          <svg
            className="w-10"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
            />
          </svg>
        </button>

        {/* Title */}
        <h1 className="text-2xl sm:text-3xl text-[#000000] font-semibold">{title}</h1>

        {/* Right Section */}
        <div className="flex items-center sm:space-x-6">
          {/* Settings Icon */}
          <Link to="/setting">
            <img
              src={Setting}
              alt="Settings"
              className="w-[30px] hidden sm:block cursor-pointer p-1 rounded-3xl"
            />
          </Link>

          {/* Notification */}
          <div className="relative">
            <div className="flex items-center space-x-3 cursor-pointer">
              <div className="relative">
                <svg
                  className="w-[30px] text-gray-500 bg-white p-1 rounded-full shadow-md hover:bg-gray-100 transition-colors"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9.35442 21C10.0596 21.6224 10.9858 22 12.0002 22C13.0147 22 13.9409 21.6224 14.6461 21M2.29414 5.81989C2.27979 4.36854 3.06227 3.01325 4.32635 2.3M21.7024 5.8199C21.7167 4.36855 20.9342 3.01325 19.6702 2.3M18.0002 8C18.0002 6.4087 17.3681 4.88258 16.2429 3.75736C15.1177 2.63214 13.5915 2 12.0002 2C10.4089 2 8.88283 2.63214 7.75761 3.75736C6.63239 4.88258 6.00025 6.4087 6.00025 8C6.00025 11.0902 5.22072 13.206 4.34991 14.6054C3.61538 15.7859 3.24811 16.3761 3.26157 16.5408C3.27649 16.7231 3.31511 16.7926 3.46203 16.9016C3.59471 17 4.19284 17 5.3891 17H18.6114C19.8077 17 20.4058 17 20.5385 16.9016C20.6854 16.7926 20.724 16.7231 20.7389 16.5408C20.7524 16.3761 20.3851 15.7859 19.6506 14.6054C18.7798 13.206 18.0002 11.0902 18.0002 8Z"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                <span className="absolute top-0 right-0 h-3 w-3 bg-red-500 rounded-full border-2 border-white"></span>
              </div>
            </div>
          </div>

          {/* User Profile */}
          <div className="relative ml-2">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <img
                  src={Userimg}
                  alt="Profile"
                  className="w-10 h-10 rounded-full object-cover cursor-pointer"
                />
                <div className="absolute top-[-3px] right-[-3px] w-3 h-3 bg-[#38ee5f] rounded-full"></div>
              </div>
              <p className="hidden sm:flex">Harsh Kumar</p>
            </div>
          </div>
        </div>
      </div>

      {/* Main content */}
      <main>{children}</main>
    </div>
  );
};

export default Header;
