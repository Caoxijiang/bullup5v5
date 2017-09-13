
$().ready(function(){
    $('#router_chat').on('click', function(e){
      
        e.preventDefault();
        bullup.loadTemplateIntoTarget('chatroom.html', {}, 'main-view');
        // $.getScript('/js/playly.js');
      
        
	    });
        

	
    });
   

    