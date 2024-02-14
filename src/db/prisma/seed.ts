 import { prismaClient, CreateBody } from './client';

//pal local json files going to upload. 
const names = require('../temp-data/json/DT_PalNameText.json');
const drops = require('../temp-data/json/DT_PalDropItem.json');
const desc = require('../temp-data/json/DT_PalLongDescriptionText.json');
const stats = require('../temp-data/json/DT_PalMonsterParameter.json');
const loc = require('../temp-data/json/DT_PaldexDistributionData.json');
const ability = require('../temp-data/json/DT_PalFirstActivatedInfoText.json');
const moves = require('../temp-data/json/DT_WazaDataTable.json');
const levels = require('../temp-data/json/DT_WazaMasterLevel.json');
const passive = require('../temp-data/json/DT_PassiveSkill_Main.json');

const data = {
    location: loc[0].Rows,
    drops: drops[0].Rows,
    names: names[0].Rows,
    desc: desc[0].Rows,
    stats: stats[0].Rows,
    ability: ability[0].Rows,
    moves: moves[0].Rows,
    levels: levels[0].Rows,
    passive: passive[0].Rows
}

type Obj = {[key:string]: any};

function pal_list(){
    const stats_names = Object.keys(data.stats);
    let new_list = [];
    for(let x = 0; x < stats_names.length; x++){
        if(data.stats[stats_names[x]].ZukanIndex > 0){
            new_list.push(stats_names[x]);
        }
    }
    return new_list;
}

const fields:string[] = pal_list();

// Filtering through pal the json data to match and send to the Pal Schema
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

function palDrops(query: string){
    let loot:Obj = {};
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

function palStats(query: string){
    let packet:Obj = {};
    fields.forEach(element => {
        packet.hp = data.stats[query].HP;
        packet.melee = data.stats[query].MeleeAttack;
        packet.range = data.stats[query].ShotAttack;
        packet.def = data.stats[query].Defense;
        packet.support = data.stats[query].support;
        packet.craft = data.stats[query].CraftSpeed;
    });
    return packet;
}

function palBio(query: string){
    let packet:Obj = {}
    fields.forEach(element => {
        packet.genus = data.stats[query].GenusCategory.replace("EPalGenusCategoryType::","");
        packet.size = data.stats[query].Size.replace("EPalSizeType::","");
        packet.food = data.stats[query].FoodAmount;
        packet.rarity = data.stats[query].Rarity;
        packet.price = data.stats[query].Price;
        packet.expRatio = data.stats[query].ExpRatio;
        packet.defMod = data.stats[query].EnemyReciveDamageRate;
        packet.capture = data.stats[query].CaptureRateCorrect;
    });
    return packet;
}

function palSpeed(query:string){
    let packet:Obj = {}
    fields.forEach(element => {
        packet.slow = data.stats[query].SlowWalkSpeed;
        packet.walk = data.stats[query].WalkSpeed;
        packet.run = data.stats[query].RunSpeed;
        packet.sprint = data.stats[query].RideSprintSpeed;
        packet.transport = data.stats[query].TransportSpeed;
    });
    return packet;    
}

async function palLevels(query: string){
    const levels = ["001","007","015","022","030","040","050"];
    let send: Obj[] = [];
    levels.forEach(level => {
        let packet: Obj = {}
        packet.palName = data.levels[query + level].PalId;   
        packet.level = data.levels[query + level].Level;
        packet.moveName = {
            connect: {
                where:{
                    name: data.levels[query + level].WazaID.replace("EPalWazaID::", "")
                }
            }
        }
        send.push(packet);
    });
    return send;
}

function palPassives(query:string){
    const passives = ["PassiveSkill1","PassiveSkill2","PassiveSkill3","PassiveSkill4"]
    let packet:Obj[] = [];
    passives.forEach(pass => {
        if(!data.stats[query][pass].includes("None")){
            packet.push({
                name:data.stats[query][pass],
                pal: query,
            })
        }
    });

    return packet;
}

function palLocation(element:string){
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
                night:data.location[element].nightTimeLocations.locations
            }}
        };
    };
    return pal.location
}

