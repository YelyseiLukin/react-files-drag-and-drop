# @yelysei/react-files-drag-and-drop

A light-weighted and customizable React Component that handles Files Drag & Drop.

## Installation

Install with npm:

```
npm i @yelysei/react-files-drag-and-drop
```

or with yarn:

```
yarn add @yelysei/react-files-drag-and-drop
```

## Usage

First you need to import FilesDragAndDrop component:

```javascript
import FilesDragAndDrop from '@yelysei/react-files-drag-and-drop';
```

And then use it like this: 

```javascript
<FilesDragAndDrop
    onUpload={(files) => console.log(files)}
    count={3}
    formats={['jpg', 'png', 'svg']}
    containerStyles={{
        width: '200px',
        height: '200px',
        border: '1px solid #cccccc',
    }}
    openDialogOnClick
>
    <div style={{
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    }}>
        Drop files here
    </div>
</FilesDragAndDrop>
```

## Props

Here is the list of all available props:

Name | Type | Required | Description
---|---|---|---
`onUpload` | function | + | Function that will be called when files are dropped into the component and successfully validated. Receives list of `files`
`children` | node | + | Inner content of the component
`count` | number | | Max count of files
`formats` | string[] | | List of available file formats
`openDialogOnClick` | boolean | | If enabled, file dialog will be opened on click at the component
`hoverText` | string or function | | Message that will appear when files are dragged over the component. Function receives available file formats and max files count.<br/>Default value: 'Drop files here'
`successText` | string or function | | Message that will appear when files are successfully uploaded. Function receives list of uploaded files.<br/>Default value: 'Successfully uploaded'
`errorCountText` | string or function | | Message that will appear when more files than available are dropped into the component. Function receives available max files count.<br/>Default value: ({count}) => \`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time\`
`errorFormatText` | string or function | | Message that will appear when files with incorrect formats are dropped into the component. Function receives available file formats.<br/>Default value: ({formats}) => \`Only following file formats are acceptable: ${formats.join(', ')}\` 
`containerStyles` | CSS properties | | Custom styles for container
`hoverMessageStyles` | CSS properties | | Custom styles for hover message
`successMessageStyles` | CSS properties | | Custom styles for success message
`errorMessageStyles` | CSS properties | | Custom styles for error message
`successTime` | number | | Time duration in milliseconds when the success message will be displayed.<br/>Default value: 1000
`errorTime` | number | | Time duration in milliseconds when the error message will be displayed.<br/>Default value: 2000
`onDrop` | function | | Function that will be called when files are dropped into the component but not validated yet. Receives list of `files`
`onDragEnter` | function | | Function that will be called when dragged files entered the component
`onDragLeave` | function | | Function that will be called when dragged files leaved the component
