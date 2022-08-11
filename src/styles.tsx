export const styles = {
  action: `
    height: 40px;
    border: 0px;
    border-radius: 3px;
    box-shadow: 0 3px 6px 3px rgba(0, 0, 0, 0.25);
  `,
  noSelect: `
   -webkit-touch-callout: none; /* iOS Safari */
    -webkit-user-select: none; /* Safari */
     -khtml-user-select: none; /* Konqueror HTML */
       -moz-user-select: none; /* Old versions of Firefox */
        -ms-user-select: none; /* Internet Explorer/Edge */
            user-select: none; /* Non-prefixed version, currently
                                  supported by Chrome, Edge, Opera and Firefox */
  `,
  align: {
    center: `
      display: flex;
      flex-direction: row;
      align-items: center;
      justify-content: center;
    `,
  },
  textColor: {
    default: '#000',
    placeholder: '#999',
    buttonActive: '#fff',
  },
  textSize: {
    s12: '12px',
    s16: '16px',
  }
}
