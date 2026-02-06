import React from 'react';
import { useGame, AVAILABLE_PETS } from '../context/GameContext';
import { Check, Lock, ShoppingCart } from 'lucide-react';

const Shop: React.FC = () => {
    const { coins, unlockedPets, equippedPet, buyPet, equipPet } = useGame();

    return (
        <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
                <h1 className="text-4xl font-black text-slate-900 mb-2 uppercase tracking-tight">Avatar Shop</h1>
                <p className="text-slate-600 font-medium">Customize your learning companion!</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {AVAILABLE_PETS.map((pet) => {
                    const isUnlocked = unlockedPets.includes(pet.id);
                    const isEquipped = equippedPet === pet.id;
                    const canAfford = coins >= pet.price;

                    return (
                        <div
                            key={pet.id}
                            className={`
                                relative p-6 rounded-xl border-4 transition-all duration-200
                                ${isEquipped
                                    ? 'bg-indigo-100 border-indigo-600 shadow-[6px_6px_0px_0px_rgba(79,70,229,1)]'
                                    : 'bg-white border-slate-900 shadow-[6px_6px_0px_0px_rgba(15,23,42,1)] hover:-translate-y-1 hover:shadow-[8px_8px_0px_0px_rgba(15,23,42,1)]'}
                            `}
                        >
                            <div className="text-6xl mb-4 text-center animate-bounce-slow">{pet.icon}</div>

                            <h3 className="text-xl font-black text-slate-900 mb-1">{pet.name}</h3>
                            <p className="text-sm text-slate-500 font-bold mb-4">{pet.description}</p>

                            <div className="mt-auto">
                                {isUnlocked ? (
                                    <button
                                        onClick={() => equipPet(pet.id)}
                                        disabled={isEquipped}
                                        className={`
                                            w-full py-3 px-4 rounded-lg font-black uppercase tracking-wide border-2
                                            ${isEquipped
                                                ? 'bg-indigo-600 text-white border-indigo-600 opacity-100 cursor-default'
                                                : 'bg-white text-slate-900 border-slate-900 hover:bg-slate-100'}
                                        `}
                                    >
                                        {isEquipped ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <Check className="w-5 h-5" /> Equipped
                                            </span>
                                        ) : 'Equip'}
                                    </button>
                                ) : (
                                    <button
                                        onClick={() => buyPet(pet)}
                                        disabled={!canAfford}
                                        className={`
                                            w-full py-3 px-4 rounded-lg font-black uppercase tracking-wide border-2 transition-all
                                            ${canAfford
                                                ? 'bg-yellow-400 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_rgba(15,23,42,1)] active:translate-y-0.5 active:shadow-none'
                                                : 'bg-slate-200 text-slate-400 border-slate-300 cursor-not-allowed'}
                                        `}
                                    >
                                        {canAfford ? (
                                            <span className="flex items-center justify-center gap-2">
                                                <ShoppingCart className="w-5 h-5" /> Buy {pet.price}
                                            </span>
                                        ) : (
                                            <span className="flex items-center justify-center gap-2">
                                                <Lock className="w-4 h-4" /> Need {pet.price}
                                            </span>
                                        )}
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default Shop;
