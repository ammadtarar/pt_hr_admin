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
  constructor() {
    super()
    this.state = {
      'data': data.candidats,
      'candidatsCooptes': [],
      'candidaturesRecues': [],
      'candidatsEntretiens': [],
      'candidatsSelectionne': [],
      'popupArchiveOpen': false,
      'popupStatusCandidatOpen': false,
      'popupData': '',
      'search': ''
    }
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  idList = {
    droppable: 'candidatsCooptes',
    droppable2: 'candidaturesRecues',
    droppable3: 'candidatsEntretiens',
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
        state = { 'candidatsEntretiens': items }
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

      //Obtenir obj candidat à changer + Text du droppable visé
      const idToMove = source.index
      const data = this.getList(source.droppableId)[idToMove]
      this.setState({
        popupStatusCandidatOpen: true,
        popupData: {
          ...data,
          droppableColText: destination.droppableId === 'droppable' ? 'Coopté' : destination.droppableId === 'droppable2' ? 'Candidature reçue' : destination.droppableId === 'droppable3' ? 'Entretien en cours' : destination.droppableId === 'droppable4' ? 'Sélectionné' : ''
        }
      })

      document.getElementById('okChangeStatus').addEventListener('click', () => {
        // Modifier status du candidat lors du drop
        if (result.droppable) {
          result.droppable.forEach((item,i) => {
             result.droppable[i].status = 'Candidats cooptés'
          })
        }
        if (result.droppable2) {
          result.droppable2.forEach((item,i) => {
             result.droppable2[i].status = 'Candidatures reçues'
          })
        }
        if (result.droppable3) {
          result.droppable3.forEach((item,i) => {
            result.droppable3[i].status = 'Entretiens en cours'
          })
        }
        if (result.droppable4) {
          result.droppable4.forEach((item,i) => {
            result.droppable4[i].status = 'Candidats sélectionnés'
          })
        }

        this.setState({
          'candidatsCooptes': result.droppable ? result.droppable : this.state.candidatsCooptes,
          'candidaturesRecues': result.droppable2 ? result.droppable2 : this.state.candidaturesRecues,
          'candidatsEntretiens': result.droppable3 ? result.droppable3 : this.state.candidatsEntretiens,
          'candidatsSelectionne': result.droppable4 ? result.droppable4 : this.state.candidatsSelectionne,
          'popupStatusCandidatOpen': false
        })
      })
      for (let i = 0; i < 2; i += 1) {
        const ko = document.getElementById(`koChangeStatus${i + 1}`);
        ko.addEventListener('click', () => {
          this.setState({
            'candidatsCooptes': this.state.candidatsCooptes,
            'candidaturesRecues': this.state.candidaturesRecues,
            'candidatsEntretiens': this.state.candidatsEntretiens,
            'candidatsSelectionne': this.state.candidatsSelectionne,
            'popupStatusCandidatOpen': false
          })
        })
      }

    }
  }

  popupArchive = (data) => {
    this.setState({
      popupArchiveOpen: true,
      popupData: data
    })
  }

  archiverCandidat(e) {
    e.preventDefault()
    this.setState({popupArchiveOpen: false})

    //Candidat à archiver
    const data = this.state.popupData
    data.archive = true
    console.log(data.archive)
    console.log(data.id)
    // À modifier sur serveur

  }

  handleSearch (e) {
    e.preventDefault()
    const name = e.target.name
    const value = e.target.value

    this.setState({
      search: value
    })
  }

  componentDidMount() {
    // fetch(data)
    //   .then(res => res.json())
    //   .then(res => {
    //     this.setState({
    //       'data': res
    //     })
    //   })

    const data = this.state.data
    // Tri des candidats dans les 4 colonnes
    const triCooptes = Object.keys(data).reduce((item, e) => {
      let acceptedValue = ['Candidats cooptés']
      if (acceptedValue.includes(data[e].status)) item[e] = data[e]
      return item
    }, {})

    const triRecus = Object.keys(data).reduce((item, e) => {
      let acceptedValue = ['Candidatures reçues']
      if (acceptedValue.includes(data[e].status)) item[e] = data[e]
      return item
    }, {})

    const triEntretiens = Object.keys(data).reduce((item, e) => {
      let acceptedValue = ['Entretiens en cours']
      if (acceptedValue.includes(data[e].status)) item[e] = data[e]
      return item
    }, {})

    const triSelectionne = Object.keys(data).reduce((item, e) => {
      let acceptedValue = ['Candidats sélectionnés']
      if (acceptedValue.includes(data[e].status)) item[e] = data[e]
      return item
    }, {})

    this.setState({
      'candidatsCooptes': Object.keys(triCooptes).map(i => triCooptes[i]),
      'candidaturesRecues': Object.keys(triRecus).map(i => triRecus[i]),
      'candidatsEntretiens': Object.keys(triEntretiens).map(i => triEntretiens[i]),
      'candidatsSelectionne': Object.keys(triSelectionne).map(i => triSelectionne[i])
    })
  }

  render() {
    const candidatsCooptes = this.state.candidatsCooptes
    const candidaturesRecues = this.state.candidaturesRecues
    const candidatsEntretiens = this.state.candidatsEntretiens
    const candidatsSelectionne = this.state.candidatsSelectionne

    return (
      <div className="wrapper">
        <div className="tab-candidats container">

          {/* Popup archiver */}
          <div
          onClick={(e) => this.setState({popupArchiveOpen: false})}
          className={`overlay-popup ${this.state.popupArchiveOpen === true ? 'open' : ''}`}/>

          <div className={`wrapper-popup ${this.state.popupArchiveOpen === true ? 'open' : ''}`}>
            <div className={`popup center ${this.state.popupArchiveOpen === true ? 'open' : ''}`}>
              <h4 className="text-center">Etes-vous sûr de vouloir archiver le candidat <span>{this.state.popupData.prenom + ' ' + this.state.popupData.nom}</span> ?</h4>
              <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur l’ayant coopté.</p>
              <button onClick={(e) => this.archiverCandidat(e,data)} className="btn-primary">Oui, archiver</button>
              <button onClick={(e) => this.setState({popupArchiveOpen: false})} className="btn-secondary">Annuler</button>
            </div>
          </div>
         {/* End popup archiver */}

         {/* Popup changer status candidat */}
          <div
          id="koChangeStatus1"
          onClick={(e) => this.setState({popupStatusCandidatOpen: false})}
          className={`overlay-popup ${this.state.popupStatusCandidatOpen === true ? 'open' : ''}`}/>

          <div className={`wrapper-popup ${this.state.popupStatusCandidatOpen === true ? 'open' : ''}`}>
            <div className={`popup center ${this.state.popupStatusCandidatOpen === true ? 'open' : ''}`}>
              <h4 className="text-center">Etes-vous sûr de vouloir changer le statut de candidature de <span>{this.state.popupData.prenom + ' ' + this.state.popupData.nom}</span> de <span>{this.state.popupData.status}</span> à <span>{this.state.popupData.droppableColText}</span>, pour l’offre de <span>{this.state.popupData.titre}</span> ?</h4>
              <p className="text-center">Cette action est irréversible et notifiera automatiquement le collaborateur l’ayant coopté.</p>
              <div className="box-note-popup">
                <p><strong>Conseil </strong><br/>Pensez à archiver les candidats non sélectionnés pour cette offre !</p>
              </div>
              <button id="okChangeStatus" className="btn-primary">Oui, changer</button>
              <button id="koChangeStatus2" className="btn-secondary">Annuler</button>
            </div>
          </div>
         {/* End popup changer status candidat */}

          <div className="container">
            <div className="row-fluid">
              <div className="large-11 columns"/>
              <div className="large-1 columns">
                <input
                  type="text"
                  name="search"
                  className="search"
                  placeholder="Rechercher"
                  onChange={(e) => this.handleSearch(e)}
                  value={this.state.search}
                />
              </div>
            </div>


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
                                        <CardCandidat data={key} popup={this.popupArchive}/>
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
                            <div className={`container empty candidats ${candidatsCooptes.length === 0 ? '' : ''}`}>
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
                                        <CardCandidat data={key} popup={this.popupArchive}/>
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
                            <div className={`container empty candidats ${candidaturesRecues.length === 0 ? '' : ''}`}>
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

                      {candidatsEntretiens.length > 0 ?

                        <Droppable droppableId="droppable3">
                          {(provided, snapshot) => (
                            <div
                              ref={provided.innerRef}>
                              {candidatsEntretiens
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
                                        <CardCandidat data={key} popup={this.popupArchive}/>
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
                            <div className={`container empty candidats ${candidatsEntretiens.length === 0 ? '' : ''}`}>
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
                                        <CardCandidat data={key} popup={this.popupArchive}/>
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
                            <div className={`container empty candidats candidats-selectionnes ${candidatsSelectionne.length === 0 ? '' : ''}`}>
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
