// BUTTON LINKS

$('.page-9 .back-button').click(() => {
    history.back();
})

$('.page-9 .next-button').click(() => {
    swapPages('.page-9', '.page-10');
    setTimeout(() => {
        startLoader()
    }, 1000)
})

$('.page-11 .home-button').click(() => {
    window.location = 'index.html'
})

// loader animation
startLoader = function () {
    let animation_time = 2000;
    let percentage = 0;
    $('.loader .front').css('width', '0px');
    $('.loader .front').css('animation-name', 'loader');
    $('.loader .front').css('animation-duration', animation_time + 'ms');

    let interval = setInterval(() => {
        percentage += 1
        $('.loader .percentage').text(percentage + '%');
        if (percentage >= 100) {
            clearInterval(interval)
            setTimeout(() => {
                swapPages('.page-10', '.page-11');
            },400)
        }
    }, animation_time / 100)
}

// room number

// ROom number from local storage
// $('.room-number').text(Math.floor(Math.random()*300).toString().padStart(3,'0'))
