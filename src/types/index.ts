export interface VocabularyItem {
    id: number;
    word: string;
    meaning: string;
    pronunciation?: string;
    exampleSentence?: string;
    exampleTranslation?: string;
    category?: string;
}

export interface QuizResult {
    correct: number;
    total: number;
    wrongIds: number[];
}
