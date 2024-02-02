import prisma from "./client";
import { Prisma } from "@prisma/client";

type PalUpdateBody = Prisma.ArgsM<typeof prisma, 'update'>['data'];

type PalCreateBody = Prisma.Args<typeof prisma, 'create'>['data'];

function getPals(){
    return prisma.pal.findMany({
        select:{
            id:true,
            name:true,
            stats:true
        }
    })
}

async function main(){
    const pals = getPals();
    
}