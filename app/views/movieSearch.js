/*
    This function is called when the Search-button is clicked. 
    A HTTP get request is then sent to the server-side of this app.
    The response back is the response returned from the OMDb API, in JSON.
    The movies are placed in a table created with the plugin DataTables. 
    More info about DataTables at https://datatables.net/. 
*/
function searching(searchTxt) {

    var infoPlace = document.getElementById("info");
   
    //check if there is a search word entered
    if(!searchTxt){
        infoPlace.innerHTML="No search words entered";
        tablePlace.innerHTML=" ";

    //make HTTP request to the router of this app
    }else{
        var url = "/getMovies?searchQuery="+ searchTxt;

        //the response message in JSON
        $.getJSON(url, function (data) {

            //if error because something went wrong with the api call
            if(data["Error"]=="Something went wrong."){
                infoPlace.innerHTML = "Search failed";
                document.getElementById("table_Div").className = "hide";
            } 
            //if error because of too many results
            if(data["Error"]=="Too many results."){
                infoPlace.innerHTML = "Please specify the title";
                document.getElementById("table_Div").className = "hide";
            }
            //if error because the movie is not found
            if(data["Error"]=="Movie not found!"){
                infoPlace.innerHTML = "No result";
                document.getElementById("table_Div").className = "hide";
            }
            //if a movie is found
            if(data["Search"]){
                
                //if a DataTable already exists from a previous search, delete it (reset a new later)
                 if ( $.fn.dataTable.isDataTable( '#table_id' ) ) {
                    $('#table_id').DataTable().destroy();
                }
                
                document.getElementById("table_Div").className = "display"; //make the table visible
                $('#tbody').empty(); //reset table tbody
                var dataLen = data['Search'].length; //max length is 10 
                infoPlace.innerHTML = " ";

                for(var i=0; i<dataLen; i++){
                    
                    //list movies in a table
                    var movieRow2 = tbody.insertRow(i);
                    var movieID2 = data['Search'][i]['imdbID'];

                    var rowCell0 = movieRow2.insertCell(0);
                    var rowCell1 = movieRow2.insertCell(1);
                    rowCell0.innerHTML =  data["Search"][i]['Title'];
                    rowCell1.innerHTML =  data["Search"][i]['Year'];

                    //pass movieID by value and open the url in a new tab
                    movieRow2.onclick = (function(movieID2){
                         return function(){
                             window.open("http://www.imdb.com/title/"+movieID2, "_blank");
                         }
                      })(movieID2); 

                }

                //initiate the DataTable
                $('#table_id').DataTable( {
                    paging: false, 
                    searching: true, 
                    "info": false
                } );
            }
        }); 
    }
}