function palData(element: string){
    let pal:{[key:string]: any} = {};
    pal.id = data.stats[element].ZukanIndex.toString();
    if(data.stats[element].ZukanIndexSuffix !== ""){
        pal.id = pal.id + data.stats[element].ZukanIndexSuffix;
    };
    pal.name = element;
    pal.en_name = findNoBoss(element, "name");
    pal.desc = findNoBoss(element, "desc");
    pal.type1 = data.stats[element].ElementType1.replace("EPalElementType::","")
    if(!data.stats[element].ElementType2.includes("None")){
        pal.type2 = data.stats[element].ElementType2.replace("EPalElementType::","")
    }
    pal.stat = palStats(element);
    pal.speed = palSpeed(element);
    pal.drop = {
        create: palDrops(element)
    };
    pal.location = palLocation(element);
    pal.skills = {
        connect: palPassives(element)
    }
    pal.moves = {
        create:palLevels(element),
    }
    pal.bio = palBio(element);
    return pal;
}



const addMove = async (moveData: CreateBody) => {
    const newMove = await prismaClient.move.create({
        data:moveData
    })
    return newMove;
}

const addPal = async (palData: CreateBody) => {
    const newPal = await prismaClient.pal.create({
        data: palData
    }) 
    return newPal;
}

const addSkill = async (skillData: CreateBody) => {
    const newSkill = await prismaClient.skill.createMany({
        data:skillData
    })
    return newSkill;
}

async function addEffect(send:Obj[]){
    const addEffect = async (effectData: CreateBody) => {
        const newEffect = await prismaClient.effect.createMany({
            data:effectData
        })
        return newEffect
    }

    await addEffect(send);
}

async function uploadMoves(){
    for await (const move of data.moves){
        let packet: Obj = {}
        packet.name = move.WazaType.replace("EPalWazaID::","");
        packet.element = move.Element.replace("EPalElementType::","");
        packet.category = move.Category.replace("EPalWazaCategory::","");
        packet.power = move.Power;
        packet.minRange = move.MinRange;
        packet.maxRange = move.MaxRange;
        packet.cooldown = move.CoolTime;
        if (move.SpecialAttackRateInfos){
            packet.conditions = move.SpecialAttackRateInfos
        }
        await addMove(packet)
        if(!move.EffectType1.includes("::None")){
            let effect: Obj[] = []
            effect.push({
                moveName: packet.name,
                effect: move.EffectType1.replace("EPalAdditionalEffectType::",""),
                value: move.EffectValue1
            })
            if(!move.EffectType2.includes("::None")){
                effect.push({
                    moveName: packet.name,
                    effect: move.EffectType2.replace("EPalAdditionalEffectType::",""),
                    value: move.EffectValue2
                })
            }
            await addEffect(effect);
        }
        
    }
}



async function uploadSkill(){
    let skill_names = Object.keys(data.passive)
    for await (const element of skill_names){
        let packet = {
            name: element,
            rank: data.passive[element],
            passive: data.passive[element].AddPal,
            riding: data.passive[element].InvokeRiding,
            always: data.passive[element].InvokeAlways,
            partner: data.passive[element].InvokeActiveOtomo
        }
        if(element === "Rare" || element === "Legend"){
            packet.passive = true;
        }
        await addSkill(packet);
        let send: Obj[] = [];
        for(let x = 0; x <= 2; x++){
            let [type,value,target] = ["EffectType" + (x+1).toString(),"EffectValue" + (x+1).toString(), "TargetType" +  + (x+1).toString()];
            if(!data.passive[type].includes("::no")){
                send.push({
                    effect: type,
                    value: value,
                    target: target,
                    skillName: element
                })
            }
        }
        await addEffect(send);
        console.log("Uploaded Skill and Effects of: " + packet.name)
    }
}

async function uploadPals(){
    for await (const element of fields) {
        const packet = palData(element);
        await addPal(packet);
        console.log("uploaded" + element);
    }
}

async function main(){

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