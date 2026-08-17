import database from "infra/database.js";

async function status(request, response) {
  const updatedAt = new Date().toISOString();

  const databaseVersionResult = await database.query("SHOW server_version;");
  const databaseVersionValue = databaseVersionResult.rows[0].server_version;

  const databaseMaxConexionsResult = await database.query(
    "SHOW max_connections;",
  );
  const databaseMaxConexionsValue =
    databaseMaxConexionsResult.rows[0].max_connections;

  const databaseName = process.env.POSTGRES_DB;

  const databaseOpenConnectionResult = await database.query({
    text: "SELECT count(*)::int FROM pg_stat_activity WHERE datname= $1;",
    values: [databaseName],
  });
  const databaseOpenConnectionValue =
    databaseOpenConnectionResult.rows[0].count;

  response.status(200).json({
    updated_at: updatedAt,
    dependencies: {
      database: {
        version: databaseVersionValue,
        max_connections: parseInt(databaseMaxConexionsValue),
        open_connections: databaseOpenConnectionValue,
      },
    },
  });
}

export default status;
