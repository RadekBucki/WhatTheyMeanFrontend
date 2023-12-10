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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const query = e.target.value;
    setSearchQuery(query);
  };

  const filteredTranscripts = transcripts?.filter((transcript: Analyse) => {
    const name = transcript.name ? transcript.name.toLowerCase() : '';
    const startDate = transcript.start_date ? transcript.start_date.toLowerCase() : '';
    const finishDate = transcript.finish_date ? transcript.finish_date.toLowerCase() : '';
    const status = transcript.status ? transcript.status.toLowerCase() : '';
    const authorAttitude = transcript.author_attitude ? transcript.author_attitude.toLowerCase() : '';
    const fileType = transcript.file_type ? transcript.file_type.toLowerCase() : '';
    const summary = transcript.video_summary ? transcript.video_summary.toLowerCase() : '';
    const transcription = transcript.full_transcription ? transcript.full_transcription.toLowerCase() : '';

    return (
      name.includes(searchQuery.toLowerCase()) ||
      startDate.includes(searchQuery.toLowerCase()) ||
      finishDate.includes(searchQuery.toLowerCase()) ||
      status.includes(searchQuery.toLowerCase()) ||
      authorAttitude.includes(searchQuery.toLowerCase()) ||
      fileType.includes(searchQuery.toLowerCase()) ||
      summary.includes(searchQuery.toLowerCase()) ||
      transcription.includes(searchQuery.toLowerCase())
    );
  });

  const handleOpenTranscriptionDialog = (transcript: Analyse | null) => {
    setSelectedTranscript(transcript);
    setOpenTranscriptionDialog(true);
  };

  const handleTranscriptionDialog = () => {
    setOpenTranscriptionDialog(!openTranscriptionDialog);
  };

  function deleteTranscript(uuid: string) {
    setTranscripts((prevTranscripts) =>
      prevTranscripts.filter((transcript) => transcript.uuid !== uuid)
    );

    sentimentIdsRepository.remove(uuid);
  }

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
            <Button className="rounded-full bg-teal" onClick={() => setSearchQuery(searchQuery)}>
              <MagnifyingGlassIcon className="h-5 w-5 text-off-white" />
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
                      <Button className="rounded-full bg-bright-pink px-8" onClick={() => deleteTranscript(transcript.uuid)}>
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
