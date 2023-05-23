import React from "react";
import { InfinitySpin } from "react-loader-spinner";

function InfinitySpinner() {
  return (
    <div className="flex justify-center items-center h-screen">
      <InfinitySpin color="#dc2626" width={100} />
    </div>
  );
}

export default InfinitySpinner;
