# 1. Install dependencies
npm ci

sqd down

# 2. Start target Postgres database and detach
sqd up 

# 3. Build the project
sqd build

sqd migration:generate
sqd migration:apply
sqd up

# 4. Start both the squid processor and the GraphQL server does both sqd serve and 
sqd run .