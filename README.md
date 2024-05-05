# Squid Indexer for Coretime Chain

This project utilizes a template from the [Squid starter code](https://subsquid.io) to index code on the Coretime Chain, providing a streamlined process for developers.

## Table of Contents

- [Prerequisites](#prerequisites)
- [Quick Start](#quick-start)
- [Development Workflow](#development-workflow)
  - [Defining the Database Schema](#defining-the-database-schema)
  - [Generating TypeORM Classes](#generating-typeorm-classes)
  - [Creating Database Migrations](#creating-database-migrations)
  - [Generating TypeScript Definitions](#generating-typescript-definitions)
- [Deploying the Squid](#deploying-the-squid)
- [Project Conventions](#project-conventions)
- [Type Bundles](#type-bundles)

## Prerequisites

Ensure you have the following installed before starting:

- Node.js version 16.x
- Docker
- npm (Note: `yarn` package manager is not supported)

## Quick Start

To install dependencies and start the project, use the following command. This script utilizes [sqd](https://docs.subsquid.io/squid-cli/), so please ensure it's [installed](https://docs.subsquid.io/squid-cli/installation/) beforehand.

```bash
npm install
npm run build
./run.sh
```

After execution, a GraphiQL playground will be accessible at [localhost:4350/graphql](http://localhost:4350/graphql).

## Development Workflow

## Project Conventions

The Squid tools adhere to specific project structures for optimal performance:

- JavaScript compilations should be placed in `lib`, and TypeScript sources in `src`. The `lib` directory should mirror the structure of `src`.
- Export all TypeORM classes through `src/model/index.ts` (or the `lib/model` module).
- Define the database schema within `schema.graphql`.
- Store database migration files in `db/migrations` as plain JavaScript files.
- Configuration variables are set in the `.env` file, which is used by `squid-*` executables.

For detailed information on project structure and conventions, refer to the [Subsquid Documentation](https://docs.subsquid.io/basics/squid-structure/).


### Generate types
Generate specVersions:
```sh
npx substrate-metadata-explorer --rpc wss://rococo-coretime-rpc.polkadot.io --out myMetadata.jsonl
```

Generated specVersions Kusama:
```
npx substrate-metadata-explorer --rpc wss://kusama-coretime-rpc.polkadot.io --out myMetadataKusama.jsonl
```

Generate typegen with:
```sh
npx squid-substrate-typegen typegen.json  
sqd typegen    
```


Generate from graphQl with:
```sh
sqd codegen
```

---

Available `sqd` shortcuts:
```bash
sqd down
sqd up 
sqd migration:generate
sqd migration:apply
sqd up
sqd process
```

Deploy command :
```
sqd deploy --org lastic .
```