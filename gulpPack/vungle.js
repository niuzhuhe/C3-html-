let fs = require("fs")



fs.readFile("./dist/index.html", (err, data) => {
    let html = data.toString();
    html = html.replace("location.reload", "location.relaad")
    html = html.replace("location.reload", "location.relaad")
    html = html.replace('</head>', '<script type="text/javascript">function clickAd(){parent.postMessage("download","*")};function complete(){parent.postMessage("complete","*")}</script></head>')
    fs.writeFile('./dist/ad.html', html, () => {
        console.log("vungle 打包适配完成")
    })
})