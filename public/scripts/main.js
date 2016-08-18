
$(function(){
    
    //cache dom
    var navBar = $('.navbar .container');
    var navPills = $('.navbar .container ul li');
    var panel = $('.panels');
    var mainSign = $('.main a');
    var green = $('.green a');
    
    
    var mainButton = 1;
    
    navPills.on('click', function(){
        
        if($(this).attr('rel') === 'home'){
            mainButton = 1;
        }else{
            mainButton = 0;
        }
        if(mainButton){
            mainSign.css({display: 'inline-block'});
        }else {
            mainSign.css({display: 'none'});
        }
        
        change($(this));
    });
    mainSign.on('click', function(){
        green.trigger('click');
    });
    
    function change(me){
        var content = me.attr('rel');    
        
        // show correct panel 
        panel.find('.panel.active').removeClass('active')
        panel.find('#'+content).addClass('active');
        
        
        // highlight clicked button
        navPills.removeClass('active');
        me.addClass('active'); 
    }
    
    
    
    
});
