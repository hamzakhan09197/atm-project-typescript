import inquirer from "inquirer";
import chalk from "chalk";
import { createSpinner } from "nanospinner";
import showbanner from "node-banner";

let time = (time = 2000) => new Promise((r) => setTimeout(r, time));

async function banner() {

    await showbanner(' ATM Machine',
        "This machine funsnality is only withdrawl , deposit , balance check only")
};
let id = 1234;
let pin = 4321;
let totalAmount = 10000;

async function login(): Promise<{ userID: number, userPin: number }> {
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
        const spinner = createSpinner('Authenticating....').start()
        await time()

        spinner.success({ text: chalk.greenBright("Authentication Successfully... ") });
    } else {
        const spinner = createSpinner('Authentication').start()
        await time()

        spinner.error({ text: (chalk.redBright("Authentication Failed...")) });
        await login();
    };

    return { userID, userPin }
};

async function selectMethod(): Promise<{ method: string }> {
    let { method } = await inquirer.prompt([{
        name: "method",
        type: "list",
        choices: ["Fast Chash", "Chash withdraw", "Chash Deposit", "Balance Inquery"],
        message: chalk.rgb(214, 139, 150)("Select Your Method")

    }]);




    return { method };
};

async function fastChash(): Promise<number> {
    let { fastchash } = await inquirer.prompt([{
        name: "fastchash",
        type: "list",
        choices: [1000, 2000, 3000, 5000, 10000, 20000],
        message: chalk.rgb(214, 139, 150)("Select Your Amount")

    }]);
    let spinner = createSpinner('Withdrawing').start()
    await time();
    if (fastchash <= totalAmount) {
        totalAmount = totalAmount - fastchash

        spinner.success({ text: chalk.greenBright("Withdraw successfully") });
    } else {

        spinner.error({ text: chalk.redBright("withdraw failed") });
    }
    return fastchash;
};

async function userAmount(): Promise<number> {
    let { amount } = await inquirer.prompt([{
        name: "amount",
        type: "number",
        message: chalk.rgb(214, 139, 150)("Enter Your Amount")
    }]);
    let spinner = createSpinner('Withdrawing').start()
    await time()
    if (amount <= totalAmount) {
        totalAmount = totalAmount - amount
        spinner.success({ text: chalk.greenBright("Withdraw successfully") });

    } else {
        spinner.error({ text: chalk.redBright("withdraw failed") });
    }

    return amount;
};

async function depositAmount(): Promise<number> {
    let { deposit } = await inquirer.prompt([{
        name: "deposit",
        type: "number",
        message: chalk.rgb(214, 139, 150)("Enter Your Amount"),
    }]);
    totalAmount += deposit
    let spinner = createSpinner('Depositing').start()
    await time();

    spinner.success({ text: chalk.greenBright(`Your Peyment successfully Deposit ${deposit}`) });


    return deposit;
}


async function startAgain(): Promise<{ again: boolean }> {
    let { again } = await inquirer.prompt([{
        name: "again",
        type: "confirm",
        message: chalk.yellowBright("Do you want to use again")
    }]);

    return { again };
};


async function mainFunction(): Promise<void> {

    await banner();
    await time();
    await login();

    let again = true;
    while (again) {
        let { method } = await selectMethod();

        if (method === "Fast Chash") {
            await fastChash();
        } else if (method === "Chash withdraw") {
            await userAmount();
        } else if (method === "Chash Deposit") {
            await depositAmount();
        } else if (method === "Balance Inquery") {
            const spinner = createSpinner('Balance Checking').start()
            await time();
            spinner.success({ text: chalk.yellowBright(`Your balance is RS. ${totalAmount}`) });

        }
        let { again } = await startAgain();
        if (!again) {
            break;
        };
    };


};

await mainFunction();