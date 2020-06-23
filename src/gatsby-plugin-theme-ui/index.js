import baseTheme from "gatsby-theme-code-notes/src/gatsby-plugin-theme-ui"
import {merge} from "lodash"

let stylesheet = merge({}, baseTheme, {
    colors: {
        text: "#111",
        primary: "#169a84",
        background: "hsl(170, 50%, 95%)",
        navHover: "hsl(170, 50%, 90%)",
        modes: {
            dark: {
                text: "#fff",
                primary: "#169a84",
                background: "hsla(0, 0%, 5%, 1)",
                backgroundTransparent: "hsla(0, 0%, 5%, 0.75)",
                contentBg: "#000",
                navHover: "hsla(170, 60%, 60%, 0.25)",
            },
        },
    },
});

export default stylesheet;
