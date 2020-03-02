export function compteTauxBonneReponse(formations) {
  const newState = []
  var totalTauxBonneReponse = 0

  for (let item in formations) {
    newState.push({
      tauxBonneReponse: formations[item].tauxBonneReponse
    })
  }

  for(var i=0; i< newState.length; i++) {
    totalTauxBonneReponse += parseInt(newState[i].tauxBonneReponse, 10)
  }

  var average = totalTauxBonneReponse/Object.keys(formations).length

  return average
}
