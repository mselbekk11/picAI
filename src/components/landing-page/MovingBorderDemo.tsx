'use client';
import React from 'react';
import { Button } from '../ui/moving-border';

export function MovingBorderDemo() {
  return (
    <div>
      <Button borderRadius='1.75rem' className='bg-slate-900 text-white border-slate-800'>
        Borders are cool
      </Button>
    </div>
  );
}
