/* 
 * Description: this file contains the main controller of the web applicaation.
 * The router functions that can be accessed from the Express Router. 
 * The main controller deligates tasks furhter to server side modules.
 */

var path = require('path');
var searchOMDb = require(path.join(__dirname, '/../dataModel/OMDbAPI.js'));

//start with default routing to the startpage
module.exports.index = function(req,res){
    res.render('index');
}

//get movie info in JSON from OMDb 
module.exports.get_OMDb_Movies = function(req,res){
    var searchQuery = req.query.searchQuery;
    
    searchOMDb.getMovieInfo(searchQuery, function(response){
        res.send(response);
    });
}





