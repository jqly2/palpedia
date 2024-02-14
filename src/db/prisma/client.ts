import { Prisma, PrismaClient } from '@prisma/client'

export const client = new PrismaClient()

export type CreateBody = Prisma.Args<typeof client, 'create'>['data'];

