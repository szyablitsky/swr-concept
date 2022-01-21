import LoadablePage from 'components/molecules/LoadablePage';
import useInitializeApp from 'hooks/useInitializeApp';
import { Routes as RouterRoutes, Route } from "react-router-dom";
import { IRoute, routes } from "routeConfig";
import Loader from "components/atoms/Loader";
import "global.css";

const Page = ({ route }: { route: IRoute }) => {
  console.log('%c[RENDER] ', 'color: darkturquoise;', route.id, 'page')
  return <LoadablePage component={route.component} />;
}

export default function App() {
  const { isInitializing } = useInitializeApp();

  if (isInitializing) return <Loader />;

  return (
    <RouterRoutes>
      {routes.map((route) => {
        const { path } = route;
        const element = <Page route={route} />;

        return <Route key={path} path={path} element={element} />;
      })}
    </RouterRoutes>
  );
}
