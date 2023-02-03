// BUTTON LINKS
$('.pagination .back-button').click(()=> history.back())


// WEBCAM

const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const snapSoundElement = document.getElementById('snapSound');
const webcam = new Webcam(webcamElement, 'user', canvasElement);
let picture;

downloadImage = function (url, name) {
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.click();
}

startWebcam = function () {
    console.log(`start`);
    webcam.start()
        .then(result => {
            console.log("webcam started");
        })
        .catch(err => {
            console.log(err);
        });

    $('#start-btn').hide();
    $('#save-btn').hide();
    $('#stop-btn').show();
    $('#snap-btn').show();
    $('#canvas').hide();
    $('#webcam').show();
}

snapPhoto = function () {
    picture = webcam.snap();
    $('#start-btn').show();
    $('#stop-btn').hide();
    $('#snap-btn').hide();
    $('#save-btn').show();
    $('#webcam').hide();
    $('#canvas').show();

}

savePhoto = function () {
    // console.log(picture);
    // downloadImage(picture, './picture/img1.png')

    $.post("../core/operation.php", {
        op: "saveImage",
        image: picture,
        name: localStorage.getItem('name')
    }).done((message) => {
        message = JSON.parse(message);
        if (message['result'] == false) {
            console.log('Error: '+ message['data']);
            //TODO show error message
        } else {
            console.log(`Immagine salvata`);
            // window.location = 'index.html';
        }
    })
}

stopWebcam = function () {
    webcam.stop();
    $('#start-btn').show();
    $('#stop-btn').hide();
    $('#snap-btn').hide();
    $('#save-btn').hide();
    $('#webcam').hide();
    $('#canvas').hide();
}

printInformation = function () {
    $.post("../core/operation.php", {
        op: "print",
        name: localStorage.getItem('name'),
        nation: localStorage.getItem('nation'),
        sex: localStorage.getItem('sex'),
        code: localStorage.getItem('code'),
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