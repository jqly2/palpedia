import { checkSkills } from "./skillCheck";

const names = require('../../../temp-data/json/DT_PalNameText.json');
const drops = require('../../../temp-data/json/DT_PalDropItem.json');
const desc = require('../../../temp-data/json/DT_PalLongDescriptionText.json');
const stats = require('../../../temp-data/json/DT_PalMonsterParameter.json');
const loc = require('../../../temp-data/json/DT_PaldexDistributionData.json');
const ability = require('../../../temp-data/json/DT_PartnerSkill.json');
const moves = require('../../../temp-data/json/DT_WazaDataTable.json');
const levels = require('../../../temp-data/json/DT_WazaMasterLevel.json');
const passive = require('../../../temp-data/json/DT_PassiveSkill_Main.json');
const passiveName = require('../../../temp-data/json/DT_SkillNameText.json')

const data = {
    location: loc[0].Rows,
    drops: drops[0].Rows,
    names: names[0].Rows,
    desc: desc[0].Rows,
    stats: stats[0].Rows,
    partact: ability[0].Rows,
    moves: moves[0].Rows,
    levels: levels[0].Rows,
    passive: passive[0].Rows,
    passiveName: passiveName[0].Rows
}

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

checkSkills(fields, data.stats, data.passive, data.partact)