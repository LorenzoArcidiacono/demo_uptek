swapPages = function(from,to,time=400){
    console.log('swap');
    let animation_time = time;
    $(to).css('width', '0');
    $(from).animate({
        width: '0',
    }, animation_time);
    setTimeout(() => {
        $(from).addClass('hidden');
        $(to).removeClass('hidden');
        $(to).animate({
            width: '1080px',
        }, animation_time);
    }, animation_time-100)
}