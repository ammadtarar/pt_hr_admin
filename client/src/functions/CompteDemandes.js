export function triDemandesRecompenses(demandes) {
  //Fonction recherche obj avec property 'traite'
  //Tiré du guide avec plusieurs types de recherches JSON : http://techslides.com/how-to-parse-and-search-json-in-javascript
  function getDemandes(obj, key) {
    var objects = []
    for (var i in obj) {
      if (!obj.hasOwnProperty(i)) continue
      if (typeof obj[i] == 'object') {
        objects = objects.concat(getDemandes(obj[i], key))
      } else if (i === key) {
        objects.push(obj)
      }
    }
    return objects
  }

  return getDemandes(demandes,'traite')
}

export function comptesDemandesNonTraite(recompenses) {
  const demandes = Object.keys(recompenses)
  .filter((key) => Object.keys(recompenses[key].demandes).length > 0)
  .map((key) => {
    return recompenses[key]
  })

  const demandesFiltres = demandes.filter((el) => {
    return el != null
  })
  return demandesFiltres
}
