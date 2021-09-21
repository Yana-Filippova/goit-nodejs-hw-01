const fs = require("fs").promises;
const path = require("path");
const shortid = require("shortid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function readContacts() {
  try {
    const data = await fs.readFile(contactsPath, "utf8");
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    return console.error(error.message);
  }
}

async function listContacts() {
  const contacts = await readContacts();
  console.log("Please find below the list of available contacts:");
  return contacts;
}

async function getContactById(contactId) {
  const contacts = await readContacts();
  const contact = contacts.find((contact) => contact.id == contactId);
  return contact;
}

async function removeContact(contactId) {
  const contacts = await readContacts();
  const updatedContacts = contacts.filter(
    (contact) => contact.id !== Number(contactId)
  );
  if (updatedContacts.length === contacts.length) {
    throw new Error(`Contact with such id=${contactId} cannot not be found!`);
  }
  await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
  return updatedContacts;
}

async function addContact(name, email, phone) {
  const contacts = await readContacts();

  if (
    contacts.find(
      (contact) => contact.name.toLowerCase() === name.toLowerCase()
    )
  )
    throw new Error("This name already exists!");

  if (contacts.find((contact) => contact.email === email))
    throw new Error("This email already exists!");

  if (contacts.find((contact) => contact.phone === phone))
    throw new Error("This phone already exists!");

  const newContact = { id: shortid.generate(), name, email, phone };
  contacts.push(newContact);
  await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
  return contacts;
}

module.exports = {
  listContacts,
  getContactById,
  removeContact,
  addContact,
};
