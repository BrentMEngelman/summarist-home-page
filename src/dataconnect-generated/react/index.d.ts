import { GetUserLibraryData, GetUserLibraryVariables, AddBookToLibraryData, AddBookToLibraryVariables } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useGetUserLibrary(vars: GetUserLibraryVariables, options?: useDataConnectQueryOptions<GetUserLibraryData>): UseDataConnectQueryResult<GetUserLibraryData, GetUserLibraryVariables>;
export function useGetUserLibrary(dc: DataConnect, vars: GetUserLibraryVariables, options?: useDataConnectQueryOptions<GetUserLibraryData>): UseDataConnectQueryResult<GetUserLibraryData, GetUserLibraryVariables>;

export function useAddBookToLibrary(options?: useDataConnectMutationOptions<AddBookToLibraryData, FirebaseError, AddBookToLibraryVariables>): UseDataConnectMutationResult<AddBookToLibraryData, AddBookToLibraryVariables>;
export function useAddBookToLibrary(dc: DataConnect, options?: useDataConnectMutationOptions<AddBookToLibraryData, FirebaseError, AddBookToLibraryVariables>): UseDataConnectMutationResult<AddBookToLibraryData, AddBookToLibraryVariables>;
