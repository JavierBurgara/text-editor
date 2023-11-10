import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

// TODO: Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  console.log('Putting to the database');

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readwrite');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.put({  id:1, value: content });

  // Get confirmation of the request.
  const result = await request;
  console.log('Data saved to the database');
};

// TODO: Add logic for a method that gets all the content from the database
export const getDb = async () =>
{
  console.log('getting to the database');

  // Create a connection to the database database and version we want to use.
  const jateDB = await openDB('jate', 1);

  // Create a new transaction and specify the database and data privileges.
  const tx = jateDB.transaction('jate', 'readonly');

  // Open up the desired object store.
  const store = tx.objectStore('jate');

  // Use the .add() method on the store and pass in the content.
  const request = store.get(1);

  // Get confirmation of the request.
  const result = await request;
  if (result){
    console.log('printed into the database')
  } else {
    console.log('result not found')
  } 
  return result?.value
};

initdb();
