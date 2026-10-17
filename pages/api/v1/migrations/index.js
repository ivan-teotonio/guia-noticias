// import migrationRunner from 'node-pg-migrate';
// import { join } from 'path';

// export default async function migrations(request, response) {

//   if (request.method !== 'GET') {
//     const migrations = await migrationRunner({
//     databaseUrl: process.env.DATABASE_URL,
//     dryRun: true,
//     dir: join('infra', 'migrations'),
//     direction: 'up',
//     verbose: true,
//     migrationsTable: 'pgmigrations',
//   })
//   return response.status(200).json([migrations]);
//   }

//   if (request.method !== 'POST') {
//     const migrations = await migrationRunner({
//     databaseUrl: process.env.DATABASE_URL,
//     dryRun: false,
//     dir: join('infra', 'migrations'),
//     direction: 'up',
//     verbose: true,
//     migrationsTable: 'pgmigrations',
//   })
//   return response.status(200).json([migrations]);
//   }

//   return response.status(405).end();
// }
  
 

import migrationRunner from 'node-pg-migrate';
import { join } from 'path';
import database from 'infra/database.js';

export default async function migrations(request, response) {
  const  dbClient = await database.getNewClient();
  const defaultMigrationsOptions = {
      dbClient: dbClient,
      dryRun: true,
      dir: join('infra', 'migrations'),
      direction: 'up',
      verbose: true,
      migrationsTable: 'pgmigrations',
    }

  if (request.method === 'GET') {
    const pendingMigrations = await migrationRunner(defaultMigrationsOptions);
    await dbClient.end();
    return response.status(200).json(pendingMigrations);
  }

  if (request.method === 'POST') {
    const migratedMigrations = await migrationRunner({
      ...defaultMigrationsOptions,
      dryRun: false,
    });

     await dbClient.end();

    if (migratedMigrations.length > 0) {
      return response.status(201).json(migratedMigrations);
    }

    return response.status(200).json(migratedMigrations);
  }

  return response.status(405).end();
}