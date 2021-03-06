import { HTTP, URLS } from "../../network/http";
import React from 'react'
import CardCandidat from '../../components/CardCandidat'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const datas = require('../../datas.json')

// a little function to help us with reordering the result
const reorder = (list, startIndex, endIndex) => {
  const result = Array.from(list)
  const [removed] = result.splice(startIndex, 1)
  result.splice(endIndex, 0, removed)

  return result
}

// Moves an item from one list to another list
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
    'data': datas.candidats,
    'candidatsCooptes': [],
    'candidaturesRecues': [],
    'candidatsEntretiens': [],
    'candidatsSelectionne': [],
    'saveForSearch': {
      'candidatsCooptes': [],
      'candidaturesRecues': [],
      'candidatsEntretiens': [],
      'candidatsSelectionne': []
    },
    'popupArchiveOpen': false,
    'popupStatusOpen': false,
    'popupData': [],
    'searchText': window.innerWidth >= 890 ? 'Rechercher' : '',
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
    droppable3: 'candidatsEntretiens',
    droppable4: 'candidatsSelectionne'
  }

  getList = id => this.state[this.idList[id]]

  onDragStart = start => {
    this.setState({
      droppable: start.source.droppableId
    })
  }

  getJobReferrals = async () => {
    return new Promise((resolve , reject)=>{
      HTTP.get(`${URLS.JOBS.REFERRALS_LIST_ALL}`)
      .then((response) => {
        resolve(response.data)
      })
      .catch((err) => {
        console.log("JOBS ERROR");
        console.log(err);
      });
    });
    
  };

  onDragEnd = result => {
    const { source, destination } = result

    // dropped outside the list
    if (!destination) {
      this.setState({droppable: null})
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

      //Ouvrir popup : obtenir obj candidat ?? changer + remplir text du droppable vis??
      const idToMove = source.index
      const data = this.getList(source.droppableId)[idToMove]

      this.setState({
        popupStatusOpen: true,
        popupData: {
          ...data,
          droppableColText: destination.droppableId === 'droppable' ? 'Coopt??' : destination.droppableId === 'droppable2' ? 'Candidature re??ue' : destination.droppableId === 'droppable3' ? 'Entretien en cours' : destination.droppableId === 'droppable4' ? 'S??lectionn??' : ''
        }
      })

      const resultDroppable1 = result.droppable ? result.droppable : this.state.candidatsCooptes
      const resultDroppable2 = result.droppable2 ? result.droppable2 : this.state.candidaturesRecues
      const resultDroppable3 = result.droppable3 ? result.droppable3 : this.state.candidatsEntretiens
      const resultDroppable4 = result.droppable4 ? result.droppable4 : this.state.candidatsSelectionne

      this.setState({
        'candidatsCooptes': resultDroppable1,
        'candidaturesRecues': resultDroppable2,
        'candidatsEntretiens': resultDroppable3,
        'candidatsSelectionne': resultDroppable4
      })

      //Clique popup changer status candidat: changer status ou annuler
      document.getElementById('okChangeStatus').addEventListener('click', () => {
        // Accepter: modifier status du candidat apr??s drop

        console.log("this.state.popupData");
        var newStatus = "";
        if(this.state.popupData.droppableColText === "Candidats coopt??s"){
          newStatus = "candidate_referred"
        }else if(this.state.popupData.droppableColText === "Candidature re??ue"){
          newStatus = "application_received"
        }else if(this.state.popupData.droppableColText === "Entretien en cours"){
          newStatus = "undergoing_interview"
        }else if(this.state.popupData.droppableColText === "S??lectionn??"){
          newStatus = "candidate_selected"
        }
        console.log("== this.state.popupData.droppableColText = ", this.state.popupData.droppableColText);
        console.log("== newStatus = ", newStatus);
        console.log("== stage = ", this.state.popupData.stage);
        console.log(this.state.popupData);

        HTTP.post(URLS.JOBS.UPDATE_REFERRAL_STATUS.replace(":id" , this.state.popupData.id) , {
          stage : newStatus
        })
        .then(response=>{
          console.log("UPDATE RESPONSE");
          console.log(response);
        })
        .catch(err => {
          console.log("UPDATE ERROR");
          console.log(err);
        })

        if (result.droppable) {
          result.droppable.forEach((item,i) => {
             result.droppable[i].status = 'Candidats coopt??s'
          })
        }
        if (result.droppable2) {
          result.droppable2.forEach((item,i) => {
             result.droppable2[i].status = 'Candidatures re??ues'
          })
        }
        if (result.droppable3) {
          result.droppable3.forEach((item,i) => {
            result.droppable3[i].status = 'Entretiens en cours'
          })
        }
        if (result.droppable4) {
          result.droppable4.forEach((item,i) => {
            result.droppable4[i].status = 'Candidats s??lectionn??s'
          })
        }

        this.setState({
          droppable: null,
          'candidatsCooptes': resultDroppable1,
          'candidaturesRecues': resultDroppable2,
          'candidatsEntretiens': resultDroppable3,
          'candidatsSelectionne': resultDroppable4,
          'saveForSearch': {
            'candidatsCooptes': resultDroppable1,
            'candidaturesRecues': resultDroppable2,
            'candidatsEntretiens': resultDroppable3,
            'candidatsSelectionne': resultDroppable4,
          },
          'popupStatusOpen': false,
          'popupData': []
        })
      })
      // Ou annuler
      for (let i = 0; i < 2; i += 1) {
        const ko = document.getElementById(`koChangeStatus${i + 1}`)
        ko.addEventListener('click', () => {
          this.setState({
            droppable: null,
            'candidatsCooptes': this.state.saveForSearch.candidatsCooptes,
            'candidaturesRecues': this.state.saveForSearch.candidaturesRecues,
            'candidatsEntretiens': this.state.saveForSearch.candidatsEntretiens,
            'candidatsSelectionne': this.state.saveForSearch.candidatsSelectionne,
            'popupStatusOpen': false,
            'popupData': []
          })
        })
      }

    }
  }

  popupArchive = data => {
    this.setState({
      popupArchiveOpen: true,
      popupData: data
    })
  }

  archiverCandidat(e) {
    // CALL API
    e.preventDefault()

    //Candidat ?? archiver
    const data = this.state.popupData
    const id = data.id

   
    HTTP.post(URLS.JOBS.ARCHIVE_BY_ID.replace(":id" , id))
    .then((response) => {
      console.log("ARCHIVE RESPONSE");
      console.log(response.data);
      
      
      this.setState({
        popupArchiveOpen: false,
        popupData: false
      });
      this.componentDidMount();

    })
    .catch((err) => {
      console.log("JOBS ERROR");
      console.log(err);
    });

  }

  fermerPopup(e) {
    this.setState({
      popupArchiveOpen: false,
      popupData: {candidate : {}}
    })
  }

  handleSearch (e) {
    e.preventDefault()
    const value = e.target.value

    this.setState({
      search: value
    })


    //Fonction recherche sp??cifique value dans array of objects
    function searchObj (obj, query) {
      const fullname = `${obj.candidate.first_name} ${obj.candidate.last_name}`
      if(fullname.toLowerCase().indexOf(query.toLowerCase()) > -1){
        return obj
      }
    }

    //Recherche dans chacune des 4 colonnes, et mise ?? jour du state
    const saveForSearch = this.state.saveForSearch
    this.setState({
      candidatsCooptes: saveForSearch.candidatsCooptes.filter((obj) => {
        return searchObj(obj, value)
      }),
      candidaturesRecues: saveForSearch.candidaturesRecues.filter((obj) => {
        return searchObj(obj, value)
      }),
      candidatsEntretiens: saveForSearch.candidatsEntretiens.filter((obj) => {
        return searchObj(obj, value)
      }),
      candidatsSelectionne: saveForSearch.candidatsSelectionne.filter((obj) => {
        return searchObj(obj, value)
      })
    })
  }

  async componentDidMount() {

    let referrals = await this.getJobReferrals();

    // Tri des candidats dans les 4 colonnes en fonction de leur status
    const data = referrals;
    const candidatsNonArchives = Object.keys(data)
      .filter((key) => data[key].archive === false)
      .map((key) => {
          return data[key]
      })

    const candidats = candidatsNonArchives.filter((el) => {
      return el != null
    })


    const triCooptes = Object.keys(candidats).reduce((item, e) => {
      let value = ['candidate_referred']
      if (value.includes(candidats[e].stage)) item[e] = candidats[e]
      return item
    }, {})

    const triRecus = Object.keys(candidats).reduce((item, e) => {
      let value = ['application_received']
      if (value.includes(candidats[e].stage)) item[e] = candidats[e]
      return item
    }, {})

    const triEntretiens = Object.keys(candidats).reduce((item, e) => {
      let value = ['undergoing_interview']
      if (value.includes(candidats[e].stage)) item[e] = candidats[e]
      return item
    }, {})

    const triSelectionne = Object.keys(candidats).reduce((item, e) => {
      let value = ['candidate_selected']
      if (value.includes(candidats[e].stage)) item[e] = candidats[e]
      return item
    }, {})

    this.setState({
      'candidatsCooptes': Object.keys(triCooptes).map(i => triCooptes[i]),
      'candidaturesRecues': Object.keys(triRecus).map(i => triRecus[i]),
      'candidatsEntretiens': Object.keys(triEntretiens).map(i => triEntretiens[i]),
      'candidatsSelectionne': Object.keys(triSelectionne).map(i => triSelectionne[i]),
      'saveForSearch': {
        'candidatsCooptes': Object.keys(triCooptes).map(i => triCooptes[i]),
        'candidaturesRecues': Object.keys(triRecus).map(i => triRecus[i]),
        'candidatsEntretiens': Object.keys(triEntretiens).map(i => triEntretiens[i]),
        'candidatsSelectionne': Object.keys(triSelectionne).map(i => triSelectionne[i])
      }
    });

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
          onClick={(e) => this.setState({popupArchiveOpen: false, popupData: {candidate : {}}})}
          className={`overlay-popup ${this.state.popupArchiveOpen === true ? 'open' : ''}`}/>

          <div className="wrapper-popup">
            <div className={`popup center ${this.state.popupArchiveOpen === true ? 'open' : ''}`}>
              <h4 className="text-center">Etes-vous s??r de vouloir archiver le candidat <span>{(this.state.popupData.candidate ? this.state.popupData.candidate.first_name : 'First') + ' ' + (this.state.popupData.candidate ? this.state.popupData.candidate.last_name : 'Last')}</span> ?</h4>
              <p className="text-center">Cette action est irr??versible et notifiera automatiquement le collaborateur l???ayant coopt??.</p>
              <button onClick={(e) => this.archiverCandidat(e)} className="btn-primary">Oui, archiver</button>
              <button onClick={(e) => this.fermerPopup(e)} className="btn-secondary">Annuler</button>
            </div>
          </div>
          {/* End popup archiver */}

          {/* Popup changer status candidat */}
          <div
          id="koChangeStatus1"
          onClick={(e) => this.setState({popupStatusOpen: false, popupData: {candidate : {}}})}
          className={`overlay-popup ${this.state.popupStatusOpen === true ? 'open' : ''}`}/>

          <div className="wrapper-popup">
            <div className={`popup center ${this.state.popupStatusOpen === true ? 'open' : ''}`}>
              <h4 className="text-center">??tes-vous s??r de vouloir changer le statut de candidature de <span>{this.state.popupData.candidate ? (this.state.popupData.candidate.first_name + ' ' + this.state.popupData.candidate.last_name) : ''}</span> de <span>{this.state.popupData.status}</span> ?? <span>{this.state.popupData.droppableColText}</span>, pour l???offre de <span>{this.state.popupData.job ? this.state.popupData.job.title : ''}</span> ?</h4>
              <p className="text-center">Cette action est irr??versible et notifiera automatiquement le collaborateur l???ayant coopt??.</p>
              <div className="box-note-popup">
                <p><strong>Conseil???</strong><br/>Pensez ?? archiver les candidats non s??lectionn??s pour cette offre !</p>
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
                  placeholder={this.state.searchText}
                  onChange={(e) => this.handleSearch(e)}
                  value={this.state.search}
                  tabIndex={9}
                />
              </div>
            </div>

            <div className="container-cols-candidats">
              <DragDropContext onDragStart={this.onDragStart} onDragEnd={this.onDragEnd}>
                <div className="row-fluid">
                  <div className="large-3 columns">
                    <div className="box-item">
                      <h4 className="light">Candidats coopt??s</h4>
                      <div className={`container-scroll candidats-cooptes ${this.state.droppable}`}>

                        {candidatsCooptes.length > 0 ?

                          <Droppable isDropDisabled droppableId="droppable">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}>
                                {candidatsCooptes
                                  .filter((key) => key.archive === false)
                                  .map((key, index) => {
                                      return (

                                        <Draggable
                                          key={key.id}
                                          draggableId={`${key.id}`}
                                          index={index}>
                                          {(provided, snapshot) => (
                                            <div
                                              className={this.state.popupData.id === key.id ? 'opacity' : ''}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              >
                                                <CardCandidat data={key} popupArchive={this.popupArchive}/>
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                    }
                                  )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          :
                          <Droppable isDropDisabled droppableId="droppable">
                            {(provided, snapshot) => (
                            <div ref={provided.innerRef}>
                              <div className={`container empty candidats ${candidatsCooptes.length === 0 ? '' : ''}`}>
                                <img type="image/svg+xml" className="icon" src="/icons/candidat-coopte.svg" alt=""/>
                                <p className="text-center">Aucun candidat coopt??</p>
                                <p className="text-center">Vos ambassadeurs n???ont pas encore coopt?? de profils sur vos annonces.</p>
                              </div>
                            </div>)}
                          </Droppable>
                        }

                      </div>
                    </div>
                  </div>
                  <div className="large-3 columns">
                    <div className="box-item">
                      <h4 className="light">Candidatures re??ues</h4>
                      <div className={`container-scroll candidatures-recues ${this.state.droppable}`}>

                        {candidaturesRecues.length > 0 ?

                          <Droppable
                            isDropDisabled={this.state.droppable === 'droppable' ? false : true}
                            droppableId="droppable2">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}>
                                {candidaturesRecues
                                  .filter((key) => key.archive === false)
                                  .map((key, index) => {
                                      return (
                                        <Draggable
                                          key={key.id}
                                          draggableId={`${key.id}`}
                                          index={index}>
                                          {(provided, snapshot) => (
                                            <div
                                              className={this.state.popupData.id === key.id ? 'opacity' : ''}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              >
                                                <CardCandidat data={key} popupArchive={this.popupArchive}/>
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                    }
                                  )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          :
                          <Droppable
                            isDropDisabled={this.state.droppable === 'droppable' ? false : true}
                            droppableId="droppable2">
                            {(provided, snapshot) => (
                            <div ref={provided.innerRef}>
                              <div className={`container empty candidats ${candidaturesRecues.length === 0 ? '' : ''}`}>
                                <img type="image/svg+xml" className="icon" src="/icons/entretien.svg" alt=""/>
                                <p className="text-center">Aucune candidature re??ue</p>
                                <p className="text-center">Vous n???avez pas encore re??u de candidature sur vos annonces.</p>
                              </div>
                            </div>)}
                          </Droppable>
                        }

                      </div>
                    </div>
                  </div>
                  <div className="large-3 columns">
                    <div className="box-item">
                      <h4 className="light">Entretiens en cours</h4>
                      <div className={`container-scroll entretiens-en-cours ${this.state.droppable}`}>

                        {candidatsEntretiens.length > 0 ?

                          <Droppable
                            isDropDisabled={this.state.droppable === 'droppable2' ? false : true}
                            droppableId="droppable3">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}>
                                {candidatsEntretiens
                                  .filter((key) => key.archive === false)
                                  .map((key, index) => {
                                      return (
                                        <Draggable
                                          key={key.id}
                                          draggableId={`${key.id}`}
                                          index={index}>
                                          {(provided, snapshot) => (
                                            <div
                                              className={this.state.popupData.id === key.id ? 'opacity' : ''}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              >
                                                <CardCandidat data={key} popupArchive={this.popupArchive}/>
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                    }
                                  )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          :
                          <Droppable
                            isDropDisabled={this.state.droppable === 'droppable2' ? false : true}
                            droppableId="droppable3">
                            {(provided, snapshot) => (
                            <div ref={provided.innerRef}>
                              <div className={`container empty candidats ${candidatsEntretiens.length === 0 ? '' : ''}`}>
                                <img type="image/svg+xml" className="icon" src="/icons/candidature.svg" alt=""/>
                                <p className="text-center">Aucun entretien en cours</p>
                                <p className="text-center">Il semblerait qu???il n???y ait pas d???entretien en ce moment !</p>
                              </div>
                            </div>)}
                          </Droppable>
                        }

                      </div>
                    </div>
                  </div>
                  <div className="large-3 columns col-candidats-selectionnes">
                    <div className="box-item denim">
                      <h4 className="light">Candidats s??lectionn??s</h4>
                      <div className="container-scroll candidats-selectionnes">

                        {candidatsSelectionne.length > 0 ?

                          <Droppable
                            isDropDisabled={this.state.droppable === 'droppable3' ? false : true}
                            droppableId="droppable4">
                            {(provided, snapshot) => (
                              <div
                                ref={provided.innerRef}>
                                {candidatsSelectionne
                                  .filter((key) => key.archive === false)
                                  .map((key, index) => {
                                      return (
                                        <Draggable
                                          isDragDisabled={true}
                                          key={key.id}
                                          draggableId={`${key.id}`}
                                          index={index}>
                                          {(provided, snapshot) => (
                                            <div
                                              className={this.state.popupData.id === key.id ? 'opacity' : ''}
                                              ref={provided.innerRef}
                                              {...provided.draggableProps}
                                              {...provided.dragHandleProps}
                                              >
                                                <CardCandidat data={key} popupArchive={this.popupArchive}/>
                                            </div>
                                          )}
                                        </Draggable>
                                      )
                                    }
                                  )}
                                {provided.placeholder}
                              </div>
                            )}
                          </Droppable>
                          :
                          <Droppable
                            isDropDisabled={this.state.droppable === 'droppable3' ? false : true}
                            droppableId="droppable4">
                            {(provided, snapshot) => (
                            <div ref={provided.innerRef}>
                              <div className={`container empty candidats candidats-selectionnes ${candidatsSelectionne.length === 0 ? '' : ''}`}>
                                <img type="image/svg+xml" className="icon" src="/icons/selectionne.svg" alt=""/>
                                <p className="text-center">Aucun candidat s??lectionn??</p>
                                <p className="text-center">D??placez ici les candidats que vous avez s??lectionn??.</p>
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
      </div>
    )
  }
}

export default Candidats
