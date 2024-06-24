import { createRxDatabase, addRxPlugin } from 'rxdb';
import { RxDBValidatePlugin } from 'rxdb/plugins/validate';
import { RxDBSchemaCheckPlugin } from 'rxdb/plugins/schema-check';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
import { RxDBMigrationPlugin } from 'rxdb/plugins/migration';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { getRxStoragePouch } from 'rxdb/plugins/pouchdb';

// Add plugins
addRxPlugin(RxDBValidatePlugin);
addRxPlugin(RxDBSchemaCheckPlugin);
addRxPlugin(RxDBQueryBuilderPlugin);
addRxPlugin(RxDBMigrationPlugin);
addRxPlugin(RxDBDevModePlugin);

// Schema definition
const heroSchema = {
  title: 'hero schema',
  version: 0,
  description: 'describes a simple hero',
  type: 'object',
  properties: {
    name: {
      type: 'string',
      primary: true
    },
    color: {
      type: 'string'
    }
  },
  required: ['name', 'color']
};

// Create the database
async function createDatabase() {
  const db = await createRxDatabase({
    name: 'heroesdb',           // database name
    storage: getRxStoragePouch('idb'), // storage engine, here using IndexedDB
    multiInstance: true,        // allow multiInstance
    eventReduce: true           // enable event reduce
  });

  console.log('Database created');

  // Create a collection
  const collections = await db.addCollections({
    heroes: {
      schema: heroSchema
    }
  });

  console.log('Collection created');

  return collections.heroes;
}

// Usage
(async () => {
  const heroesCollection = await createDatabase();

  // Insert a document
  const hero = await heroesCollection.insert({
    name: 'Batman',
    color: 'black'
  });

  console.log('Hero inserted:', hero.toJSON());

  // Query the collection
  const myHero = await heroesCollection.findOne({ selector: { name: 'Batman' } }).exec();
  console.log('Hero found:', myHero.toJSON());

  // Update the document
  await myHero.update({ $set: { color: 'dark-black' } });
  console.log('Hero updated:', myHero.toJSON());

  // Remove the document
  await myHero.remove();
  console.log('Hero removed:', myHero.toJSON());
})();
