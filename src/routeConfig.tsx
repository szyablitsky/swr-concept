import * as React from "react";
import keymirror from 'keymirror';

const Home = React.lazy(() => import("components/pages/Home"));
const Login = React.lazy(() => import("components/pages/Login"));
const Messages = React.lazy(() => import("components/pages/Messages"));
const Clients = React.lazy(() => import("components/pages/Clients"));
const Employees = React.lazy(() => import("components/pages/Employees"));
const Settings = React.lazy(() => import("components/pages/Settings"));

export const routeIds = keymirror({
  home: null,
  login: null,
  messages: null,
  clients: null,
  employees: null,
  settings: null,
});

export type RouteIdType = keyof typeof routeIds;

export interface IRoute {
  id: RouteIdType;
  path: string;
  component: React.FC;
}

export const routes: IRoute[] = [
  {
    id: routeIds.home,
    path: "/",
    component: Home
  },
  {
    id: routeIds.login,
    path: "/login",
    component: Login
  },
  {
    id: routeIds.messages,
    path: "/messages",
    component: Messages
  },
  {
    id: routeIds.clients,
    path: "/clients",
    component: Clients
  },
  {
    id: routeIds.employees,
    path: "/settings/employees",
    component: Employees
  },
  {
    id: routeIds.settings,
    path: "/settings",
    component: Settings
  }
];
