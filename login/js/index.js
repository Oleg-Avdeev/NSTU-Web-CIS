$(window).resize(function() {
    reload();
});

window.onload = function(){
    reload();
}

reload = function(){
width = $(document).width(); // ширина  
height = $(window).height(); // высота  
    $('#p_l').css('left', (width / 4) - (parseInt($('#p_l').css('width'))/2));
    $('#p_r').css('left', (width / 4) - (parseInt($('#p_r').css('width'))/2));
    
    if (height > 600) $('.center_photo').css('height', height);
    else $('.center_photo').css('height', 600);
    
    if (event.clientX > width / 2) {
        $('#img_r').addClass("noblur");
        $('#img_l').removeClass("noblur");
        
        $('#login_2').removeClass("login_2");
        $('#login_1').addClass("login_2");
        
        $("#p_r").addClass("name_p_2");
        $("#p_l").removeClass("name_p_2");
    }
    else {
        $('#img_l').addClass("noblur");
        $('#img_r').removeClass("noblur");
        
        $('#login_1').removeClass("login_2");
        $('#login_2').addClass("login_2");
        
        $("#p_l").addClass('name_p_2');
        $("#p_r").removeClass('name_p_2');
    }
};

$('body').mousemove(function() {
        reload();
});