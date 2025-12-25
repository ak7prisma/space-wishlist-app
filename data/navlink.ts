export type NavLink = {
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { name: "Home", href: "#hero" },
  { name: "Wishlist", href: "#wishlist" },
];

export const portofolioLink: NavLink = { 
    name: "See Another Projects", href: "https://portofolio-ahmad-kurnia-prisma.vercel.app/#projects" 
};