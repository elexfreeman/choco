let express = require('express');
let router = express.Router();
let formidable = require('formidable');
let fs = require('fs');
let os = require('os');
let crypto = require('crypto');
let base64url = require('base64url');

/*генерирует рандомную строку*/
function randomStringAsBase64Url(size) {
    return base64url(crypto.randomBytes(size));
}


function strToLat(str) {
    str = str.toString();
    str = str.toLowerCase(); // все в нижний регистр
    let cyr2latChars = new Array(
        ['а', 'a'], ['б', 'b'], ['в', 'v'], ['г', 'g'],
        ['д', 'd'], ['е', 'e'], ['ё', 'yo'], ['ж', 'zh'], ['з', 'z'],
        ['и', 'i'], ['й', 'y'], ['к', 'k'], ['л', 'l'],
        ['м', 'm'], ['н', 'n'], ['о', 'o'], ['п', 'p'], ['р', 'r'],
        ['с', 's'], ['т', 't'], ['у', 'u'], ['ф', 'f'],
        ['х', 'h'], ['ц', 'c'], ['ч', 'ch'], ['ш', 'sh'], ['щ', 'shch'],
        ['ъ', ''], ['ы', 'y'], ['ь', ''], ['э', 'e'], ['ю', 'yu'], ['я', 'ya'],

        ['А', 'A'], ['Б', 'B'], ['В', 'V'], ['Г', 'G'],
        ['Д', 'D'], ['Е', 'E'], ['Ё', 'YO'], ['Ж', 'ZH'], ['З', 'Z'],
        ['И', 'I'], ['Й', 'Y'], ['К', 'K'], ['Л', 'L'],
        ['М', 'M'], ['Н', 'N'], ['О', 'O'], ['П', 'P'], ['Р', 'R'],
        ['С', 'S'], ['Т', 'T'], ['У', 'U'], ['Ф', 'F'],
        ['Х', 'H'], ['Ц', 'C'], ['Ч', 'CH'], ['Ш', 'SH'], ['Щ', 'SHCH'],
        ['Ъ', ''], ['Ы', 'Y'],
        ['Ь', ''],
        ['Э', 'E'],
        ['Ю', 'YU'],
        ['Я', 'YA'],

        ['a', 'a'], ['b', 'b'], ['c', 'c'], ['d', 'd'], ['e', 'e'],
        ['f', 'f'], ['g', 'g'], ['h', 'h'], ['i', 'i'], ['j', 'j'],
        ['k', 'k'], ['l', 'l'], ['m', 'm'], ['n', 'n'], ['o', 'o'],
        ['p', 'p'], ['q', 'q'], ['r', 'r'], ['s', 's'], ['t', 't'],
        ['u', 'u'], ['v', 'v'], ['w', 'w'], ['x', 'x'], ['y', 'y'],
        ['z', 'z'],

        ['A', 'A'], ['B', 'B'], ['C', 'C'], ['D', 'D'], ['E', 'E'],
        ['F', 'F'], ['G', 'G'], ['H', 'H'], ['I', 'I'], ['J', 'J'], ['K', 'K'],
        ['L', 'L'], ['M', 'M'], ['N', 'N'], ['O', 'O'], ['P', 'P'],
        ['Q', 'Q'], ['R', 'R'], ['S', 'S'], ['T', 'T'], ['U', 'U'], ['V', 'V'],
        ['W', 'W'], ['X', 'X'], ['Y', 'Y'], ['Z', 'Z'],

        [' ', '_'], ['0', '0'], ['1', '1'], ['2', '2'], ['3', '3'],
        ['4', '4'], ['5', '5'], ['6', '6'], ['7', '7'], ['8', '8'], ['9', '9'],
        ['-', '-'], ['.', '.']
    );

    let newStr = '';
    let ch = '';
    for (let i = 0; i < str.length; i++) {

        ch = str[i];
        let newCh = '';

        for (let j = 0; j < cyr2latChars.length; j++) {
            if (ch == cyr2latChars[j][0]) {
                newCh = cyr2latChars[j][1];

            }
        }
        // Если найдено совпадение, то добавляется соответствие, если нет - пустая строка
        newStr += newCh;

    }
    // Удаляем повторяющие знаки - Именно на них заменяются пробелы.
    // Так же удаляем символы перевода строки, но это наверное уже лишнее
    return newStr.replace(/[_]{2,}/gim, '_').replace(/\n/gim, '');
}

function uploadImg(req) {
    return new Promise(function (resolve, reject) {
        let files = [];
        let form = new formidable.IncomingForm();
        form.uploadDir = os.tmpdir();
        try {
           // throw 'myException'; // создание ошибки
            form
                .on('field', function (field, value) {
                    fields.push([field, value]);
                })
                .on('file', function (field, file) {
                    files.push([field, file]);
                })
                .on('end', function () {
                    if (files.length > 0) {
                        let oldpath = files[0][1].path;
                        let new_name = randomStringAsBase64Url(5) + strToLat(files[0][1].name);
                        let newpath = __dirname + '/../public/images/uploadimg/' + new_name;
                        fs.rename(oldpath, newpath, function (err) {
                            if (err) reject(err);
                            resolve('/images/uploadimg/' + new_name);
                        });
                    } else {
                        reject(false);
                    }
                });
            form.parse(req);
        }
        catch (e) {
            // инструкции для работы с ошибками
            reject(e); // передает объект ошибки для управления им
        }

    });
}


router.post('/', function (req, res, next) {
    uploadImg(req).then((val) => {
        res.json({
            path: val
        });
    }).catch(e => {
        res.json({
            path: ''
        });
    });
});


if (module.parent) {
    module.exports = router;
} else {

    console.log(randomStringAsBase64Url(5) + strToLat('db.js'));

}

