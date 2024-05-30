import Button from "@mui/material/Button";
import * as React from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import Chart from "./Chart.jsx";

const TeamStatsPage = ({ team, onBack }) => {
  const entries = Object.entries(team);

  const sortedEntries = entries.sort((a, b) => {
    const keyA = a[0];
    const keyB = b[0];

    // Sort by keys in alphabetical order
    if (keyA < keyB) return -1;
    if (keyA > keyB) return 1;

    return 0;
  });
  const sortedObject = Object.fromEntries(sortedEntries);

  return (
    <div className="flex flex-col overflow-hidden">
      <div className="flex flex-row items-center">
        <div className="pl-[4%] py-[20px] pr-[28px]">
          <Button
            component="label"
            variant="contained"
            tabIndex={-1}
            startIcon={
              <ArrowBackIosIcon sx={{ fontSize: "15px !important" }} />
            }
            onClick={onBack}
          >
            Back
          </Button>
        </div>
        <div className="flex flex-row">
          <h1 className="pr-[20] text-2xl font-bold">Team:</h1>
          <h1 className="text-2xl font-bold">
            {sortedObject.teamFullName} Statistics (
            {sortedObject.teamAbbrevation})
          </h1>
        </div>
      </div>
      <hr className="border-0.5 border-gray-600 w-[100%]" />
      <div className="flex flex-col md:flex-row">
        <List
          sx={{
            paddingLeft: "3%",
            maxWidth: "60%",
            bgcolor: "background.paper",
            display: "grid",
            gridTemplateColumns: "auto auto",
          }}
        >
          {Object.entries(sortedObject).map(([key, value]) => {
            if (key !== "teamFullName" && value !== null && value !== "") {
              return (
                <ListItem key={key}>
                  <ListItemButton onClick={() => {}} dense>
                    <ListItemText
                      inset
                      className="flex flex-row whitespace-pre p-[12px]"
                      id={key}
                      primary={`${key}:  `}
                      secondary={value.toString()}
                    />
                  </ListItemButton>
                </ListItem>
              );
            } else {
              return null;
            }
          })}
        </List>
        <div className="w-[90%] mx-auto md:w-[40%] pb-[40px]">
          <Chart team={team} />
        </div>
      </div>
    </div>
  );
};

export default TeamStatsPage;
