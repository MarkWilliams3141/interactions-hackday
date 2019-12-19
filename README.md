# interactions-hackday

A tool plot areas of risk for additive side-effects when given a patient drug profile. The data is sourced from the Royal Pharmaceutical Societies Optimised Content API.

- Risk profile by body system pie chart
- Risk profile 'matrix' by severity and frequency

## Background

This was a single day hackday project to investigate ways to present data from Martindale's Adverse Drug Reaction.

## Limitations

- The Optimised Content API is still a WIP progress so much of the data is mostly unavailable or broken. 
- A reverse proxy has not been created to expect to see CORs errors. The workaround is to use the CORS unblock extension for your browser or configure your browsers security settings to ignore CORs policy.

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```
