// PAGE FLOW
$('.p-1').click(() => {
    console.log('click')
    window.location = '../app/document.html?page=3';
})
$('.p-2').click(() => {
    console.log('click')
    window.location = '../app/document.html?page=5';
})

$('.p-3').click(() => {
    console.log('click')
    window.location = '../app/picture.html?page=6';
})


$('.p-4').click(() => {
    console.log('click')
    window.location = '../app/picture.html?page=7';
})

$('.p-5').click(() => {
    console.log('click')
    window.location = '../app/picture.html?page=8';
})

// Set value to display
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
    // clean up user's information
    localStorage.removeItem('name');
    localStorage.removeItem('date');
    localStorage.removeItem('room');
    localStorage.removeItem('code');
    localStorage.removeItem('nation');
    localStorage.removeItem('sex');

    window.location = 'index.html'
})

// printer's loader animation
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
            }, 400)
        }
    }, animation_time / 100)
}

// prints the receipt
printInformation = function () {
    console.log('Start Print')
    $.post("../core/operation.php", {
        op: "print",
        name: localStorage.getItem('name'),
        room: localStorage.getItem('room'),
    }).done((message) => {
        message = JSON.parse(message);
        if (message['result'] == false) {
            console.log(`${message['data']}`);
            //TODO show error message
        }
    })
}