import { CEFRLevel, GrammarTopicCategory, PartOfSpeech } from './enums';

export interface Word {
  id: number;
  word: string;
  russianTranslation: string;
  partOfSpeech: PartOfSpeech;
  cefrLevel: CEFRLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface Sentence {
  id: number;
  englishSentence: string;
  russianTranslation: string;
  literalTranslation?: string | null;
  grammarTopicId: number;
  wordId: number;
  cefrLevel: CEFRLevel;
  createdAt: Date;
  updatedAt: Date;
}

export interface GrammarTopic {
  id: number;
  name: string;
  description: string;
  category: GrammarTopicCategory;
  cefrLevel: CEFRLevel;
  createdAt: Date;
  updatedAt: Date;
} 