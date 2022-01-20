import React from "react";
import "components/uikit/Text/Text.css";

interface IProps {
  tag?: keyof JSX.IntrinsicElements;
  color?: "white";
  children: React.ReactNode;
}

export default function Text({ tag, color, children }: IProps) {
  const Tag = tag || "p";

  return (
    <Tag className={`text ${color === "white" ? "text_white" : ""}`}>
      {children}
    </Tag>
  );
}
