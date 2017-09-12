$('#router_rank').on('click', function(e){
    e.preventDefault();
    if(!userInfo){
        alert('请登录后查看');
    }else{
        socket.emit('rankRequest');
    }
});

