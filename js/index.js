$('.main-container').css('background-image', 'url("../assets/bkg-hotel.png")')

let idle_timeout = 5000;
let animation_delay = 1000;

// start slider after 5s
let timeout = setTimeout(() => window.location = '../slider/slider.html', idle_timeout)

// ANIMATION MENU
$('.circle-btn').click(() => {
    // delete slide timeout and set a new timeout if nothing happens
    clearTimeout(timeout)
    setTimeout(() => window.location.reload(), idle_timeout)
    $('.sliding-menu').animate({
        height: '100%',
        borderBottomLeftRadius: '0px',
        borderBottomRightRadius: '0px'
    }, animation_delay, () => {
        $('img').fadeIn('fast')
        $('h1').fadeIn('fast')
        $('ul').fadeIn('fast')
    })
    $('.circle-btn').animate({
        width: '300px',
        height: '100px',
    }, animation_delay, () => {
        $(".circle-btn").text('check-in').append('<span class="material-symbols-outlined btn-icon">chevron_right</span> ').attr('onclick', "window.location='./document.html'")
    })
})