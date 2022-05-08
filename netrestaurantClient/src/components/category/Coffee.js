import React from "react";
import { CATEGORY } from "../../util/location";
import MapContainer from "../map/MapContainer";

const Coffee = () => {
  return (
    <div>
      <MapContainer category={CATEGORY.coffee} />
    </div>
  );
};

export default Coffee;
