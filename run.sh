# 1. Install dependencies
npm ci

# 2. Start target Postgres database and detach
sqd up 

# 3. Build the project
sqd build

sqd migration:apply
# 4. Start both the squid processor and the GraphQL server does both sqd serve and 
sqd run .
