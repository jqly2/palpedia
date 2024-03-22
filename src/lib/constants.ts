import {
	Cog8ToothIcon,
	IdentificationIcon,
	MapIcon,
	ShoppingBagIcon,
} from '@heroicons/react/24/outline';
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

interface URL {
	name: string;
	href: string;
}
[];

interface ICON {
	[index: string]: string;
}

interface ImageURL extends URL {
	icon: ForwardRefExoticComponent<
		Omit<SVGProps<SVGSVGElement>, 'ref'> & {
			title?: string | undefined;
			titleId?: string | undefined;
		} & RefAttributes<SVGSVGElement>
	>;
}

export const FOOTERLINK: URL[] = [
		{
			name: 'Offical Site',
			href: '/',
		},
		{
			name: 'About',
			href: '/',
		},
		{
			name: 'Credit',
			href: '/',
		},
		{
			name: 'Roadmap',
			href: '/',
		},
	],
	NAVBARLINK: ImageURL[] = [
		{ name: 'Deck', href: '/deck', icon: IdentificationIcon },
		{
			name: 'World Map',
			href: '/map',
			icon: MapIcon,
		},
		{ name: 'Temp Home', href: '/', icon: Cog8ToothIcon },
		{ name: 'Items', href: '/items', icon: ShoppingBagIcon },
	],
	WORKICONS: ICON = {
		work_icon:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_pal_work.png',
		WorkSuitability_EmitFlame:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_00.png',
		WorkSuitability_Watering:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_01.png',
		WorkSuitability_Seeding:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_02.png',
		WorkSuitability_GenerateElectricity:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_03.png',
		WorkSuitability_Handcraft:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_04.png',
		WorkSuitability_Collection:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_05.png',
		WorkSuitability_Deforest:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_06.png',
		WorkSuitability_Mining:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_07.png',
		WorkSuitability_ProductMedicine:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_08.png',
		WorkSuitability_Cool:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_10.png',
		WorkSuitability_Transport:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_11.png',
		WorkSuitability_MonsterFarm:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/work-food/T_icon_palwork_12.png',
	},
	ELEICONS: ICON = {
		Dark: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Dark_Medium.png',
		Dragon:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Dragon_Medium.png',
		Earth:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Earth_Medium.png',
		Electricity:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Electric_Medium.png',
		Fire: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Fire_Medium.png',
		Leaf:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Grass_Medium.png',
		Ice: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Ice_Medium.png',
		Normal: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Normal_Medium.png',
		Water:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Water_Medium.png',
	},
	ELESYMBOL:ICON = {
		Dark: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Dark_Small.png',
		Dragon:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Dragon_Small.png',
		Earth:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Earth_Small.png',
		Electricity:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Electric_Small.png',
		Fire: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Fire_Small.png',
		Leaf:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Grass_Small.png',
		Ice: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Ice_Small.png',
		Normal: 'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Normal_Small.png',
		Water:
			'https://palpedia-media.s3.us-west-1.amazonaws.com/elements/Water_Small.png',
	}