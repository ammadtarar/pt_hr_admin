import React, { Component } from 'react'
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

const grid = 8

export class Candidats extends React.Component {
  state = {
    'candidatsCooptes': [],
    'candidaturesRecues': []
  }

  componentDidMount() {
    const triCandidatsCooptes = Object.keys(data.candidats).reduce(function(r, e) {
      if (['candidat-coopte'].includes(data.candidats[e].status)) r[e] = data.candidats[e]
      return r
    }, {})

    const triCandidaturesRecues = Object.keys(data.candidats).reduce(function(r, e) {
      if (['candidature-recue'].includes(data.candidats[e].status)) r[e] = data.candidats[e]
      return r
    }, {})

    this.setState({
      'candidatsCooptes': triCandidatsCooptes,
      'candidaturesRecues': triCandidaturesRecues
    })
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'candidatsCooptes',
    droppable2: 'candidaturesRecues'
  }

  getList = id => this.state[this.id2List[id]]

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
        'candidaturesRecues': result.droppable2
      })
    }
  }

  render() {
    const candidatsCooptes = this.state.candidatsCooptes
    const candidaturesRecues = this.state.candidaturesRecues

    return (
      <div className="wrapper">
        <main className="cooptation candidats">
          <div className="container">

            <input type="text" name="search" className="search" value="Rechercher" />

            <DragDropContext onDragEnd={this.onDragEnd}>
            <div className="row-fluid">
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidats cooptés</h4>
                  <div className="container-scroll">

                    <Droppable droppableId="droppable">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}>
                          {Object.keys(candidatsCooptes).map((key, item, index) => (
                            <Draggable
                              key={key}
                              draggableId={key}
                              index={index}>
                              {(provided, snapshot) => (
                                <div
                                  className="box-encart"
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  >
                                    <CardCandidat data={candidatsCooptes[key]}/>
                                </div>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Candidatures reçues</h4>
                  <div className="container-scroll">

                    <Droppable droppableId="droppable2">
                      {(provided, snapshot) => (
                        <div
                          ref={provided.innerRef}>
                          {Object.keys(candidaturesRecues).map((key, item, index) => (
                              <Draggable
                                key={key}
                                draggableId={key}
                                index={index}>
                                {(provided, snapshot) => (
                                  <div
                                    className="box-encart"
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                      <CardCandidat data={candidaturesRecues[key]}/>
                                  </div>
                                )}
                              </Draggable>
                          ))}
                          {provided.placeholder}
                        </div>
                      )}
                    </Droppable>

                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item">
                  <h4 className="light">Entretiens en cours</h4>
                  <div className="container-scroll">

                  </div>
                </div>
              </div>
              <div className="large-3 columns">
                <div className="box-item denim">
                  <h4 className="light">Candidats sélectionnés</h4>
                  <div className="container-scroll">

                  </div>
                </div>
              </div>
            </div>
            </DragDropContext>

          </div>
        </main>
      </div>
    )
  }
}

export default Candidats;
