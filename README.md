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
./run.sh
```

After execution, a GraphiQL playground will be accessible at [localhost:4350/graphql](http://localhost:4350/graphql).

## Development Workflow

## Running with Docker

To run the application using Docker, ensure you have Docker installed and use the following commands:

```bash
# Build the Docker image
npm run docker:build

# Run the Docker container
npm run docker:run
```

This will start the application and expose it on the port specified in the `.env` file (default is 4350). You can then access the GraphiQL playground at [localhost:4350/graphql](http://localhost:4350/graphql).

### Defining the Database Schema

Initiate your development by creating the `schema.graphql` file, which outlines your database's schema. This file should contain GraphQL type declarations, annotated with custom directives. For a comprehensive guide on the `schema.graphql` dialect, visit [Subsquid Docs](https://docs.subsquid.io/store/postgres/schema-file/).

Generate the required code with:

```sh
sqd codegen
```

### Generating TypeORM Classes

[TypeORM](https://typeorm.io) entities enable interaction with your database. These entities are generated from the `schema.graphql` file using the Squid framework. Generate entity classes and specVersions with:

```sh
npx squid-typeorm-codegen
npx substrate-metadata-explorer --rpc ws://localhost:9944 --out myMetadata.jsonl
```

For custom configurations, modify './typegen.json' as necessary. Then, generate type definitions with:

```sh
npx squid-substrate-typegen typegen.json
sqd typegen
```

### Creating Database Migrations

Database changes are managed through migrations found in `db/migrations`. Utilize the `squid-typeorm-migration(1)` tool to facilitate this process, which is built on [TypeORM migrations](https://typeorm.io/#/migrations).

To generate, create, apply, or revert migrations, use the following commands:

```bash
# Generate a new migration file to match the target schema.
npx squid-typeorm-migration generate

# Create a template for manual database alterations.
npx squid-typeorm-migration create

# Apply pending migrations.
npx squid-typeorm-migration apply

# Revert the most recent migration.
npx squid-typeorm-migration revert
```

Simplify migration tasks with `sqd` shortcuts:

```bash
sqd migration:generate
sqd migration:apply
```

## Project Conventions

The Squid tools adhere to specific project structures for optimal performance:

- JavaScript compilations should be placed in `lib`, and TypeScript sources in `src`. The `lib` directory should mirror the structure of `src`.
- Export all TypeORM classes through `src/model/index.ts` (or the `lib/model` module).
- Define the database schema within `schema.graphql`.
- Store database migration files in `db/migrations` as plain JavaScript files.
- Configuration variables are set in the `.env` file, which is used by `squid-*` executables.

For detailed information on project structure and conventions, refer to the [Subsquid Documentation](https://docs.subsquid.io/basics/squid-structure/).
