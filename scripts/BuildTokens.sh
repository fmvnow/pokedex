npx token-transformer assets/tokens/tokens.json assets/tokens/ref.json ref
npx token-transformer assets/tokens/tokens.json assets/tokens/sys.json ref,sys --resolveReferences=false
npx token-transformer assets/tokens/tokens.json assets/tokens/dark.json ref,dark --resolveReferences=false

node ./scripts/TokenConversor.js
