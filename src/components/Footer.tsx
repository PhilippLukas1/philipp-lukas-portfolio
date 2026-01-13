export const Footer = () => {
    return (
        <footer className="py-8 px-4 border-t border-white/5 bg-background text-center">
            <p className="text-accent-porcelain/40 text-sm mb-4">
                © {new Date().getFullYear()} Philipp Lukas. All rights reserved.
            </p>
            <a
                href="#"
                className="inline-block px-6 py-2 border border-accent-orange/30 rounded-full text-accent-orange hover:bg-accent-orange hover:text-white transition-all duration-300 font-sans text-sm tracking-wide"
            >
                Contact
            </a>
        </footer>
    );
};
