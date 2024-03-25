import clientPromise from "@/lib/mongodb";
import { Document } from "mongodb";

export const connectPalDb = async (): Promise<Document[]> => {
    const client = await clientPromise

    try {
        await client.connect()
        const db = client.db('palpedia-db')
        const pals = await db
            .collection("pals")
            .aggregate([
              {
                '$match': {
                  'ZukanIndex': {
                    '$gt': 0
                  }
                }
              }, {
                '$project': {
                  'WorkSuitability_EmitFlame': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_EmitFlame', 0
                        ]
                      }, '$WorkSuitability_EmitFlame', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Watering': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Watering', 0
                        ]
                      }, '$WorkSuitability_Watering', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Seeding': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Seeding', 0
                        ]
                      }, '$WorkSuitability_Seeding', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_GenerateElectricity': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_GenerateElectricity', 0
                        ]
                      }, '$WorkSuitability_GenerateElectricity', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Handcraft': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Handcraft', 0
                        ]
                      }, '$WorkSuitability_Handcraft', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Collection': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Collection', 0
                        ]
                      }, '$WorkSuitability_Collection', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Deforest': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Deforest', 0
                        ]
                      }, '$WorkSuitability_Deforest', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Mining': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Mining', 0
                        ]
                      }, '$WorkSuitability_Mining', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_OilExtraction': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_OilExtraction', 0
                        ]
                      }, '$WorkSuitability_OilExtraction', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_ProductMedicine': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_ProductMedicine', 0
                        ]
                      }, '$WorkSuitability_ProductMedicine', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Cool': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Cool', 0
                        ]
                      }, '$WorkSuitability_Cool', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_Transport': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_Transport', 0
                        ]
                      }, '$WorkSuitability_Transport', '$$REMOVE'
                    ]
                  }, 
                  'WorkSuitability_MonsterFarm': {
                    '$cond': [
                      {
                        '$gt': [
                          '$WorkSuitability_MonsterFarm', 0
                        ]
                      }, '$WorkSuitability_MonsterFarm', '$$REMOVE'
                    ]
                  }, 
                  'HP': '$HP', 
                  'ShotAttack': '$ShotAttack', 
                  'Defense': '$Defense', 
                  'Name': '$Name', 
                  'Name_en': '$Name_en', 
                  'ZukanIndex': {
                    '$cond': [
                      {
                        '$gt': [
                          '$ZukanIndex', 0
                        ]
                      }, '$ZukanIndex', 0
                    ]
                  }, 
                  'ZukanIndexSuffix': {
                    '$cond': [
                      {
                        '$ne': [
                          '$ZukanIndexSuffix', ''
                        ]
                      }, '$ZukanIndexSuffix', '$$REMOVE'
                    ]
                  }, 
                  'ElementType1': '$ElementType1', 
                  'ElementType2': {
                    '$cond': {
                      'if': {
                        '$eq': [
                          '$ElementType2', 'None'
                        ]
                      }, 
                      'then': '$$REMOVE', 
                      'else': '$ElementType2'
                    }
                  }, 
                  'moveLevels': {
                    '$cond': [
                      {
                        '$ne': [
                          '$moveLevels', ''
                        ]
                      }, '$moveLevels', '$$REMOVE'
                    ]
                  }
                }
              }, {
                '$sort': {
                  'ZukanIndex': 1
                }
              }
            ])
            .toArray();
        return pals
    } catch(e) {
      console.log(e);
      return []
    }
}

export async function initDeckActions(){}
