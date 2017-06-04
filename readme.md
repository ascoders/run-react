run react project.

# CLI

## Install

```bash
yarn add run-react --dev
```

## Add `run-react` to package.json

```json
"run-react": {
    "entrys": [
        "docs/index.tsx"
    ],
    "dlls": [
        "react",
        "react-dom"
    ]
}
```

## Or add `run-react.json` in root dir

```json
{
    "entrys": [
        "docs/index.tsx"
    ],
    "dlls": [
        "react",
        "react-dom"
    ]
}
```

## start dev server

```typescript
run-react --dev
```
