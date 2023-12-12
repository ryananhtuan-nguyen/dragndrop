import React from 'react'
import { db } from '@/lib/db'
import ListContainer, { ListWithCards } from '@/components/list-container'

const Home = async () => {
  // const lists = await db.list.findMany({
  //   include: {
  //     cards: {
  //       orderBy: {
  //         order: 'asc',
  //       },
  //     },
  //   },
  //   orderBy: {
  //     order: 'asc',
  //   },
  // })
  const lists = [
    {
      id: '1',
      title: 'List 1',
      order: 1,
      cards: [
        { id: 'card1-1', title: 'Card 1-1', order: 1 },
        { id: 'card1-2', title: 'Card 1-2', order: 2 },
      ],
    },
    {
      id: '2',
      title: 'List 2',
      order: 2,
      cards: [
        { id: 'card2-1', title: 'Card 2-1', order: 1 },
        { id: 'card2-2', title: 'Card 2-2', order: 2 },
      ],
    },
    {
      id: '3',
      title: 'List 3',
      order: 3,
      cards: [
        { id: 'card3-1', title: 'Card 3-1', order: 1 },
        { id: 'card3-2', title: 'Card 3-2', order: 2 },
      ],
    },
    {
      id: '4',
      title: 'List 4',
      order: 4,
      cards: [
        { id: 'card4-1', title: 'Card 4-1', order: 1 },
        { id: 'card4-2', title: 'Card 4-2', order: 2 },
      ],
    },
    {
      id: '5',
      title: 'List 5',
      order: 5,
      cards: [
        { id: 'card5-1', title: 'Card 5-1', order: 1 },
        { id: 'card5-2', title: 'Card 5-2', order: 2 },
      ],
    },
  ] as ListWithCards[]

  return (
    <div className="h-full p-6 overflow-x-auto">
      <ListContainer data={lists} />
    </div>
  )
}

export default Home
