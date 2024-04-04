# Squid Indexer for Coretime Chain

Template taken from starter [Squid code](https://subsquid.io).
The project indexes code on 

## Summary

- [Quickstart](#quickly-running-the-sample)
- [Public archives for Parachains](#public-archives-for-parachains)
- [Self-hosted archive](#self-hosted-archive)
- [Development flow](#dev-flow)
  - [Database Schema](#1-define-database-schema)
  - [Entity classes](#2-generate-typeorm-classes)
  - [DB migrations](#3-generate-database-migration)
  - [Typegen for Events, Extrinsics and Storage Calls](#4-generate-typescript-definitions-for-substrate-events-calls-and-storage)
- [Deploy the Squid](#deploy-the-squid)
- [Conventions](#project-conventions)
- [Type Bundles](#types-bundle)

## Prerequisites

* node 16.x
* docker
* npm -- note that `yarn` package manager is not supported

## Quick Start

Example commands below use [sqd](https://docs.subsquid.io/squid-cli/).
Please [install](https://docs.subsquid.io/squid-cli/installation/) it before proceeding.

This command installs the dependencies, starts 
```bash
./run.sh
```
A GraphiQL playground will be available at [localhost:4350/graphql](http://localhost:4350/graphql).


## Dev flow

### 1. Define database schema

Start development by defining the schema of the target database via `schema.graphql`.
Schema definition consists of regular graphql type declarations annotated with custom directives.
Full description of `schema.graphql` dialect is available [here](https://docs.subsquid.io/store/postgres/schema-file/).

Generate from graphQl with:

```sh
sqd codegen
```

### 2. Generate TypeORM classes

Mapping developers use [TypeORM](https://typeorm.io) entities
to interact with the target database during data processing. All necessary entity classes are
[generated](https://docs.subsquid.io/store/postgres/schema-file/intro/) by the squid framework from `schema.graphql`. This is done by running `npx squid-typeorm-codegen`
or (equivalently) `sqd codegen` command.

Generate specVersions:
```sh
npx substrate-metadata-explorer --rpc ws://localhost:9944 --out myMetadata.jsonl
```

See './typegen.json' modify as necessary.

Generate typegen with:

```sh
npx squid-substrate-typegen typegen.json  
sqd typegen    
```

### 3. Generate database migration

All database changes are applied through migration files located at `db/migrations`.
`squid-typeorm-migration(1)` tool provides several commands to drive the process.
It is all [TypeORM](https://typeorm.io/#/migrations) under the hood.

```bash
# Connect to database, analyze its state and generate migration to match the target schema.
# The target schema is derived from entity classes generated earlier.
# Don't forget to compile your entity classes beforehand!
npx squid-typeorm-migration generate

# Create template file for custom database changes
npx squid-typeorm-migration create

# Apply database migrations from `db/migrations`
npx squid-typeorm-migration apply

# Revert the last performed migration
npx squid-typeorm-migration revert         
```
Available `sqd` shortcuts:
```bash
# Build the project, remove any old migrations, then run `npx squid-typeorm-migration generate`
sqd migration:generate

# Run npx squid-typeorm-migration apply
sqd migration:apply
```

## Project conventions

Squid tools assume a certain project layout.

* All compiled js files must reside in `lib` and all TypeScript sources in `src`. 
The layout of `lib` must reflect `src`.
* All TypeORM classes must be exported by `src/model/index.ts` (`lib/model` module).
* Database schema must be defined in `schema.graphql`.
* Database migrations must reside in `db/migrations` and must be plain js files.
* `squid-*(1)` executables consult `.env` file for a number of environment variables.

See the [full desription](https://docs.subsquid.io/basics/squid-structure/) in the documentation.

---


