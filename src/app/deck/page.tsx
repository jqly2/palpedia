import SearchUIComponent from "./components/client/searchUI"
import PalCardComponent from "./components/client/palCard"
import {getPals} from "./components/server/deckServer"

function displayPalList(): Array<React.ReactNode> {
    const pals = getPals();
    const display: React.ReactNode[] = [];
    if (pals) {
        //Need to convert the objects to simple values to pass down to Client Component Card.
        pals.map((pal) => {
            display.push(
                <PalCardComponent
                    key={pal.Name}
                    Name={pal.Name}
                    EnglishName={pal.Name_en} 
                    ZukanIndex={pal.ZukanIndex}
                    ElementType1={pal.ElementType1}
                    ElementType2={pal.ElementType2}
                    WorkSuitability_EmitFlame={pal.WorkSuitability_EmitFlame}
                    WorkSuitability_Collection={pal.WorkSuitability_Collection}
                    WorkSuitability_Cool={pal.WorkSuitability_Cool}
                    WorkSuitability_Deforest={pal.WorkSuitability_Deforest}
                    WorkSuitability_GenerateElectricity={pal.WorkSuitability_GenerateElectricity}
                    WorkSuitability_Handcraft={pal.WorkSuitability_Handcraft}
                    WorkSuitability_Mining={pal.WorkSuitability_Mining}
                    WorkSuitability_MonsterFarm={pal.WorkSuitability_MonsterFarm}
                    WorkSuitability_ProductMedicine={pal.WorkSuitability_ProductMedicine}
                    WorkSuitability_Seeding={pal.WorkSuitability_Seeding}
                    WorkSuitability_Transport={pal.WorkSuitability_Transport}
                    WorkSuitability_Watering={pal.WorkSuitability_Watering}
                />
            )
        });
    }else{
        display.push(<p>Unable to retieve the pal list data. Please try again later.</p>)
    }
    return display
}


export default function Deck(){

    return (
        <div id="deck-main" className="bg-gray-200 grow flex flex-col items-center justify-center">
            {/* <SearchUIComponent /> */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mt-8 mb-8">
                {displayPalList()}
            </div>
        </div>
    )
}