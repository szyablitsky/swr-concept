import React from "react";
import Text from "components/atoms/Text";
import "./Loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <Text tag="h4">Loading...</Text>
    </div>
  );
}
