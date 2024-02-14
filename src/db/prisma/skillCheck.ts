
import * as json from "../helper/definitions";
import { isNonEmptyArray, merge, isString } from "../helper/utils";
import { PartialDeep, JsonObject } from "type-fest";

const skillSearch = (name: string, passiveSkill: PartialDeep<json.JsonObj>, partnerActiveSkill: PartialDeep<json.JsonObj>): json.ObjJsonVal | undefined => {
    let url_string
    
    // console.log(name);
    if(!name.includes("_")){
        url_string = "../../../temp-data/json/PalActorBP/" + name + "/BP_" + name + ".json";
    }else{
        const pathname = name.slice(0, name.indexOf("_"));
        // console.log(pathname);
        url_string = "../../../temp-data/json/PalActorBP/" + pathname + "/BP_" + pathname + ".json";
    }
    let pal_data:json.ArrJsonVal  = require(url_string).filter((data:json.ObjJsonVal) => (data.Type == "PalPartnerSkillParameterComponent" || data.Type == "PalStaticCharacterParameterComponent"));
    let packet:json.ObjJsonVal = {};
    let arr:json.ObjJsonVal[] = new Array;
    // console.log(pal_data);
    if(pal_data[0]){
        if(pal_data[0].Type =="PalPartnerSkillParameterComponent"){
            let prop: json.PassiveProps = pal_data[0].Properties
            // console.log(prop)
            for (let [key,value] of Object.entries(prop)){
                if(key === "RestrictionItems"){
                    packet.partnerUnlock = value[0].Key
                }
                if(key === "PassiveSkills"){
                    value.forEach((element:json.ObjArrObj) => {
                        if(isNonEmptyArray(element.SkillAndParameters)){
                            element.SkillAndParameters.forEach((skill: json.DeepObjData) => {
                                if(skill && typeof skill === "object"){
                                    if(isString(skill.Key.Key)){
                                        let arrayValue = checkPassiveData(skill.Key.Key, passiveSkill) as json.ObjJsonVal;
                                            if(arrayValue){
                                                arrayValue = {...arrayValue, passiveName: skill.Key.Key,
                                                    assignOthers: skill.Value.AssignOthers,
                                                    triggerTypeFlag: skill.Value.TriggerTypeFlags,
                                                    typeElement: skill.Value.TargetElementType,
                                                    type: "PartnerSkill" 
                                                }
                                                if(!isNonEmptyArray(arr))
                                                    arr = [arrayValue]
                                            //No duplicates of the first passive that repeats each rank. 
                                                else if(skill.Key.Key !== arr[0].passiveName){
                                                    arr.push(arrayValue);
                                                }
                                            }
                                        }
                                    }
                            });
                        }
                    });
                    packet.skill = arr;
                }else{
                    if(!packet.active && key === "SkillName" && value !== "None"){
                        packet.active = {rank:[1,2,3,4,5], type:"PartnerSkill", activeName: value};
                        let add = checkPartnerActiveSkill(value, partnerActiveSkill);
                        if(add){
                            // console.log(add)
                            packet.active = Object.assign(add, packet.active);
                        }
                    }else if(packet.active){
                        packet.active = packet.active as JsonObject;
                        packet.active[key] = value
                    }
                }
            }
        }else{
            let temp:any = pal_data[0].Properties
            if(Object.hasOwn(temp, "SpawnItem")){
                // console.log(temp.SpawnItem.FieldLotteryNameByRank[0]);
                temp.SpawnItem.FieldLotteryNameByRank.forEach((value: json.JsonObj, index: number) => {
                    arr.push({type: "PartnerSkill", rank:(index + 1), itemSpawnId: value[(index + 1).toString()].Key})
                });
                if(!packet.skill){
                    packet.skill = arr;
                }else{
                    arr.forEach(element => {
                        if(packet.skill && isNonEmptyArray(packet.skill)){
                            packet.skill.push(element);
                        }
                    });
                }
            }
        }

    }
    if(pal_data[1]){
        let temp:any = pal_data[1].Properties
        if(Object.hasOwn(temp, "SpawnItem")){
            // console.log(temp.SpawnItem.FieldLotteryNameByRank[0]);
            temp.SpawnItem.FieldLotteryNameByRank.forEach((value: json.JsonObj, index: number) => {
                arr.push({type: "PartnerSkill", rank:(index + 1), itemSpawnId: value[(index + 1).toString()].Key})
            });
            if(!packet.skill){
                packet.skill = arr;
            }else{
                arr.forEach(element => {
                    if(packet.skill && isNonEmptyArray(packet.skill)){
                        packet.skill.push(element);
                    }
                });
            }
        }
    }
    if(packet.active){
        console.log(packet.active)
    }
    return packet;
}

