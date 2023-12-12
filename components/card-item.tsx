import { Draggable } from '@hello-pangea/dnd'
import { Card } from '@prisma/client'
import React from 'react'

interface CardItemProps {
  index: number
  data: Card
}

export const CardItem = ({ index, data }: CardItemProps) => {
  return (
    <Draggable draggableId={data.id} index={index}>
      {(provided) => (
        <div
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
          className="border-2 border-transparent hover:border-black text-sm bg-gray-50 rounded-sm"
        >
          {data.title}
        </div>
      )}
    </Draggable>
  )
}
