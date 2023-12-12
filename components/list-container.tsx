'use client'
import { ListItem } from '@/components/list-item'
import { DragDropContext, DropResult, Droppable } from '@hello-pangea/dnd'
import { Card, List } from '@prisma/client'
import { useState } from 'react'

export type ListWithCards = List & { cards: Card[] }

interface ListContainerProps {
  data: ListWithCards[]
}

function reorderData<T>(data: T[], start: number, end: number) {
  const result = [...data]
  const [itemClicked] = result.splice(start, 1)
  result.splice(end, 0, itemClicked)
  return result
}

export default function ListContainer({ data }: ListContainerProps) {
  const [orderedList, setOrderedList] = useState(data)

  const onDragEnd = (result: DropResult) => {
    // console.log(result)
    const { destination, source, type } = result

    if (!destination) return
    console.log(
      reorderData(orderedList, source.index, destination.index).map(
        (item, index) => ({ ...item, order: index })
      )
    )
    //same position
    if (
      destination.droppableId == source.droppableId &&
      destination.index == source.index
    ) {
      return
    }

    //Move list
    if (type == 'list') {
      const reorderedList = reorderData(
        orderedList,
        source.index,
        destination.index
      ).map((item, index) => ({ ...item, order: index }))

      //set State
      setOrderedList(reorderedList)
    }

    //Move card
    if (type === 'card') {
      let newOrderedList = [...orderedList]

      const sourceList = newOrderedList.find(
        (list) => list.id === source.droppableId
      )
      const destList = newOrderedList.find(
        (list) => list.id === destination.droppableId
      )

      if (!sourceList || !destList) return

      //Same list
      if (source.droppableId === destination.droppableId) {
        const reorderedCard = reorderData(
          sourceList.cards,
          source.index,
          destination.index
        )
        //setup for db changes if needed
        reorderedCard.forEach((card, idx) => {
          card.order = idx
        })
        //change the cards orders in the current list
        sourceList.cards = reorderedCard
        //change state of lists
        setOrderedList(newOrderedList)

        //
      } else {
        //Different list
        const [cardDragged] = sourceList.cards.splice(source.index, 1)

        //change list ID to destination's id
        cardDragged.listId = destination.droppableId

        //insert into destination list
        destList.cards.splice(destination.index, 0, cardDragged)

        //reorder both list
        sourceList.cards.forEach((card, idx) => {
          card.order = idx
        })
        destList.cards.forEach((card, idx) => {
          card.order = idx
        })

        //change state
        setOrderedList(newOrderedList)
      }
    }
  }
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable droppableId="lists" type="list" direction="horizontal">
        {(provided) => (
          <ol
            {...provided.droppableProps}
            className="flex gap-x-3 h-full"
            ref={provided.innerRef}
          >
            {orderedList.map((list, index) => (
              <ListItem key={list.id} data={list} index={index} />
            ))}
            {provided.placeholder}
          </ol>
        )}
      </Droppable>
    </DragDropContext>
  )
}
