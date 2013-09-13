({
    appDir: '../',
    baseUrl: './js',
    paths: {
        jquery: "empty:",
        underscore: "empty:",
        backbone: "empty:",
        'text':'libs/requirejs-text-plugin'
    },
    dir: '../dist',
    //optimize: 'none',
    fileExclusionRegExp: /(build|idea)/,
    modules: [

        {
            name: 'apps/examples',
            include: [
                'apps/examples/app'
            ],
            exclude: ['common']
        }


    ]
})
