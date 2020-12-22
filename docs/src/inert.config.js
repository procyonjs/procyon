const config = {
    build: {
        input: "./posts",
        output: "..",
        sassEntry: './scss/index.scss',
        sassFolder: './scss',
        sassOutput: 'index.css',
        templates: {
            home: './templates/home.ejs',
            post: './templates/post.ejs'
        }
    },
    blogName: `Procyon Framework Docs`,
    ownerName: `Procyon Framework`,
    description: `A next-generation web development framework for node.js`,
    navLinks: [{
            href: '/',
            text: 'Home'
        },
        {
            href: '/docs',
            text: 'Docs'
        },
        {
            href: 'https://github.com/codemaster138/procyon',
            text: 'Source'
        }
    ],
    plugins: ['plugin.js'],
    assets: './assets',
    sidebar: [{
        type: 'heading',
        text: 'Getting Started'
    }, {
        type: 'link',
        href: '/docs/intro',
        text: 'Introduction'
    }, {
        type: 'link',
        href: '/docs/api',
        text: 'Core API Reference'
    }]
}

module.exports = config;