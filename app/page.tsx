import React from 'react'
import { db } from '@/lib/db'
import ListContainer from '@/components/list-container'

const Home = async () => {
  const lists = await db.list.findMany({
    include: {
      cards: {
        orderBy: {
          order: 'asc',
        },
      },
    },
    orderBy: {
      order: 'asc',
    },
  })
  return (
    <div className="h-full p-6 overflow-x-auto">
      <ListContainer data={lists} />
    </div>
  )
}

export default Home
