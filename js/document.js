let type = ''

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const page = urlParams.get('page')
console.log(page);



// PAGE FLOW
// $('.p-1').click(() => {
//     console.log('click')
//     swapPages('.page-5','.page-3');
//     setTimeout(()=>{
//         $('#barcode-scan-image').removeClass("card");
//         $('#barcode-scan-image').removeClass("passport");
//     },600)
// })



// BUTTONS LINK
$('.pagination .back-button').click(() => {
    window.location = '../app/index.html';
})

$('#scan-card').click(() => {
    type = 'card';
    localStorage.setItem('type', type);
    $('#barcode-scan-image').addClass("card");
    scanAndSave();
    swapPages('.page-3', '.page-5');
    $('#barcode-scan-image').addClass("card");
})
$('#scan-passport').click(() => {
    type = 'passport';
    localStorage.setItem('type', type);
    $('#barcode-scan-image').addClass("passport");
    scanAndSave();
    swapPages('.page-3', '.page-5');
})


// SCANNER

scanAndSave = function () {
    startScan().then((message) => {
        // console.log(`message: ${JSON.stringify(message)}`);

        // from YYMMDD to DD.MM.YY
        let date = '';
        if (message['date'] != undefined && message['date'] != '') {
            date = message['date'].match(/.{1,2}/g) ?? [];
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
}


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

// PAGE FLOW
if(page == 3){
    $('.page-5').addClass('hidden');
    $('.page-3').removeClass('hidden');
}else if(page == 5){
    $('.page-3').addClass('hidden');
    type = localStorage.getItem('type');
    $('#barcode-scan-image').removeClass('card');
    $('#barcode-scan-image').removeClass('passport');
    $('#barcode-scan-image').addClass(type);
    scanAndSave();
    $('.page-5').removeClass('hidden');
}
