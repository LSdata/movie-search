var path = require('path');
const http = require('http');

/*
  connecting to the OMDb API from the server-side of the app. 
  
  more info about the API at https://www.omdbapi.com/
 */

module.exports = {

  getMovieInfo: function(searchQuery, callback){
    
    //check search query no empty
    if(searchQuery==null || searchQuery=="' '" || searchQuery=="" ){
      console.log("No search query entered");
    }
    
    //call OMBb API
    console.log("**********");
    console.log("SearchQuery: "+searchQuery);
    var url = "http://www.omdbapi.com/?s="+searchQuery;

    http.get(url, function(response) {
      var data ='';
      
      response.on('data', function(d) {
        data += d;
      });

      response.on('end', function() {
        console.log(data);
        return callback(data);
      });
    }).on('error', function(e) {
      console.log("Got error: " + e.message);
    });
  }
};


