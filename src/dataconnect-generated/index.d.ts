import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, ExecuteQueryOptions, MutationRef, MutationPromise, DataConnectSettings } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;
export const dataConnectSettings: DataConnectSettings;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;




export interface AddBookToLibraryData {
  libraryItem_insert: LibraryItem_Key;
}

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

export interface GetUserLibraryVariables {
  userId: string;
}

export interface LibraryItem_Key {
  id: UUIDString;
  __typename?: 'LibraryItem_Key';
}

export interface User_Key {
  id: string;
  __typename?: 'User_Key';
}

interface GetUserLibraryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetUserLibraryVariables): QueryRef<GetUserLibraryData, GetUserLibraryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: GetUserLibraryVariables): QueryRef<GetUserLibraryData, GetUserLibraryVariables>;
  operationName: string;
}
export const getUserLibraryRef: GetUserLibraryRef;

export function getUserLibrary(vars: GetUserLibraryVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLibraryData, GetUserLibraryVariables>;
export function getUserLibrary(dc: DataConnect, vars: GetUserLibraryVariables, options?: ExecuteQueryOptions): QueryPromise<GetUserLibraryData, GetUserLibraryVariables>;

interface AddBookToLibraryRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: AddBookToLibraryVariables): MutationRef<AddBookToLibraryData, AddBookToLibraryVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: AddBookToLibraryVariables): MutationRef<AddBookToLibraryData, AddBookToLibraryVariables>;
  operationName: string;
}
export const addBookToLibraryRef: AddBookToLibraryRef;

export function addBookToLibrary(vars: AddBookToLibraryVariables): MutationPromise<AddBookToLibraryData, AddBookToLibraryVariables>;
export function addBookToLibrary(dc: DataConnect, vars: AddBookToLibraryVariables): MutationPromise<AddBookToLibraryData, AddBookToLibraryVariables>;

