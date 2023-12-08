import React from 'react';
import {Button, Dialog, DialogBody, DialogFooter, DialogHeader} from '@material-tailwind/react';
import {ArrowDownTrayIcon} from '@heroicons/react/24/solid';
import useAnalyseDataSaver from '../../../hooks/useAnalyseDataSaver';
import {Analyse} from '../../../communication/Types';

interface TranscriptProps {
  open: boolean;
  handler: () => void;
  selectedTranscript: Analyse | null;
}

const Transcription: React.FC<TranscriptProps> = ({ open, handler, selectedTranscript }) => {
  const analyseDataSaver = useAnalyseDataSaver();
  return (
    <div>
      <Dialog size="lg" open={open} handler={handler}>
        <DialogHeader className="text-3xl justify-center">History - {selectedTranscript?.name}</DialogHeader>
        <DialogBody className="text-xl text-selected-blue overflow-y-auto" style={{maxHeight: '60vh'}}>
          <div className="flex flex-col md:flex-row items-center gap-4 px-4">
            <div className={'w-3/4'}>
              <p className="mb-6">
                <span className="font-semibold">Start date:</span> {selectedTranscript?.start_date}
              </p>
              <p className="mb-6">
                <span className="font-semibold">Finish date:</span> {selectedTranscript?.finish_date}
              </p>
              <p className={'mb-6'}>
                <span className="font-semibold">Status:</span> {selectedTranscript?.status}
              </p>
              <p className={'mb-6'}>
                <span className="font-semibold">Author Attitude:</span> {selectedTranscript?.author_attitude}
              </p>
              <p className={'mb-6'}>
                <span className="font-semibold">File type:</span> {selectedTranscript?.file_type}
              </p>
              <p className={'mb-6'}>
                <span className="font-semibold">Summary:</span> {selectedTranscript?.video_summary}
              </p>
              <p className={'mb-6'}>
                <span className="font-semibold">Transcription:</span> {selectedTranscript?.full_transcription}
              </p>
            </div>
            <div className="w-full px-2 lg:w-2/3 lg:px-0">
              <img className={'rounded-xl'} alt="Audio board image" src="https://images.unsplash.com/photo-1525022340574-113732565927?auto=format&fit=crop&q=80&w=2050&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"/>
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="flex gap-4 justify-center">
          <Button
            onClick={() => {
              if (selectedTranscript) {
                analyseDataSaver.saveToPdf(selectedTranscript);
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
