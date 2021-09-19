const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    console.log("Please find below the list of available contacts:");
    console.table(contacts);
  } catch (error) {
    throw error.message;
  }
}
async function getContactById(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const filteredContact = contacts.find(
      (contact) => contact.id === contactId
    );
    if (!filteredContact) {
      throw new Error(`Contact with such id=${contactId} cannot be not found!`);
    }
    console.table(filteredContact);
  } catch (error) {
    throw error.message;
  }
}

async function removeContact(contactId) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    const removedContact = contacts.filter(
      (contact) => contact.id !== contactId
    );
    if (removedContact.length === contacts.length) {
      throw new Error(`Contact with such id=${contactId} cannot not found!`);
    }
    await fs.writeFile(contactsPath, JSON.stringify(removedContact));
    console.log(
      `Contact with such id "${contactId}" was deleted! Please find below the updated list of contacts: `
    );
    console.table(removedContact);
  } catch (error) {
    throw error.message;
  }
}

async function addContact(name, email, phone) {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    if (
      contacts.find(
        (contact) => contact.name.toLowerCase() === name.toLowerCase()
      )
    )
      return console.warn("This name already exists!");

    if (contacts.find((contact) => contact.email === email))
      return console.warn("This email already exists!");

    if (contacts.find((contact) => contact.phone === phone))
      return console.warn("This phone already exists!");

    const item = { id: shortid(), name, email, phone };
    const addContact = [...contacts, item];

    await fs.writeFile(contactsPath, JSON.stringify(addContact));
    console.log(
      "A new contact added successfully!Please find below the updated list of contacts:"
    );
    console.table(addContact);
  } catch (error) {
    throw error.message;
  }
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
