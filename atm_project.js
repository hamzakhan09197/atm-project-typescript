#! /usr/bin/env node
import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import showbanner from "node-banner";
let time = (time = 2000) => new Promise((r) => setTimeout(r, time));
async function banner() {
    await showbanner(' ATM Machine', "This machine funsnality is only withdrawl , deposit , balance check only");
}
;
let id = 1234;
let pin = 4321;
let totalAmount = 10000;
async function login() {
    let { userID, userPin } = await inquirer.prompt([{
            name: "userID",
            type: "number",
            default: 1234,
            message: chalk.rgb(214, 139, 150)("Enter Your ID"),
        },
        {
            name: "userPin",
            type: "number",
            default: 4321,
            message: chalk.rgb(214, 139, 150)("Enter Your Pin"),
        }]);
    if (userID === id && userPin === pin) {
        const spinner = createSpinner(chalk.magenta('    Authenticating \n<<<<....Please wait.....>>>>')).start();
        await time();
        spinner.success({ text: chalk.greenBright("Authentication Successfully... ") });
    }
    else {
        const spinner = createSpinner(chalk.magenta('    Authenticating \n<<<<....Please wait.....>>>>')).start();
        await time();
        spinner.error({ text: (chalk.redBright("Authentication Failed...")) });
        await login();
    }
    ;
    return { userID, userPin };
}
;
async function selectMethod() {
    let { method } = await inquirer.prompt([{
            name: "method",
            type: "list",
            choices: ["Fast Chash", "Chash withdraw", "Chash Deposit", "Balance Inquery"],
            message: chalk.rgb(214, 139, 150)("Select Your Method")
        }]);
    return { method };
}
;
async function fastChash() {
    let { fastchash } = await inquirer.prompt([{
            name: "fastchash",
            type: "list",
            choices: [1000, 2000, 3000, 5000, 10000, 20000],
            message: chalk.rgb(214, 139, 150)("Select Your Amount")
        }]);
    let spinner = createSpinner(chalk.magentaBright('    Withdrawing \n<<<<....Please wait.....>>>>')).start();
    await time();
    if (fastchash <= totalAmount) {
        totalAmount = totalAmount - fastchash;
        spinner.success({ text: chalk.greenBright(`Rs.${fastchash} Withdraw successfully`) });
    }
    else {
        spinner.error({ text: chalk.redBright("    Insufficient Amount \n <<<<.....SORRY.....>>>>") });
    }
    return fastchash;
}
;
async function userAmount() {
    let { amount } = await inquirer.prompt([{
            name: "amount",
            type: "number",
            message: chalk.rgb(214, 139, 150)("Enter Your Amount")
        }]);
    let spinner = createSpinner(chalk.magentaBright('    Withdrawing \n<<<<....Please wait.....>>>>')).start();
    await time();
    if (amount <= totalAmount) {
        totalAmount = totalAmount - amount;
        spinner.success({ text: chalk.greenBright(`Rs.${amount} Withdraw successfully`) });
    }
    else {
        spinner.error({ text: chalk.redBright("    Insufficient Amount \n <<<<.....SORRY.....>>>>") });
    }
    return amount;
}
;
async function depositAmount() {
    let { deposit } = await inquirer.prompt([{
            name: "deposit",
            type: "number",
            message: chalk.rgb(214, 139, 150)("Enter Your Amount"),
        }]);
    totalAmount += deposit;
    let spinner = createSpinner(chalk.magentaBright('     Depositing\n<<<<....Please wait.....>>>>')).start();
    await time();
    spinner.success({ text: chalk.greenBright(`Rs.${deposit} successfully Deposited`) });
    return deposit;
}
async function startAgain() {
    let { again } = await inquirer.prompt([{
            name: "again",
            type: "confirm",
            message: chalk.yellowBright("Do you want to use again")
        }]);
    return { again };
}
;
async function mainFunction() {
    await banner();
    await time();
    await login();
    let again = true;
    while (again) {
        let { method } = await selectMethod();
        if (method === "Fast Chash") {
            await fastChash();
        }
        else if (method === "Chash withdraw") {
            await userAmount();
        }
        else if (method === "Chash Deposit") {
            await depositAmount();
        }
        else if (method === "Balance Inquery") {
            const spinner = createSpinner('Balance Checking').start();
            await time();
            spinner.success({ text: chalk.yellowBright(`Your balance is RS. ${totalAmount}`) });
        }
        let { again } = await startAgain();
        if (!again) {
            break;
        }
        ;
    }
    ;
}
;
await mainFunction();
