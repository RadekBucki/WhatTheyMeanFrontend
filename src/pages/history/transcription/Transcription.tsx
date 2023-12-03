import React from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from '@material-tailwind/react';
import {TranscriptData} from '../../../types';
import {ArrowDownTrayIcon} from '@heroicons/react/24/solid';
import useAnalyseDataSaver from '../../../hooks/useAnalyseDataSaver';

interface TranscriptProps {
  open: boolean;
  handler: () => void;
  selectedTranscript: TranscriptData | null;
}

const Transcription: React.FC<TranscriptProps> = ({ open, handler, selectedTranscript }) => {
  const analyseDataSaver = useAnalyseDataSaver();
  return (
    <div>
      <Dialog size="lg" open={open} handler={handler}>
        <DialogHeader className="text-3xl justify-center">History - {selectedTranscript?.name}</DialogHeader>
        <DialogBody className="text-xl text-selected-blue">
          <div className="flex flex-col md:flex-row items-center gap-4 px-4">
            <div className={'w-3/4'}>
              <p className="mb-6">
                <span className="font-semibold">Start date:</span> {selectedTranscript?.start_date}
              </p>
              <p className={'mb-6'}>
                <span className="font-semibold">Status:</span> {selectedTranscript?.status}
              </p>
              <p className={'mb-6'}>
                <span className="font-semibold">Duration:</span> {selectedTranscript?.duration}
              </p>
            </div>
            <div className="w-2/3">
              <img className={'rounded-xl'} alt="Audio board image" src="https://images.unsplash.com/photo-1525022340574-113732565927?auto=format&fit=crop&q=80&w=2050&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-4 justify-center">
          <Button
            onClick={() => {
              if (selectedTranscript) {
                analyseDataSaver.saveToPdf({
                  name: 'Analyse 1',
                  start_date: '2023-04-21 13:45:00',
                  finish_date: '2023-04-21 13:48:00',
                  status: 'Success',
                  file_type: 'mp4',
                  link: 'https://www.youtube.com/watch?v=1',
                  raw_file: 'base64',
                  full_transcription: 'Full transcription',
                  video_summary: 'Video summary',
                  author_attitude: 'Author attitude',
                });
              }
              handler();
            }}
            className="flex items-center gap-2 bg-teal hover:bg-teal px-6"
          >
            <ArrowDownTrayIcon className={'w-5 h-4'}/>
            Download
          </Button>
          <Button
            onClick={() => {
              handler();
            }}
            className="bg-bright-pink hover:bg-bright-pink px-12 "
          >
            <span>Cancel</span>
          </Button>
        </DialogFooter>
      </Dialog>
    </div>
  );
};

export default Transcription;
