# Encrypt backend

## Stack
- Typescript 4.2.3
- Nest 7.6.15

## Development

### Install dependencies
```bash
yarn
```

### Start development mode
```bash
yarn start:dev
```

## Production

### Build production
```bash
yarn build
```
### Locally preview production build
```bash
yarn start:prod
```

## Code style
The project uses eslint, prettier

```bash
#eslint check
yarn lint

#eslint fix
yarn lint:fix

#prettier check
yarn prettier

#prettier fix
yarn prettier:fix

#check types
yarn tsc
```

## Commits
There are 2 main branches in the repository: `master` and `develop`.
Development is done through develop: issue#1 -> develop. Changes in `develop` start the build on stage.
Then develop is tested and, if there are no errors, is filled into `master`.

The project uses [husky](https://www.npmjs.com/package/husky). When you commit, a pre-commit hook is started, which runs commands to check types, linter, prettier, styles.

It also checks the commit message.
Valid commit message template:
```bash
chore: run tests on travis ci
fix(server): send cors headers (#43)
feat(blog): add comment section
```
