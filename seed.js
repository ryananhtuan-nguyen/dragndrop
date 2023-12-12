// seed.js
const { PrismaClient } = require('@prisma/client')

const prisma = new PrismaClient()

const seed = async () => {
  try {
    // Create lists with cards
    const list1 = await prisma.list.create({
      data: {
        title: 'List 1',
        order: 1,
        cards: {
          create: [
            { title: 'Card 1', order: 1 },
            { title: 'Card 2', order: 2 },
          ],
        },
      },
    })

    const list2 = await prisma.list.create({
      data: {
        title: 'List 2',
        order: 2,
        cards: {
          create: [
            { title: 'Card 3', order: 1 },
            { title: 'Card 4', order: 2 },
          ],
        },
      },
    })

    const list3 = await prisma.list.create({
      data: {
        title: 'List 3',
        order: 3,
        cards: {
          create: [
            { title: 'Card 5', order: 1 },
            { title: 'Card 6', order: 2 },
          ],
        },
      },
    })

    // Add more lists and cards as needed

    console.log('Seed data successfully created!')
  } catch (error) {
    console.error('Error seeding data:', error)
  } finally {
    await prisma.$disconnect()
  }
}

seed()
