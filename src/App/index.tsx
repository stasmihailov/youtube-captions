import * as React from 'react';
import styled from "styled-components";
import {Input} from "../Input";
import {Button, IButtonState} from "../Button";
import {IVideoCaptionsState, Video} from "../Video";
import {useCallback, useEffect, useMemo, useState} from "react";

const SHeader = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  margin-bottom: 20px;
`;

const SApp = styled('div')`
  * {
    font-family: 'Arial', sans-serif;
  }

  width: 640px;
  height: 180px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`;

const SContainer = styled('div')`
  width: fit-content;
  height: fit-content;

  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: center;
`;

type ServerResp = {
  status: 'NO_CAPTIONS',
} | {
  status: 'OK',
  title: string;
  captions: string;
};

const getCaptions = async (url: string): Promise<ServerResp> => {
  return fetch(`http://localhost:3000/captions?url=${url}`)
    .then(resp => {
      if (resp.status !== 200) {
        return {stasus: 'NO_CAPTIONS'};
      }

      return resp.json().then(data => ({status: 'OK', ...data}));
    });
};

export const App = () => {
  const [isYoutube, setIsYoutube] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [captions, setCaptions] = useState('');

  const [buttonState, setButtonState] = useState(IButtonState.INITIAL);
  const [captionsState, setCaptionsState] = useState(IVideoCaptionsState.INITIAL);

  const cbVideoReset = useCallback(() => {
    setTitle('');
    setCaptions('');
    setCaptionsState(IVideoCaptionsState.INITIAL);
    setButtonState(IButtonState.INITIAL);
  }, [title, captions, buttonState]);

  const cbOnChangeInput = useCallback((isY: boolean, text: string) => {
    setIsYoutube(isY);
    if (isY) {
      setUrl(text);
      setButtonState(IButtonState.WAITING);
      cbVideoReset();
    }
  }, [isYoutube, url]);

  useEffect(() => {
    const encodedUrl = encodeURIComponent(url);

    getCaptions(encodedUrl)
      .then((resp: ServerResp) => {
        if (resp.status === 'OK') {
          setTitle(resp.title);
          setCaptions(resp.captions);
          setCaptionsState(IVideoCaptionsState.LOADED);
          setButtonState(IButtonState.LOADED);
        } else {
          setTitle('');
          setCaptions('');
          setCaptionsState(IVideoCaptionsState.NOT_AVAILABLE);
          setButtonState(IButtonState.INITIAL);
        }
      });
  }, [url]);

  const cbOnCopy = useCallback(() => {
    navigator.clipboard.writeText(captions);
  }, [captions]);

  return (
    <SApp>
      <SContainer>
        <SHeader>
          <Input onChange={cbOnChangeInput}/>
          <Button state={buttonState} onCopy={cbOnCopy}/>
        </SHeader>
        <Video
          title={title}
          captions={captions}
          captionsState={captionsState}
        />
      </SContainer>
    </SApp>
  );
};
