
$().ready(function(){
    $('#router_index').on('click', function(e){
        e.preventDefault();
        bullup.loadTemplateIntoTarget('swig_index.html', {}, 'main-view');
        //动态加载个人中心路由js
        $.getScript('/js/personalcenterouting.js');
      
        
	    });
        

	
    });
   

    
  
     
    