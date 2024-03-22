'use client'

import { FOOTERLINK } from '../../lib/constants';
import classNames from 'classnames';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';
import Link from 'next/link';

type FooterProp = {
    css: string;
}

interface Props extends FooterProp {
    data: {name: string, href: string}[];
}

interface ChildProps {
    name:string;
    href: string
}

const FooterCol = ({name, href}: ChildProps) =>{
    const pathname = usePathname();
    return (
        <>
            <Link 
                key={name} 
                href={href}
                className={clsx(
                    'flex md:flex-none md:justify-start md:p-2 md:px-3',
                    {
                      ' text-sky-100': pathname === href,
                    },
                  )}
            >{name}
            </Link>
        </>
    );

} 


const FooterRow = ({data, css}: Props) => {
    const list:React.ReactNode[] = []
    const tailcss = classNames(css   
    )
    data.map((item) => {
        list.push(
            <FooterCol key={item.name} name={item.name} href={item.href} />
        )
        return list
    })
    return (
        <div className={`${tailcss}`}>
            {list}
        </div>
    )
}

const Footer = ({css}: FooterProp) => <FooterRow data={FOOTERLINK} css={css}/>;  

export default Footer;