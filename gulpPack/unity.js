let fs = require("fs")



fs.readFile("./dist/index.html", (err, data) => {
    let html = data.toString();
    html = html.replace('</head>', "<script type='text/javascript'>function clickAd(){mraid.open('https://play.google.com/store/apps/details?id=com.me2zen.tripeaks.v4.and&hl=en')}function complete(){console.log('complete')}</script></head>")
    fs.writeFile('./dist/index.html', html, () => {
        console.log("FaceBook 打包适配完成")
    })
})