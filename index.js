/*

NodeJS
RESTful API
WebScraper


## Import Terminology ##

Express — Framework that helps you take care of routing and server 
side mumbo-jumbo, and is also capable of templating.

Request — This package helps us make HTTP requests and calls.

Cheerio — This is jQuery on the Server Side. Scrapes the DOM.

*/

const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

function addStr(str, index, stringToAdd) {
  return str.substring(0, index) + stringToAdd + str.substring(index, str.length);
}

function modURL(str, index) {
  let result = "";
  let cur = str.length - 1;
  while(str.charAt(cur) != '-') {
    cur = cur - 1;
  }
  cur = cur + 1;
  result = addStr(str, cur, "f-");
  
  cur = result.length - 1;
  while(result.charAt(cur) != '.') {
    cur = cur - 1;
  }
  result = addStr(result, cur, "-0-p" + index);

  return result;
}

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

app.get('/', function(req, res) {
  
    let url = "https://www.gsmarena.com/";
    
    // The structure of the request call
    // The first parameter is our URL
    // The callback function takes 3 parameters, an error, response status code and the html
    request(url, function(error, response, html) {
  
      // First we'll check to make sure no errors occurred when making the request
      if (!error) {
  
        // Next, we'll utilize the cheerio library on the returned html which will essentially give us jQuery functionality
        var $ = cheerio.load(html);
  
        // Finally, we'll define the variable we're going to capture
        // We'll be using Cheerio's function to single out the necessary information
        // using DOM selectors which are normally found in CSS.

        //var prediction = $('body > div#wrapper.l-container > div#outer.row > div#body > aside.sidebar.col.left > div.brandmenu-v2.light.l-box.clearfix > ul').text();
        
        $('body > div#wrapper.l-container > div#outer.row > div#body > aside.sidebar.col.left > div.brandmenu-v2.light.l-box.clearfix > ul > li > a').each(function(i, link){
          //console.log($(link).text() + ':\n  ' + $(link).attr('href'));
          //console.log(url + $(link).attr('href'))
          url2 = url + $(link).attr('href')
          resetURL2 = url2
          // https://www.gsmarena.com/samsung-phones-9.php

          // Page Loop
          for(let i = 0; i < 1; i++) {
            url2 = resetURL2;
            url2 = modURL(url2, i);
            await sleep(2000); // SLEEP 2 SECONDS
            console.log(url2);
            request(url2, function(error, response, html) {
              if(!error) {
                var $$ = cheerio.load(html);
                
                fs = require('fs');

                
                $$('body > div#wrapper.l-container > div#outer.row > div#body.clearfix > div.main.right.main-maker.l-box.col > div#review-body.section-body > div.makers > ul > li > a').each(function(j, link2){
                  //console.log(url + $$(link2).attr('href'))
                  fs.appendFile('helloworld.txt', url + $$(link2).attr('href') + "\n", function (err) {
                    if (err) return console.log(err);
                    //console.log('Hello World > helloworld.txt');
                  });
                });

              }

            });
          }


        });
        
        

        //console.log(prediction)
        /*
        // And now, the JSON format we are going to expose
        var json = {
          date: date,
          sign: sign,
          prediction: prediction
        };
  
        // Send the JSON as a response to the client
        res.send(json);
        */
      }
  
    });
  
  });
  
  app.listen(process.env.PORT || 5000);
  module.exports = app;