import React, { useState, useEffect } from "react";
import "./App.css";
import PlayerList from "./components/PlayerList";
import Teams from "./components/Teams";
import { createTeams, filterPlayers, clearPlayerSelection } from "./utils";

const spreadsheetId = "123rXNTlyQzA3lSJ__TyM43RAUJ6oDCwrUNNm6K4Bh9U";
const apiKey = "AIzaSyD1TiefCdKw5OROFuNdn62dDjDOTfjGxac";
const apiUrl = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/A1:P?key=${apiKey}`;

const App = () => {
  const [players, setPlayers] = useState([]);
  const [sortedAverages, setSortedAverages] = useState([]);
  const [filteredPlayers, setFilteredPlayers] = useState([]);
  const [selectedPlayerCount, setSelectedPlayerCount] = useState(0);
  const [teams, setTeams] = useState({ team1: [], team2: [] });

  useEffect(() => {
    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const players = data.values.slice(1).map((player) => ({
          player: player[0],
          average1: parseFloat(player[13]),
          average2: parseFloat(player[14]),
          availability: player[15],
          selectedAverage: "average1",
        }));
        const sortedAverages = players.sort((a, b) => b.average1 - a.average1);
        setPlayers(players);
        setSortedAverages(sortedAverages);
        setFilteredPlayers(sortedAverages); // Inizialmente, tutti i giocatori sono visibili
      })
      .catch((error) =>
        console.error("Errore durante il caricamento dei dati:", error)
      );
  }, []);

  const updatePlayerSelection = (newSelectedPlayerCount) => {
    setSelectedPlayerCount(newSelectedPlayerCount);
  };

  const updateTeams = (newTeams) => {
    setTeams(newTeams);
  };

  const showSelectionLimitPopup = () => {
    const popup = document.getElementById("selectionLimitPopup");
    popup.style.display = "block";
    setTimeout(() => {
      popup.style.display = "none";
    }, 3000); // Mostra il popup per 3 secondi
  };

  const handleSearchChange = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    const filtered = players.filter((player) =>
      player.player.toLowerCase().includes(searchTerm)
    );
    setFilteredPlayers(filtered);
  };

  return (
    <div className="App">
      <header>
        <h2>Creazione squadre equilibrate</h2>
      </header>
      <main id="contenitore">
        <Teams teams={teams} />
        <button
          onClick={() => createTeams(sortedAverages, updateTeams)}
          disabled={selectedPlayerCount !== 10}
        >
          Crea Squadre
        </button>
        <h2>Selezione giocatori</h2>
        <input
          type="text"
          className="search-bar"
          placeholder="Cerca giocatore..."
          onChange={handleSearchChange}
        />

        <button
          style={{ backgroundColor: "#ff7373" }}
          onClick={() => clearPlayerSelection(updatePlayerSelection)}
        >
          Pulisci Selezione
        </button>
        <p>Giocatori selezionati: {selectedPlayerCount}/10</p>
        <PlayerList
          players={filteredPlayers}
          updatePlayerSelection={updatePlayerSelection}
          showSelectionLimitPopup={showSelectionLimitPopup}
        />
      </main>
      <div id="selectionLimitPopup" className="popup">
        Hai selezionato più di 10 giocatori.
      </div>
    </div>
  );
};

export default App;
