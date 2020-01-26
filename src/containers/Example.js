import React from 'react';
import PropTypes from 'prop-types';

import FilesDragAndDrop from '../components/FilesDragAndDrop';

export default class Example extends React.Component {
  static propTypes = {};

  onUpload = (files) => {
    console.log(files);
  };

  render() {
    return (
      <FilesDragAndDrop
        onUpload={(files) => console.log(files)}
        count={10}
        formats={['jpg', 'png', 'svg']}
        styles={{
          containerStyles: {
            width: '200px',
            height: '200px',
            border: '1px solid #cccccc',
          },
        }}
      >
        <div style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
          Drop files here
        </div>
      </FilesDragAndDrop>
    );
  }
}
