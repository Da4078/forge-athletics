
import { useEffect, useState } from "react";
import { ArrowUpRight, Dumbbell, Menu, X } from "lucide-react";
import Button from "./Button";

const navLinks = [
  { label: "Programs", href: "#programs" },
  { label: "Our story", href: "#about" },
  { label: "Membership", href: "#membership" },
  { label: "Coaches", href: "#trainers" },
];

export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (!menuOpen) return;

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  function closeMenu() {
    setMenuOpen(false);
  }

  return (
    <>
      <header className="fixed inset-x-0 top-0 z-50 border-b border-white/[0.08] bg-ink/85 backdrop-blur-xl">
        <nav
          className="section-padding mx-auto flex h-[76px] max-w-[1600px] items-center justify-between"
          aria-label="Main navigation"
        >
          {/* Brand */}
          <a
            href="#home"
            onClick={closeMenu}
            className="group flex shrink-0 items-center gap-3"
            aria-label="Forge Athletics home"
          >
            <span className="flex h-10 w-10 items-center justify-center bg-forge text-ink transition-transform duration-300 group-hover:rotate-[-8deg]">
              <Dumbbell size={23} strokeWidth={2.5} aria-hidden="true" />
            </span>

            <span className="flex flex-col leading-none">
              <span className="font-display text-[25px] font-extrabold tracking-[0.04em] text-white">
                FORGE
              </span>
              <span className="mt-1 text-[9px] font-bold tracking-[0.3em] text-forge">
                ATHLETICS
              </span>
            </span>
          </a>

          {/* Desktop navigation */}
          <div className="hidden items-center gap-8 lg:flex xl:gap-10">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="group relative py-2 text-[13px] font-medium text-white/65 transition-colors duration-200 hover:text-white"
              >
                {link.label}
                <span className="absolute inset-x-0 -bottom-0.5 h-px origin-left scale-x-0 bg-forge transition-transform duration-300 group-hover:scale-x-100" />
              </a>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:block">
            <Button href="#membership" size="md" icon>
              Join FORGE
            </Button>
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            className="flex h-11 w-11 items-center justify-center border border-white/10 text-white transition-colors hover:border-forge hover:text-forge lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-navigation"
          >
            {menuOpen ? <X size={23} /> : <Menu size={23} />}
          </button>
        </nav>
      </header>

      {/* Mobile navigation overlay */}
      <div
        className={`fixed inset-0 z-[60] bg-black/70 transition-opacity duration-300 lg:hidden ${
          menuOpen
            ? "visible opacity-100"
            : "invisible pointer-events-none opacity-0"
        }`}
        onClick={closeMenu}
        aria-hidden="true"
      />

      {/* Mobile navigation drawer */}
      <aside
        id="mobile-navigation"
        role="dialog"
        aria-modal={menuOpen ? "true" : undefined}
        aria-label="Mobile navigation"
        inert={!menuOpen}
        className={`fixed right-0 top-0 z-[70] flex h-dvh w-[min(88%,420px)] flex-col border-l border-white/10 bg-ink px-6 pb-8 pt-6 transition-transform duration-300 ease-out lg:hidden ${
          menuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between border-b border-white/10 pb-6">
          <span className="font-display text-2xl font-extrabold tracking-wide">
            FORGE<span className="text-forge">.</span>
          </span>

          <button
            type="button"
            onClick={closeMenu}
            className="flex h-10 w-10 items-center justify-center border border-white/10 text-white hover:text-forge"
            aria-label="Close navigation menu"
          >
            <X size={22} />
          </button>
        </div>

        <div className="mt-10 flex flex-col">
          {navLinks.map((link, index) => (
            <a
              key={link.href}
              href={link.href}
              onClick={closeMenu}
              className="flex items-center justify-between border-b border-white/[0.08] py-5 font-display text-3xl font-semibold uppercase tracking-wide text-white/80 transition-colors hover:text-forge"
            >
              <span>{link.label}</span>
              <span className="font-body text-xs text-white/30">
                0{index + 1}
              </span>
            </a>
          ))}
        </div>

        <div className="mt-auto">
          <p className="mb-4 text-xs uppercase tracking-[0.2em] text-white/40">
            Your next level starts here.
          </p>

          <Button
            href="#membership"
            size="lg"
            fullWidth
            icon
            onClick={closeMenu}
          >
            Explore membership
          </Button>

          <p className="mt-6 text-center text-[10px] tracking-[0.15em] text-white/30">
            TRAIN WITH PURPOSE. BECOME MORE.
          </p>
        </div>
      </aside>
    </>
  );
}
