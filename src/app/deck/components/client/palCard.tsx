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
	ZukanIndex: number;
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
				<Image
					src={WORKICONS[query]}
					alt={query}
					height={32}
					width={32}
				/>
				<p className='text-2xl font-bold text-slate-100'>{value}</p>
			</>
		);
	} else {
		return;
	}
}

export default function PalCardComponent({
	Name,
	ZukanIndex,
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
		<div className='w-80 h-max rounded overflow-hidden shadow-lg'>
			<div className='px-6 py-4'>
				<div className='flex flex-row justify-between'>
					<div className='font-bold text-xl mb-2'>No.{ZukanIndex}</div>
					<div className='font-bold text-xl mb-2'>{Name}</div>
					<Image
						src={ELEICONS[ElementType1]}
						alt={ElementType1}
						height={32}
						width={32}
					/>
					{checkDisplay('ElementType2', ElementType2)}
				</div>

				<Image
					className='border-2 border-slate-100'
					src={`https://palpedia-media.s3.us-west-1.amazonaws.com/Normal/T_${Name}_icon_normal.png`}
					alt={Name}
					height={256}
					width={256}
				/>
				<div id="palcard-work-component" className='flex flex-row'>
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
	);
}
