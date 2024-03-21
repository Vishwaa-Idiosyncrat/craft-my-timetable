import React, { useState } from "react";
import BatchSelect from "./BatchSelector";
import YearSelect from "./YearSelector.jsx";
import BranchSelect from "./BranchSelector.jsx";
export default function ParentComponent() {
  const [batch, setBatch] = useState("");

  return (
    <div>
      <BatchSelect setBatch={setBatch} />
      {batch && <YearSelect batch={batch} />}
      {batch && <BranchSelect batch={batch} />}
    </div>
  );
}
