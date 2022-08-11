import styled from "styled-components";
import * as React from 'react';
import {styles} from "../styles";

const SVideoCommon = styled('div')`
  width: 374px;
  height: 63px;
`;

const SVideo = styled(SVideoCommon)`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
`;

const SHeader = styled('div')`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-start;

  height: 15px;

  > * {
    margin-right: 10px;
  }
`;

const SYoutubeIcon = styled('div')`
  width: 20px;
  height: 12px;
  background: url("https://www.youtube.com/favicon.ico") no-repeat center;
  background-size: contain;
`;

const SYoutubeTitle = styled('span')`
  font-size: ${styles.textSize.s12};
  white-space: nowrap;
  text-overflow: ellipsis;
`;

const SCaptions = styled('div')`
  font-size: ${styles.textSize.s12};
  
  width: 374px;
  height: 42px;
  
  border-radius: 3px;
  border: thin solid #bbb;
  padding: 6px 12px;
  overflow: clip;
`;

const SPlaceholder = styled(SVideoCommon)`
  ${styles.align.center};
  
  width: 400px;
  border: 0px;
  border-radius: 3px;

  font-size: ${styles.textSize.s12};
  color: ${styles.textColor.placeholder};
  background-color: #eee;
`;

export interface IVideoProps {
  loaded: boolean;
  title?: string;
  captions?: string;
}

export const Video = (props: IVideoProps) => {
  const {captions, loaded, title} = props;

  if (!loaded) {
    return <SPlaceholder>
      Captions will show up here...
    </SPlaceholder>;
  }

  return (
    <SVideo>
      <SHeader>
        <SYoutubeIcon/>
        <SYoutubeTitle>{title}</SYoutubeTitle>
      </SHeader>
      <SCaptions>{captions}</SCaptions>
    </SVideo>
  );
};
