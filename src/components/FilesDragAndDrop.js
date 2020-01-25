import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classList from '../scss/components/FilesDragAndDrop.scss';

export default function FilesDragAndDrop({
  children,
  onUpload,
  count,
  formats,
  texts,
  styles,
  messagesDuration,
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
      const messageErrorCount = texts?.errorCount
        && (typeof texts?.errorCount === 'function' ? texts?.errorCount({count}) : texts?.errorCount);

      showMessage(
        messageErrorCount || `Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`,
        'error',
        messagesDuration?.error || 2000,
      );

      return;
    }

    if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
      const messageErrorFormat = texts?.errorFormat
        && (typeof texts?.errorFormat === 'function' ? texts?.errorFormat({formats}) : texts?.errorFormat);

      showMessage(
        messageErrorFormat || `Only following file formats are acceptable: ${formats.join(', ')}`,
        'error',
        messagesDuration?.error || 2000,
      );

      return;
    }

    if (files && files.length) {
      const messageSuccess = texts?.success
        && (typeof texts?.success === 'function' ? texts?.success({files}) : texts?.success);

      showMessage(
        messageSuccess || 'Successfully uploaded',
        'success',
        messagesDuration?.success || 1000,
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

  const messageHover = texts?.hover
    && (typeof texts?.hover === 'function' ? texts?.hover({formats, count}) : texts?.hover);

  return (
    <div
      ref={drop}
      className={classList['FilesDragAndDrop']}
    >
      {message.show && (
        <div
          className={classNames(
            classList['FilesDragAndDrop__placeholder'],
            classList[`FilesDragAndDrop__placeholder--${message.type}`],
          )}
          style={{
            ...(styles?.placeholder || {}),
            ...(message.type === 'success' && (styles?.placeholderSuccess || {})),
            ...(message.type === 'error' && (styles?.placeholderError || {})),
          }}
        >
          {message.text}
        </div>
      )}
      {dragging && (
        <div
          ref={drag}
          className={classList['FilesDragAndDrop__placeholder']}
          style={{
            ...(styles?.placeholder || {}),
          }}
        >
          {messageHover || 'Drop files here'}
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
    hover: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    success: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    errorCount: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
    errorFormat: PropTypes.oneOfType([PropTypes.string, PropTypes.func]),
  }),
  styles: PropTypes.shape({
    placeholder: PropTypes.shape({}),
    placeholderSuccess: PropTypes.shape({}),
    placeholderError: PropTypes.shape({}),
  }),
  messagesDuration: PropTypes.shape({
    success: PropTypes.number,
    error: PropTypes.number,
  }),
};
