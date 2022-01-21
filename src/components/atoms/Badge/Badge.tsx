import React from "react";
import "./Badge.css";

interface IProps {
  children: React.ReactNode;
}

export default function Badge({ children }: IProps) {

  return (
    <span className="badge">
      {children}
    </span>
  );
}
