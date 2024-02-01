import {
    Cog8ToothIcon,
    IdentificationIcon,
    MapIcon,
    ShoppingBagIcon
  } from '@heroicons/react/24/outline';
import { ForwardRefExoticComponent, SVGProps, RefAttributes } from 'react';

interface URL{ 
    name:string,
    href:string
  }[]; 

interface ImageURL extends URL {
    icon:ForwardRefExoticComponent<Omit<SVGProps<SVGSVGElement>, "ref"> & { title?: string | undefined; titleId?: string | undefined; } & RefAttributes<SVGSVGElement>>
};

export const 
    FOOTERLINK:URL[] = [        
        {
            name:'Offical Site',
            href:'https://www.pocketpair.jp/palworld'
        },
        {
            name:'About',
            href:'/about'
        },
        {
            name:'Credit',
            href:'/credit'
        },
        {
            name:'Roadmap',
            href:'/'
        }
    ],
    HEADERLINK:ImageURL[] = [
        { name: 'Deck', href: '/', icon: IdentificationIcon },
        {
          name: 'World Map',
          href: '/map',
          icon: MapIcon,
        },
        { name: 'Tech Tree', href: '/tech', icon: Cog8ToothIcon },
        { name: "Items", href:'/items', icon: ShoppingBagIcon}
    ],
    exclude: string[] = [
        "OverrideNameTextID",
        "NamePrefixID",
        "OverridePartnerSkillTextID",
        "IsPal",
        "Tribe",
        "BPClass",
        "Organization",
        "weapon",
        "WeaponEquip",
        "Support",
        "EnemyReceiveDamageRate",
        "CaptureRateCorrect",
        "ExpRatio",
        "Price",
        "AIResponse",
        "AISightResponse",
        "SlowWalkSpeed",
        "WalkSpeed",
        "RunSpeed",
        "RideSprintSpeed",
        "TransportSpeed",
        "IsBoss",
        "IsTowerBoss",
        "BattleBGM",
        "IgnoreLeanBack",
        "IgnoreBlowAway",
        "MaxFullStomach",
        "FullStomachDecreaseRate",
        "ViewingDistance",
        "ViewingAngle",
        "HearingRate",
        "NooseTrap",
        "Nocturnal",
        "BiologicalGrade",
        "Predator",
        "Edible",
        "Stamina",
        "MaleProbability",
        "CombiRank",
        "PassiveSkill1",
        "PassiveSkill2",
        "PassiveSkill3",
        "PassiveSkill4"
    ]