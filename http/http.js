const async = require('async');
// const LogFile = require('./login.js').logger;
const request = require('request');

module.exports.$http = function(type,url,data,headers){
    return new Promise((resolve, reject) =>{
      if(type == 'POST'){
          request({
              url:url,
              method: type,
              headers: headers,
              body: data
          }, function (error, response, body) {
              if(body){
                  resolve(null,body)
              }else{
                  LogFile.info(JSON.stringify(error));
              }
          });
      }else{
          let requerData =  [];
          for(let key in data){
              requerData.push(key+'='+data[key])
          }
          request.get({
                  url:url+'?'+requerData.join("&"),
                  headers: headers
              },function(error, response, body){
                  if(body){
                      resolve(null,body)
                  }else{
                      res.redirect('/users');
                      LogFile.info(JSON.stringify(error));
                  }
              });
      }
    })
}

module.exports.$series = function (rqArr){
    return new Promise(  (resolve, reject) =>{
        async.series(rqArr,
            // optional callback
            function(err, results){
                // results is now equal to ['one', 'two']
                if(results){
                    resolve(results)
                }else{
                    LogFile.info(JSON.stringify(err));
                }
            });
    })
 }

