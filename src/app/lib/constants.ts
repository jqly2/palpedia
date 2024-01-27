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
            href:'/'
        },
        {
            name:'About',
            href:'/'
        },
        {
            name:'Credit',
            href:'/'
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
    ];