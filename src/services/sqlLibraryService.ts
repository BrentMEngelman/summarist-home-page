import pool from "./db";
import type { Book } from "./api";
import type { UserLibrary } from "./libraryService";

export async function getUserLibrarySQL(uid: string): Promise<UserLibrary> {
  try {
    const savedRes = await pool.query(
      `SELECT book_data FROM user_saved_books WHERE user_id = $1`,
      [uid],
    );
    const finishedRes = await pool.query(
      `SELECT book_data FROM user_finished_books WHERE user_id = $1`,
      [uid],
    );
    const savedBooks: Book[] = savedRes.rows.map((row: any) => row.book_data);
    const finishedBooks: Book[] = finishedRes.rows.map(
      (row: any) => row.book_data,
    );
    return {
      savedBooks: savedRes.rows.map((row) => row.book_data),
      finishedBooks: finishedRes.rows.map((row) => row.book_data),
    };
  } catch (error) {
    console.error("SQL Error fetching user library:", error);
    return { savedBooks: [], finishedBooks: [] };
  }
}

export async function saveBookToLibrarySQL(
  uid: string,
  book: Book,
): Promise<void> {
  await pool.query(
    `INSERT INTO user_saved_books (user_id, book_id, book_data) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (user_id, book_id) DO NOTHING`,
    [uid, book.id, JSON.stringify(book)],
  );
}

export async function markBookAsFinishedSQL(
  uid: string,
  book: Book,
): Promise<void> {
  await pool.query(
    `INSERT INTO user_finished_books (user_id, book_id, book_data) 
     VALUES ($1, $2, $3) 
     ON CONFLICT (user_id, book_id) DO NOTHING`,
    [uid, book.id, JSON.stringify(book)],
  );
}
