export function compteTotalPoints(utilisateurs) {
  const newState = []
  var totalPoints = 0

  for (let item in utilisateurs) {
    newState.push({
      points: utilisateurs[item].points
    })
  }

  for(var i=0; i< newState.length; i++) {
    totalPoints += parseInt(newState[i].points, 10)
  }

  return totalPoints
}
