import React, { createContext, useContext, useState, useEffect } from 'react';
import type { UserProfile, Pet } from '../types';

interface GameContextType {
    coins: number;
    unlockedPets: string[];
    equippedPet: string | null;
    addCoins: (amount: number) => void;
    buyPet: (pet: Pet) => boolean;
    equipPet: (petId: string) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

// ECONOMY REBALANCE 3.0 (User Custom Order)
// Order: Egg -> Chick -> Mouse -> Dog -> King Kong -> Officer -> Ninja -> T-Rex -> Unicorn -> Dragon -> Hero
// Total Run Earnings: ~4,800 Coins
export const AVAILABLE_PETS: Pet[] = [
    // Rank F
    { id: 'egg', name: 'Egg', icon: '🥚', price: 0, description: 'Just an egg. Rank F.' },

    // Rank D
    { id: 'chick', name: 'Chick', icon: '🐣', price: 300, description: 'It hatched! Rank D' },
    { id: 'mouse', name: 'Mouse', icon: '🐭', price: 500, description: 'Squeak. Rank D' },

    // Rank C
    { id: 'dog', name: 'Blocky Dog', icon: '🐶', price: 900, description: 'Loyal buddy. Rank C' },
    { id: 'kingkong', name: 'King Kong', icon: '🦍', price: 1200, description: 'Strong! Rank C' },

    // Rank B
    { id: 'police', name: 'Officer', icon: '👮', price: 1800, description: 'Grammar Police. Rank B' },
    { id: 'ninja', name: 'Ninja', icon: '🥷', price: 2400, description: 'Silent learner. Rank B' },

    // Rank A
    { id: 'trex', name: 'T-Rex', icon: '🦖', price: 3200, description: 'Jurassic King. Rank A' },
    { id: 'unicorn', name: 'Uni-Corn', icon: '🦄', price: 4000, description: 'Magical. Rank A' },

    // Rank S
    { id: 'dragon', name: 'Ender Dragon', icon: '🐲', price: 5000, description: 'The Ruler. Rank S' },
    { id: 'hero', name: 'Super Hero', icon: '🦸', price: 6000, description: 'Ultimate Legend. Rank S' },
];

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [profile, setProfile] = useState<UserProfile>({
        coins: 100, // Small bonus for new players
        unlockedPets: ['egg'],
        equippedPet: 'egg'
    });

    useEffect(() => {
        const saved = localStorage.getItem('vocab_game_profile');
        if (saved) {
            setProfile(JSON.parse(saved));
        }
    }, []);

    useEffect(() => {
        // Save whenever profile changes
        localStorage.setItem('vocab_game_profile', JSON.stringify(profile));
    }, [profile]);

    const addCoins = (amount: number) => {
        setProfile(prev => ({ ...prev, coins: prev.coins + amount }));
    };

    const buyPet = (pet: Pet): boolean => {
        if (profile.coins >= pet.price && !profile.unlockedPets.includes(pet.id)) {
            setProfile(prev => ({
                ...prev,
                coins: prev.coins - pet.price,
                unlockedPets: [...prev.unlockedPets, pet.id],
                equippedPet: pet.id // Auto equip on buy
            }));
            return true;
        }
        return false;
    };

    const equipPet = (petId: string) => {
        if (profile.unlockedPets.includes(petId)) {
            setProfile(prev => ({ ...prev, equippedPet: petId }));
        }
    };

    return (
        <GameContext.Provider value={{
            coins: profile.coins,
            unlockedPets: profile.unlockedPets,
            equippedPet: profile.equippedPet,
            addCoins,
            buyPet,
            equipPet
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGame = () => {
    const context = useContext(GameContext);
    if (context === undefined) {
        throw new Error('useGame must be used within a GameProvider');
    }
    return context;
};
