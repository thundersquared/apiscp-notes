let config = {
    siteMetadata: {
        title: 'apiscp-notes',
        description: `Notes and cheats for a better ApisCP administration experience.`,
        author: 'thundersquared',
    },
    plugins: [
        {
            resolve: `gatsby-theme-code-notes`,
            options: {
                contentPath: 'content/notes',
                showDescriptionInSidebar: true,
                showThemeInfo: false,
                logo: '/images/apiscp-logo.svg',
            },
        },
        {
            resolve: `gatsby-plugin-manifest`,
            options: {
                name: `Zander's Code Notes`,
                short_name: `CodeNotes`,
                description: `Notes on code. My memory bank.`,
                start_url: `/`,
                background_color: `hsl(210, 38%, 95%)`,
                theme_color: `hsl(345, 100%, 69%)`,
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
    ],
}

if (process.env.NODE_ENV === 'production') {
    config.siteMetadata.pathPrefix = '/apiscp-notes'
}

module.exports = config
