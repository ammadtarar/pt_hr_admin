import React from 'react'
import CardCandidat from '../../components/CardCandidat'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const data = require('../../datas.json')

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

/**
 * Moves an item from one list to another list.
 */
const move = (source, destination, droppableSource, droppableDestination) => {
  const sourceClone = Array.from(source)
  const destClone = Array.from(destination)
  const [removed] = sourceClone.splice(droppableSource.index, 1)

  destClone.splice(droppableDestination.index, 0, removed)

  const result = {}
  result[droppableSource.droppableId] = sourceClone
  result[droppableDestination.droppableId] = destClone

  return result
}

// Tri des candidats dans les 4 colonnes
const triCandidatsCooptes = Object.keys(data.candidats).reduce(function(item, e) {
  let acceptedValue = ['candidat-coopte']
  if (acceptedValue.includes(data.candidats[e].status)) item[e] = data.candidats[e]
  return item
}, {})

const triCandidaturesRecues = Object.keys(data.candidats).reduce(function(item, e) {
  let acceptedValue = ['candidature-recue']
  if (acceptedValue.includes(data.candidats[e].status)) item[e] = data.candidats[e]
  return item
}, {})

const tricandidatsEntretient = Object.keys(data.candidats).reduce(function(item, e) {
  let acceptedValue = ['en-entretient']
  if (acceptedValue.includes(data.candidats[e].status)) item[e] = data.candidats[e]
  return item
}, {})

const tricandidatsSelectionne = Object.keys(data.candidats).reduce(function(item, e) {
  let acceptedValue = ['candidat-selectionne']
  if (acceptedValue.includes(data.candidats[e].status)) item[e] = data.candidats[e]
  return item
}, {})

export class Candidats extends React.Component {
  state = {
    'candidatsCooptes': Object.keys(triCandidatsCooptes).map(i => triCandidatsCooptes[i]),
    'candidaturesRecues': [],
    'candidatsEntretient': Object.keys(tricandidatsEntretient).map(i => tricandidatsEntretient[i]),
    'candidatsSelectionne': Object.keys(tricandidatsSelectionne).map(i => tricandidatsSelectionne[i]),
    'popupOpen': false,
    'popupData': '',
    'search': ''
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  idList = {
    droppable: 'candidatsCooptes',
    droppable2: 'candidaturesRecues',
    droppable3: 'candidatsEntretient',
    droppable4: 'candidatsSelectionne'
  }

  getList = id => this.state[this.idList[id]]

  onDragEnd = result => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      return
    }

