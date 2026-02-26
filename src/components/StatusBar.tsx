import React from 'react';

export const StatusBar = () => (
    <div className="flex justify-between items-end px-6 pb-2 pt-4 text-sm font-semibold tracking-wide select-none z-50">
        <div className="flex items-center gap-1">
            <span>9:41</span>
        </div>
        <div className="flex items-center gap-1.5">
            <span className="material-symbols-outlined text-[18px]">signal_cellular_alt</span>
            <span className="text-xs font-bold">5G</span>
            <div className="flex items-center gap-1">
                <span className="material-symbols-outlined text-[20px] rotate-90">battery_full</span>
            </div>
        </div>
    </div>
);
