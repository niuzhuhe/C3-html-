let gulp = require('gulp'); //此文件为 construct2项目的打包压缩合并=
let uglify = require('gulp-uglify');
let base64 = require('gulp-base64')
let inlinesource = require('gulp-inline-source');
var minify = require('html-minifier').minify;
let gulpSequence = require("gulp-sequence")
var fs = require("fs");
let imageArr = [];
let scriptStr = "";
let datajs;
gulp.task('default', function() {
    return gulp.src("../index.html") //html文件位置
        .pipe(inlinesource())
        .pipe(gulp.dest("dist")) //输出位置

});
setTimeout(() => {
    readImage()
    parseData()
}, 10000)

function parseData() {
    fs.readFile("../data.js", (err, data) => {
        for (let i in imageArr) {
            datajs = data.toString().replace(RegExp('.png"', "g"), '.png"]')
            datajs = datajs.replace(RegExp('"images', "g"), 'window["images')
        }
        fs.writeFile("./datatest.js", datajs, (err, data) => {
            fs.readFile("./dist/index.html", (err, data) => {
                let html = data.toString().replace("this.requestProjectData()", "this.loadProject(" + datajs + ")");
                html = html.replace('<div id="fb-root"></div>', '<div id="fb-root"></div>' + ' \n ' + ' \n ' + scriptStr)
                html = html.replace('alert("Exported', 'console.log("Exported')
                html = html.replace("offlineclient.js", "")
                html = html.replace('<link rel="manifest" href="appmanifest.json">', "")
                html = html.replace('<link rel="apple-touch-icon" sizes="128x128" href="icons/icon-128.png">', "")
                html = html.replace('<link rel="apple-touch-icon" sizes="256x256" href="icons/icon-256.png">', '')
                html = html.replace('<link rel="apple-touch-icon" sizes="512x512" href="icons/icon-512.png">', '');
                html = html.replace('<link rel="icon" type="image/png" href="icons/icon-512.png">', '');
                html = html.replace('<link rel="icon" type="image/png" href="icons/icon-512.png">', '');
                fs.writeFile("./dist/index.html", html, () => {
                    console.log("写入完成")
                    yasuo()
                })
            })
        })
    })
}


function readData() {
    console.log("read")
    fs.readFile("../c2runtime.js", (err, data) => {
        let html = data.toString().replace("")
    })
}


function readImage() {
    fs.readdir("../images", (err, files) => {
        scriptStr += '<script>' + "\n"
        for (let i in files) {
            let imgName = "images/" + files[i]
            let bitmap = fs.readFileSync("../images/" + files[i]);
            let base64str = 'data:image/png;base64,' + Buffer.from(bitmap, 'binary').toString('base64'); // base64编码
            imageArr.push(imgName)
            scriptStr += 'window["' + imgName + '"]="' + base64str + '"' + ' \n ' + ' \n ' + ' \n '
        }
        scriptStr += "\n" + '</script>'
    })
}



// var htmlmin = require('gulp-htmlmin');

// gulp.task('html', function() {

//     var options = {

//         collapseWhitespace: true,

//         collapseBooleanAttributes: true,

//         removeComments: true,

//         removeEmptyAttributes: true,

//         removeScriptTypeAttributes: true,

//         removeStyleLinkTypeAttributes: true,

//         minifyJS: true,

//         minifyCSS: true

//     };

//     gulp.src('app/**/*.html')

//     .pipe(htmlmin(options))

//     .pipe(gulp.dest('dest/'));

// });


function yasuo() {
    fs.readFile('./dist/index.html', 'utf8', function(err, data) {
        if (err) {
            throw err;
        }
        fs.writeFile('./dist/miniindex.html', minify(data, { removeComments: true, collapseWhitespace: true, minifyJS: true, minifyCSS: true }), function() {
            console.log('success');
        });
    });
}