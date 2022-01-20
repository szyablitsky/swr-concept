import qs from "query-string";
import { generatePath, Params } from 'react-router-dom';
import { routes, RouteIdType } from '../routeConfig';

type OptionsType = { params: Params, query: object };

type RoutesType = {
  [key in RouteIdType]: (options?: OptionsType) => string;
}

const Routes = routes.reduce((acc, route) => {
  acc[route.id] = (options) => {
    const { params, query } = options || {};
    const path = generatePath(route.path, params);

    return query ? `${path}${qs.stringify(query)}` : path;
  }

  return acc;
}, {} as RoutesType);

// Routes.home()
// Routes.firmClient({ params: { code: 'AA1' } })
// Routes.firmClientTasks({ query: { filter: 'resolved' } })

export default Routes;
