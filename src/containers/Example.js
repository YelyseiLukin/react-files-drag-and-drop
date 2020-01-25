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
      <div
        style={{
          width: '400px',
          height: '200px',
          border: '1px solid #acacac',
        }}
      >
        <FilesDragAndDrop
          onUpload={this.onUpload}
          count={2}
          formats={['jpg']}
          texts={{
            hover: ({formats, count}) => `Drop ${count} files with formats ${formats.join(', ')}`,
            success: ({files}) => `Uploaded ${files.length} files`,
            errorCount: ({count}) => `Cannot upload more than ${count} files`,
            errorFormat: ({formats}) => `only these formats ${formats.join(', ')}`,
          }}
          messagesDuration={{
            success: 1000,
            error: 1000,
          }}
          styles={{
            placeholder: {
              fontSize: '50px',
            },
            placeholderSuccess: {
              color: 'white',
            },
            placeholderError: {
              color: 'black',
            },
          }}
        >
          <div
            style={{
              width: '100%',
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            Drop files here
          </div>
        </FilesDragAndDrop>
      </div>
    );
  }
}
