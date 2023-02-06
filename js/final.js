$('.name').text(localStorage.getItem('name'))
$('.room-number').text(localStorage.getItem('room'))


// BUTTON LINKS
$('.page-9 .back-button').click(() => {
    history.back();
})

$('.page-9 .next-button').click(() => {
    swapPages('.page-9', '.page-10');
    setTimeout(() => {
        startLoader()
        printInformation();
    }, 1000)
})

$('.page-11 .home-button').click(() => {
    // clean up
    localStorage.removeItem('name');
    localStorage.removeItem('date');
    localStorage.removeItem('room');
    localStorage.removeItem('code');
    localStorage.removeItem('nation');
    localStorage.removeItem('sex');

    window.location = 'index.html'
})

// loader animation
startLoader = function () {
    let animation_time = 4000;
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


printInformation = function () {
    console.log('Start Print')
    $.post("../core/operation.php", {
        op: "print",
        name: localStorage.getItem('name'),
        room: localStorage.getItem('room'),
    }).done((message) => {
        console.log(`message: ${message}`);
        message = JSON.parse(message);
        if (message['result'] == false) {
            console.log(`${message['data']}`);
            //TODO show error message
        } else {
            // window.location = 'index.html';
        }
    })
}
