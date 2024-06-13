import React, { useState, useEffect, useRef } from "react";
import RadarChart from "./RadarChart"; // Importa il nuovo componente del grafico radar

const PlayerList = ({ players, updatePlayerSelection }) => {
  const [selectedPlayers, setSelectedPlayers] = useState([]);
  const [selectedPlayerForChart, setSelectedPlayerForChart] = useState(null);
  const cardRef = useRef(null);

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

  const handleChartIconClick = (player) => {
    if (selectedPlayerForChart === player) {
      setSelectedPlayerForChart(null); // Se è lo stesso giocatore, chiudi la card
    } else {
      setSelectedPlayerForChart(player);
    }
  };

  const handleClickOutside = (event) => {
    if (cardRef.current && !cardRef.current.contains(event.target)) {
      setSelectedPlayerForChart(null);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

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
              <button
                className="chart-icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleChartIconClick(player);
                }}
              >
                📊
              </button>
            </li>
          ))
        ) : (
          <li>Nessun giocatore trovato</li>
        )}
      </ul>

      {selectedPlayerForChart && (
        <div className="card" ref={cardRef}>
          <h3>{selectedPlayerForChart.player}</h3>
          <RadarChart playerData={selectedPlayerForChart} />
          <button onClick={() => setSelectedPlayerForChart(null)}>
            Chiudi
          </button>
        </div>
      )}
    </div>
  );
};

export default PlayerList;
