import { PalBasic } from "./definitions";

export interface Stats extends PalBasic {
    type: string,
    subtype: string | null,
    hp: string,
    melee: number,
    range: number,
    defense: number,
    craftspeed: number,
    hunger: number,
    work: [number],
}
