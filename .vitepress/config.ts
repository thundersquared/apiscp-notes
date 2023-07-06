import { defineConfigWithTheme } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import type { Config as ThemeConfig } from "@apiscp/vitepress-theme/src/config";

// https://vitepress.dev/reference/site-config
export default defineConfigWithTheme<ThemeConfig>({
  srcDir: "./notes/",
  lang: "en-US",
  title: "ApisCP Notes",
  description:
    "Notes and cheats for a better ApisCP administration experience.",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    autoTitle: true,

    search: {
      provider: "algolia",
      options: {
        indexName: "apiscpnotes",
        appId: "TA7YISSZ4O",
        apiKey: "64283e3b28dd9a7112d9a45ec6812751",
      },
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
        scanStartPath: ".",
        // resolvePath: '.',
        rootGroupText: "Notes",
        useTitleFromFileHeading: true,
        useTitleFromFrontmatter: true,
      }),
    ],

    socialLinks: [
      {
        icon: "github",
        link: "https://github.com/thundersquared/apiscp-notes",
      },
      {
        icon: "discord",
        link: "https://discord.gg/wDBTz6V",
      },
    ],

    editLink: {
      pattern:
        "https://github.com/thundersquared/apiscp-notes/edit/docs/notes/:path",
    },

    docFooter: {
      prev: false,
      next: false,
    },
  },
  cleanUrls: true,
  lastUpdated: true,
});
