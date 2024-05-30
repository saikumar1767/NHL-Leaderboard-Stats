import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/system";
import React from "react";
import { useEffect, useState } from "react";
import CustomToolbar from "./CustomToolBar";

const CustomDataGrid = styled(DataGrid)({
  "& .MuiDataGrid-row:hover": {
    cursor: "pointer",
  },
});

const SummaryPage = ({ teams, onSelectTeam }) => {
  const columns = [
    { field: "id", headerName: "Pos", width: 140 },
    { field: "seasonId", headerName: "Season", width: 160 },
    { field: "teamAbbrevation", headerName: "Team", width: 180 },
    { field: "gamesPlayed", headerName: "Played", width: 180 },
    { field: "wins", headerName: "Wins", width: 180 },
    { field: "losses", headerName: "Losses", width: 180 },
    { field: "ties", headerName: "Ties", width: 180 },
    { field: "points", headerName: "Points", width: 160 },
  ];

  const [filterModel, setFilterModel] = useState(
    JSON.parse(localStorage.getItem("filterModel")) || { items: [] }
  );

  const getRows = () => {
    let rows = [];
    if (teams && teams.length > 0) {
      teams.sort((a, b) => b.points - a.points);
    }

    if (teams && teams.length > 0) {
      rows = teams.map((team, idx) => {
        return {
          id: idx + 1,
          teamFullName: team.teamFullName,
          teamAbbrevation: team.teamAbbrevation,
          gamesPlayed: team.gamesPlayed,
          wins: team.wins,
          losses: team.losses,
          ties: team.ties,
          points: team.points,
          team: team,
          seasonId: team.seasonId,
        };
      });
    }
    return rows;
  };

  useEffect(() => {
    console.log("filterModel::", filterModel);
    localStorage.setItem("filterModel", JSON.stringify(filterModel));
  }, [filterModel]);

  return (
    <div className="overflow-hidden w-[100%]">
      <div className="flex flex-col overflow-hidden">
        <div className="flex flex-row items-center">
          <div className="flex flex-row w-[100%] h-auto">
            <h1 className="pl-[75px] py-[20px] font-bold text-2xl">
              NHL Points Table
            </h1>
          </div>
        </div>
      </div>
      <hr className="border-1.5 border-gray-600 w-[100%]" />
      <div className="w-[90%] m-auto pt-[30px]">
        <CustomDataGrid
          rows={getRows()}
          onRowClick={(row) => onSelectTeam(row?.row?.team)}
          autoHeight={true}
          slots={{ toolbar: CustomToolbar }}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 10 },
            },
          }}
          filterModel={filterModel}
          onFilterModelChange={(newFilterModel) =>
            setFilterModel(newFilterModel)
          }
          pageSizeOptions={[10, 25, 50, 100]}
        />
      </div>
      <div className="p-[25px]"></div>
    </div>
  );
};

export default SummaryPage;
