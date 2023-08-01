const contacts = require("./contacts.js");
const chalk = require("chalk");
const { Command } = require("commander");
const program = new Command();
program
  .option("-a, --action <type>", "choose action")
  .option("-i, --id <type>", "user id")
  .option("-n, --name <type>", "user name")
  .option("-e, --email <type>", "user email")
  .option("-p, --phone <type>", "user phone");

program.parse(process.argv);

const argv = program.opts();

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      contacts.listContacts().then(console.table).catch(console.error);
      break;
    case "get":
      contacts
        .getContactById(id)
        .then((data) => {
          if (!data) {
            console.log(
              chalk.red(
                `Contact with id ` + chalk.underline.bold(id) + ` not found`
              )
            );
          }
          console.log(data);
        })
        .catch(console.error);
      break;
    case "add":
      contacts
        .addContact(name, email, phone)
        .then((data) => {
          console.log(
            chalk.green(
              `Contact with name ` +
                chalk.underline.bold(name) +
                ` has been successfully added`
            )
          );
          console.log(data);
        })
        .catch(console.error);
      break;
    case "remove":
      contacts
        .removeContact(id)
        .then((data) => {
          console.log(
            chalk.yellow(
              `Contact with id ` +
                chalk.underline.bold(id) +
                ` has been successfully deleted`
            )
          );
          console.log(data);
        })
        .catch(console.error);
      break;
    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);
