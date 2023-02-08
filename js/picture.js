
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get('page')
console.log(page);



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
    swapPages('.page-7','.page-6');
})

$('.p-3v2').click(() => {
    console.log('click')
    swapPages('.page-8','.page-6');
})

$('.p-4').click(() => {
    console.log('click')
    startWebcam()
    swapPages('.page-8','.page-7');
})

$('.page-6 .pagination .back-button').click(() => {
    window.location = '../app/document.html?page=5';
})



// Initial information displayed
$('#name').val(localStorage.getItem('name'))
$('#nation').val(localStorage.getItem('nation'))
$('#sex').val(localStorage.getItem('sex'))
$('#date').val(localStorage.getItem('date'))
$('#code').val(localStorage.getItem('code'))

// CHECK FORM
$(document).ready(()=>{
    // console.log('sono qui');
    if(checkValues()){
        $('.page-6 .done-button').prop('disabled','')
    }else{
        $('.page-6 .done-button').prop('disabled','true')
    }
})

$('.page-6 input').on('input', ()=>{
    // console.log('change');
    if(checkValues()){
        $('.page-6 .done-button').prop('disabled','')
    }else{
        $('.page-6 .done-button').prop('disabled','true')
    }
})

// Check if every value is set
checkValues = function(){
    var check = true;
    var identifiers = ['name', 'sex','date','nation', 'code']

    // highlights every value unset
    identifiers.forEach(id => {
        // console.log($('#'+id).val())
        if($('#'+id).val() == ''){
            check = false;
            $('#'+id+'+ span').css('color','red');
        }else{
            $('#'+id+'+ span').css('color','#414141');
        }
    });
    // console.log('check:'+check)
    return check;
}


// BUTTON LINKS
$('.pagination .back-button').click(() => window.location = './document.html')

// Start webcam button
$('.page-6 .done-button').click(async () => {
    var result = await startWebcam()
    if(result == false){
        $('.page-6 .photo-button img').attr('src','../assets/icons/camera_error.svg').attr('disabled','disabled')
        $('.page-6 .photo-button').attr('disabled','disabled')
        $('.page-8 .done-button').click()
    }else{
        swapPages('.page-6', '.page-7')
    }
})

// Stop webcam
$('.page-7 .back-button').click(() => {
    $('.page-6 .first-header').removeClass('hidden')
    $('.page-6 .second-header').addClass('hidden')
    swapPages('.page-7', '.page-6')
    stopWebcam()
})

// modal
$('.page-7 .help-button').click(() => {
    $('.page-7 .modal').removeClass('hidden')
})

$('.page-7 .close-modal').click(() => {
    $('.page-7 .modal').addClass('hidden')
})

// Snap photo
$('.page-7 .snap-photo').click(() => {
    snapPhoto();
    stopWebcam();
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
    // $('.page-6 .first-header').addClass('hidden')
    // $('.page-6 .second-header').removeClass('hidden')
    // showPicture();
    // swapPages('.page-8', '.page-6')

    // get a random padded room number 
    var room = Math.floor(Math.random() * 300).toString().padStart(3, '0')


    localStorage.setItem('name', $('#name').val());
    localStorage.setItem('sex', $('#sex').val());
    localStorage.setItem('nation', $('#nation').val());
    localStorage.setItem('date', $('#date').val());
    localStorage.setItem('code', $('#code').val());
    localStorage.setItem('room', room);

    saveData();
    if(picture == undefined){
        window.location = 'final.html'
    }else{
        savePhoto().then(()=>{
            window.location = 'final.html'
        });
    }
})

$('.page-6 .photo-button').click(() => {
    startWebcam()
    swapPages('.page-6', '.page-7')
})

$('.page-6 .next-button').click(() => {
    //TODO save all info & photo
    if(!checkValues()){
        return;
    }

    // get a random padded room number 
    // var room = Math.floor(Math.random() * 300).toString().padStart(3, '0')

    // // Save everything
    // // FIXME forse basta salvare il numero della stanza perchè il resto è già salvato
    // localStorage.setItem('name', $('#name').text());
    // localStorage.setItem('sex', $('#sex').text());
    // localStorage.setItem('nation', $('#nation').text());
    // localStorage.setItem('date', $('#date').text());
    // localStorage.setItem('code', $('#code').text());
    // localStorage.setItem('room', room);

    // saveData();
    // if(picture == undefined){
    //     console.log('undefined')
    //     window.location = 'final.html'
    // }else{
    //     savePhoto().then(()=>{
    //         window.location = 'final.html'
    //     });
    // }

})


// UTILITY FUNCTIONS
showPicture = function () {
    if(picture == undefined) {
        console.log('error: picture undefined')
    }else{
        $('.page-6 #picture').attr('src', picture)
    }
}

let lastId = '';
displayModal = function (identifier) {
    console.log(`click`);
    lastId = identifier;
    $('.page-6 .modal #text').val($(identifier).text())
    $('.page-6 .modal').removeClass('hidden')
}

// 
saveValue = function () {
    $(lastId).text($('.modal #text').val())
    $('.modal').addClass('hidden')
    localStorage.setItem(lastId, $('#'+lastId).text());
}



// WEBCAM
const webcamElement = document.getElementById('webcam');
const canvasElement = document.getElementById('canvas');
const webcam = new Webcam(webcamElement, 'user', canvasElement);
let picture;


startWebcam = async function () {
    console.log(`start`);
    return webcam.start()
        .then(result => {
            console.log("webcam started");
        })
        .catch(err => {
            console.log(err);
            return false;
        });
}

stopWebcam = function () {
    console.log(`webcam stop`);
    webcam.stop();
}

snapPhoto = function () {
    picture = webcam.snap();
    localStorage.setItem('photo', picture)
    
}


// SAVE DATA
savePhoto = function () {
    
    // set the photo's right dimension 
    // var img = new Image();
    // img.src = picture;
    // var ctx = canvas.getContext('2d');
    // canvas.width = 1024;
    // canvas.height = 768;

    // ctx.drawImage(img, 0, 0, 1024, 768);
    // picture =  canvas.toDataURL();
    // $('body').prepend(img);
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
        }
    })
}

// Write user's data to the local .csv
saveData = function () {

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


// PAGE FLOW
if(page == 6){
    $('.page-6').removeClass('hidden');
    $('.page-7').addClass('hidden');
    $('.page-8').addClass('hidden');
}else if(page ==  7){
    $('.page-7').removeClass('hidden');
    $('.page-6').addClass('hidden');
    $('.page-8').addClass('hidden');
    startWebcam();
}else if(page ==  8){
    
    picture = localStorage.getItem('photo');
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var img = new Image;
    img.onload = function(){
        ctx.scale(0.4,0.3)
        ctx.translate(0, -100);
        ctx.drawImage(img, 0, 0, 800, 600);
    }
    img.src = picture;

    $('.page-8').removeClass('hidden');
    $('.page-6').addClass('hidden');
    $('.page-7').addClass('hidden');
}