export function compteDemandesRecompenses(recompenses) {
  const demandes = Object.keys(recompenses).map((key, item, i) => {
    if (Object.keys(recompenses[key].demandes).length > 0)
      return recompenses[key]
  })

  var demandesFiltres = demandes.filter((el) => {
    return el != null
  })
  return demandesFiltres
}
