const BASE_URL = "https://us-central1-summaristt.cloudfunctions.net";

export interface Book {
  id: string;
  author: string;
  title: string;
  subTitle: string;
  imageLink: string;
  audioLink: string;
  audioLength?: string; // Add this optional field
  totalRating: number;
  averageRating: number;
  keyIdeas: number;
  type: string;
  status: string;
  subscriptionRequired: boolean;
  summary: string;
  tags: string[];
  bookDescription: string;
  authorDescription: string;
}

export async function getSelectedBook(): Promise<Book | null> {
  try {
    const res = await fetch(`${BASE_URL}/getBooks?status=selected`);
    const data = await res.json();
    return data[0] || null;
  } catch (error) {
    console.error("Failed to fetch selected book", error);
    return null;
  }
}

export async function getRecommendedBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${BASE_URL}/getBooks?status=recommended`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch recommended books", error);
    return [];
  }
}

export async function getSuggestedBooks(): Promise<Book[]> {
  try {
    const res = await fetch(`${BASE_URL}/getBooks?status=suggested`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch suggested books", error);
    return [];
  }
}

export async function getBookById(id: string): Promise<Book | null> {
  try {
    const res = await fetch(`${BASE_URL}/getBook?id=${id}`);
    return await res.json();
  } catch (error) {
    console.error("Failed to fetch book details", error);
    return null;
  }
}

export async function searchBooks(query: string): Promise<Book[]> {
  try {
    const res = await fetch(
      `${BASE_URL}/getBooksByAuthorOrTitle?search=${query}`,
    );
    return await res.json();
  } catch (error) {
    console.error("Failed to search books", error);
    return [];
  }
}
