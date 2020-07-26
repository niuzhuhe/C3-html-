let fs = require("fs")

let filenames = fs.readdirSync("./dist");
// for (let i in filenames) {
//     if (filenames[i].indexOf("index.html") != -1) {
//         console.log(filenames[i]);
let data = fs.readFileSync('./dist/index.html').toString();
data = tihuan('splash-images/splash-website-128.png', "", data);
data = tihuan('splash-images/splash-website-256.png', "", data);
data = tihuan('splash-images/splash-website-512.png', "", data);
data = tihuan('splash-images/splash-logo.svg', "", data);
data = tihuan('splash-images/splash-poweredby-512.png', "", data);
data = tihuan('splash-images/splash-poweredby-256.png', "", data);
data = tihuan('splash-images/splash-poweredby-128.png', "", data);
fs.writeFileSync("./dist/index.html", data)
    //     }
    // }

function tihuan(old, newone, data) {
    if (data.indexOf(old) != -1) {
        data = data.replace(old, newone)
        tihuan(old, newone, data)
    }
    return data
}

// splash-images