let type = ''

// SHOW FIRST MODAL
// $('.flex-container button').click(() => {
//     $('#position-modal').removeClass('hidden');
// })


// BUTTONS LINK
$('.pagination .back-button').click(() => {
    console.log(`click`);
    history.back()
})

$('#scan-card').click(() => {
    type = 'card';
    swapPages('.page-3', '.page-4');
})
$('#scan-passport').click(() => {
    type = 'passport';
    swapPages('.page-3', '.page-4');
})

$('.page-4 .back-button').click(() => {
    swapPages('.page-4', '.page-3');
})

$('.page-4 .start-button').click(() => {
    //async
    startScan().then((message) => {
        // console.log(`message: ${JSON.stringify(message)}`);

        // from YYMMDD to DD.MM.YY
        let date = '';
        if (message['date'] != undefined && message['date'] != '') {
            date = message['date'].match(/.{1,2}/g)??[];
            date = date[2] + '.' + date[1] + '.' + date[0]
        }

        // Lower case name and surname
        let name = '';
        if (message['name'] != undefined && message['name'] != '') {
            name = message['name'].split(' ');
            name[0] = name[0][0].toUpperCase() + name[0].slice(1).toLowerCase();
            name[1] = name[1][0].toUpperCase() + name[1].slice(1).toLowerCase();
            name = name.join(' ');
        } 

        // from nation to nationality
        let nation = '';
        if (message['nation'] != undefined && message['nation'] != '') {
            switch (message['nation']) {
                case 'Italy':
                    nation = "Italiana";
                    break;
            }
        }

        let sex = '';
        if (message['sex'] != undefined && message['sex'] != '') {
            switch (message['sex']) {
                case 'M':
                    sex = 'Uomo';
                    break;
                case 'F':
                    sex = 'Donna';
                    break;
            }
        }

        // Save all on local storage 
        localStorage.setItem('name', name);
        localStorage.setItem('sex', sex);
        localStorage.setItem('nation', nation);
        localStorage.setItem('date', date);
        localStorage.setItem('code', message['code']);
        
        window.location = 'picture.html';
    })

    // show scanner loader
    swapPages('.page-4', '.page-5');
})

// modal button
$('.page-4 .help-button').click(() => {
    $('.page-4 .modal').removeClass('hidden');
})

$('.page-4 .close-modal').click(() => {
    $('.page-4 .modal').addClass('hidden');
})

// SCANNER

startScan = async function () {
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

    // scan user MRZ information
    console.log(`scan user info`);
    result = await readUserInfo();
    result = JSON.parse(result);

    var answer = {}
    // Error while reading
    if (result['result'] == false) {
        console.log(result['data']);
        answer = {
            name: '',
            nation: '',
            sex: '',
            date: '',
            code: code
        }
    } else {
        result = result['data']
        answer = {
            name: result[0] + ' ' + result[1],
            nation: result[3],
            sex: result[2],
            date: result[4],
            code: code
        }
    }
    return answer;
}


readUserInfo = function () {
    // request to read user information
    return $.get("../core/operation.php", {
        op: "info",
        type: type
    })
}

// displayReadValues = function (name, nation, sex, code) {
//     $('#name-field input').val(name);
//     $('#nation-field input').val(nation);
//     $('#sex-field input').val(sex);
//     $('#cf-field input').val(code);
// }


// SAVE DATA
// $('#response-modal button').click(() => {
//     // $('#response-modal').addClass('hidden');

//     //check if every input has been filled
//     var error = false;
//     var identifiers = ['#name-input', '#nation-input', '#sex-input', '#code-input']

//     identifiers.forEach(id => {
//         if ($(id).val() == '') {
//             $(id).css('border', '1px solid red');
//             error = true;
//         } else {
//             $(id).css('border', '1px solid black');
//         }
//     });

//     if (error) {
//         return;
//     }

//     // save the information on the local storage
//     localStorage.setItem('name', $('#name-input').val());
//     localStorage.setItem('nation', $('#nation-input').val())
//     localStorage.setItem('sex', $('#sex-input').val())
//     localStorage.setItem('code', $('#code-input').val())

//     saveData().then((message) => {
//         message = JSON.parse(message);
//         if (message['result'] == false) {
//             console.log(`ERRORE`);
//             //TODO show error message
//         } else {
//             window.location = './picture.html';
//         }
//     });
// })

// saveData = function () {
//     console.log(`salvo i dati`);
//     return $.post("../core/operation.php", {
//         op: "saveData",
//         name: localStorage.getItem('name'),
//         nation: localStorage.getItem('nation'),
//         sex: localStorage.getItem('sex'),
//         code: localStorage.getItem('code'),
//     }).done((message) => {
//         console.log(`message: ${message}`);
//         // window.location = 'index.html';
//     })
// }