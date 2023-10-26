import React, {useState} from 'react';
import {Card, List, ListItem, ListItemPrefix, Typography} from '@material-tailwind/react';
import {DocumentTextIcon} from '@heroicons/react/20/solid';
import {SelectedWindow} from '../../Enums';
import Transcribe from '../transcribe/Transcribe';
import History from '../history/History';

export default function Home() {

  const [selectedWindow, setSelectedWindow] = useState(SelectedWindow.Transcribe);

  return (
    <div className={'flex flex-row'}>
      <Card className="h-[calc(100vh-2rem)] max-w-[20rem] p-4 shadow-xl shadow-blue-gray-900/5">
        <div className="mb-2 p-4">
          <Typography variant="h5" color="blue-gray">
            What they mean
          </Typography>
        </div>
        <List>
          <ListItem onClick={() => {
            setSelectedWindow(SelectedWindow.Transcribe);
          }}>
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5"/>
            </ListItemPrefix>
            Transcribe
          </ListItem>
          <ListItem onClick={() => {
            setSelectedWindow(SelectedWindow.History);
          }}>
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5"/>
            </ListItemPrefix>
            History
          </ListItem>
        </List>
      </Card>

      <div className={'p-10'}>
        {
          selectedWindow === SelectedWindow.Transcribe
          && <Transcribe/>

          || selectedWindow === SelectedWindow.History
          && <History/>
        }
      </div>
    </div>
  );
}