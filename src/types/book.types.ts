// Types pour Open Library API

export interface Book {
  key: string;
  title: string;
  author_name?: string[];
  author_key?: string[];
  first_publish_year?: number;
  isbn?: string[];
  cover_i?: number;
  publisher?: string[];
  subject?: string[];
  language?: string[];
  number_of_pages_median?: number;
  edition_count?: number;
}

export interface BookSearchResponse {
  numFound: number;
  start: number;
  docs: Book[];
}

export interface BookDetail {
  key: string;
  title: string;
  description?: string | { type: string; value: string };
  covers?: number[];
  authors?: Array<{ author: { key: string } }>;
  subjects?: string[];
  subject_places?: string[];
  subject_times?: string[];
  publishers?: string[];
  publish_date?: string;
  publish_places?: string[];
  number_of_pages?: number;
  isbn_10?: string[];
  isbn_13?: string[];
  works?: Array<{ key: string }>;
}

export interface Author {
  key: string;
  name: string;
  personal_name?: string;
  birth_date?: string;
  death_date?: string;
  bio?: string | { type: string; value: string };
  photos?: number[];
  alternate_names?: string[];
}

export interface RecentChange {
  id: string;
  kind: string;
  timestamp: string;
  author?: {
    key: string;
  } | null;
  ip?: string;
  comment?: string;
  changes?: Array<{
    key: string;
    revision: number;
  }>;
  data?: {
    master?: string;
    duplicates?: string[];
    [key: string]: unknown;
  };
}

export interface SearchParams {
  query?: string;
  author?: string;
  title?: string;
  subject?: string;
  publisher?: string;
  language?: string;
  page?: number;
  sort?: 'new' | 'old' | 'random' | 'key';
  yearFrom?: number;
  yearTo?: number;
}

// Types pour les endpoints spécifiques selon la doc
export interface WorkEditions {
  size: number;
  links: {
    self: string;
    work: string;
    next?: string;
  };
  entries: BookDetail[];
}

export interface AuthorWorks {
  size: number;
  links: {
    self: string;
    author: string;
    next?: string;
  };
  entries: Array<{
    key: string;
    title: string;
    [key: string]: unknown;
  }>;
}

export interface SubjectResponse {
  key: string;
  name: string;
  subject_type: string;
  work_count: number;
  works: SubjectWork[];
  ebook_count?: number;
  authors?: SubjectAuthor[];
  subjects?: string[];
  publishers?: SubjectPublisher[];
}

export interface SubjectWork {
  key: string;
  title: string;
  edition_count: number;
  cover_id?: number;
  cover_edition_key?: string;
  subject: string[];
  ia_collection?: string[];
  lendinglibrary?: boolean;
  printdisabled?: boolean;
  lending_edition?: string;
  lending_identifier?: string;
  authors: Array<{
    key: string;
    name: string;
  }>;
  first_publish_year?: number;
  ia?: string[];
  public_scan?: boolean;
  has_fulltext?: boolean;
  availability?: {
    status: string;
    available_to_browse?: boolean;
    available_to_borrow?: boolean;
    available_to_waitlist?: boolean;
    is_printdisabled?: boolean;
    is_readable?: boolean;
    is_lendable?: boolean;
    identifier?: string;
  };
}

export interface SubjectAuthor {
  key: string;
  name: string;
  work_count: number;
}

export interface SubjectPublisher {
  name: string;
  count: number;
}