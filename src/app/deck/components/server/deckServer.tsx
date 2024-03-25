import { connectPalDb } from "./action";

const data = await connectPalDb();

export const getPals = () => {
    if(data.length > 0){
        return data
    }else{
        return 
    }
}