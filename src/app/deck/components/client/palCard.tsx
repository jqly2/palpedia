import { WORKICONS, ELEICONS } from '@/lib/constants';
import Image from 'next/image';
import { ReactElement } from 'react';

type WorkSuitability = {
	WorkSuitability_EmitFlame?: number;
	WorkSuitability_Watering?: number;
	WorkSuitability_Seeding?: number;
	WorkSuitability_GenerateElectricity?: number;
	WorkSuitability_Handcraft?: number;
	WorkSuitability_Collection?: number;
	WorkSuitability_Deforest?: number;
	WorkSuitability_Mining?: number;
	WorkSuitability_OilExtraction?: number;
	WorkSuitability_ProductMedicine?: number;
	WorkSuitability_Cool?: number;
	WorkSuitability_Transport?: number;
	WorkSuitability_MonsterFarm?: number;
};

interface PalCardProps extends WorkSuitability {
	Name: string;
	EnglishName: string;
	HP:number;
	Defense:number;
	ShotAttack:number;
	ZukanIndex: number;
	ZukanIndexSuffix?: string;
	ElementType1: string;
	ElementType2?: string;
}

function checkDisplay(
	query: string,
	value: string | number | undefined
): ReactElement | undefined {
	if (query === 'ElementType2' && typeof value === 'string') {
		return (
			<Image
				src={ELEICONS[value]}
				alt={value}
				height={32}
				width={32}
			/>
		);
	} else if (query.includes('WorkSuitability_') && typeof value === 'number') {
		return (
			<>
				<div className='relative h-6 w-6'>
					<Image
						src={WORKICONS[query]}
						alt={query}
						fill={true}
					/>
				</div>
				<p className='font-bold text-l mb-2 text-slate-100'>{value}</p>
			</>

		);
	} else {
		return;
	}
}

export default function PalCardComponent({
	Name,
	EnglishName,
	ZukanIndex,
	HP,
	Defense,
	ShotAttack,
	ZukanIndexSuffix,
	ElementType1,
	ElementType2,
	WorkSuitability_EmitFlame,
	WorkSuitability_Collection,
	WorkSuitability_Cool,
	WorkSuitability_Deforest,
	WorkSuitability_GenerateElectricity,
	WorkSuitability_Handcraft,
	WorkSuitability_Mining,
	WorkSuitability_MonsterFarm,
	WorkSuitability_ProductMedicine,
	WorkSuitability_Seeding,
	WorkSuitability_Transport,
	WorkSuitability_Watering,
}: PalCardProps) {
	return (
		<div className='w-max h-max rounded-lg bg-slate-900 overflow-hidden shadow-lg'>
			<div className='px-6 py-4'>
				<div className='relative flex flex-row w-auto items-center justify-between mb-4'>

					<div className='flex flex-row relative mt-4 ml-2'>					
						<div className='absolute -left-4 -top-4 text-xs'>No.{ZukanIndex}{ZukanIndexSuffix}</div><div className='font-bold text-base mb-2'>{EnglishName}</div></div>
					<div className="flex flex-row mt-4">
						<p className="font-bold text-base mb-2 bg-red-700 mr-2">HP: {HP}</p>
						<Image
							src={ELEICONS[ElementType1]}
							alt={ElementType1}
							height={32}
							width={32}
						/>
						{checkDisplay('ElementType2', ElementType2)}
					</div>
				</div>
				<div className='relative'>
					<Image
						className='border-2 border-slate-100 rounded-lg'
						src={`https://palpedia-media.s3.us-west-1.amazonaws.com/Normal/T_${Name}_icon_normal.png`}
						alt={Name}
						height={256}
						width={256}
					/>
				</div>

				<div id="palcard-stat-component" className='flex flex-row justify-between mt-4 mb-4'>
					<p className="font-bold text-1 mb-2 bg-orange-500">ATK: {ShotAttack}</p>
					<p className="font-bold text-1 mb-2 bg-blue-600">DEF: {Defense}</p>
				</div>
				<div id="palcard-work-component" className='flex flex-row justify-evenly'>
					<div className="flex flex-row justify-end">
						{checkDisplay('WorkSuitability_EmitFlame', WorkSuitability_EmitFlame)}
						{checkDisplay('WorkSuitability_Collection', WorkSuitability_Collection)}
						{checkDisplay('WorkSuitability_Cool', WorkSuitability_Cool)}
						{checkDisplay('WorkSuitability_Deforest', WorkSuitability_Deforest)}
						{checkDisplay('WorkSuitability_GenerateElectricity', WorkSuitability_GenerateElectricity)}
						{checkDisplay('WorkSuitability_Handcraft', WorkSuitability_Handcraft)}
						{checkDisplay('WorkSuitability_Mining', WorkSuitability_Mining)}
						{checkDisplay('WorkSuitability_MonsterFarm', WorkSuitability_MonsterFarm)}
						{checkDisplay('WorkSuitability_ProductMedicine', WorkSuitability_ProductMedicine)}
						{checkDisplay('WorkSuitability_Seeding', WorkSuitability_Seeding)}
						{checkDisplay('WorkSuitability_Transport', WorkSuitability_Transport)}
						{checkDisplay('WorkSuitability_Watering', WorkSuitability_Watering)}
					</div>
                </div>

			</div>
		</div>
	);
}
