import React, {useState} from 'react';
import {Button, Input, Typography} from '@material-tailwind/react';
import {MagnifyingGlassIcon, TrashIcon} from "@heroicons/react/20/solid";

interface TranscriptData {
  name: string,
  start_date: string,
  status: string,
  duration: string
}
export default function History() {

  const [searchQuery, setSearchQuery] = useState('');
  const transcripts = [
    {name: 'Transcript 1', status: 'Success', start_date: '2023-04-21 13:45:00', duration: '3 min'}
  ]
  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  return (
    <div>
      <div className="w-custom p-6 bg-white shadow-md rounded">
        <Typography className="text-selected-blue font-bold text-2xl">
          History
        </Typography>
      </div>
      <div className={'p-10'}>
        <div id="search-clear" className="flex flex-row justify-between gap-4 items-center">
          <div className="flex flex-row items-center w-1/2 gap-6">
            <div className="w-full">
              <Input
                variant="outlined"
                label="Search"
                crossOrigin={undefined}
                value={searchQuery}
                onChange={handleInputChange}
              />
            </div>
            <Button className="rounded-full bg-teal" onClick={handleSearch}>
              <MagnifyingGlassIcon className="h-5 w-5 text-off-white"/>
            </Button>
          </div>
          <div className="flex flex-row justify-end items-center gap-6">
            <Typography className="text-selected-blue text-2xl font-bold">
              Clear history
            </Typography>
            <Button className="rounded-full bg-bright-pink">
              <TrashIcon className="h-5 w-5 text-off-white"/>
            </Button>
          </div>
        </div>
        <div id="transcripts-list" className="mt-10">
          <div className="bg-dark-blue rounded py-4 px-6 mb-6">
            <div className="flex flex-row justify-between items-center">
              <Typography className="text-xl font-bold text-off-white">
                Name
              </Typography>
              <Typography className="text-xl font-bold text-off-white">
                Status
              </Typography>
              <Typography className="text-xl font-bold text-off-white">
                Start date
              </Typography>
              <Typography className="text-xl font-bold text-off-white">
                Duration
              </Typography>
            </div>
          </div>
          { transcripts && transcripts?.map((transcript: TranscriptData) => (
            <div className="border-2 border-dark-blue rounded p-6">
              <div className="flex flex-row justify-between items-center">
                <Typography className="text-xl font-bold text-selected-blue">
                  {transcript.name}
                </Typography>
                <Typography className="text-xl font-bold text-selected-blue">
                  {transcript.status}
                </Typography>
                <Typography className="text-xl font-bold text-selected-blue">
                  {transcript.start_date}
                </Typography>
                <Typography className="text-xl font-bold text-selected-blue">
                  {transcript.duration}
                </Typography>
                <div>
                  <Button className="rounded-full bg-teal px-10 mr-10">
                    View
                  </Button>
                  <Button className="rounded-full bg-bright-pink px-10">
                    Delete
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
