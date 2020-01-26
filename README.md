# @yelysei/react-files-dnd

A simple and customizable React Component that handles Files Drag & Drop.

## Installation

Install with npm:

```
npm i @yelysei/react-files-dnd
```

or with yarn:

```
yarn add @yelysei/react-files-dnd
```

## Usage

First you need to import FilesDragAndDrop component:

```javascript
import FilesDragAndDrop from '@yelysei/react-files-dnd';
```

Then create a container for a drag and drop area. The component will cover its entire area.
You can provide the custom content as well. 

```javascript
<div style={{
    width: '200px',
    height: '200px',
    border: '1px solid #cccccc',
}}>
    <FilesDragAndDrop>
        <div style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        }}>
            Drop files here
        </div>
    </FilesDragAndDrop>
</div>
```

## Props

Here is the list of all available props:

Name | Type | Description
---|---|---
`onUpload` | function | Function that will be called when files are dropped into the component. Receives list of `files`
`children` | node | Inner content of the component
`count` | number | Max count of files
`formats` | string[] | List of available formats
`texts` | {<br/>&nbsp;&nbsp;hoverText: string or function,<br/>&nbsp;&nbsp;successText: string or function,<br/>&nbsp;&nbsp;errorCountText: string or function,<br/>&nbsp;&nbsp;errorFormatText: string or function,<br/>} | - hoverText - message that will appear when files are dragged over the component. Function receives available files formats and max files count. Default value: 'Drop files here'<br/>- successText - message that will appear when files are successfully uploaded. Function receives list of uploaded files. Default value: 'Successfully uploaded'<br/>- errorCountText - message that will appear when more files than available are dropped into the component. Function receives available max files count. Default value: ({count}) => \`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time\`<br/>- errorFormatText - message that will appear when files with incorrect formats are dropped into the component. Function receives available files formats. Default value: ({formats}) => \`Only following file formats are acceptable: ${formats.join(', ')}\` 
`styles` | {<br/>&nbsp;&nbsp;containerStyles: object,<br/>&nbsp;&nbsp;hoverMessageStyles: object,<br/>&nbsp;&nbsp;successMessageStyles: object,<br/>&nbsp;&nbsp;errorMessageStyles: object,<br/>} | - containerStyles - custom styles for container<br/>- hoverMessageStyles - custom styles for hover message<br/>- successMessageStyles - custom styles for success message<br/>- errorMessageStyles - custom styles for error message
`messagesDuration` | {<br/>&nbsp;&nbsp;successTime: number,<br/>&nbsp;&nbsp;errorTime: number,<br/>} | - successTime - time duration in milliseconds when the success message will be displayed. Default value: 1000<br/>- errorTime - time duration in milliseconds when the error message will be displayed. Default value: 2000
