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
`texts` | {<br/>&nbsp;&nbsp;hover: string or function,<br/>&nbsp;&nbsp;success: string or function,<br/>&nbsp;&nbsp;errorCount: string or function,<br/>&nbsp;&nbsp;errorFormat: string or function,<br/>} | hover - message that will appear when files are dragged over the component. Function receives available files formats and max files count. Default value: 'Drop files here'<br/>success - message that will appear when files are successfully uploaded. Function receives list of uploaded files. Default value: 'Successfully uploaded'<br/>errorCount - message that will appear when more files than available are dropped into the component. Function receives available max files count. Default value: ({count}) => \`Only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time\`<br/>errorFormat - message that will appear when files with incorrect formats are dropped into the component. Function receives available files formats. Default value: ({formats}) => \`Only following file formats are acceptable: ${formats.join(', ')}\` 
`styles` | {<br/>&nbsp;&nbsp;placeholder: object,<br/>&nbsp;&nbsp;placeholderSuccess: object,<br/>&nbsp;&nbsp;placeholderError: object,<br/>} | placeholder - custom styles for placeholder message<br/>placeholderSuccess - custom styles for success message<br/>placeholderError - custom styles for error mesage
`messagesDuration` | {<br/>&nbsp;&nbsp;success: number<br/>&nbsp;&nbsp;error: number<br/>} | success - time duration in milliseconds when the success message will be displayed. Default value: 1000<br/>error - time duration in milliseconds when the error message will be displayed. Default value: 2000
