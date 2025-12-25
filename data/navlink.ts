export type NavLink = {
  name: string;
  href: string;
};

export const navLinks: NavLink[] = [
  { name: "Home", href: "#hero" },
  { name: "Wishlist", href: "#wishlist" },
  { name: "Rating", href: "#rating" }
];

export const contactLink: NavLink = { 
    name: "Contact", href: "#contact" 
};