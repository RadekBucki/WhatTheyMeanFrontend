import React, {useState} from 'react';
import {Card, List, ListItem, ListItemPrefix, Typography} from '@material-tailwind/react';
import {DocumentTextIcon} from '@heroicons/react/20/solid';
import {ChartPieIcon} from "@heroicons/react/20/solid";
import {SelectedWindow} from '../../Enums';
import Transcribe from '../transcribe/Transcribe';
import History from '../history/History';

export default function Home() {

  const [selectedWindow, setSelectedWindow] = useState(SelectedWindow.Transcribe);

  return (
    <div className={'flex flex-row'}>
      <Card className="h-[calc(100vh)] max-w-[20rem] p-2 bg-dark-blue rounded-none">
        <div>
          <img src="/src/assets/WTM_Logo-2.png" alt="WhatTheyMean app logo"/>
        </div>
        <List>
          <ListItem onClick={() => {
            setSelectedWindow(SelectedWindow.Transcribe);
          }} className={`cursor-pointer ${
            selectedWindow === SelectedWindow.Transcribe ? "bg-selected-blue focus:bg-selected-blue" : ""
          } hover:bg-teal active:bg-teal`}>
            <ListItemPrefix>
              <DocumentTextIcon className="h-5 w-5 text-off-white"/>
            </ListItemPrefix>
            <Typography className="text-off-white">
              Transcribe
            </Typography>
          </ListItem>
          <ListItem onClick={() => {
            setSelectedWindow(SelectedWindow.History);
          }}  className={`cursor-pointer ${
            selectedWindow === SelectedWindow.History ? "bg-selected-blue focus:bg-selected-blue" : ""
          } hover:bg-teal active:bg-teal`}>
            <ListItemPrefix>
              <ChartPieIcon className="h-5 w-5 text-off-white"/>
            </ListItemPrefix>
            <Typography className="text-off-white">
              History
            </Typography>
          </ListItem>
        </List>
      </Card>

      <div>
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
