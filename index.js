const boxPackage = [];
const indexStore = [];

const readline = require('readline').createInterface({
    input: process.stdin,
    output: process.stdout
});

function checkString(box){
    if(isNaN(Number(box)))
        return false;
    return true;
}

function printBox(boxPackage){
    console.log('\x1b[36m%s\x1b[0m','Résultat :', boxPackage.join('/'));
}

function checkIndex(t, indexStore){
    for(let i = 0; i < indexStore.length; i++){
        if (t == indexStore[i]){
            return true;
        }
    }
    return false;
}

function boxOpti(t, box){
    
    for(let i = 0; i < box.length; i++){
        
    }
}

function boxCreate(box){
    let oneBox = 0;
    let sub = 0;

    for(let i = 0; i < box.length; i++){
        let num = Number(box[i]);
        oneBox = oneBox + num;
        if(oneBox >= 10 || !box[i + 1]){
            if (oneBox > 10){
                oneBox = oneBox - Number(box[i]);
                i--;
            }
            boxPackage.push(box.substr(sub, i - sub + 1));
            oneBox = 0;
            sub = i + 1;
        } 
    }
    console.log(boxPackage);
}

readline.question('Articles : ', (t) => {
    if(checkString(t)) {
        boxCreate(t);
        printBox(boxPackage);
    } else {
        console.log('\x1b[31m%s\x1b[0m',"Syntax Error, please insert only Number");
    }
    readline.close();
})

//163841689525773