
let idle_timeout = 60000;

// start slider after idle_timeout milliseconds
let slider_timeout = setTimeout(() => window.location = './slider.html', idle_timeout)


// BUTTONS LINK
$('#page-1-btn').click(() => {
    swapPages('.page-1','.page-2')
    clearTimeout(slider_timeout)
    setTimeout(() => {
        swapPages('.page-2','.page-1')
        slider_timeout = setTimeout(() => window.location = './slider.html', idle_timeout)

    },idle_timeout)
})

$('#page-2-btn').click(() => {
    window.location = 'document.html';
})

// SELECT ANIMATION & FUNCTION
let open = false;
let duration = 500;
let lastSelected = 'IT';
$('.select-button').on('click', () => {
    //delete timeout
    clearTimeout(slider_timeout)
    
    if (!open) {
        $('.select-dropdown').animate({
            height: '320px',
        }, duration)
        $('.select-dropdown p:not(.selected)').show(duration)
        $('.select-button span').text('expand_less')
        open = true;
    } else {
        // Restart timeout
        slider_timeout = setTimeout(() => window.location = './slider.html', idle_timeout)
        
        $('.select-dropdown').animate({
            height: '0px',
        }, duration)
        $('.select-dropdown p:not(.selected)').hide(duration)
        $('.select-button span').text('expand_more')
        open = false;
    }
})

swapTo = function (id) {

    $('.select-button .selected').removeClass('selected');
    $(`.select-button #${id}`).addClass('selected');

    $('.select-dropdown .selected').removeClass('selected');
    $(`.select-dropdown #d-${id}`).addClass('selected');
    $(`.select-dropdown #d-${id}`).hide();

    $('.select-dropdown p:not(.selected)').show(duration)
}