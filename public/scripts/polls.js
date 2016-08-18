
$(function(){
    
    // cache dom
    var $menuButton = $('.menu');
    var $panel = $('.panel');
    var $options = $('#options');
    var $optBtn = $('form#new-poll .btn-default');
    
    $menuButton.on('click', function(){
        var me = $(this).attr('rel'); 
    
        $panel.removeClass('active');
        $('.'+me).addClass('active');
       
    });
    
    $optBtn.on('click', function() {
       $options.append('<input type="text" placeholder="New Option" name="option">');
    });
    
    
    
});