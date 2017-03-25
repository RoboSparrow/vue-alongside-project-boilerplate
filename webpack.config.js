////
// Loads webpack.config for the different tasks into an array
////

// fetch task configs
const projectTask = require('./webpack.task-project');
const demoTask = require('./webpack.task-demo');

// inject project library in demo
const library = projectTask.output.library;
demoTask.externals = {
    [library]: library
};

// watch modes
projectTask.watch = true;
demoTask.watch = true;

module.exports = [projectTask, demoTask];
