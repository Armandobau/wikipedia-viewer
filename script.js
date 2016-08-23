$(document).ready(function(){
    
    var lookFor = "";
    
    $('#what').keypress(function (e) {
        if (e.which == 13) {
          $("#search").click();
          return false; 
        }
    });
    


    $("#search").on("click", function(){
        lookFor= $("#what").val();
        $.ajax({
            url: "http://en.wikipedia.org/w/api.php?format=json&action=query&generator=search&gsrnamespace=0&gsrlimit=10&                       prop=pageimages|extracts&pilimit=max&exintro&explaintext&exsentences=1&exlimit=max&gsrsearch="+lookFor+"&callback=JSON_CALLBACK",
            dataType: 'jsonp',
            success: function(results){
                $("#results").empty();
                $.each(results.query.pages, function( index, value ) {
                    $("#results").append(
                      "<a href='http://en.wikipedia.org/?curid="+ value.pageid +"' target='_blank'>"+
                            "<div class='col-sm-12 box'>"+
                                    "<div><strong>" + value.title + "</strong></div>"+
                                    "<div><p>"+value.extract+"</p></div>"+
                            "</div>"+
                      "</a>"
                    );
                });
            }
        });
    });

});