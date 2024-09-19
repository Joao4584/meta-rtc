import buildServer from "./server";

const server = buildServer();

async function main() {
  try {
    await server.listen(2222, "0.0.0.0");

    console.log(`Server ready at http://localhost:2222`);
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main();
