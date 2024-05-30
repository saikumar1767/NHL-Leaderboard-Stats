import React, { useState, useEffect } from "react";
import SummaryPage from "./components/SummaryPage";
import TeamStatsPage from "./components/TeamStatsPage";
import { URL } from "./Utils.js";
import CircularProgress from "@mui/material/CircularProgress";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [selectedTeam, setSelectedTeam] = useState({});
  const [selectedTeamId, setSelectedTeamId] = useState(
    localStorage.getItem("selectedTeamId")
      ? localStorage.getItem("selectedTeamId")
      : null
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`${URL}/api/teams`);
        const data = await response.json();
        const resp = await fetch(`${URL}/api/getAbbrevations`);
        const abbr = await resp.json();
        const modifiedData =
          data &&
          data.length > 0 &&
          data.map((team) => {
            return {
              ...team,
              teamAbbrevation:
                abbr &&
                abbr.length > 0 &&
                abbr.filter((item) => item.id === team.teamId)[0]["triCode"],
            };
          });
        setTeams(modifiedData);
        if (modifiedData && modifiedData.length > 0) {
          const selectTeam = modifiedData.filter(
            (team) => team.teamId === Number(selectedTeamId)
          )[0];
          setSelectedTeam(selectTeam);
        }
        setLoading(false);
      } catch (error) {
        setLoading(false);
        console.log("error is:", error);
      }
    };

    fetchData();
  }, [selectedTeamId]);

  const handleSelectTeam = (team) => {
    setSelectedTeam(team);
    setSelectedTeamId(team.teamId);
    localStorage.setItem("selectedTeamId", team.teamId);
  };

  const handleBackToSummary = () => {
    setSelectedTeam({});
    setSelectedTeamId(null);
    localStorage.removeItem("selectedTeamId");
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[100vh] m-auto">
        <CircularProgress />
      </div>
    );
  }

  return (
    <div>
      {teams && teams.length > 0 && selectedTeamId !== null ? (
        <TeamStatsPage team={selectedTeam} onBack={handleBackToSummary} />
      ) : (
        <SummaryPage teams={teams} onSelectTeam={handleSelectTeam} />
      )}
    </div>
  );
};

export default App;
