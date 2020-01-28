import * as React from 'react';

interface FilesDragAndDropProps {
  onUpload: (files: File[]) => void;
  children: React.ReactElement | React.ReactElement[];
  count?: number;
  formats?: string[];
  openDialogOnClick?: boolean;
  hoverText?: (({count, formats}: {count?: number, formats?: string[]}) => string) | string;
  successText?: (({files}: {files: File[]}) => string) | string;
  errorCountText?: (({count}: {count?: number}) => string) | string;
  errorFormatText?: (({formats}: {formats?: string[]}) => string) | string;
  containerStyles?: React.CSSProperties;
  hoverMessageStyles?: React.CSSProperties;
  successMessageStyles?: React.CSSProperties;
  errorMessageStyles?: React.CSSProperties;
  successTime?: number;
  errorTime?: number;
  onDragEnter?: () => void;
  onDragLeave?: () => void;
  onDrop?: (files: File[]) => void;
}

export default function FilesDragAndDrop({
  onUpload,
  children,
  count,
  formats,
  openDialogOnClick = false,
  hoverText = 'Drop files here',
  successText = 'Successfully uploaded',
  errorCountText = ({count}) => `Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`,
  errorFormatText = ({formats}) => `Only following file formats are acceptable: ${formats && formats.join(', ')}`,
  containerStyles = {},
  hoverMessageStyles = {},
  successMessageStyles = {},
  errorMessageStyles = {},
  successTime = 1000,
  errorTime = 2000,
  onDragEnter,
  onDragLeave,
  onDrop,
}: FilesDragAndDropProps): React.ReactElement {
  const [dragging, setDragging] = React.useState(false);
  interface MessageProps {
    show: boolean;
    text: string | null;
    type: string | null;
  }
  const [message, setMessage] = React.useState<MessageProps>({
    show: false,
    text: null,
    type: null,
  });

  const drag = React.useRef(null);
  const drop = React.useRef(null);
  const input = React.useRef(null);

  React.useEffect(() => {
    // @ts-ignore
    drop.current.addEventListener('dragover', handleDragOver);
    // @ts-ignore
    drop.current.addEventListener('drop', handleDrop);
    // @ts-ignore
    drop.current.addEventListener('dragenter', handleDragEnter);
    // @ts-ignore
    drop.current.addEventListener('dragleave', handleDragLeave);

    return () => {
      // @ts-ignore
      drop.current.removeEventListener('dragover', handleDragOver);
      // @ts-ignore
      drop.current.removeEventListener('drop', handleDrop);
      // @ts-ignore
      drop.current.removeEventListener('dragenter', handleDragEnter);
      // @ts-ignore
      drop.current.removeEventListener('dragleave', handleDragLeave);
    };
  }, []);

  const handleDragOver = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    setDragging(false);

    const files = e.dataTransfer ? [...e.dataTransfer.files] : [];

    onDrop && onDrop(files);

    handleUpload(files);
  };

  const handleDragEnter = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target !== drag.current) {
      setDragging(true);

      onDragEnter && onDragEnter();
    }
  };

  const handleDragLeave = (e: DragEvent) => {
    e.preventDefault();
    e.stopPropagation();

    if (e.target === drag.current) {
      setDragging(false);

      onDragLeave && onDragLeave();
    }
  };

  const handleSelectFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = [...e.target.files];

    handleUpload(files);
  };

  const handleUpload = (files: File[]) => {
    if (count && count < files.length) {
      showMessage(
        typeof errorCountText === 'function' ? errorCountText({count}) : errorCountText,
        'error',
        errorTime,
      );

      return;
    }

    if (formats &&
      files.some((file: File) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))
    ) {
      showMessage(
        typeof errorFormatText === 'function' ? errorFormatText({formats}) : errorFormatText,
        'error',
        errorTime,
      );

      return;
    }

    if (files && files.length) {
      showMessage(
        typeof successText === 'function' ? successText({files}) : successText,
        'success',
        successTime,
      );

      onUpload(files);
    }
  };

  const showMessage = (text: string, type: string, timeout: number) => {
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

  const openFileDialog = () => {
    // @ts-ignore
    input && input.current.click();
  };

  return (
    <div
      ref={drop}
      style={{
        ...styles.container,
        cursor: openDialogOnClick ? 'pointer' : 'default',
        ...containerStyles,
      }}
      onClick={openDialogOnClick ? openFileDialog : undefined}
    >
      {openDialogOnClick && (
        <input
          ref={input}
          type='file'
          style={{...styles.input}}
          accept={formats ? formats.map((format) => `.${format}`).join(', ') : undefined}
          multiple={!count || count > 1}
          onChange={handleSelectFiles}
        />
      )}
      {message.show && (
        <div
          style={{
            ...styles.message,
            ...(message.type === 'success' && styles.messageSuccess),
            ...(message.type === 'error' && styles.messageError),
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
          style={{
            ...styles.message,
            ...hoverMessageStyles,
          }}
        >
          {typeof hoverText === 'function' ? hoverText({formats, count}) : hoverText}
        </div>
      )}
      {children}
    </div>
  );
}

const styles: {
  container: React.CSSProperties,
  input: React.CSSProperties,
  message: React.CSSProperties,
  messageSuccess: React.CSSProperties,
  messageError: React.CSSProperties,
} = {
  container: {
    position: 'relative',
    width: '100%',
    height: '100%',
  },
  input: {
    position: 'absolute',
    left: '0',
    top: '0',
    width: '1px',
    height: '1px',
    opacity: '0',
    cursor: 'default',
  },
  message: {
    position: 'absolute',
    top: '0',
    left: '0',
    right: '0',
    bottom: '0',
    width: '100%',
    height: '100%',
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexFlow: 'column nowrap',
    backgroundColor: '#e7e7e7',
    color: '#7f8e99',
    fontSize: '24px',
    fontFamily: 'Tahoma, sans-serif',
    opacity: '1',
    textAlign: 'center',
  },
  messageSuccess: {
    backgroundColor: '#e7f7e7',
    color: '#8ecf99',
  },
  messageError: {
    backgroundColor: '#f7e7e7',
    color: '#cf8e99',
  },
};
