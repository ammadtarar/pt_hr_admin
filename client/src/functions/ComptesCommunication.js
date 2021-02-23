export function compteArticlesActifs(communication) {
  const communicationChecked = Object.keys(communication).reduce((item, e) => {
    if ([true].includes(communication[e].checked)) item[e] = communication[e]
    return item
  }, {})
  const count = Object.keys(communicationChecked).length
  return count
}

export function compteArticlesTotalViews(communication) {
  const newState = []
  var totalViews = 0

  for (let item in communication) {
    newState.push({
      views: communication[item].views
    })
  }

  for(var i=0; i< newState.length; i++) {
    totalViews += parseInt(newState[i].views, 10)
  }
  return totalViews
}
