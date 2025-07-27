import React from 'react';
import { Link } from 'react-router-dom';
import { FaHome } from 'react-icons/fa';
import './Breadcrumb.css';

interface BreadcrumbProps {
  title?: string;
  items?: Array<{
    label: string;
    path?: string;
  }>;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ title = 'Dashboard', items = [] }) => {
  return (
    <div className='breadcrumb-container'>
      <h6 className='breadcrumb-title'>{title}</h6>
      <ul className='breadcrumb-list'>
        <li className='breadcrumb-item'>
          <Link to='/dashboard' className='breadcrumb-link'>
            <FaHome className='breadcrumb-icon' />
            Dashboard
          </Link>
        </li>
        {items.map((item, index) => (
          <React.Fragment key={index}>
            <li className='breadcrumb-separator'>-</li>
            <li className='breadcrumb-item'>
              {item.path ? (
                <Link to={item.path} className='breadcrumb-link'>
                  {item.label}
                </Link>
              ) : (
                <span className='breadcrumb-current'>{item.label}</span>
              )}
            </li>
          </React.Fragment>
        ))}
      </ul>
    </div>
  );
};

export default Breadcrumb;
