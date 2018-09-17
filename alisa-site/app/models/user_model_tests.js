let UserModel = require('./user_model');


UserModel.getUserLastSmsPass('89639130484').then(resp => {
    console.log(resp);
}).catch(e => {
    console.log(e)
})

