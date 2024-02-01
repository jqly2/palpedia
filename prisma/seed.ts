 import { prismaClient, PalCreateBody } from './prismaImport';

//All local json files going to upload. 
const names = require('../temp-data/json/DT_PalNameText.json');
const drops = require('../temp-data/json/DT_PalDropItem.json');
const desc = require('../temp-data/json/DT_PalLongDescriptionText.json');
const stats = require('../temp-data/json/DT_PalMonsterParameter.json');
const loc = require('../temp-data/json/DT_PaldexDistributionData.json');
const data = {
    location: loc[0].Rows,
    drops: drops[0].Rows,
    names: names[0].Rows,
    desc: desc[0].Rows,
    stats: stats[0].Rows
}

function pal_list(){
    const stats_names = Object.keys(data.stats);
    let new_list = [];
    for(let x = 0; x < stats_names.length; x++){
        if(data.stats[stats_names[x]].ZukanIndex > 0){
            new_list.push(stats_names[x]);
        }
    }
    return new_list
}

const fields:string[] = pal_list();

// Filtering through all the json data to match and send to the Pal Schema
function findNoBoss(query: String, type: string){

    if(query.includes("WindChimes")){
        query = query.replace("WindChimes", "Windchimes");
    }
    if(query.includes("PlantSlime_Flower")){
        query = query.replace("_Flower", "");
    }
    if(type === "name"){
        let name_var = "PAL_NAME_" + query;
        ;
        if(!data.names[name_var]){
            console.log(name_var);
            console.log("name error");
        }else{
            return data.names[name_var].TextData.LocalizedString
        }
    }else if(type === "desc"){
        let desc_var = "PAL_LONG_DESC_" + query;

        if(!data.desc[desc_var]){
            console.log(desc_var);
            console.log("desc error");
        }else{
            return data.desc[desc_var].TextData.LocalizedString;
        }
    }
    else{
        console.log(query , type);
    }
}

function allDrops(query: string){
    let loot:{[key:string]: any} = {};
    if(query.includes("DrillGame")){
        query = query.replace("DrillGame", "Drillgame");       
    }
    if(!data.drops[query + "000"]){
        console.log(query);
        console.log("drop error");
    }
    for(let x = 1; x <= 5; x++){
        if(drops[0].Rows[query + "000"]["ItemId" + x.toString()] !== "None"){
            // loot.palId = id;
            loot.item = data.drops[query + "000"]["ItemId" + x.toString()];
            loot.rate = data.drops[query + "000"]["Rate" + x.toString()];
            loot.amount = data.drops[query + "000"]["min" + x.toString()].toString() + " - " +
                           data.drops[query + "000"]["Max" + x.toString()].toString();
        }
    }
    if(!loot){
        console.log(loot);
    }
    return loot;
}

function palData(element: string){
    let day = true;
    let night = true;
    let pal:{[key:string]: any} = {};
    if(!data.location[element]){
        // console.log(element);
    }else{
        if(!data.location[element].nightTimeLocations){
            // console.log(element + " has no day loc");
            day = false;
        }else if(!!data.location[element].dayTimeLocations){
            // console.log(element + " has no night loc");
            night = false;
        };
        if(day){
            pal.location = {create: {
                day:data.location[element].dayTimeLocations.locations
            }}
        }else if(night){
            pal.location = {create: {
                day:data.location[element].nightTimeLocations.locations
            }}
        };
    };
    pal.id = data.stats[element].ZukanIndex.toString();
    if(data.stats[element].ZukanIndexSuffix !== ""){
        pal.id = pal.id + data.stats[element].ZukanIndexSuffix;
    };
    pal.name = element;
    pal.en_name = findNoBoss(element, "name");
    pal.desc = findNoBoss(element, "desc");
    pal.type1 = data.stats[element].ElementType1
    if(!data.stats[element].ElementType2.includes("None")){
        pal.type2 = data.stats[element].ElementType2
    }
    pal.stat = data.stats[element];
    pal.drop = {
        create: allDrops(element)
    };

    return pal;
}

const addPal = async (palData: PalCreateBody) => {
    const newPal = await prismaClient.pal.create({
        data: palData
    }) 
    return newPal;
}

async function main(){
    for await (const element of fields) {
        const packet = palData(element);
        await addPal(packet);
        console.log("uploaded" + element);
    }
}

main()
    .then(async () => {
        await prismaClient.$disconnect();
    })
    .catch(async (e) => {
        console.log(e);
        await prismaClient.$disconnect();
        process.exit(1);
    })