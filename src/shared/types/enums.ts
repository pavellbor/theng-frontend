export enum CEFRLevel {
  A1 = 'A1',
  A2 = 'A2',
  B1 = 'B1',
  B2 = 'B2',
  C1Plus = 'C1+',
}

export enum Role {
  USER = 'USER',
  ADMIN = 'ADMIN',
  MODERATOR = 'MODERATOR',
}

export enum PartOfSpeech {
  noun = 'noun', // Существительное
  verb = 'verb', // Глагол
  adjective = 'adjective', // Прилагательное
  adverb = 'adverb', // Наречие
  pronoun = 'pronoun', // Местоимение
  preposition = 'preposition', // Предлог
  conjunction = 'conjunction', // Союз
  interjection = 'interjection', // Междометие
  determiner = 'determiner', // Определитель (артикли, указательные местоимения и т.д.)
  auxiliaryVerb = 'auxiliaryVerb', // Вспомогательный глагол
  modalVerb = 'modalVerb', // Модальный глагол
  article = 'article', // Артикль (определенный и неопределенный)
  numeral = 'numeral', // Числительное
  participle = 'participle', // Причастие
  gerund = 'gerund', // Герундий
  infinitiveMarker = 'infinitiveMarker', // Частица "to"
}

export enum GrammarTopicCategory {
  VerbsAndTenses = 'Verbs & tenses', // Глаголы и времена
  ClausesAndQuestions = 'Clauses & questions', // Предложения и вопросы
  ModalVerbs = 'Modal verbs', // Модальные глаголы
  NonfiniteVerbs = 'Nonfinite verbs', // Нефинитные формы глагола
  Nouns = 'Nouns', // Существительные
  Adjectives = 'Adjectives', // Прилагательные
  Adverbs = 'Adverbs', // Наречия
  OtherPartsOfSpeech = 'Other parts of speech', // Другие части речи
} 