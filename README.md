# Eko Delivery Service

A RESTFul Web API that provide customers with delivery route information.

## Features

* Route Cost Calculation
* Possible Routes Search
* Cheapest Route Search

## Document

For usage information, please read [API Document](https://documenter.getpostman.com/view/1302079/delivery-service/7TFFEt4)

## Development Setup

### Prerequisites

NodeJS > 8.9 and TypeScript > 2.6

### Installing

Install dependencies:

```
npm install
```

Build TypeScript:

```
npm run tsc
```

Start the server:

```
npm start
```

## Tests

To run the test suite, first install the dependencies, then run `npm run tsc`, finally run `npm test`:

```
npm install
npm run tsc
npm test
```

## Project Structure

```
project
.
├── app                                 # Source files
│   ├── controllers                     # Api source files
│   ├── data-access                     # Data access source files
│   ├── libs                            # General library (general business logic)
│   ├── models                          # Data model source file
│   ├── router.ts                       # Api routing source file
│   ├── server.ts                       # Entry source file
├── dist                                # Compiled files (output of npm run tsc)
├── tests                               # Test files
│   ├── integration                     # Integration test suite
│   └── unit                            # Unit test suite
├── docs                                # Documentation files
├── town-graph.database.json            # Database example for test purpose
├── package.json                        
├── tsconfig.json                       # TypeScript configuration file
└── README.md  

```

To facilitate running the API server for examination purpose, `dist` directory is set to upload to Git along with other source files. The source codes within `dist` are ready to run without TypeScript installed.

To run from `dist` after clone the repository without TypeScript compilation:

```
npm start
```
