# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**If you're looking for the `React README`, you can find it at [`dataconnect-generated/react/README.md`](./react/README.md)**

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*GetUserLibrary*](#getuserlibrary)
- [**Mutations**](#mutations)
  - [*AddBookToLibrary*](#addbooktolibrary)

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@dataconnect/generated';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:
- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:
- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetUserLibrary
You can execute the `GetUserLibrary` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
getUserLibrary(vars: GetUserLibraryVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLibraryData, GetUserLibraryVariables>;

interface GetUserLibraryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserLibraryVariables): QueryRef<GetUserLibraryData, GetUserLibraryVariables>;
}
export const getUserLibraryRef: GetUserLibraryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getUserLibrary(dc: DataConnect, vars: GetUserLibraryVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLibraryData, GetUserLibraryVariables>;

interface GetUserLibraryRef {
  ...
  (dc: DataConnect, vars: GetUserLibraryVariables): QueryRef<GetUserLibraryData, GetUserLibraryVariables>;
}
export const getUserLibraryRef: GetUserLibraryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getUserLibraryRef:
```typescript
const name = getUserLibraryRef.operationName;
console.log(name);
```

### Variables
The `GetUserLibrary` query requires an argument of type `GetUserLibraryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetUserLibraryVariables {
  userId: string;
}
```
### Return Type
Recall that executing the `GetUserLibrary` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetUserLibraryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface GetUserLibraryData {
  libraryItems: ({
    id: UUIDString;
    bookId: string;
    title: string;
    author: string;
    coverImage: string;
    audioLength: string;
    status: string;
    addedAt: TimestampString;
  } & LibraryItem_Key)[];
}
```
### Using `GetUserLibrary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getUserLibrary, GetUserLibraryVariables } from '@dataconnect/generated';

// The `GetUserLibrary` query requires an argument of type `GetUserLibraryVariables`:
const getUserLibraryVars: GetUserLibraryVariables = {
  userId: ..., 
};

// Call the `getUserLibrary()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getUserLibrary(getUserLibraryVars);
// Variables can be defined inline as well.
const { data } = await getUserLibrary({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getUserLibrary(dataConnect, getUserLibraryVars);

console.log(data.libraryItems);

// Or, you can use the `Promise` API.
getUserLibrary(getUserLibraryVars).then((response) => {
  const data = response.data;
  console.log(data.libraryItems);
});
```

### Using `GetUserLibrary`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getUserLibraryRef, GetUserLibraryVariables } from '@dataconnect/generated';

// The `GetUserLibrary` query requires an argument of type `GetUserLibraryVariables`:
const getUserLibraryVars: GetUserLibraryVariables = {
  userId: ..., 
};

// Call the `getUserLibraryRef()` function to get a reference to the query.
const ref = getUserLibraryRef(getUserLibraryVars);
// Variables can be defined inline as well.
const ref = getUserLibraryRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getUserLibraryRef(dataConnect, getUserLibraryVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.libraryItems);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.libraryItems);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:
- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:
- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## AddBookToLibrary
You can execute the `AddBookToLibrary` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [dataconnect-generated/index.d.ts](./index.d.ts):
```typescript
addBookToLibrary(vars: AddBookToLibraryVariables): MutationPromise<AddBookToLibraryData, AddBookToLibraryVariables>;

interface AddBookToLibraryRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddBookToLibraryVariables): MutationRef<AddBookToLibraryData, AddBookToLibraryVariables>;
}
export const addBookToLibraryRef: AddBookToLibraryRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
addBookToLibrary(dc: DataConnect, vars: AddBookToLibraryVariables): MutationPromise<AddBookToLibraryData, AddBookToLibraryVariables>;

interface AddBookToLibraryRef {
  ...
  (dc: DataConnect, vars: AddBookToLibraryVariables): MutationRef<AddBookToLibraryData, AddBookToLibraryVariables>;
}
export const addBookToLibraryRef: AddBookToLibraryRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the addBookToLibraryRef:
```typescript
const name = addBookToLibraryRef.operationName;
console.log(name);
```

### Variables
The `AddBookToLibrary` mutation requires an argument of type `AddBookToLibraryVariables`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface AddBookToLibraryVariables {
  id: UUIDString;
  userId: string;
  bookId: string;
  title: string;
  author: string;
  coverImage: string;
  audioLength: string;
  status: string;
  addedAt: TimestampString;
}
```
### Return Type
Recall that executing the `AddBookToLibrary` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `AddBookToLibraryData`, which is defined in [dataconnect-generated/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface AddBookToLibraryData {
  libraryItem_insert: LibraryItem_Key;
}
```
### Using `AddBookToLibrary`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, addBookToLibrary, AddBookToLibraryVariables } from '@dataconnect/generated';

// The `AddBookToLibrary` mutation requires an argument of type `AddBookToLibraryVariables`:
const addBookToLibraryVars: AddBookToLibraryVariables = {
  id: ..., 
  userId: ..., 
  bookId: ..., 
  title: ..., 
  author: ..., 
  coverImage: ..., 
  audioLength: ..., 
  status: ..., 
  addedAt: ..., 
};

// Call the `addBookToLibrary()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await addBookToLibrary(addBookToLibraryVars);
// Variables can be defined inline as well.
const { data } = await addBookToLibrary({ id: ..., userId: ..., bookId: ..., title: ..., author: ..., coverImage: ..., audioLength: ..., status: ..., addedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await addBookToLibrary(dataConnect, addBookToLibraryVars);

console.log(data.libraryItem_insert);

// Or, you can use the `Promise` API.
addBookToLibrary(addBookToLibraryVars).then((response) => {
  const data = response.data;
  console.log(data.libraryItem_insert);
});
```

### Using `AddBookToLibrary`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, addBookToLibraryRef, AddBookToLibraryVariables } from '@dataconnect/generated';

// The `AddBookToLibrary` mutation requires an argument of type `AddBookToLibraryVariables`:
const addBookToLibraryVars: AddBookToLibraryVariables = {
  id: ..., 
  userId: ..., 
  bookId: ..., 
  title: ..., 
  author: ..., 
  coverImage: ..., 
  audioLength: ..., 
  status: ..., 
  addedAt: ..., 
};

// Call the `addBookToLibraryRef()` function to get a reference to the mutation.
const ref = addBookToLibraryRef(addBookToLibraryVars);
// Variables can be defined inline as well.
const ref = addBookToLibraryRef({ id: ..., userId: ..., bookId: ..., title: ..., author: ..., coverImage: ..., audioLength: ..., status: ..., addedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = addBookToLibraryRef(dataConnect, addBookToLibraryVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.libraryItem_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.libraryItem_insert);
});
```

