import React, { Suspense } from "react";
import Loader from 'components/atoms/Loader';

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
