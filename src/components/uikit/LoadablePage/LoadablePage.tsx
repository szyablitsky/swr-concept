import Loader from 'components/uikit/Loader';
import React, { Suspense } from "react";
import "components/uikit/Loader/Loader.css";

interface IProps {
  component: React.FC;
}

export default function LoadablePage({ component: Component }: IProps) {
  return (
    <Suspense fallback={<Loader />}>
      <Component />
    </Suspense>
  );
}
