import React from 'react';
import {Typography} from '@material-tailwind/react';

export default function Transcribe() {
  return (
    <div>
      <div className="w-custom p-6 bg-white shadow-md rounded">
        <Typography className="text-selected-blue font-bold text-2xl">
          Transcribe
        </Typography>
      </div>
      <div className={'p-10'}>
        <h1>Transcribe site</h1>
      </div>
    </div>
  );
}
