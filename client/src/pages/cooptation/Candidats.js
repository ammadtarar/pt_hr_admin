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

export class Candidats extends React.Component {
  state = {
    'candidatsCooptes': [],
    'candidaturesRecues': [],
    'candidatEntretient': [],
    'candidatSelectionne': [],
    'popupOpen': false,
    'popupData': '',
    'search': ''
  }

  componentDidMount() {
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

    const triCandidatEntretient = Object.keys(data.candidats).reduce(function(item, e) {
      let acceptedValue = ['en-entretient']
      if (acceptedValue.includes(data.candidats[e].status)) item[e] = data.candidats[e]
      return item
    }, {})

    const triCandidatSelectionne = Object.keys(data.candidats).reduce(function(item, e) {
      let acceptedValue = ['candidat-selectionne']
      if (acceptedValue.includes(data.candidats[e].status)) item[e] = data.candidats[e]
      return item
    }, {})

    this.setState({
      'candidatsCooptes': triCandidatsCooptes,
      'candidaturesRecues': triCandidaturesRecues,
      'candidatEntretient': triCandidatEntretient,
      'candidatSelectionne': triCandidatSelectionne
    })
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  idList = {
    droppable: 'candidatsCooptes',
    droppable2: 'candidaturesRecues',
    droppable3: 'candidatEntretient',
    droppable4: 'candidatSelectionne'
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
        state = { 'candidatEntretient': items }
      }

      if (source.droppableId === 'droppable4') {
        state = { 'candidatSelectionne': items }
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
        'candidatsCooptes': result.droppable,
        'candidaturesRecues': result.droppable2,
        'candidatEntretient': result.droppable3,
        'candidatSelectionne': result.droppable4
      })
    }
    console.log(this.state)
  }

  archiverCandidat = (nom) => {
    this.setState({
      popupOpen: true,
      popupData: {
        'nom': nom
      }
    })
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
    const candidatEntretient = this.state.candidatEntretient
    const candidatSelectionne = this.state.candidatSelectionne

    return (
      <div className="wrapper">
        <div className="tab-candidats container">

          {/* Popup */}
          <div onClick={(e) => this.setState({popupOpen: false})} className={`overlay-popup ${this.state.popupOpen === true ? 'open' : ''}`}/>

          <div className={`wrapper-popup ${this.state.popupOpen === true ? 'open' : ''}`}>
            <div className={`popup center ${this.state.popupOpen === true ? 'open' : ''}`}>
              <h4 className="text-center">Etes-vous sûr de vouloir archiver le candidat <span>{this.state.popupData.nom}</span> ?</h4>
              <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur l’ayant coopté.</p>
              <button className="btn-primary">Oui, archiver</button>
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
                <div className="large-3 columns">
                  <div className="box-item">
                    <h4 className="light">Candidats cooptés</h4>
                    <div className="container-scroll">

                      {Object.keys(candidatsCooptes).length > 0 ?

                        <Droppable droppableId="droppable">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {Object.keys(candidatsCooptes)
                                .sort((a, b) => {
                                  return new Date(candidatsCooptes[a].date) < new Date(candidatsCooptes[b].date) ? 1 : (new Date(candidatsCooptes[a].date) > new Date(candidatsCooptes[b].date) ? -1 : 0)
                                })
                                .map((key, index) => (
                                <Draggable
                                  key={key}
                                  draggableId={key}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={candidatsCooptes[key]} archiverCandidat={this.archiverCandidat}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <div className="container empty candidats">
                          <img type="image/svg+xml" className="icon" src="/icons/candidat-coopte.svg" alt=""/>
                          <p className="text-center">Aucun candidat coopté</p>
                          <p className="text-center">Vos ambassadeurs n’ont pas encore coopté de profils sur vos annonces.</p>
                        </div>
                      }

                    </div>
                  </div>
                </div>
                <div className="large-3 columns">
                  <div className="box-item">
                    <h4 className="light">Candidatures reçues</h4>
                    <div className="container-scroll">

                      {Object.keys(candidaturesRecues).length > 0 ?

                        <Droppable droppableId="droppable2">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {Object.keys(candidaturesRecues)
                                .sort((a, b) => {
                                  return new Date(candidaturesRecues[a].date) < new Date(candidaturesRecues[b].date) ? 1 : (new Date(candidaturesRecues[a].date) > new Date(candidaturesRecues[b].date) ? -1 : 0)
                                })
                                .map((key, index) => (
                                <Draggable
                                  key={key}
                                  draggableId={key}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={candidaturesRecues[key]} archiverCandidat={this.archiverCandidat}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <div className="container empty candidats">
                          <img type="image/svg+xml" className="icon" src="/icons/entretien.svg" alt=""/>
                          <p className="text-center">Aucune candidature reçue</p>
                          <p className="text-center">Vous n’avez pas encore reçu de candidature sur vos annonces.</p>
                        </div>
                      }

                    </div>
                  </div>
                </div>
                <div className="large-3 columns">
                  <div className="box-item">
                    <h4 className="light">Entretiens en cours</h4>
                    <div className="container-scroll">

                      {Object.keys(candidatEntretient).length > 0 ?

                        <Droppable droppableId="droppable3">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {Object.keys(candidatEntretient)
                                .sort((a, b) => {
                                  return new Date(candidatEntretient[a].date) < new Date(candidatEntretient[b].date) ? 1 : (new Date(candidatEntretient[a].date) > new Date(candidatEntretient[b].date) ? -1 : 0)
                                })
                                .map((key, index) => (
                                <Draggable
                                  key={key}
                                  draggableId={key}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={candidatEntretient[key]} archiverCandidat={this.archiverCandidat}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <div className="container empty candidats">
                          <img type="image/svg+xml" className="icon" src="/icons/candidature.svg" alt=""/>
                          <p className="text-center">Aucun entretien en cours</p>
                          <p className="text-center">Il semblerait qu’il n’y ait pas d’entretien en ce moment !</p>
                        </div>
                      }

                    </div>
                  </div>
                </div>
                <div className="large-3 columns col-candidats-selectionnes">
                  <div className="box-item denim">
                    <h4 className="light">Candidats sélectionnés</h4>
                    <div className="container-scroll">

                      {Object.keys(candidatSelectionne).length > 0 ?

                        <Droppable droppableId="droppable4">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {Object.keys(candidatSelectionne)
                                .sort((a, b) => {
                                  return new Date(candidatSelectionne[a].date) < new Date(candidatSelectionne[b].date) ? 1 : (new Date(candidatSelectionne[a].date) > new Date(candidatSelectionne[b].date) ? -1 : 0)
                                })
                                .map((key, index) => (
                                <Draggable
                                  key={key}
                                  draggableId={key}
                                  index={index}>
                                  {(provided, snapshot) => (
                                    <div
                                      ref={provided.innerRef}
                                      {...provided.draggableProps}
                                      {...provided.dragHandleProps}
                                      >
                                        <CardCandidat data={candidatSelectionne[key]} archiverCandidat={this.archiverCandidat}/>
                                    </div>
                                  )}
                                </Draggable>
                              ))}
                              {provided.placeholder}
                            </div>
                          )}
                        </Droppable>
                        :
                        <div className="container empty candidats candidats-selectionnes">
                          <img type="image/svg+xml" className="icon" src="/icons/selectionne.svg" alt=""/>
                          <p className="text-center">Aucun candidat sélectionné</p>
                          <p className="text-center">Déplacez ici les candidats que vous avez sélectionné.</p>
                        </div>
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

export default Candidats;
