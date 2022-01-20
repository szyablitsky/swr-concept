import useCurrentRoute from 'hooks/useCurrentRoute';
import Routes from 'lib/Routes';
import React from "react";
import "./SettingsNavMenu.css";
import { Link } from 'react-router-dom';
import { routeIds } from 'routeConfig';

export default function SettingsNavMenu() {
  const currentRoute = useCurrentRoute();

  const isProfileActive = currentRoute.id === routeIds.settings;
  const isEmployeesActive = currentRoute.id === routeIds.employees;

  return (
    <div className="settings-nav-menu">
      <Link className={`settings-nav-menu__item ${isProfileActive ? 'settings-nav-menu__item_active' : ''}`} to={Routes.settings()}>
        Profile
      </Link>
      <Link className={`settings-nav-menu__item ${isEmployeesActive ? 'settings-nav-menu__item_active' : ''}`} to={Routes.employees()}>
        Employees
      </Link>
    </div>
  );
}
