import {prismaClient} from '../../db/prisma/client'

export async function dashboard() {
  const allPals = await prismaClient.$queryRaw`
  SELECT id,name,en_name FROM "Pal"
  ORDER BY 
     (substring("id", '^[0-9]+'))::int, 
     substring("id", '[^0-9_].*$')
  `
  console.log(allPals);
}

dashboard()