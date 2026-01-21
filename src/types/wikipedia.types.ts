// Types pour Wikipedia API

export interface WikipediaSearchResult {
  title: string;
  pageid: number;
  extract?: string;
  thumbnail?: {
    source: string;
    width: number;
    height: number;
  };
}

export interface WikipediaResponse {
  query?: {
    pages?: {
      [key: string]: WikipediaSearchResult;
    };
  };
}
