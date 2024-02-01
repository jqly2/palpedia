import { Prisma, PrismaClient } from '@prisma/client'

let prismaClient = new PrismaClient()

export type PalCreateBody = Prisma.Args<typeof prismaClient, 'create'>['data']

export type PalUpdateBody = Prisma.ArgsM<typeof prismaClient, 'update'>['data']

export {prismaClient}