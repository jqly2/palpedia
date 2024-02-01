import { PalBasic } from "@/app/lib/definitions";
import Image from "next/image";

const Card = ({id, name}: PalBasic) => {
    return(
        <>
            <div className="max-w-sm rounded overflow-hidden shadow-lg">
                <div className="px-6 py-4">
                    <div className="font-bold text-xl mb-2">{id}</div>
                    <div className="font-bold text-xl mb-2">{name}</div>
                </div>
                <Image className="w-full" src="/img/card-top.jpg" alt="Placeholder" />
            </div>
        </>
    )
}

export default Card;