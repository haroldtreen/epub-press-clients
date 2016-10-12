import Promise from 'bluebird';

const Helpers = {};

Helpers.isError = (e) => {
    if (typeof e === 'string') {
        return Promise.reject(new Error(e));
    }
    return Promise.resolve(e);
};

export default Helpers;
