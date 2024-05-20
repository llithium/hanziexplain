export interface ChineseLexicon {
  search: (searchQuery: string) => SearchResult[];
}

export interface SearchResult {
  simp: string;
  trad: string;
  definitions: string[];
  pinyin: string;
  searchablePinyin: string;
  pinyinTones: string;
  statistics: Statistics;
  boost: number;
  usedAsComponentIn: UsedAsComponentIn;
  relevance: number;
}

export interface Statistics {
  hskLevel: number;
  bookWordCount: number;
  bookWordCountPercent: number;
  bookWordRank: number;
  bookCharCount: number;
  bookCharCountPercent: number;
  bookCharRank: number;
  topWords: TopWord[];
}

export interface TopWord {}

export interface UsedAsComponentIn {
  simp: TopWord[];
  trad: TopWord[];
}
