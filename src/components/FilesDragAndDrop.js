import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classList from '../scss/components/FilesDragAndDrop.scss';

export default function FilesDragAndDrop({
  children,
  onUpload,
  count,
  formats,
  texts: {
    hoverText = 'Drop files here',
    successText = 'Successfully uploaded',
    errorCountText = ({count}) => `Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`,
    errorFormatText = ({formats}) => `Only following file formats are acceptable: ${formats.join(', ')}`,
  },
  styles: {
    containerStyles = {},
    hoverMessageStyles = {},
    successMessageStyles = {},
    errorMessageStyles = {},
  },
  messagesDuration: {
    successTime = 1000,
    errorTime = 2000,
  },
}) {
  const [dragging, setDragging] = React.useState(false);
  const [message, setMessage] = React.useState({
    show: false,
    text: null,
    type: null,
  });

  const drag = React.useRef(null);
  const drop = React.useRef(null);

  React.useEffect(() => {
    drop.current.addEventListener('dragover', handleDragOver);
    drop.current.addEventListener('drop', handleDrop);
    drop.current.addEventListener('dragenter', handleDragEnter);
    drop.current.addEventListener('dragleave', handleDragLeave);

    return () => {
      drop.current.removeEventListener('dragover', handleDragOver);
      drop.current.removeEventListener('drop', handleDrop);
      drop.current.removeEventListener('dragenter', handleDragEnter);
      drop.current.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = [...e.dataTransfer.files];

    if (count && count < files.length) {
      showMessage(
        typeof errorCountText === 'function' ? errorCountText({count}) : errorCountText,
        'error',
        errorTime,
      );

      return;
    }

    if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
      showMessage(
        typeof errorFormatText === 'function' ? errorFormatText({formats}) : errorFormatText,
        'error',
        errorTime,
      );

      return;
    }

    if (files && files.length) {
      showMessage(
        typeof successText === 'function' ? successText({formats}) : successText,
        'success',
        successTime,
      );

      onUpload(files);
    }
  };

  const handleDragEnter = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== drag) {
      setDragging(true);
    }
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === drag) {
      setDragging(false);
    }
  };

  const showMessage = (text, type, timeout) => {
    setMessage({
      show: true,
      text,
      type,
    });

    setTimeout(() => setMessage({
      show: false,
      text: null,
      type: null,
    }), timeout);
  };

  return (
    <div
      ref={drop}
      className={classList['FilesDragAndDrop']}
      style={{...containerStyles}}
    >
      {message.show && (
        <div
          className={classNames(
            classList['FilesDragAndDrop__placeholder'],
            classList[`FilesDragAndDrop__placeholder--${message.type}`],
          )}
          style={{
            ...hoverMessageStyles,
            ...(message.type === 'success' && successMessageStyles),
            ...(message.type === 'error' && errorMessageStyles),
          }}
        >
          {message.text}
        </div>
      )}
      {dragging && (
        <div
          ref={drag}
          className={classList['FilesDragAndDrop__placeholder']}
          style={{...hoverMessageStyles}}
        >
          {typeof hoverText === 'function' ? hoverText({formats, count}) : hoverText}
        </div>
      )}
      {children}
    </div>
  );
}

FilesDragAndDrop.propTypes = {
  onUpload: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  count: PropTypes.number,
  formats: PropTypes.arrayOf(PropTypes.string),
  texts: PropTypes.shape({
    hoverText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    successText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    errorCountText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    errorFormatText: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  styles: PropTypes.shape({
    containerStyles: PropTypes.shape({}),
    hoverMessageStyles: PropTypes.shape({}),
    successMessageStyles: PropTypes.shape({}),
    errorMessageStyles: PropTypes.shape({}),
  }),
  messagesDuration: PropTypes.shape({
    successTime: PropTypes.number,
    errorTime: PropTypes.number,
  }),
};
