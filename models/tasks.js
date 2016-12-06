module.exports = app => {

    return {
        findAll: (params, callback) => {
            return callback([
                {title: 'Aprender Node.js'},
                {title: 'Aprender Angular2'}
            ]);
        }
    }

}