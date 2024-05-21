# 1. Install dependencies
pnpm install --frozen-lockfile

npx sqd down

# 2. Start target Postgres database and detach
npx sqd up 

# 3. Build the project
npx sqd build

npx sqd migration:generate
npx sqd migration:apply

# 4. Start both the squid processor and the GraphQL server does both sqd serve and 
npx sqd run .
