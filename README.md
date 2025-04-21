# Brighte Eats API

A NestJS GraphQL API that registers leads with services like DELIVERY, PICK_UP, and PAYMENT. Built with `@nestjs/graphql`, using Apollo Server and code-first schema generation.

## Tech Stack

- NestJS
- GraphQL (Apollo Server)
- Prisma
- SQLite

## Getting Started

### 1. Clone the repo

```bash
git clone https://github.com/jomardiago/brighte-eats-api.git
cd brighte-eats-api
```

### 2. Install dependencies

```bash
npm install
```

### 3. Setup prisma

Create the .env file like below, or you can just rename .env.local.example to .env.

```bash
PORT=5000
DATABASE_URL="file:./dev.db"
```

Next, initialize prisma.

```bash
npx prisma generate
npx prisma migrate dev
```

This sets up the schema and creates the initial SQLite database at prisma/dev.db.

### 4. Run the app

```bash
npm run start:dev
```

App will be available at: http://localhost:5000/graphql, port here can change if you updated it in your .env file.

## Apollo Server

Apollo Server will be available in http://localhost:5000/graphql. Here you can generate your mutations and queries.

![Apollo Server](https://raw.githubusercontent.com/jomardiago/brighte-eats-api/main/public/apollo-server.png)

## Prisma Studio

To open prisma studio, run the command below on a separate terminal.

```bash
npx prisma studio
```

![Prisma Studio](https://raw.githubusercontent.com/jomardiago/brighte-eats-api/main/public/prisma-studio.png)

Prisma Studio will be available in http://localhost:5555. Here you can view your database records.

## Unit Test

To run the unit test, run the command below.

```bash
npm run test
```
