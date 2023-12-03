import React, {ChangeEvent, useEffect, useState} from 'react';
import {
  Button,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader, Input,
  Progress,
  Textarea,
  Typography
} from '@material-tailwind/react';
import {
  ArrowDownTrayIcon,
  ClipboardDocumentIcon,
  DocumentMagnifyingGlassIcon, GlobeAltIcon
} from '@heroicons/react/24/solid';
import {SocketContainerInterface} from '../../sockets/UseSocketContainer';
import {useSocketHooks} from '../../sockets/SocketHooks';
import {PostRequestHookInterface} from '../../communication/network/PostRequests';
import useAnalyseDataSaver from '../../hooks/useAnalyseDataSaver';
import {GetRequestHookInterface} from '../../communication/network/GetRequests';
import {Analyse} from '../../communication/Types';

export default function Transcribe({ post, get, socketContainer }: PostRequestHookInterface & GetRequestHookInterface & SocketContainerInterface) {

  const [openWebLinkDialog, setOpenWebLinkDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [isTranscribing, setIsTranscribing] = useState<boolean>(false);
  const [webLink, setWebLink] = useState<string>('');
  const [showError, setShowError] = useState<boolean>(false);
  const [currentAnalysisID, setCurrentAnalysisID] = useState<string>('');
  const [currentAnalysisResult, setCurrentAnalysisResult] = useState<Analyse | null>(null);
  const handleOpenWebLinkDialog = () => setOpenWebLinkDialog(!openWebLinkDialog);

  const handleConfirmWebLinkDialog = () => {
    setShowError(false);

    if (webLink === '') {
      setShowError(true);
      return;
    }

    setOpenWebLinkDialog(!openWebLinkDialog);
    setIsTranscribing(true);

    post.postRegisterUrl(webLink).then(uuid => {
      setCurrentAnalysisID(uuid.analysis_uuid);
      socket.startAnal(uuid.analysis_uuid);
    });
  };

  useEffect(() => {
    if (socketContainer.progress === '100') {
      get.getAnalyze(currentAnalysisID).then(res => {
        setCurrentAnalysisResult(res);
      });
    }
  }, [socketContainer.progress]);

  const handleOpenFileBrowser = () => {
    document.getElementById('fileInput')?.click();
  };
  const socket = useSocketHooks();
  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
    if (file) {
      post.postRegisterFile(file).then(uuid => {
        socket.startAnal(uuid.analysis_uuid);
      });
    }
    selectedFile;
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(currentAnalysisResult?.video_summary as string);
  };

  const analyseDataSaver = useAnalyseDataSaver();
  const handleSaveTranscriptData = () => analyseDataSaver.saveToPdf({
    name: currentAnalysisResult?.name as string,
    start_date: currentAnalysisResult?.start_date as string,
    finish_date: currentAnalysisResult?.finish_date as string,
    status: currentAnalysisResult?.status as string,
    file_type: currentAnalysisResult?.file_type as string,
    link: currentAnalysisResult?.link as string,
    raw_file: currentAnalysisResult?.raw_file as string,
    full_transcription: currentAnalysisResult?.full_transcription as string,
    video_summary: currentAnalysisResult?.video_summary as string,
    author_attitude: currentAnalysisResult?.author_attitude as string,
  });

  return (
    <div>
      <div className="lg:w-custom p-6 bg-white shadow-md rounded">
        <Typography className="text-selected-blue font-bold text-2xl">
          Transcribe
        </Typography>
      </div>
      <div className={'p-24'}>
        <Typography className="text-selected-blue font-bold text-2xl text-center">
          Choose audio type
        </Typography>

        <div className={'flex flex-col xl:flex-row justify-center gap-24 mt-24'}>
          <Button data-testid="webLinkButton" className={'bg-dark-blue w-full max-w-2xl h-[300px] rounded-3xl flex flex-col justify-center'}
            style={{textTransform: 'none'}} onClick={handleOpenWebLinkDialog}>
            <GlobeAltIcon className={'text-white w-24 h-24 mx-auto'}/>
            <Typography className="text-white font-bold text-2xl mt-4 mx-auto">
              Youtube link or TikTok link
            </Typography>
          </Button>
          <Button data-testid="fileButton" className={'bg-audio w-full max-w-2xl h-[300px] rounded-3xl flex flex-col justify-center'}
            style={{textTransform: 'none'}} onClick={handleOpenFileBrowser}>
            <DocumentMagnifyingGlassIcon className={'text-black w-24 h-24 mx-auto'}/>
            <Typography className="text-audio-text font-bold text-2xl mt-4 mx-auto">
              Audio file (mp3/mp4)
            </Typography>
          </Button>
        </div>

        { isTranscribing &&
          <>
            <Typography className="text-selected-blue font-bold text-2xl text-center pt-24 pb-4">
                Progress
            </Typography>

            <div className="w-full px-12 2xl:px-64">
              <div className="mb-2 flex items-center justify-between gap-4">
                <Typography color="blue-gray" variant="h6">
                    Completed
                </Typography>
                <Typography data-testid="progress" color="blue-gray" variant="h6">
                  {socketContainer.progress}%
                </Typography>
              </div>
              <Progress value={parseInt(socketContainer.progress)}/>
            </div>
          </>
        }

        { socketContainer.progress === '100' &&
          <>
            <Typography className="text-selected-blue font-bold text-2xl text-center pt-24 pb-6">
                Analysis
            </Typography>
            <div className="w-full px-12 2xl:px-64 flex flex-col items-end gap-2">
              <Textarea data-testid="finalAnalysis" label="Message" disabled value={currentAnalysisResult?.video_summary}/>
              <div className={'flex gap-5'}>
                <Button>
                  <ClipboardDocumentIcon onClick={handleCopy} className={'w-5 h-5'}/>
                </Button>
                <Button onClick={handleSaveTranscriptData}>
                  <ArrowDownTrayIcon className={'w-5 h-5'}/>
                </Button>
              </div>
            </div>
          </>
        }

        <Dialog open={openWebLinkDialog} handler={handleOpenWebLinkDialog}>
          <DialogHeader>Youtube link or TikTok link</DialogHeader>
          <DialogBody>
            <p>
              Please paste the YouTube link or TikTok link in the input field below.
            </p>
            <p className={'mb-6'}>
              Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ or https://www.tiktok.com/@dzidzia_dziadzia/video/7271698811439828256
            </p>
            <Input data-testid="webLinkInput" error={showError} value={webLink} onChange={(event) => { setWebLink(event.target.value); }} variant='outlined' label='Youtube link or TikTok link' crossOrigin={undefined}/>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenWebLinkDialog}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button data-testid="confirmButton" variant="gradient" color="green" onClick={handleConfirmWebLinkDialog}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog><input
          id='fileInput'
          type='file'
          accept='.mp3,.mp4'
          style={{display: 'none'}}
          onChange={handleFileSelected}/>

      </div>
    </div>
  );
}
