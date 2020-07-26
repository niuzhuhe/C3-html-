let fs = require("fs")
require('shelljs/global');

let packChoose = 5; //1Fackbook
let chicun = ' <meta name="ad.size" content="width=480,height=320">'
    //2Applovin

fs.readFile("../index.html", (err, data) => {
    console.log(data.toString())
    let newhtml = data.toString()
    newhtml = newhtml.replace('<script src="register-sw.js"></script>', '')
    newhtml = newhtml.replace('<link rel="stylesheet" href="style.css">', '<link rel="stylesheet" href="style.css" inline>')
    newhtml = newhtml.replace('"c2runtime.js"', '"c2runtime.js" inline')
    newhtml = newhtml.replace('"start.js"', '"start.js" inline')
    newhtml = newhtml.replace('<link rel="icon" type="image/png" href="icons/icon-256.png">', "")
    fs.writeFile('../index.html', newhtml, () => {
        console.log("html格式化完毕开始执行合并操作")
            // Sync call to exec()
            // var version = exec('node --version', { silent: true }).output;
            // Async call to exec()
        exec('gulp', function(status, output) {
            console.log('Exit status:', status);
            console.log('Program output:', output);
        });

        setTimeout(() => {
            addCode()
        }, 15000);

    })
})


function addCode() {
    switch (packChoose) {
        case 1: //facebook
            exec("node facebook.js", function(status, output) {
                console.log('Exit status:', status);
                console.log('Program output:', output);
            })
            break;
        case 2: //applovin
            exec("node applovin.js", function(status, output) {
                console.log('Exit status:', status);
                console.log('Program output:', output);
            })
            break;
        case 3: //vungle
            exec("node vungle.js", function(status, output) {
                console.log('Exit status:', status);
                console.log('Program output:', output);
            })
            break;
        case 4: //google
            //     <script type="text/javascript">
            //     function clickAd() {
            //         ExitApi.exit();
            //     }
            // </script>
            let data = fs.readFileSync('./dist/index.html').toString();
            data = data.replace('</head>', '<script type="text/javascript">function clickAd() {ExitApi.exit();}function complete() {console.log("complete")};</script> ' + '\n <script type="text/javascript" >(function(){var a=this||self;var b=function(){this.exit=this.b;this.close=this.close;this.delayCloseButton=this.a};b.prototype.b=function(){window.open("https://displayads-formats.googleusercontent.com/da/b/html5UploadAd.html","_blank")};b.prototype.close=function(){window.console&&window.console.log("Exit API: Close requested.")};b.prototype.a=function(e){e=Math.min(e,5);window.console&&window.console.log("Exit API: Close Button will not appear for "+e+" seconds.")};var c=new b,d=["ExitApi"],f=a;d[0]in f||"undefined"==typeof f.execScript||f.execScript("var "+d[0]);for(var g;d.length&&(g=d.shift());)d.length||void 0===c?f=f[g]&&f[g]!==Object.prototype[g]?f[g]:f[g]={}:f[g]=c;}).call(this);</script> \n</head>')
            data = data.replace('<head>', '<head> \n' + chicun);
            fs.writeFileSync("./dist/index.html", data);
            console.log("谷歌适配完成")
            exec("node google.js", function(status, output) {
                console.log('Exit status:', status);
                console.log('Program output:', output);
            })
            break;

        case 5: //unity
            exec("node unity.js", function(status, output) {
                console.log('Exit status:', status);
                console.log('Program output:', output);
            })
            break;
    }
};