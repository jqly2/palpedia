import { connectPalDb } from "./action";
import PalListComponent from "../client/palCard";

const data = await connectPalDb();

export const getPals = () => {
    if(data.length > 0){
        return data
    }else{
        return 
    }
}