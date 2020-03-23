export function triCooptes(data) {
  const candidatsNonArchives = Object.keys(data).map((key) => {
    const item = data[key]
    if(item.archive === false) {
      return item
    }
  })

  const candidats = candidatsNonArchives.filter((el) => {
    return el != null
  })

  const triCooptes = Object.keys(candidats).reduce((item, e) => {
    let value = ['Candidats cooptés']
    if (value.includes(candidats[e].status)) item[e] = candidats[e]
    return item
  }, {})

  return triCooptes
}

export function triRecus(data) {
  const candidatsNonArchives = Object.keys(data).map((key) => {
    const item = data[key]
    if(item.archive === false) {
      return item
    }
  })

  const candidats = candidatsNonArchives.filter((el) => {
    return el != null
  })

  const triRecus = Object.keys(candidats).reduce((item, e) => {
    let value = ['Candidatures reçues']
    if (value.includes(candidats[e].status)) item[e] = candidats[e]
    return item
  }, {})

  return triRecus
}

export function triEntretiens(data) {
  const candidatsNonArchives = Object.keys(data).map((key) => {
    const item = data[key]
    if(item.archive === false) {
      return item
    }
  })

  const candidats = candidatsNonArchives.filter((el) => {
    return el != null
  })

  const triEntretiens = Object.keys(candidats).reduce((item, e) => {
    let value = ['Entretiens en cours']
    if (value.includes(candidats[e].status)) item[e] = candidats[e]
    return item
  }, {})

  return triEntretiens
}

export function triSelectionne(data) {
  const candidatsNonArchives = Object.keys(data).map((key) => {
    const item = data[key]
    if(item.archive === false) {
      return item
    }
  })

  const candidats = candidatsNonArchives.filter((el) => {
    return el != null
  })

  const triSelectionne = Object.keys(candidats).reduce((item, e) => {
    let value = ['Candidats sélectionnés']
    if (value.includes(candidats[e].status)) item[e] = candidats[e]
    return item
  }, {})

  return triSelectionne
}
