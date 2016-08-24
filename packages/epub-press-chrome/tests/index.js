const context = require.context('.', true, /.+-test\.(js|jsx)$/);
context.keys().forEach(context);
module.exports = context;
