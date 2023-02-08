$( document ).ready(function() {
    var enter = 1;
    setInterval(()=>{
        if(enter == 1) {
            $('#touch-icon-bkg').removeClass("out");
            $('#touch-icon-bkg').addClass("in");
            enter = 0;
        } else {
            $('#touch-icon-bkg').addClass("out");
            $('#touch-icon-bkg').removeClass("in");
            enter = 1;
        }
    },5000)
});