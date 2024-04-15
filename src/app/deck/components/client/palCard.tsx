"use client"

import { WORKICONS, ELEICONS } from '@/lib/constants';
import Image from 'next/image';
import { ReactElement, useState } from 'react';

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
	HP: number;
	Defense: number;
	ShotAttack: number;
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
				height={48}
				width={48}
			/>
		);
	} else if (query.includes('WorkSuitability_') && typeof value === 'number') {
		return (
			<div className='grid grid-cols-2'>
				<div className='relative h-full w-full'>
					<Image
						src={WORKICONS[query]}
						alt={query}
						fill={true}
					/>
				</div>
				<p className='font-bold text-l mb-2 text-slate-100'>
					{': '}
					{value}
				</p>
			</div>
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
	const renderedFieldsCount: number = [
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
	].filter((value) => value !== undefined).length;
	
	const isTwoColLayout:boolean = renderedFieldsCount > 3;

	// Define state to track click status and conditional rendering
	const [isClicked, setIsClicked] = useState(false);

	// Toggle click state
	const handleClick = () => {
		setIsClicked(!isClicked);
	};

	return (
		<div className='w-full h-full rounded-lg px-5 py-5 grid grid-flow-rows-dense gap-2 bg-slate-800 overflow-hidden'>
			<div className='relative h-12 flex flex-row items-center justify-between mb-4'>
				<div className='flex flex-row relative mt-4 ml-2'>
					<div className='absolute -left-4 -top-4 text-xs font-bold'>
						No.{ZukanIndex}
						{ZukanIndexSuffix}
					</div>
					<div className='font-bold text-xl mb-2'>{EnglishName}</div>
				</div>
				<div className='flex'>
					{typeof ElementType2 === 'string' ? (
						<>
							<div className='absolute bottom-2 right-3.5'>
								<Image
									src={ELEICONS[ElementType1]}
									alt={ElementType1}
									height={48}
									width={48}
								/>
							</div>
							<div className='absolute top-3.5 -right-2'>
								{checkDisplay('ElementType2', ElementType2)}
							</div>
						</>
					) : (
						<div className=''>
							<Image
								src={ELEICONS[ElementType1]}
								alt={ElementType1}
								height={56}
								width={56}
							/>
						</div>
					)}
				</div>
			</div>
			<div className='h-64'>
				<div className='relative h-full w-full flex'>
					<Image
						className=' border-2 border-slate-100 rounded-lg grow'
						src={`https://palpedia-media.s3.us-west-1.amazonaws.com/Normal/T_${Name}_icon_normal.png`}
						alt={Name}
						fill={true}
					/>
				</div>
			</div>

			<div
				className='h-auto w-auto flex grow justify-center p-5 mt-5 border-2 border-slate-400 rounded-lg shadow-lg transition ease-in-out delay-150 hover:-translate-y-1 hover:scale-110 hover:bg-indigo-900 duration-300'
				onClick={handleClick}
			>
				{isClicked ? (
					<div
						id='palcard-work-component'
						className={`grid grid-rows-2 ${
							isTwoColLayout ? 'grid-cols-3' : 'grid-cols-2'
						}  h-full w-full `}
					>
						{checkDisplay(
							'WorkSuitability_EmitFlame',
							WorkSuitability_EmitFlame
						)}
						{checkDisplay(
							'WorkSuitability_Collection',
							WorkSuitability_Collection
						)}
						{checkDisplay('WorkSuitability_Cool', WorkSuitability_Cool)}
						{checkDisplay('WorkSuitability_Deforest', WorkSuitability_Deforest)}
						{checkDisplay(
							'WorkSuitability_GenerateElectricity',
							WorkSuitability_GenerateElectricity
						)}
						{checkDisplay(
							'WorkSuitability_Handcraft',
							WorkSuitability_Handcraft
						)}
						{checkDisplay('WorkSuitability_Mining', WorkSuitability_Mining)}
						{checkDisplay(
							'WorkSuitability_MonsterFarm',
							WorkSuitability_MonsterFarm
						)}
						{checkDisplay(
							'WorkSuitability_ProductMedicine',
							WorkSuitability_ProductMedicine
						)}
						{checkDisplay('WorkSuitability_Seeding', WorkSuitability_Seeding)}
						{checkDisplay(
							'WorkSuitability_Transport',
							WorkSuitability_Transport
						)}
						{checkDisplay('WorkSuitability_Watering', WorkSuitability_Watering)}
					</div>
				) : (
					<div
						id='palcard-stat-component'
						className='grid grid-rows-1 items-center gap-1'
					>

						<div className='grid grid-cols-3 gap-5'>
							<p className='grid grid-rows-2 font-bold text-base bg-red-700 rounded-lg p-2 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out'>
								<span className='text-lg font-bold underline'>HP</span>
								<span className='text-lg font-bold'>{HP}</span>
							</p>
							<p className='grid grid-rows-2 font-bold text-base bg-orange-500 rounded-lg p-2 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out'>
								<span className='text-lg font-bold underline'>ATK </span>
								<span className='text-lg font-bold'>{ShotAttack}</span>
							</p>
							<p className='grid grid-rows-2 font-bold text-base bg-blue-500 rounded-lg p-2 cursor-pointer hover:bg-blue-300 transition-all duration-300 ease-in-out'>
								<span className='text-lg font-bold underline'>DEF</span>
								<span className='text-lg font-bold'>{Defense}</span>
							</p>
						</div>
					</div>
				)}
			</div>
		</div>
	);
}