    if (source.droppableId === destination.droppableId) {
      const items = reorder(
        this.getList(source.droppableId),
        source.index,
        destination.index
      )

      let state = { items }

      if (source.droppableId === 'droppable2') {
        state = { 'candidaturesRecues': items }
      }

      if (source.droppableId === 'droppable3') {
        state = { 'candidatsEntretient': items }
      }

      if (source.droppableId === 'droppable4') {
        state = { 'candidatsSelectionne': items }
      }

      this.setState(state)
    } else {
      const result = move(
        this.getList(source.droppableId),
        this.getList(destination.droppableId),
        source,
        destination
      )

      this.setState({
        // 'candidatsCooptes': result.droppable,
        // 'candidaturesRecues': result.droppable2,
        'candidatsEntretient': result.droppable3,
        'candidatsSelectionne': result.droppable4
      })
    }
  }

  popup = (data) => {
    this.setState({
      popupOpen: true,
      popupData: data
    })
  }

  archiverCandidat(e) {
    e.preventDefault()
    this.setState({popupOpen: false})

    //Candidat à archiver
    // const data = this.state.popupData
    // data.archive = true
    // console.log(data.archive)
    // console.log(data.id)
  }

  handleSearch (e) {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    this.setState({
      search: value
    })
  }

  render() {
    const candidatsCooptes = this.state.candidatsCooptes
    const candidaturesRecues = this.state.candidaturesRecues
    const candidatsEntretient = this.state.candidatsEntretient
    const candidatsSelectionne = this.state.candidatsSelectionne

    return (
      <div className="wrapper">
        <div className="tab-candidats container">

          {/* Popup */}
          <div onClick={(e) => this.setState({popupOpen: false})} className={`overlay-popup ${this.state.popupOpen === true ? 'open' : ''}`}/>

          <div className={`wrapper-popup ${this.state.popupOpen === true ? 'open' : ''}`}>
            <div className={`popup center ${this.state.popupOpen === true ? 'open' : ''}`}>
              <h4 className="text-center">Etes-vous sûr de vouloir archiver le candidat <span>{this.state.popupData.prenom + ' ' + this.state.popupData.nom}</span> ?</h4>
              <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur l’ayant coopté.</p>
              <button onClick={(e) => this.archiverCandidat(e,data)} className="btn-primary">Oui, archiver</button>
              <button onClick={(e) => this.setState({popupOpen: false})} className="btn-secondary">Annuler</button>
            </div>
          </div>
         {/* End popup */}

         {/* Popup
         <div onClick={(e) => this.setState({popupOpen: false})} className={`overlay-popup ${this.state.popupOpen === true ? 'open' : ''}`}/>

         <div className={`wrapper-popup ${this.state.popupOpen === true ? 'open' : ''}`}>
           <div className={`popup center ${this.state.popupOpen === true ? 'open' : ''}`}>
             <h4 className="text-center">Etes-vous sûr de vouloir changer le statut de candidature de <span>Debra Mccoy</span> de <span>Entretiens en cours</span> à <span>Sélectionné</span>, pour l’offre de <span>Customer success manager</span> ?</h4>
             <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur l’ayant coopté.</p>
             <div className="box-note-popup">
               <p><strong>Conseil </strong><br/>Pensez à archiver les candidats non sélectionnés pour cette offre !</p>
             </div>
             <button className="btn-primary">Oui, changer</button>
             <button onClick={(e) => this.setState({popupOpen: false})} className="btn-secondary">Annuler</button>
           </div>
         </div>
          End popup */}

          <div className="container">
            <input
              type="text"
              name="search"
              className="search"
              placeholder="Rechercher"
              onChange={(e) => this.handleSearch(e)}
              value={this.state.search}
            />

            <DragDropContext onDragEnd={this.onDragEnd}>
              <div className="row-fluid">
                <div className="large-3 medium-6 columns">
                  <div className="box-item">
                    <h4 className="light">Candidats cooptés</h4>
                    <div className="container-scroll">

                      {candidatsCooptes.length > 0 ?

                        <Droppable droppableId="droppable">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {candidatsCooptes
                                .sort((a, b) => {
                                  return new Date(a.date) < new Date(b.date) ? 1 : (new Date(a.date) > new Date(b.date) ? -1 : 0)
                                })
                                .map((key, index) => (
                                <Draggable
                                  key={key.id}
                                  draggableId={key.id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={key} popup={this.popup}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <Droppable droppableId="droppable">
                          {(provided, snapshot) => (
                          <div ref={provided.innerRef}>
                            <div className="container empty candidats">
                              <img type="image/svg+xml" className="icon" src="/icons/candidat-coopte.svg" alt=""/>
                              <p className="text-center">Aucun candidat coopté</p>
                              <p className="text-center">Vos ambassadeurs n’ont pas encore coopté de profils sur vos annonces.</p>
                            </div>
                          </div>)}
                        </Droppable>
                      }

                    </div>
                  </div>
                </div>
                <div className="large-3 medium-6 columns">
                  <div className="box-item">
                    <h4 className="light">Candidatures reçues</h4>
                    <div className="container-scroll">

                      {candidaturesRecues.length > 0 ?

                        <Droppable droppableId="droppable2">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {candidaturesRecues
                                .sort((a, b) => {
                                  return new Date(a.date) < new Date(b.date) ? 1 : (new Date(a.date) > new Date(b.date) ? -1 : 0)
                                })
                                .map((key, index) => (
                                <Draggable
                                  key={key.id}
                                  draggableId={key.id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={key} popup={this.popup}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <Droppable droppableId="droppable2">
                          {(provided, snapshot) => (
                          <div ref={provided.innerRef}>
                            <div className="container empty candidats">
                              <img type="image/svg+xml" className="icon" src="/icons/entretien.svg" alt=""/>
                              <p className="text-center">Aucune candidature reçue</p>
                              <p className="text-center">Vous n’avez pas encore reçu de candidature sur vos annonces.</p>
                            </div>
                          </div>)}
                        </Droppable>
                      }

                    </div>
                  </div>
                </div>
                <div className="large-3 medium-6 columns">
                  <div className="box-item">
                    <h4 className="light">Entretiens en cours</h4>
                    <div className="container-scroll">

                      {candidatsEntretient.length > 0 ?

                        <Droppable droppableId="droppable3">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {candidatsEntretient
                                .map((key, index) => (
                                <Draggable
                                  key={key.id}
                                  draggableId={key.id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={key} popup={this.popup}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <Droppable droppableId="droppable3">
                          {(provided, snapshot) => (
                          <div ref={provided.innerRef}>
                            <div className="container empty candidats">
                              <img type="image/svg+xml" className="icon" src="/icons/candidature.svg" alt=""/>
                              <p className="text-center">Aucun entretien en cours</p>
                              <p className="text-center">Il semblerait qu’il n’y ait pas d’entretien en ce moment !</p>
                            </div>
                          </div>)}
                        </Droppable>
                      }

                    </div>
                  </div>
                </div>
                <div className="large-3 medium-6 columns col-candidats-selectionnes">
                  <div className="box-item denim">
                    <h4 className="light">Candidats sélectionnés</h4>
                    <div className="container-scroll">

                      {candidatsSelectionne.length > 0 ?

                        <Droppable droppableId="droppable4">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {candidatsSelectionne
                                .sort((a, b) => {
                                  return new Date(a.date) < new Date(b.date) ? 1 : (new Date(a.date) > new Date(b.date) ? -1 : 0)
                                })
                                .map((key, index) => (
                                <Draggable
                                  key={key.id}
                                  draggableId={key.id}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={key} popup={this.popup}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <Droppable droppableId="droppable4">
                          {(provided, snapshot) => (
                          <div ref={provided.innerRef}>
                            <div className="container empty candidats candidats-selectionnes">
                              <img type="image/svg+xml" className="icon" src="/icons/selectionne.svg" alt=""/>
                              <p className="text-center">Aucun candidat sélectionné</p>
                              <p className="text-center">Déplacez ici les candidats que vous avez sélectionné.</p>
                            </div>
                          </div>)}
                        </Droppable>
                      }

                    </div>
                  </div>
                </div>
              </div>
            </DragDropContext>

          </div>
        </div>
      </div>
    )
  }
}

export default Candidats
