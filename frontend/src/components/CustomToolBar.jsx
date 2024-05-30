import React from "react";
import {
  GridToolbarColumnsButton,
  GridToolbarContainer,
  GridToolbarExport,
  GridToolbarFilterButton,
} from "@mui/x-data-grid";

const CustomToolbar = () => {
  return (
    <GridToolbarContainer>
      <GridToolbarColumnsButton />
      <GridToolbarFilterButton />
      <GridToolbarExport
        csvOptions={{ disableToolbarButton: false }}
        printOptions={{ disableToolbarButton: true }} // Disable PDF export button
      />
    </GridToolbarContainer>
  );
};

export default CustomToolbar;
