import React from 'react';
import { vocabularyList } from '../data/vocabulary';
import WordCard from '../components/WordCard';

const Learn: React.FC = () => {
    return (
        <div className="max-w-3xl mx-auto">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-slate-900 mb-2">Learning Mode</h1>
                <p className="text-slate-600">
                    Review all {vocabularyList.length} words in your collection. Click on a card to define it.
                </p>
            </div>

            <div className="space-y-4">
                {vocabularyList.map((item) => (
                    <WordCard key={item.id} item={item} showMeaning={false} />
                ))}
            </div>
        </div>
    );
};

export default Learn;
