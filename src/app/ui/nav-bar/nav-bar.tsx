import NavLinks from "./nav-links";

export default function Navbar() {
    return (
        <header className="absolute inset-x-0 top-0 w-full md:h-24 items-center justify-center font-mono text-sm flex flex-row">
            <NavLinks />
        </header>
    );
}