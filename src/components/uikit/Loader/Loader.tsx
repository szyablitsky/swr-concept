import React from "react";
import Text from "components/uikit/Text";
import "components/uikit/Loader/Loader.css";

export default function Loader() {
  return (
    <div className="loader">
      <Text tag="h4">Loading...</Text>
    </div>
  );
}
