import { defineConfig } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";

// https://vitepress.dev/reference/site-config
export default defineConfig({
  srcDir: "./notes/",
  lang: 'en-US',
  title: "ApisCP Notes",
  description:
    "Notes and cheats for a better ApisCP administration experience.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    search: {
      provider: "local",
    },

    nav: [
      { text: "Home", link: "https://apiscp.com/" },
      { text: "Notes", link: "/" },
    ],

    sidebar: [
      {
        text: "Resources",
        items: [
          { text: "Notes", link: "/" },
          { text: "Documentation", link: "https://docs.apiscp.com/" },
          { text: "Community", link: "https://forums.apiscp.com/" },
          { text: "Discord", link: "https://discord.gg/wDBTz6V" },
        ],
      },
      ...generateSidebar({
        documentRootPath: "./notes/",
        // scanStartPath: null,
        // resolvePath: null,
        rootGroupText: "Notes",
        // rootGroupLink: 'https://github.com/jooy2',
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
        // hyphenToSpace: true,
        // underscoreToSpace: true,
        // collapsed: true,
        // collapseDepth: 2,
        // includeDotFiles: false,
        // includeRootIndexFile: true,
        // includeEmptyFolder: false,
        // convertSameNameSubFileToGroupIndexPage: false
        // folderLinkNotIncludesFileName: false
      }),
    ],

    socialLinks: [
      { icon: "discord", link: "https://discord.gg/wDBTz6V" },
      { icon: "github", link: "https://github.com/vuejs/vitepress" },
    ],

    docFooter: {
      prev: false,
      next: false
    }
  },
  cleanUrls: true,
  lastUpdated: true,
});
