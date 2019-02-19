const shell = require('shelljs');
const colors = require('colors');

/*
Examples:
remove.js build=false
remove.js deploy=true port=1300
remove.js deploy=t serve=f
 */

try {
    // Throw JavaScript error on shell error
    shell.config.fatal = true;

    // Global object
    const settingVals = {
        n: 5, // Number of deployments to keep at most
        p: '',
    };

    // Object to handle argument paths and logic
    const argOptions = {
        n(arg) {
            if (typeof arg === 'string' && typeof parseInt(arg, 10) == 'number') {
                settingVals.n = parseInt(arg, 10);
            } else {
                shell.echo('--n requires a number\n'.bold.red);
                shell.echo(`Using default value of ${settingVals.n}\n`.bold.red);
            }
        },
        p(arg) {
            if (typeof arg === 'string') {
                settingVals.p = arg;
            } else {
                shell.echo('--p requires a string\n'.bold.red);
                shell.echo(`Using default value of ${settingVals.p}\n`.bold.red);
            }
        }
    };

    // Check if any args were input. If yes, gather them into an array. If no, process no args.
    let args;
    if (process.argv[2]) {
        // First two args are default, take everything after that.
        args = process.argv.slice(2);

        // Loop through each of the arguments
        args.forEach(fullArg => {
            shell.echo(`\nArgument: "${fullArg}".\n`.bold.magenta);
            const i = fullArg.indexOf("=");
            if (i < 0) {
                shell.echo(`\nNo equal sign in "${fullArg}". Shutting down.`.bold.red);
                throw '\nExit process.';
            }
            const param = fullArg.slice(0, i);
            const arg = fullArg.slice(i + 1);
            if (!argOptions[param]) {
                shell.echo(`\nNo matching param "${param}". Shutting down.`.bold.red);
                throw '\nExit process.';
            }
            // Call method to perform arg matching and logic
            argOptions[param](arg);
        })
    }


    shell.echo('\n----- REMOVE BUILD(S) PROCESS INITIALIZED -----\n'.underline.bold.blue);

    shell.echo('Listing all deployments'.green);
    const deployments = shell.exec(`now ls ${settingVals.p}`).stdout;
    const deploymentsArr = parseDeployments(deployments);
    shell.echo(`Number of active deployments: ${deploymentsArr.length}`.green);
    shell.echo(`Max number of deployments to keep: ${settingVals.n}`.magenta);
    let count = 0;
    while (deploymentsArr.length > settingVals.n) {
        const projToRemove = deploymentsArr.pop();
        shell.echo(`Removing: ${projToRemove}`.green);
        const res = shell.exec(`printf 'y\\n' | now rm ${projToRemove}`).stdout;
        count++;
    }
    shell.echo(`\n----- REMOVE BUILD(S) PROCESS COMPLETE: ${count} build(s) removed -----\n`.underline.bold.blue);
} catch (error) {
    shell.echo(error);
    shell.exit(0);
}

function randomNumber(min, max) {
    return Math.floor(Math.random() * (+max - +min)) + +min;
}

function parseDeployments(deployments) {
    const splits = deployments.split(".now.sh");
    splits.pop();
    return splits.map(split => {
        const indices = getIndicesOf( "[", split, false);
        split = split.slice(indices[indices.length-1] + 3);
        return split + ".now.sh";
    });
}

function getIndicesOf(searchStr, str, caseSensitive) {
    const searchStrLen = searchStr.length;
    if (searchStrLen === 0) {
        return [];
    }
    let startIndex = 0, index, indices = [];
    if (!caseSensitive) {
        str = str.toLowerCase();
        searchStr = searchStr.toLowerCase();
    }
    while ((index = str.indexOf(searchStr, startIndex)) > -1) {
        indices.push(index);
        startIndex = index + searchStrLen;
    }
    return indices;
}
