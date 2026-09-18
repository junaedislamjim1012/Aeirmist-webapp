import React from 'react';
import { PostStudio } from './post_composer/PostStudio';

export const CreatePost = ({ onOpenChange }: { onOpenChange: (open: boolean) => void }) => {
  return (
    <div className="fixed inset-0 z-50 bg-black/90 sm:backdrop-blur-md flex items-center justify-center p-0 sm:p-4 overflow-hidden">
      <div className="bg-[#05070d] sm:border sm:border-white/10 sm:rounded-3xl w-full h-full sm:h-[92vh] sm:max-w-5xl shadow-2xl relative overflow-hidden flex flex-col">
        <PostStudio onClose={() => onOpenChange(false)} />
      </div>
    </div>
  );
};
