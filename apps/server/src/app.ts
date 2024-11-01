import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen({ port: 2222, host: 'localhost' });
    console.log(`Server ready at http://localhost:2222`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
