const fs = require('fs/promises');
const path = require('path');

const generateError = (message, status) => {
    const error = new Error(message);
    error.statusCode = status;
    return error;
};

/**
 * If the path doesn't exist, create it
 * @param path - The path to the directory you want to create.
 */
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
