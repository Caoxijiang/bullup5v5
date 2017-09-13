$().ready(function(){
    //提现路由
    $('.tix').on('click', function(e){
       
        e.preventDefault();
        bullup.loadTemplateIntoTarget('swig_recharge.html', {}, 'main-view');
		
        });
   //资金流动路由
     $('.zjin').on('click', function(e){
        
             e.preventDefault();
             bullup.loadTemplateIntoTarget('swig_basic_table.html', {}, 'main-view');
             
             });
   //更改信息路由
   $('.gengg').on('click', function(e){
                
                     e.preventDefault();
                     bullup.loadTemplateIntoTarget('swig_form_component.html', {}, 'main-view');
                     
             });
    });
   

    
  
    
  