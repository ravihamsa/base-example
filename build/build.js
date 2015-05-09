({
    appDir: '../',
    baseUrl: './js',
    paths: {
        jquery: "empty:",
        underscore: "empty:",
        backbone: "empty:",
        text:'libs/requirejs-text-plugin',
        base:'empty:',
        widgets:'empty:',
        list:'empty:'
    },
    dir: '../dist',
    optimize: 'none',
    fileExclusionRegExp: /(build|idea|.git|.gitignore)/,
    modules: [

        {
            name: 'apps/examples',
            include: [
                'apps/examples/app'
            ],
            exclude:[
                'text'
            ]
        },
        {
            name: 'apps/introduction',
            include: [
                'apps/introduction/app'
            ],
            exclude:[
                'text'
            ]
        }
    ]
})
