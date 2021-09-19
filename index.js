const {
  listContacts,
  getContactById,
  removeContact,
  addContact,
} = require("./contacts");
const argv = require("yargs").argv;

function invokeAction({ action, id, name, email, phone }) {
  switch (action) {
    case "list":
      listContacts();
      break;

    case "get":
      getContactById(id);
      break;

    case "remove":
      removeContact(id);
      break;

    case "add":
      addContact(name, email, phone);
      break;

    default:
      console.warn("\x1B[31m Unknown action type!");
  }
}

invokeAction(argv);

// The usage of alternative module commander //

/* const { Command } = require('commander');
const program = new Command();
program
    .option('-a, --action <type>', 'choose action')
    .option('-i, --id <type>', 'user id')
    .option('-n, --name <type>', 'user name')
    .option('-e, --email <type>', 'user email')
    .option('-p, --phone <type>', 'user phone');
program.parse(process.argv);
const argv = program.opts();
function invokeAction({ action, id, name, email, phone }) {
    switch (action) {
        case 'list':
            listContacts();
            break;
        case 'get':
            getContactById(id);
            break;
        case 'remove':
            removeContact(id);
            break;
        case 'add':
            addContact(name, email, phone);
            break;
        default:
            console.warn('\x1B[31m Unknown action type!');
    }
};
invokeAction(argv); */
