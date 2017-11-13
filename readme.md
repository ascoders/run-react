# run-react

Run react project.

## Install

```bash
npm i run-react -D
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

```bash
run-react develop
```

## production build

```bash
run-react production
```

## test

```bash
run-react test
```