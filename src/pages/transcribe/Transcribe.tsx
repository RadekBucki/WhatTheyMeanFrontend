import React, {ChangeEvent, useState} from 'react';
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
  DocumentMagnifyingGlassIcon,
  PlayIcon
} from '@heroicons/react/24/solid';

export default function Transcribe() {

  const [openYoutubeLinkDialog, setOpenYoutubeLinkDialog] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const handleOpenYoutubeLinkDialog = () => setOpenYoutubeLinkDialog(!openYoutubeLinkDialog);
  const handleOpenFileBrowser = () => {
    document.getElementById('fileInput')?.click();
  };
  const handleFileSelected = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    setSelectedFile(file);
    selectedFile;
  };

  return (
    <div>
      <div className="w-custom p-6 bg-white shadow-md rounded">
        <Typography className="text-selected-blue font-bold text-2xl">
          Transcribe
        </Typography>
      </div>
      <div className={'p-24'}>
        <Typography className="text-selected-blue font-bold text-2xl text-center">
          Choose audio type
        </Typography>

        <div className={'flex justify-center gap-12 2xl:gap-64  mt-24'}>
          <Button className={'bg-yt w-4/6 2xl:w-3/12 h-[300px] rounded-3xl flex flex-col justify-center'} style={{ textTransform: 'none' }} onClick={handleOpenYoutubeLinkDialog}>
            <PlayIcon className={'text-white w-24 h-24 mx-auto'}/>
            <Typography className="text-audio-text font-bold text-2xl mt-4 mx-auto">
              Youtube link
            </Typography>
          </Button>
          <Button className={'bg-audio w-4/6 2xl:w-3/12 h-[300px] rounded-3xl flex flex-col justify-center'}  style={{ textTransform: 'none' }} onClick={handleOpenFileBrowser}>
            <DocumentMagnifyingGlassIcon className={'text-black w-24 h-24 mx-auto'}/>
            <Typography className="text-audio-text font-bold text-2xl mt-4 mx-auto">
              Audio file (mp3/mp4)
            </Typography>
          </Button>
        </div>

        <Typography className="text-selected-blue font-bold text-2xl text-center pt-24 pb-4">
          Progress
        </Typography>

        <div className="w-full px-12 2xl:px-64">
          <div className="mb-2 flex items-center justify-between gap-4">
            <Typography color="blue-gray" variant="h6">
              Completed
            </Typography>
            <Typography color="blue-gray" variant="h6">
              50%
            </Typography>
          </div>
          <Progress value={50} />
        </div>

        <Typography className="text-selected-blue font-bold text-2xl text-center pt-24 pb-6">
          Analysis
        </Typography>

        <div className="w-full px-12 2xl:px-64 flex flex-col items-end gap-2">
          <Textarea label="Message" disabled value={'Your analysis will appear here'} />
          <div className={'flex gap-5'}>
            <Button>
              <ClipboardDocumentIcon className={'w-5 h-5'}/>
            </Button>
            <Button>
              <ArrowDownTrayIcon className={'w-5 h-5'}/>
            </Button>
          </div>
        </div>

        <Dialog open={openYoutubeLinkDialog} handler={handleOpenYoutubeLinkDialog}>
          <DialogHeader>Youtube link</DialogHeader>
          <DialogBody>
            <p>
              Please paste the YouTube link in the input field below.
            </p>
            <p className={'mb-6'}>
              Example: https://www.youtube.com/watch?v=dQw4w9WgXcQ
            </p>
            <Input variant='outlined' label='Youtube link'/>
          </DialogBody>
          <DialogFooter>
            <Button
              variant="text"
              color="red"
              onClick={handleOpenYoutubeLinkDialog}
              className="mr-1"
            >
              <span>Cancel</span>
            </Button>
            <Button variant="gradient" color="green" onClick={handleOpenYoutubeLinkDialog}>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </Dialog>
        <input
          id='fileInput'
          type='file'
          accept='.mp3,.mp4'
          style={{ display: 'none' }}
          onChange={handleFileSelected}
        />
      </div>
    </div>
  );
}
