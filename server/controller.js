const fs = require('fs');
const exec = require('child_process').exec;

const controller = {
    
    /**
     * index.html rendering
     */
    index: (req, res) => {
        res.render('index.html');
    },

    /**
     * code compile
     */
    compile: (req, res) => {
        const {language, code} = req.body;

        if (!code) {
            console.log('Nothing code!');
        }

        switch(language) {
            case 'javascript':
                writeFileJS(code);
                execFile(`node ./tmp/code.js`).then((data) => {
                    res.json(data);
                });
                break;
            case 'python':
                writeFilePY(code);
                execFile(`python ./tmp/code.py`).then((data) => {
                    res.json(data);
                });
                break;
        }
    }
};

/**
 * Javascript write file
 * @param {String} code
 */
function writeFileJS(code) {
    try {
        fs.writeFileSync("./tmp/code.js", `console.log((${code})());`); 
        console.log("The javascript file was saved!");
    } catch(err) {
        console.log(err);
    }
}

/**
 * python write file
 * @param {String} code
 */
function writeFilePY(code) {
    try {
        fs.writeFileSync("./tmp/code.py", `${code}`); 
        console.log("The python file was saved!");
    } catch(err) {
        console.log(err);
    }
}

/**
 * execute code file
 * ex) node .js, python .py
 * @param {command}
 */
function execFile(command) {
    const compileStartTime = new Date().getTime();

    return new Promise((resolve, reject) => {
        exec(command, function (error, stdout, stderr) {
            if(error != null) {
                console.log('error : %s', error);
                reject();
            }

            const compileEndTime = new Date().getTime();
            const compileTime = compileEndTime - compileStartTime;

            console.log('stdout : %s', stdout);
            console.log('stderr : %s', stderr);
            console.log('compile time: ' + compileTime);

            resolve({stdout: stdout, stderr: stderr, time: compileTime});
        });
    });
}

module.exports = controller;