export function checkSkills(pals: string[], stats: json.JsonObj, passiveSkill: PartialDeep<json.JsonObj>, partnerActiveSkill: PartialDeep<json.JsonObj>){
    let list: json.ObjJsonVal[] = new Array;
    pals.forEach(name => {
        let packet: json.ObjJsonVal = {}
        const passives = ["PassiveSkill1","PassiveSkill2","PassiveSkill3","PassiveSkill4"]
        passives.forEach(pass => {
            if (stats[name][pass] && typeof stats[name][pass] === "string"){
                let temp = stats[name][pass] as string
                if(!temp.includes("None")){
                    let passiveData = checkPassiveData(temp, passiveSkill)
                    if(passiveData){
                        passiveData.passiveName = temp;
                        passiveData.type = "PassiveSkill";
                        if(!packet.skill){
                            packet.skill = [passiveData]
                        }else if(isNonEmptyArray(packet.skill)){
                            packet.skill.push(passiveData);
                        }
                    }
                }
            }

        });
        //English partner skill name and desc
        // if(passName["PARTNERSKILL_" + name]){
        //     packet.PartnerSkill_Name = passName["PARTNERSKILL_" + name].TextData.LocalizedString;
        // }else if(ability["PAL_FIRST_SPAWN_DESC_" + name]){
        //     packet.PartnerSkill_Desc = ability["PAL_FIRST_SPAWN_DESC_" + name].TextData.LocalizedString;
        // }
        packet.name = name;
        let res = skillSearch(name, passiveSkill, partnerActiveSkill)
        if(res){
            for (const [keys,value] of Object.entries(res)){
                if(keys === "skill"){
                    if(!isNonEmptyArray(packet.skill)){
                        packet.skill = value;
                    }else{
                        if(isNonEmptyArray(value)){
                            packet.skill = merge(packet.skill, value , (a,b) => a === b);
                        }
                    }
                    // console.log(packet.skill)
                }else{
                    if(!packet[keys]){
                        if(keys === "SkillName"){
                            packet["ActiveSkill_Name"] = value;
                        }else{
                            packet[keys] = value
                        }
                    }
                }
            }
        }
        
        if(list.length >= 2){
            if(!isNonEmptyArray(packet.skill)){
                delete packet.skill
            }  
            list.push(packet)
        }else{
            if(!isNonEmptyArray(packet.skill)){
                delete packet.skill
            }
            list.push(packet);
        }
    });
    // console.log(list);
}

function checkPassiveData(query: string, passiveData: PartialDeep<json.JsonObj>): json.ObjJsonVal | undefined{
    if(passiveData[query]){
        let check = passiveData[query] as json.ObjData
        let packet:json.ObjJsonVal = {effects: []};
        for(let x = 0; x <= 2; x++){
            let [type,value,target] = ["EffectType" + (x+1).toString(),"EffectValue" + (x+1).toString(), "TargetType" +  + (x+1).toString()];
            if(isString(check[type])){
                let temp = check[type] as string
                if(!temp.includes("::no") && isNonEmptyArray(packet.effects)){
                    packet.effects.push({
                        effect: temp.slice(temp.lastIndexOf(":")+1, temp.length),
                        value: temp,
                        target: temp.slice(temp.lastIndexOf(":")+1, temp.length)
                    })
                }else if(!temp.includes("::no") && !isNonEmptyArray(packet.effects)){
                    packet.effects = [{
                        effect: temp.slice(temp.lastIndexOf(":")+1, temp.length),
                        value: temp,
                        target: temp.slice(temp.lastIndexOf(":")+1, temp.length)
                    }]
                }
            }
        }

        for (const [key,value] of Object.entries(check)){
            if(key.includes("Rank") || key.includes("Invoke")){
                packet[key] = value;
            }
        }
        // console.log(packet)
        return packet;
    }else{
        // console.log("No passive skill stats found");
        return;
    }
}

function checkPartnerActiveSkill(query: string, activeData: PartialDeep<json.JsonObj>){
    if(activeData[query]){
        let packet: json.ObjJsonVal = {};
        let temp = activeData[query] as json.JsonObj;
        packet.execCost = temp["ExecCost"];
        packet.idleCost = temp["IdleCost"];
        packet.cooldown = temp["CoolDownTime"];
        packet.duration = temp["effectTime"];
        packet.throwable = temp["CanThrowPal"];
        packet.weapon = temp["CanChangeWeapon"];
        packet.toggle = temp["IsToggleKey"];
        return packet;
    }
}