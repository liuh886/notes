module.exports = {
    content: [
        "_site/**/*.html",
        "_site/**/*.js"
    ],
    css: [
        "_site/assets/css/*.css"
    ],
    safelist: [
        "active",
        "collapsed",
        "dark",
        "light",
        "show",
        /^navbar-/,
        /^btn-/,
        /^dropdown-/,
        /^modal-/,
        /^tooltip-/,
        /^popover-/,
        /^collapse/,
        /^toast-/,
        /^tab-/,
        /^carousel-/
    ],
    output: "_site/assets/css/",
    skippedContentGlobs: [
        "_site/assets/**/*.html"
    ]
};
