import NavLinks from "./nav-links";

type HeaderProp = {
    headerCSS: string;
}

export default function Header({headerCSS}: HeaderProp) {
    return (
        // <header className="inset-x-0 top-0 w-full md:h-24 items-center justify-center font-mono text-sm flex flex-row">
        <header className={headerCSS}>
            <NavLinks />
        </header>
    );
}