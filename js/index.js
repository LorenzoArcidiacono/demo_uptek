


// BUTTONS LINK
$('#page-1-btn').click(() => {
    swapPages('.page-1','.page-2')
    clearTimeout(slider_timeout)
})

$('#page-2-btn').click(() => {
    window.location = 'document.html';
})

// SELECT ANIMATION & FUNCTION
let open = false;
let duration = 500;
let lastSelected = 'IT';
$('.select-button').on('click', () => {
    
    if (!open) {
        $('.select-dropdown').animate({
            height: '320px',
        }, duration)
        $('.select-dropdown p:not(.selected)').show(duration)
        $('.select-button span').text('expand_less')
        open = true;
    } else {
        
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