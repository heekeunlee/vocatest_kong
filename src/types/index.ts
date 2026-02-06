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

export interface LevelStats {
    unlocked: boolean;
    stars: 0 | 1 | 2 | 3;
    highScore: number;
}

export interface Pet {
    id: string;
    name: string;
    icon: string; // Emoji or Lucide icon name
    price: number;
    description: string;
}

export interface UserProfile {
    coins: number;
    unlockedPets: string[]; // Pet IDs
    equippedPet: string | null;
}

export interface GameState {
    hearts: number;
    streak: number;
}
