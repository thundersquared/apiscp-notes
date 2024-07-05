import { defineConfigWithTheme } from "vitepress";
import { generateSidebar } from "vitepress-sidebar";
import buildSidebar from "./buildSidebar";
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
      provider: "local",
      options: {
        _render(src, env, md) {
          let content = "";
          const rendered = md.render(src, env);

          // Excluding pages from search
          if (env.frontmatter?.search === false) return "";

          // Transforming content to include title and tags
          if (env.frontmatter?.title)
            content += md.render(`# ${env.frontmatter.title}`);

          if (env.frontmatter?.tags)
            content += md.render(`- ${env.frontmatter.tags.join("\n- ")}`);

          return `${content}\n${rendered}`;
        },
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
      buildSidebar({
        rootPath: "./notes",
        title: "Notes",
        exclude: ["index.md"],
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
  ignoreDeadLinks: [
    // ignore all localhost links
    /^https?:\/\/localhost/,
  ],
});
