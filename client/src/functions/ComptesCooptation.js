export function compteAnnoncesActives(annonces) {
  const annoncesChecked = Object.keys(annonces).reduce((item, e) => {
    if ([true].includes(annonces[e].checked)) item[e] = annonces[e]
    return item
  }, {})
  const count = Object.keys(annoncesChecked).length
  return count
}

export function compteAnnoncesTotalViews(annonces) {
  const newState = []
  var totalViews = 0

  for (let item in annonces) {
    newState.push({
      views: annonces[item].views
    })
  }

  for(var i=0; i< newState.length; i++) {
    totalViews += parseInt(newState[i].views, 10)
  }
  return totalViews
}

export function compteCandidatsCooptes(candidats) {
  const nbrCandidatsCooptes = Object.keys(candidats).map((key) => {
    if(candidats[key].cooptations.length !== 0) {
      return candidats[key]
    }
  })

  const nbrCandidatsCooptesFiltres = nbrCandidatsCooptes.filter((el) => {
    return el != null
  })

  return nbrCandidatsCooptesFiltres
}
