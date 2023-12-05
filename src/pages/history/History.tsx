import React, {useEffect, useState} from 'react';
import {Button, Input, Typography} from '@material-tailwind/react';
import {MagnifyingGlassIcon} from '@heroicons/react/20/solid';
import Transcription from './transcription/Transcription';
import useSentimentIdsRepository from '../../hooks/useSentimentIdsRepository';
import {GetRequestHookInterface} from '../../communication/network/GetRequests';
import {Analyse} from '../../communication/Types';

export default function History({ get }: GetRequestHookInterface) {

  const [searchQuery, setSearchQuery] = useState('');
  const [openTranscriptionDialog, setOpenTranscriptionDialog] = useState(false);
  const [selectedTranscript, setSelectedTranscript] = useState<Analyse | null>(null);

  const [transcripts, setTranscripts] = useState<Analyse[]>([]);
  const sentimentIdsRepository = useSentimentIdsRepository();
  const sessionUuids = sentimentIdsRepository.getAll();

  useEffect(() => {
    get.getAnalyzeHistory(sessionUuids).then(res => setTranscripts(res));
  }, []);

  const handleSearch = () => {
    console.log('Search query:', searchQuery);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const filteredTranscripts = transcripts?.filter((transcript: Analyse) => {
    return (
      transcript.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcript.author_attitude.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcript.file_type.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcript.full_transcription.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcript.start_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcript.finish_date.toLowerCase().includes(searchQuery.toLowerCase()) ||
      transcript.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenTranscriptionDialog = (transcript: Analyse | null) => {
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
        <div id="search-clear" className="flex flex-col lg:flex-row lg:justify-between gap-4 items-center mt-4">
          <div className="flex flex-row items-center w-full lg:w-1/2 gap-6">
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
        </div>
        <div className="overflow-x-scroll xl:overflow-x-hidden">
          <div className="min-w-[800px] my-2">
            <div id="transcripts-list" className="mt-8">
              <div className="bg-dark-blue rounded py-4 px-16 mb-6">
                <div className="flex flex-row justify-between items-center">
                  <Typography className="text-xl font-bold text-off-white flex-1">
                    Name
                  </Typography>
                  <Typography className="text-xl font-bold text-off-white flex-1">
                    Status
                  </Typography>
                  <Typography className="text-xl font-bold text-off-white flex-1">
                    Start date
                  </Typography>
                  <Typography className="text-xl font-bold text-off-white flex-1">
                    Finish date
                  </Typography>
                  <Typography className="text-xl font-bold text-off-white flex-1 text-center">
                    Options
                  </Typography>
                </div>
              </div>
              {filteredTranscripts && filteredTranscripts.map((transcript: Analyse) => (
                <div key={transcript.uuid} className="border-2 border-dark-blue rounded p-6 mb-4">
                  <div className="flex flex-row justify-between items-center ">
                    <Typography variant="h5" className="text-xl font-bold text-selected-blue flex-1 ml-6">
                      <p>{transcript.name}</p>
                    </Typography>
                    <Typography variant="h5" className="text-xl font-bold text-selected-blue flex-1">
                      <p>{transcript.status}</p>
                    </Typography>
                    <Typography variant="h5" className="text-xl font-bold text-selected-blue flex-1">
                      <p>{transcript.start_date}</p>
                    </Typography>
                    <Typography variant="h5" className="text-xl font-bold text-selected-blue flex-1">
                      <p>{transcript.finish_date}</p>
                    </Typography>
                    <div className="flex justify-center items-center flex-1 mr-6 lg:mr-0 flex-col lg:flex-row gap-4">
                      <Button className="rounded-full bg-teal px-10" onClick={() => handleOpenTranscriptionDialog(transcript)}>
                        View
                      </Button>
                      <Button className="rounded-full bg-bright-pink px-8" onClick={() => useSentimentIdsRepository().remove(transcript.uuid)}>
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
