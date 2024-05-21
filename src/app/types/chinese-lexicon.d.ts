declare module "chinese-lexicon" {
  export function search(term: string, limit?: number): SearchResult[];
  export function getEntries(word: string): Entry[];
  export function getEtymology(character: string): Etymology;
  export function getGloss(character: string, pinyin?: string): string;
  export const allEntries: Entry[];

  export interface SearchResult {
    simp: string;
    trad: string;
    definitions: string[];
    pinyin: string;
    searchablePinyin: string;
    pinyinTones: string;
    simpEtymology?: Etymology;
    tradEtymology?: Etymology;
    statistics: Statistics;
    boost: number;
    usedAsComponentIn: UsedAsComponentIn;
    relevance: number;
  }

  export interface Etymology {
    notes: string;
    definition: string;
    components: Component[];
    images: Image[];
    pinyin: string;
  }

  export interface Component {
    type: Type;
    char: string;
    fragment: number[];
    notes?: string;
    definition: string;
    pinyin: string;
  }

  export enum Type {
    Meaning = "meaning",
    Simplified = "simplified",
    Sound = "sound",
    Iconic = "iconic",
  }

  export interface Image {
    url: string;
    caption: string;
  }

  export interface Statistics {
    hskLevel: number;
    movieWordCount?: number;
    movieWordCountPercent?: number;
    movieWordRank?: number;
    movieWordContexts?: number;
    movieWordContextsPercent?: number;
    bookWordCount?: number;
    bookWordCountPercent?: number;
    bookWordRank?: number;
    movieCharCount?: number;
    movieCharCountPercent?: number;
    movieCharRank?: number;
    movieCharContexts?: number;
    movieCharContextsPercent?: number;
    bookCharCount?: number;
    bookCharCountPercent?: number;
    bookCharRank?: number;
    topWords?: TopWord[];
    pinyinFrequency?: number;
  }

  export interface TopWord {
    word: string;
    share: number;
    trad: string;
    gloss: string;
  }

  export interface UsedAsComponentIn {
    simp: Simp;
    trad: Trad;
  }

  export interface Simp {
    sound?: string[];
    unknown?: string[];
    meaning?: string[];
    simplified?: string[];
    count: number;
    iconic?: string[];
  }

  export interface Trad {
    sound?: string[];
    unknown?: string[];
    meaning?: string[];
    count: number;
    iconic?: string[];
  }

  export interface Entry {
    simp: string;
    trad: string;
    definitions: string[];
    pinyin: string;
    searchablePinyin: string;
    pinyinTones: string;
    simpEtymology: Etymology;
    tradEtymology?: Etymology;
    statistics: Statistics;
    boost: number;
    usedAsComponentIn: UsedAsComponentIn;
  }
}
