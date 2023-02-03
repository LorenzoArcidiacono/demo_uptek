$('#name').text(localStorage.getItem('name'))
$('#nation').text(localStorage.getItem('nation'))
$('#sex').text(localStorage.getItem('sex'))
$('#date').text(localStorage.getItem('date'))
$('#code').text(localStorage.getItem('code'))


// BUTTON LINKS
$('.pagination .back-button').click(() => history.back())

$('.circle-button-photo').click(() => {
    startWebcam()
    swapPages('.page-6', '.page-7')
})

$('.page-7 .back-button').click(() => {
    $('.page-6 .first-header').removeClass('hidden')
    $('.page-6 .second-header').addClass('hidden')
    swapPages('.page-7', '.page-6')
    stopWebcam()
})

$('.page-7 .help-button').click(() => {
    $('.page-7 .modal').removeClass('hidden')
})

$('.page-7 .close-modal').click(() => {
    $('.page-7 .modal').addClass('hidden')
})

$('.page-7 .snap-photo').click(() => {
    snapPhoto();
    stopWebcam();
    // $('.page-8')
    swapPages('.page-7', '.page-8')
})

$('.page-8 .back-button').click(() => {
    swapPages('.page-8', '.page-6')
    stopWebcam()
})

$('.page-8 .redo-button').click(() => {
    startWebcam()
    swapPages('.page-8', '.page-7')
})

$('.page-8 .done-button').click(() => {
    $('.page-6 .first-header').addClass('hidden')
    $('.page-6 .second-header').removeClass('hidden')
    showPicture();

    swapPages('.page-8', '.page-6')
})

$('.page-6 .photo-button').click(() => {
    startWebcam()
    swapPages('.page-6', '.page-7')
})

$('.page-6 .next-button').click(() => {
    //TODO save all info & photo
    var room = Math.floor(Math.random() * 300).toString().padStart(3, '0')

    localStorage.setItem('name', $('#name').text());
    localStorage.setItem('sex', $('#sex').text());
    localStorage.setItem('nation', $('#nation').text());
    localStorage.setItem('date', $('#date').text());
    localStorage.setItem('code', $('#code').text());
    localStorage.setItem('room', room);

    saveData();
    savePhoto().then(()=>{
        window.location = 'final.html'
    });

})

showPicture = function () {
    $('.page-6 #picture').attr('src', picture)
}

let lastId = '';
displayModal = function (identifier) {
    console.log(`click`);
    lastId = identifier;
    $('.page-6 .modal #text').val($(identifier).text())
    $('.page-6 .modal').removeClass('hidden')
}

saveValue = function () {
    $(lastId).text($('.modal #text').val())
    $('.modal').addClass('hidden')
}

// WEBCAM

const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement);
let picture;

// downloadImage = function (url, name) {
//     const link = document.createElement("a");
//     link.href = url;
//     link.download = name;
//     link.click();
// }

startWebcam = function () {
    console.log(`start`);
    webcam.start()
        .then(result => {
            console.log("webcam started");
        })
        .catch(err => {
            console.log(err);
        });
}

stopWebcam = function () {
    console.log(`webcam stop`);
    webcam.stop();
}

snapPhoto = function () {
    picture = webcam.snap();
    // $('#start-btn').show();
    // $('#stop-btn').hide();
    // $('#snap-btn').hide();
    // $('#save-btn').show();
    // $('#webcam').hide();
    // $('#canvas').show();

}


// SAVE DATA
savePhoto = function () {
    // console.log(picture);
    // downloadImage(picture, './picture/img1.png')
    // picture = $('#picture').attr('src');

    // var img = new Image();
    // img.src = picture;
    // var ctx = canvas.getContext('2d');
    // ctx.translate(640, 0);
    // ctx.scale(-1, 1);
    // ctx.drawImage(img, 0, 0, 640, 480);
    // picture =  canvas.toDataURL();

    return $.post("../core/operation.php", {
        op: "saveImage",
        image: picture,
        name: localStorage.getItem('name')
    }).done((message) => {
        message = JSON.parse(message);
        if (message['result'] == false) {
            console.log('Error: ' + message['data']);
            //TODO show error message
        } else {
            console.log(`Immagine salvata`);
            // window.location = 'index.html';
        }
    })
}

saveData = function () {
    console.log(`salvo i dati`);
    console.log(`room:${localStorage.getItem('room')}`);

    return $.post("../core/operation.php", {
        op: "saveData",
        name: localStorage.getItem('name'),
        nation: localStorage.getItem('nation'),
        sex: localStorage.getItem('sex'),
        date: localStorage.getItem('date'),
        code: localStorage.getItem('code'),
        room: localStorage.getItem('room')
    })
}


