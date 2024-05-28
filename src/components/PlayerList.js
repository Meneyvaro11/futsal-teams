import React, { useState } from "react";

const PlayerList = ({ players, updatePlayerSelection }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);

  const handleRowSelection = (player) => {
    const isSelected = selectedPlayers.includes(player);
    const newSelectedPlayers = isSelected
      ? selectedPlayers.filter((p) => p !== player)
      : [...selectedPlayers, player];

    if (newSelectedPlayers.length <= 10) {
      setSelectedPlayers(newSelectedPlayers);
      updatePlayerSelection(newSelectedPlayers.length);
    } else {
      // Implement showSelectionLimitPopup here
    }
  };

  return (
    <div id="sorted-list-container">
      <ul>
        {players.length > 0 ? (
          players.map((player) => (
            <li
              key={player.player}
              data-player={player.player}
              className={
                selectedPlayers.includes(player.player) ? "selected" : ""
              }
              onClick={() => handleRowSelection(player.player)}
            >
              <b>{player.player}</b>
              <span className="average1">PL {player.average1.toFixed(2)}</span>
              <span style={{ marginRight: 30 }} className="average2">
                GK {player.average2.toFixed(2)}
              </span>
              <div className="dropdown-container">
                <select
                  className="media-dropdown"
                  onChange={(e) => (player.selectedAverage = e.target.value)}
                  defaultValue="average1"
                >
                  <option value="average1">PL</option>
                  <option value="average2">GK</option>
                </select>
              </div>
            </li>
          ))
        ) : (
          <li>Nessun giocatore trovato</li>
        )}
      </ul>
    </div>
  );
};

export default PlayerList;
