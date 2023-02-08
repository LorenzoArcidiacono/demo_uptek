const idle_timeout = 120000;

// SLIDER
console.log('timeouts: '+idle_timeout)
let slider_timeout = setTimeout(() => window.location = './slider.html', idle_timeout)

$(document).on('click','body *',function(){
    console.log('restart slider')
    clearTimeout(slider_timeout)
    slider_timeout = setTimeout(() => window.location = './slider.html', idle_timeout)
});
