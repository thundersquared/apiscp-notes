// Gatsby config
let config = {
    siteMetadata: {
        title: 'apiscp-notes',
        description: `Notes and cheats for a better ApisCP administration experience.`,
        author: 'thundersquared',
    },
    pathPrefix: '/',
}

// Add prefix on deploy
if (process.env.NODE_ENV === 'production') {
    config.pathPrefix = '/apiscp-notes/';
}

// Plugins config
config.plugins = [
    {
        resolve: `gatsby-theme-code-notes`,
        options: {
            contentPath: 'content/notes',
            showDescriptionInSidebar: true,
            showThemeInfo: false,
            logo: `${config.pathPrefix}images/apiscp-logo.svg`,
        },
    },
    {
        resolve: `gatsby-plugin-manifest`,
        options: {
            name: `ApisCP Notes`,
            short_name: `ApisCheats`,
            description: `Notes and cheats for a better ApisCP administration experience.`,
            start_url: `/`,
            background_color: `#e9fcf9`,
            theme_color: `#169a84`,
            display: `standalone`,
            icon: `static/images/apiscp-icon.png`,
        },
    },
    {
        resolve: `gatsby-plugin-offline`,
        options: {
            precachePages: [`/*`, `/tag/*`],
        },
    },
];

module.exports = config
