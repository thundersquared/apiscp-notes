import { lstatSync, readdirSync, readFileSync } from "node:fs";
import matter from "gray-matter";

function buildPath(root, path) {
  return `${root}/${path}`;
}

/*
async function buildSidebar(rootPath, title) {
  try {
    const files = readdirSync(rootPath);

    const docs = files.filter((file) => {
      const stats = statSync(buildPath(rootPath, file));
      return (stats.isDirectory() || stats.isFile()) && !stats.isSymbolicLink();
    });

    const items = docs.map((file) => {
      const src = readFileSync(buildPath(rootPath, file), "utf-8");

      const { data: frontmatter } = matter(src);

      return {
        text: frontmatter.title,
        link: "/" + file.replace(".md", ""),
      };
    });
    console.log({ items });

    for (const file of docs) {
      console.log(file);
    }
  } catch (err) {
    // console.error(err);
  }
}
*/

function buildSidebar(options) {
  if (
    typeof options.exclude === "undefined" || !Array.isArray(options.exclude)
  ) {
    options.exclude = [];
  }

  const { rootPath, title } = options;

  try {
    let block = {
      text: title,
      items: [],
    };

    const files = readdirSync(rootPath)
      .filter((e) => !options.exclude.includes(e));

    for (const file of files) {
      let path;

      // Get file stats to filter out symlinks
      const stats = lstatSync(buildPath(rootPath, file));

      if (stats.isFile() && !stats.isSymbolicLink()) {
        // Normal behaviour when file
        path = buildPath(rootPath, file);
      } else if (stats.isDirectory() && !stats.isSymbolicLink()) {
        // Change final path when dir
        path = buildPath(rootPath, file + "/index.md");
      } else {
        // Skip if something else (probably symlink heh)
        continue;
      }

      // Retrieve and parse frontmatter
      const src = readFileSync(path, "utf-8");
      const { data: frontmatter } = matter(src);

      let item = {
        text: frontmatter.title,
        link: "/" + file.replace(".md", ""),
      };

      // Add emoji to item when defined
      if (frontmatter.hasOwnProperty("emoji")) {
        item.text = `${frontmatter.emoji} ${item.text}`;
      }

      // Add trailing slash when directory
      if (stats.isDirectory()) {
        item.link += "/";
      }

      block.items.push(item);
    }

    return block;
  } catch (err) {
    console.error({ err });
  }
}

export default buildSidebar;
