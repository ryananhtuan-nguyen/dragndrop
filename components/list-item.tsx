'use client'

import { Draggable, Droppable } from '@hello-pangea/dnd'
import { CardItem } from './card-item'
import { ListWithCards } from './list-container'

interface ListItemProps {
  index: number
  data: ListWithCards
}

export const ListItem = ({ data, index }: ListItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <li
          {...provided.draggableProps}
          ref={provided.innerRef}
          className="w-[200px] select-none mb-2"
        >
          <div className="w-full rounded-md pb-2" {...provided.dragHandleProps}>
            <div className="w-full text-sm px-2.5 py-1 h-7 font-medium border-transparent">
              {data.title}
            </div>
            <Droppable droppableId={data.id} type="card">
              {(provided) => (
                <ol
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  className="flex flex-col gap-y-2"
                >
                  {data.cards.map((card, index) => (
                    <CardItem index={index} key={card.id} data={card} />
                  ))}
                  {provided.placeholder}
                </ol>
              )}
            </Droppable>
          </div>
        </li>
      )}
    </Draggable>
  )
}
