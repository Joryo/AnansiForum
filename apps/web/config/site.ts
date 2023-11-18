export type SiteConfig = typeof siteConfig;

export const siteConfig = {
  name: "Anansi Forum",
  description: "Simple server.",
  navItems: [
    {
      label: "Last posts",
      href: "/",
    },
    {
      label: "New post",
      href: "/posts/new",
    },
    {
      label: "Account",
      href: "/account",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  navMenuItems: [
    {
      label: "Last posts",
      href: "/",
    },
    {
      label: "New post",
      href: "/posts/new",
    },
    {
      label: "Account",
      href: "/account",
    },
    {
      label: "Logout",
      href: "/logout",
    },
  ],
  links: {
    github: "https://github.com/nextui-org/nextui",
    twitter: "https://twitter.com/getnextui",
    docs: "https://nextui.org",
    discord: "https://discord.gg/9b6yyZKmH4",
    sponsor: "https://patreon.com/jrgarciadev",
  },
};
