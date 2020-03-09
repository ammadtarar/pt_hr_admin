import React, { useState, useEffect, Suspense } from 'react'
import uuidv1 from 'uuid/v1'
const BoxRecompense = React.lazy(() => import('../../components/BoxRecompense'))
const datas = require('../../datas.json')

function Recompenses(props) {
  const [popupOpen, setPopupOpen] = useState(false)
  const [newRecompense, setNewRecompense] = useState({titre: '', points: ''})
  const [errors, setErrors] = useState({titre: '', points: ''})
  const [recompenses, setRecompenses] = useState([])

  const dataToChange = (data,e) => {
    //Ajouter nouvelle data aux anciennes datas
    Object.keys(recompenses).push(data)
    setRecompenses(recompenses)
    //Puis objet à renvoyer au serveur

  }

  const handleChangeText = e => {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    setNewRecompense({
      ...newRecompense,
      [name]: value,
      'points': isNaN(Number(value)) ? newRecompense.points : value
    })
  }

  const publierRecompense = e => {
    e.preventDefault()

    switch (true) {
      case newRecompense.titre === '' && newRecompense.points === '':
        setErrors({titre: 'error', points: 'error'})
        break
      case newRecompense.titre === '' || newRecompense.titre === undefined:
        setErrors({titre: 'error'})
        break
      case newRecompense.points === '':
        setErrors({points: 'error'})
        break
      default:
        const newID = uuidv1()
        // Push nouvelles datas récompenses dans state + reset state newRecompense
        const newRecompenses = {
          ...recompenses,
          [newID]: {
            ...newRecompense,
            id: newID,
            checked: true
          }
        }
        setRecompenses(newRecompenses)
        setPopupOpen(false)
        setNewRecompense({})
    }
  }

  // async function getData() {
  //   const response = await fetch(url)
  //   const data = await response.json()
  //   setData(data)
  // }
  //
  useEffect(() => {
    // getData()
    setRecompenses(datas.recompenses)
  }, [])

  return (
    <div className="wrapper">

      {/* Popup */}
      <div onClick={(e) => setPopupOpen(false)} className={`overlay-popup ${popupOpen === true ? 'open' : ''}`}/>

      <div className={`popup ${popupOpen === true ? 'open' : ''}`}>
        <img onClick={(e) => setPopupOpen(false)} type="image/svg+xml" className="close" src="/icons/fermer.svg" alt=""/>
        <h3 tabIndex={8}>Créer une récompense</h3>
        <form onSubmit={(e) => publierRecompense(e)}>
          <label>Nom</label>
          <input tabIndex={9} type="text" name="titre" className={errors.titre} onChange={(e) => handleChangeText(e)} value={newRecompense.titre} placeholder="Nom de la récompense"/>
          <label>Nombre de points</label>
          <input tabIndex={10} type="text" name="points" className={errors.points} onChange={(e) => handleChangeText(e)} value={newRecompense.points} placeholder="Nombre de points requis"/>
          <button className="btn-primary"><div tabIndex={11}>Publier</div></button>
          <p className="note">Une fois publiée, cette récompense sera visible par tous les ambassadeurs.</p>
        </form>
      </div>
      {/* End popup */}

      <div className="tab-recompenses container">
        <div className="container">
          <div className="row-fluid">
            <div className="large-11 columns"></div>
            <div className="large-1 columns">
              <button tabIndex={8} onClick={(e) => setPopupOpen(true)} className="btn-primary">Créer</button>
            </div>
          </div>
        </div>

        <Suspense fallback={
          <div className="container-suspense">
            <div className="loader" id="loader">
              <span></span>
              <span></span>
              <span></span>
            </div>
          </div>}>

          {Object.keys(recompenses).length > 0 ?

              Object.keys(recompenses)
                .sort((a, b) => {
                  return new Date(a.date) < new Date(b.date) ? 1 : (new Date(a.date) > new Date(b.date) ? -1 : 0)
                })
                .map((key, item, i) => {
                return (
                  <BoxRecompense key={recompenses[key].id} tab={item} data={recompenses[key]} dataToChange={(e) => dataToChange(e)}/>
                )
              })
              :
              Object.keys(recompenses).length === 0 ?
              setTimeout(() => {
                return (
                  <div className="container empty">
                    <img type="image/svg+xml" className="icon" src="/icons/recompense.svg" alt=""/>
                    <p className="text-center">Créez votre première récompense !</p>
                    <p className="text-center">Vous pouvez dès à présent créer votre première récompense en cliquant sur le bouton “Créer” en haut à droite.</p>
                  </div>
                )
              }, 500) : ''
            }
        </Suspense>
      </div>
    </div>
  )
}

export default Recompenses
