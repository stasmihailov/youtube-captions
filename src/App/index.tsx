import * as React from 'react';
import styled from "styled-components";
import {Input} from "../Input";
import {Button, IButtonState} from "../Button";
import {Video} from "../Video";
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
  title: string;
  captions: string;
};

const getCaptions = async (url: string): Promise<ServerResp> => {
  return fetch(`http://localhost:3000/captions?url=${url}`)
    .then(resp => resp.json());
};

export const App = () => {
  const [isYoutube, setIsYoutube] = useState(false);
  const [url, setUrl] = useState('');
  const [title, setTitle] = useState('');
  const [captions, setCaptions] = useState('');

  const [buttonState, setButtonState] = useState(IButtonState.INITIAL);

  const mIsVideoLoaded = useMemo(() => !!title, [title]);

  const cbVideoReset = useCallback(() => {
    setTitle('');
    setCaptions('');
  }, [title, captions]);

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
        setTitle(resp.title);
        setCaptions(resp.captions);
        setButtonState(IButtonState.LOADED);
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
          loaded={mIsVideoLoaded}
          title={title}
          captions={captions}
        />
      </SContainer>
    </SApp>
  );
};
