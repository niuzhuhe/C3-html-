let fs = require("fs")



fs.readFile("./dist/index.html", (err, data) => {
    let html = data.toString();
    html = html.replace('</head>', '<script type="text/javascript">function clickAd(){FbPlayableAd.onCTAClick();}</script></head>')
    fs.writeFile('./dist/index.html', html, () => {
        console.log("FaceBook 打包适配完成")
    })
})