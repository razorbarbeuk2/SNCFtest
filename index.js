const boxPackage = [];
const greenColor = "\x1b[36m%s\x1b[0m";
const errorColor = "\x1b[31m%s\x1b[0m";

//I/O prompt shell
const readline = require("readline").createInterface({
  input: process.stdin,
  output: process.stdout
});

//Print du tableau final
function printBox(boxPackage, step) {
  if (step == 1) {
    console.log(
      greenColor,
      "Robot actuel :",
      boxPackage.join("/"),
      `=> ${boxPackage.length} cartons utilisés`
    );
  } else {
    console.log(
      greenColor,
      "Robot optimisé :",
      boxPackage.join("/"),
      `=> ${boxPackage.length} cartons utilisés`
    );
  }
}

//Gestion d'erreur sur la String d'entrée
function checkString(box) {
  if (box.length == 0) {
    console.log(errorColor, "Syntax Error, empty string");
    return false;
  }
  if (!isNaN(Number(box))) {
    for (let i = 0; i < box.length; i++) {
      if (box[i] < "1") {
        console.log(
          errorColor,
          "Syntax Error, insert a number between 1 and 9"
        );
        return false;
      }
    }
    return true;
  }
  console.log(errorColor, "Syntax Error, please insert only Number");
  return false;
}

//Nettoyage du tableau final
function cleanArray(tab) {
  for (let i = 0; i < tab.length; i++) {
    if (tab[i].length == 0) {
      tab.splice(i, 1);
    }
  }
}

//Addition de chaque node
function additionNode(node) {
  let result = 0;

  for (let i = 0; i < node.length; i++) {
    result += Number(node[i]);
  }
  return result;
}

//Optimisation des nodes du tableau
function boxOptimisationNode(node, index, tab) {
  for (let i = 0; i < tab.length; i++) {
    if (additionNode(tab[i]) < 10) {
      let element = tab[i];
      for (let t = 0; t < element.length; t++) {
        let result = 0;
        result = Number(node) + Number(element[t]);
        if (result == 10 && (index != i)) {
          tab.splice(index, 1, node.concat(element[t]));
          tab[i] = element.replace(new RegExp(element[t], "i"), "");
        }
      }
    }
  }
}

//Verification des nodes du tableau si < 10
function boxOptimisation(box) {
  for (let i = 0; i < box.length; i++) {
    if (additionNode(box[i]) < 10) {
      boxOptimisationNode(box[i], i, box);
    }
  }
}

//Creation box + première Optimisation
function boxCreate(box) {
  let oneBox = 0;
  let sub = 0;

  for (let i = 0; i < box.length; i++) {
    oneBox = oneBox + Number(box[i]);
    if (oneBox >= 10 || !box[i + 1]) {
      if (oneBox > 10) {
        oneBox = oneBox - Number(box[i]);
        i--;
      }
      boxPackage.push(box.substr(sub, i - sub + 1));
      oneBox = 0;
      sub = i + 1;
    }
  }
}

readline.question("Articles : ", entry => {
  if (checkString(entry)) {
    boxCreate(entry);
    printBox(boxPackage, 1);
    boxOptimisation(boxPackage);
    cleanArray(boxPackage);
    printBox(boxPackage, 2);
  }
  readline.close();
});
