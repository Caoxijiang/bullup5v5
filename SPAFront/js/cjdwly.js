
$().ready(function(){
    $('#router_chat').on('click', function(e){
       
        e.preventDefault();
        if(!userInfo){
            alert('请登录后查看');
        }else{
            douniu.loadTemplateIntoTarget('swig_playbyplay.html', {}, 'main-view');
            $.getScript('/js/playly.js');
        }
	    });
    });
   

    