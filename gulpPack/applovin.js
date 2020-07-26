let fs = require("fs")



fs.readFile("./dist/index.html", (err, data) => {
    let html = data.toString();
    html = html.replace('</head>', '<script type="text/javascript">function clickAd(){mraid.open("https://itunes.apple.com/us/app/slots-classic-vegas-casino/id994102781?mt=8");} function complete(){console.log("结束");}</script></head>')
    fs.writeFile('./dist/index.html', html, () => {
        console.log("AppLovin 打包适配完成")
    })
})