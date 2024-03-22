import { WORKICONS, ELEICONS } from "@/lib/constants";
import Image from "next/image";


export default function SearchUIComponent(){

    return (
            <>
                <div id="search-ui" className="grid grid-cols-3 grid-rows-1 h-1/4">             
                    <div id="element-filter" className="grid grid-cols-3 grid-rows-3 gap-4">
                        {
                            Object.entries(ELEICONS).map(([key,value]) => {
                                return(
                                    <Image key={key} src={value} alt={key} width={64} height={64}/>
                                )
                            })
                        }
                    </div>
                    <div id="search bar"><input></input><button>Submit</button></div>
                    <div id="work-filter"  className="grid grid-cols-4 grid-rows-3 gap-4">
                        {
                            Object.entries(WORKICONS).map(([key,value]) => {
                                return(
                                    <Image key={key} src={key} alt={key} width={64} height={64}/>
                                )
                            })
                        }
                    </div>
                </div>
            </> 
    )
}