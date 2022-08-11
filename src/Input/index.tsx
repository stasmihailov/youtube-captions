import * as React from 'react';
import styled from "styled-components";
import {styles} from "../styles";
import {useCallback} from "react";

const placeholder = 'enter YouTube video url here...';
const youtubeRegex = /^https:\/\/www.youtube.com\/watch\?v=[A-Za-z0-9_-]+$/;

export interface IIntputProps {
  onChange: (isYoutubeLink: boolean, link: string) => void;
}

const SInput = styled('input')`
  width: 400px;
  ${styles.action};
  padding: 0 12px;

  margin-right: 20px;

  :focus {
    outline: none;
    box-shadow: 0 0 3px 2px #acf;
  }
`;

type InputChangeEvent = {
  target: {
    value: string;
  }
}

export const Input = (props: IIntputProps) => {
  const {onChange} = props;

  const cbOnInput = useCallback((e: InputChangeEvent) => {
    const text = e.target.value;
    const isYoutubeLink = !!youtubeRegex.test(text);

    props.onChange(isYoutubeLink, text);
  }, [onChange])

  return (
    <SInput
      type="text"
      placeholder={placeholder}
      onChange={cbOnInput}/>
  );
}
