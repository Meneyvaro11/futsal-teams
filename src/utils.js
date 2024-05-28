export const createTeams = (sortedAverages, updateTeams) => {
  const selectedPlayers = Array.from(
    document.querySelectorAll("#sorted-list-container li.selected")
  ).map((li) => li.dataset.player);

  if (selectedPlayers.length !== 10) {
    alert("Seleziona 10 giocatori prima di creare le squadre.");
    return;
  }

  const playerData = sortedAverages.filter((item) =>
    selectedPlayers.includes(item.player)
  );
  const teams = composeBalancedTeams(playerData);
  updateTeams(teams);
};

const composeBalancedTeams = (players) => {
  const gkPlayers = players.filter(
    (player) => player.selectedAverage === "average2"
  );
  const fieldPlayers = players.filter(
    (player) => player.selectedAverage !== "average2"
  );

  if (gkPlayers.length > 2) {
    alert("Puoi selezionare al massimo due portieri.");
    return;
  }

  const sortedFieldPlayers = fieldPlayers.sort(
    (a, b) => b[a.selectedAverage] - a[a.selectedAverage]
  );
  let team1 = [];
  let team2 = [];

  if (gkPlayers.length === 2) {
    team1.push(gkPlayers[0]);
    team2.push(gkPlayers[1]);
  } else if (gkPlayers.length === 1) {
    if (team1.length <= team2.length) {
      team1.push(gkPlayers[0]);
    } else {
      team2.push(gkPlayers[0]);
    }
  }

  sortedFieldPlayers.forEach((player, index) => {
    if (team1.length <= team2.length) {
      team1.push(player);
    } else {
      team2.push(player);
    }
  });

  if (team1.length > team2.length + 1) {
    const playerToMove = team1.pop();
    team2.push(playerToMove);
  }

  return { team1, team2 };
};

export const filterPlayers = (event, sortedAverages, setSortedAverages) => {
  const filterValue = event.target.value.toLowerCase();
  const filteredPlayers = sortedAverages.filter(
    (player) =>
      player.player.toLowerCase().includes(filterValue) ||
      player.average1.toFixed(2).includes(filterValue) ||
      player.average2.toFixed(2).includes(filterValue)
  );
  setSortedAverages(filteredPlayers);
};

export const clearPlayerSelection = (updatePlayerSelection) => {
  document
    .querySelectorAll("#sorted-list-container li.selected")
    .forEach((li) => li.classList.remove("selected"));
  updatePlayerSelection(0);
};

export const showSelectionLimitPopup = () => {
  const popup = document.getElementById("selectionLimitPopup");
  popup.style.display = "block";
  setTimeout(() => {
    popup.style.display = "none";
  }, 2000);
};
