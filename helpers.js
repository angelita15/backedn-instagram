const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

const createPathIfNotExist = async (path) => {
    try {
        await fs.access(path);
    } catch {
        await fs.mkdir(path);
    }
};

module.exports = {
    generateError,
    createPathIfNotExist,
};
