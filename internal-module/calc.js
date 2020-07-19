module.exports = {
    addition: addition,
    subtraction: subtraction,
    multiplication: multiplication,
    division: division
}

function subtraction(n1, n2) {
    validateArguments(arguments);
    return n1 - n2;
}

function addition(n1, n2) {
    validateArguments(arguments);
    return n1 + n2;
}

function multiplication(n1, n2) {
    validateArguments(arguments);
    return n1 * n2;
}

function division(n1, n2) {
    validateArguments(arguments);
    if (n2 === 0) throw "Division by zero is not possible!";
    return n1 / n2;
}

function validateArguments(args) {
    for (let i = 0; i < args.length; i++) {
        if (isNaN(args[i])) {
            throw `'${args[i]}' should be a number!`;
        }
    }
}