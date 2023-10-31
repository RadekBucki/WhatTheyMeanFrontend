import React, {useState} from 'react';
import {Button, Input, Typography} from '@material-tailwind/react';
import {MagnifyingGlassIcon, TrashIcon} from '@heroicons/react/20/solid';
import Transcription from './transcription/Transcription';

export interface TranscriptData {
  uid: number,
  name: string,
  start_date: string,
  status: string,
  duration: string
}
export default function History() {

  const [searchQuery, setSearchQuery] = useState('');
  const [openTranscriptionDialog, setOpenTranscriptionDialog] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<TranscriptData | null>(null);
  const transcripts = [
    {uid: 1, name: 'Transcript 1', status: 'Success', start_date: '2023-04-21 13:45:00', duration: '3 min'}
  ];
  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleOpenTranscriptionDialog = (transcript: TranscriptData | null) => {
    setSelectedTranscript(transcript);
    setOpenTranscriptionDialog(true);
  };

  const handleTranscriptionDialog = () => {
    setOpenTranscriptionDialog(!openTranscriptionDialog);
  };

  return (
    <div>
      <div className="lg:w-custom p-6 bg-white shadow-md rounded">
        <Typography className="text-selected-blue font-bold text-2xl">
          History
        </Typography>
      </div>
      <div className="p-10 sm:p-4">
        <div id="search-clear" className="flex flex-col lg:flex-row lg:justify-between gap-4 items-center">
          <div className="flex flex-row items-center lg:w-1/2 gap-6">
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
          <div className="flex flex-row justify-center items-center gap-6">
            <Typography className="text-selected-blue text-2xl font-bold">
              Clear history
            </Typography>
            <Button className="rounded-full bg-bright-pink">
              <TrashIcon className="h-5 w-5 text-off-white"/>
            </Button>
          </div>
        </div>
        <div className="overflow-x-scroll lg:overflow-x-hidden">
          <div className="min-w-[800px] my-2">
            <div id="transcripts-list" className="mt-10">
              <div className="bg-dark-blue rounded py-4 px-16 mb-6">
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
                  <Typography className="text-xl font-bold text-off-white mr-20">
                    Options
                  </Typography>
                </div>
              </div>
              { transcripts && transcripts?.map((transcript: TranscriptData) => (
                <div key={transcript.uid} className="border-2 border-dark-blue rounded p-6 mb-4">
                  <div className="flex flex-row justify-between items-center ml-4">
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
                    <div className="sm:flex justify-center items-center">
                      <Button className="rounded-full bg-teal px-10 mr-4" onClick={() => handleOpenTranscriptionDialog(transcript)}>
                        View
                      </Button>
                      <Button className="rounded-full bg-bright-pink px-10 mr-2">
                        Delete
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
      <Transcription open={openTranscriptionDialog} handler={handleTranscriptionDialog} selectedTranscript={selectedTranscript} />
    </div>
  );
}
