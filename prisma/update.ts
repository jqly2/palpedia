import { prismaClient, PalUpdateBody } from "./prismaImport";

const updatePal = async (palData: PalUpdateBody, palId: string, name: string) => {
    const newPal = await prismaClient.pal.update({
        where:{
            id:palId,
            name:name
        },
        data: palData
    }) 
    return newPal;
}

async function main(){
    const allPals = await prismaClient.$queryRaw`
    SELECT id,name,type1,type2 FROM "Pal"
    ORDER BY 
       (substring("id", '^[0-9]+'))::int, 
       substring("id", '[^0-9_].*$')
    `
    for await (const pal of allPals){
        pal.type1 = pal.type1.replace("EPalElementType::", "");
        // console.log(pal.name + ":Type:" + pal.type1)
        if(pal.type2){
            pal.type2 = pal.type2.replace("EPalElementType::", "")
            // console.log(pal.name + ":SubType:" + pal.type2)
        }
        await updatePal(pal,pal.id,pal.name);
        console.log("Updated " + pal.name);
    }
}

main()
    // .then(async () => {
    //     await prismaClient.$disconnect();
    // })
    // .catch(async (e) => {
    //     console.log(e);
    //     await prismaClient.$disconnect();
    //     process.exit(1);
    // })