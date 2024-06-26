# Schemas

This package contains the schemas used by the API and frontend to validate the data.

## Configuration

The package is transpiled from TypeScript to JavaScript using the `tsc` command. 
It is transpiled in a CommonJS module format, so it can be used in NestJS API. And a Ecmascript module format, so it can be used in the NextJs frontend (see tsconfig.*.json files).

## Schema files

The schema files are located in the `src` folder. The schema use Zod to validate the data.