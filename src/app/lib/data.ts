import prisma from './client'

async function main() {
  const allPals = await prisma.$queryRaw`
  SELECT * FROM "Pal"
  ORDER BY 
     (substring("id", '^[0-9]+'))::int, 
     substring("id", '[^0-9_].*$')
  `
}

main()