let type = ''

// SHOW FIRST MODAL
$('.flex-container button').click(() => {
    $('#position-modal').removeClass('hidden');
})

$('#scan-card').click(() => type = 'card')
$('#scan-passport').click(() => type = 'passport')

// SCAN
$('#position-modal button').click(async () => {

    var code = '';
    var result;

    //if id-card read barcode
    if (type == 'card') {
        console.log(`scan card`);

        await $.get("../core/operation.php", {
            op: "barcode"
        }, ).done((message) => {

            message = JSON.parse(message);
            //error while reading
            if (message['result'] == false) {
                console.log(message['data']);
            } else {
                code = message['data']
                console.log(`code:${code}`);
            }
        })
    }
    
    // scan user information
    console.log(`scan user info`);
    result = await readUserInfo();
    result = JSON.parse(result);
    
    if(result['result'] == false){
        displayReadValues('','','',code)
    }else{
        result = result['data']
        displayReadValues(result[0] + ' ' + result[1],result[3],result[2],code)
    }
    
    $('#position-modal').addClass('hidden');
    $('#response-modal').removeClass('hidden');
})

readUserInfo = function(){
    // request to read user information
    return $.get("../core/operation.php", {
        op: "info",
        type: type
    })
}

displayReadValues = function (name, nation, sex, code) {
    $('#name-field input').val(name);
    $('#nation-field input').val(nation);
    $('#sex-field input').val(sex);
    $('#cf-field input').val(code);
}


// SAVE DATA
$('#response-modal button').click(() => {
    // $('#response-modal').addClass('hidden');

    //check if every input has been filled
    var error = false;
    var identifiers = ['#name-input','#nation-input','#sex-input','#code-input']

    identifiers.forEach(id => {
        if($(id).val() == ''){
            $(id).css('border', '1px solid red');
            error = true;
        }else{
            $(id).css('border', '1px solid black');
        }
    });

    if(error){
        return;
    }

    // save the information on the local storage
    localStorage.setItem('name', $('#name-input').val());
    localStorage.setItem('nation', $('#nation-input').val())
    localStorage.setItem('sex', $('#sex-input').val())
    localStorage.setItem('code', $('#code-input').val())

    saveData().then((message) => {
        message = JSON.parse(message);
        if (message['result'] == false) {
            console.log(`ERRORE`);
            //TODO show error message
        } else {
            window.location = './picture.html';
        }
    });
})

saveData = function () {
    console.log(`salvo i dati`);
    return $.post("../core/operation.php", {
        op: "saveData",
        name: localStorage.getItem('name'),
        nation: localStorage.getItem('nation'),
        sex: localStorage.getItem('sex'),
        code: localStorage.getItem('code'),
    }).done((message) => {
        console.log(`message: ${message}`);
        // window.location = 'index.html';
    })
}