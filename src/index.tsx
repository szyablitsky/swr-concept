import API from 'lib/API';
import { render } from "react-dom";
import { SWRConfig } from 'swr';
import { BrowserRouter } from "react-router-dom";

import App from "./App";

const SWRConfigOptions = {
  dedupingInterval: 5000,
  fetcher: (url: string) => API('GET', url),
};

const rootElement = document.getElementById("root");

render((
  <SWRConfig value={SWRConfigOptions}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </SWRConfig>
), rootElement);
