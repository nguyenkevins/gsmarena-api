const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

app.get('/', function(req, res) {
  


    let url = "https://www.gsmarena.com/samsung_galaxy_s21_ultra_5g-10596.php";
    var label = new Array;
    var data = new Array;
    request(url, function(error, response, html) {
        if (!error) {
            var $$$ = cheerio.load(html);
            
            $$$('body > div#wrapper.l-container > div#outer.row > div#body > div.main.main-review.right.l-box.col > div#specs-list > table > tbody > tr > td.ttl').each(function(k, link3){
                phrase = String($$$(link3).text())
                label.push(phrase);
            });

            $$$('body > div#wrapper.l-container > div#outer.row > div#body > div.main.main-review.right.l-box.col > div#specs-list > table > tbody > tr > td.nfo').each(function(k, link3){
                phrase = String($$$(link3).text())
                data.push(phrase);
            });


        }
        let x = 2;
        console.log(label[x])
        console.log(data[x])
    });
    







    

});

app.listen(process.env.PORT || 5000);
module.exports = app;