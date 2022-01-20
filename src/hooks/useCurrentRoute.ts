import { matchPath, useLocation } from 'react-router-dom';
import { IRoute, routes } from 'routeConfig';

export default function useCurrentRoute(): IRoute {
  const location = useLocation();

  const route = routes.find((route) => !!matchPath(route.path, location.pathname));

  if (!route) throw new Error('Route not found');

  return route;
}
