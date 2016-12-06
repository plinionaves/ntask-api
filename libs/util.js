module.exports = {
    catchError: (response, status) => {
        return (error) => {
            response.status(status).json({
                message: error.message || error
            });
        }
    }
};