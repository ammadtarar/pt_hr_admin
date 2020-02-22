import React, { Component } from 'react'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
const data = require('../datas.json')

// fake data generator
const getItems = (count, offset = 0) =>
  Array.from({ length: count }, (v, k) => k).map(k => ({
      id: `item-${k + offset}`,
      content: `item ${k + offset}`
  }))

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

class App extends Component {
  state = {
    'gigatop': Object.keys(triCandidatsCooptes).map(i => triCandidatsCooptes[i]),
    'top': Object.keys(triCandidaturesRecues).map(i => triCandidaturesRecues[i])
  }

  /**
   * A semi-generic way to handle multiple lists. Matches
   * the IDs of the droppable container to the names of the
   * source arrays stored in the state.
   */
  id2List = {
    droppable: 'gigatop',
    droppable2: 'top'
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
        state = { 'top': items }
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
        'gigatop': result.droppable,
        'top': result.droppable2
      })
    }
  }

  // Normally you would want to split things out into separate components.
  // But in this example everything is just done in one place for simplicity
  render() {
    return (
      <DragDropContext onDragEnd={this.onDragEnd}>
        <Droppable droppableId="droppable">
            {(provided, snapshot) => (
              <div
                id="top"
                ref={provided.innerRef}>
                {this.state.gigatop.map((item, index) => (
                  <Draggable
                    key={item.id}
                    draggableId={item.id}
                    index={index}>
                    {(provided, snapshot) => (
                        <div
                        className="box-encart"
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        >
                          {item.titre}
                        </div>
                    )}
                  </Draggable>
                ))}
                {provided.placeholder}
              </div>
            )}
        </Droppable>
        <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
                <div
                    id="top"
                    ref={provided.innerRef}>
                    {this.state.top.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                    {item.titre}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>

        <Droppable droppableId="droppable2">
            {(provided, snapshot) => (
                <div
                    id="top"
                    ref={provided.innerRef}>
                    {this.state.top.map((item, index) => (
                        <Draggable
                            key={item.id}
                            draggableId={item.id}
                            index={index}>
                            {(provided, snapshot) => (
                                <div
                                    ref={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                    >
                                    {item.titre}
                                </div>
                            )}
                        </Draggable>
                    ))}
                    {provided.placeholder}
                </div>
            )}
        </Droppable>
      </DragDropContext>
    )
  }
}

export default App;
