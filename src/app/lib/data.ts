import { prismaClient } from '../../../prisma/prismaImport'

export async function dashboard() {
  const allPals = await prismaClient.$queryRaw`
  SELECT id,name,en_name,type1,type2 FROM "Pal"
  ORDER BY 
     (substring("id", '^[0-9]+'))::int, 
     substring("id", '[^0-9_].*$')
  `
  console.log(allPals);
}

dashboard()