# Node Base

## Sequelize cli

```
# Don't use sequelize init, just create folder models, migrations
# Create model
 node_modules/.bin/sequelize model:generate --name User --attributes firstName:string,lastName:string,email:string
# Create migration
node_modules/.bin/sequelize migration:generate --name add-username
```
