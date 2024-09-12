import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

async function clearTable() {
  try {
    await prisma.user.deleteMany() // 刪除 User 表的所有記錄
    console.log('Table cleared')
  } catch (error) {
    console.error('Error clearing table:', error)
  } finally {
    await prisma.$disconnect()
  }
}

clearTable()
