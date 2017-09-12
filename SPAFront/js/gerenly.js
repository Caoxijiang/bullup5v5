
$().ready(function(){
    $('#router_index').on('click', function(e){
        e.preventDefault();
        if(!userInfo){
            alert('请登录后查看');
        }else{
            douniu.loadTemplateIntoTarget('swig_index.html', {}, 'main-view');
            $.getScript('/js/zymly.js');
        }
	    });
    });
   

    
  
    
    