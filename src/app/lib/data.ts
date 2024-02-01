import prisma from '../../../prisma/client'

export async function dashboard() {
  const allPals = await prisma.$queryRaw`
  SELECT id,name,en_name FROM "Pal"
  ORDER BY 
     (substring("id", '^[0-9]+'))::int, 
     substring("id", '[^0-9_].*$')
  `
  console.log(allPals);
}

dashboard()