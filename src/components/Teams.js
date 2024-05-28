import React from "react";

const Teams = ({ teams }) => {
  return (
    <div>
      <h3>Squadra 1</h3>
      <table id="team1-table">
        <thead>
          <tr>
            <th>Giocatore</th>
            <th>Media</th>
          </tr>
        </thead>
        <tbody>
          {teams.team1.map((player) => (
            <tr key={player.player}>
              <td>{player.player}</td>
              <td>{player[player.selectedAverage].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Media totale:{" "}
        <span id="team1-average">
          {calculateTotalAverage(teams.team1).toFixed(2)}
        </span>
      </p>

      <h3>Squadra 2</h3>
      <table id="team2-table">
        <thead>
          <tr>
            <th>Giocatore</th>
            <th>Media</th>
          </tr>
        </thead>
        <tbody>
          {teams.team2.map((player) => (
            <tr key={player.player}>
              <td>{player.player}</td>
              <td>{player[player.selectedAverage].toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        Media totale:{" "}
        <span id="team2-average">
          {calculateTotalAverage(teams.team2).toFixed(2)}
        </span>
      </p>
    </div>
  );
};

const calculateTotalAverage = (team) => {
  const totalAverage =
    team.reduce((sum, player) => sum + player[player.selectedAverage], 0) /
    team.length;
  return totalAverage;
};

export default Teams;
