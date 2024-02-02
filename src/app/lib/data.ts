import prisma from '../../../prisma/client'

export async function paldeck() {
  const allPals = await prisma.$queryRaw`
  SELECT id,name,en_name,type1,type2 FROM "Pal"
  ORDER BY 
     (substring("id", '^[0-9]+'))::int, 
     substring("id", '[^0-9_].*$')
  `
  return allPals
}