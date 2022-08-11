import * as React from 'react';
import styled from "styled-components";
import {styles} from "../styles";

export enum IButtonState {
  INITIAL,
  WAITING,
  LOADED,
}

export interface IButtonProps {
  state: IButtonState;
  onCopy: () => void;
}

const SButton = styled('div')`
  ${styles.action};
  ${styles.align.center};
  width: 160px;

  background-color: #1aafaf;
  color: ${styles.textColor.buttonActive};
  size: ${styles.textSize.s16};
`;

const SButtonDisabled = styled(SButton)`
  background-color: #ddd;
  color: ${styles.textColor.placeholder};
`;

export const Button = (props: IButtonProps) => {
  const {state, onCopy} = props;

  let Component;
  let text;
  let onClick = () => {
  };

  if (state === IButtonState.INITIAL) {
    Component = SButtonDisabled;
    text = 'Enter video url';
  } else if (state === IButtonState.WAITING) {
    Component = SButtonDisabled;
    text = 'Loading...';
  } else {
    Component = SButton;
    text = 'Copy to clipboard';
    onClick = onCopy;
  }

  return (
    <Component onClick={onClick}>
      {text}
    </Component>
  );
};
