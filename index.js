const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
})

readline.question(`Articles: `, (t) => {
    console.log(`Hi ${t}!`);
    readline.close();
})