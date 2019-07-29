import React from 'react';
import PropTypes from 'prop-types';

import FilesDragAndDrop from '../components/Common/FilesDragAndDrop';

import classList from '../scss/components/Common/FilesDragAndDrop.scss';

export default class App extends React.Component {
    static propTypes = {};

    onUpload = (files) => {
        console.log(files);
    };

    render() {
        return (
            <div>
                <FilesDragAndDrop
                    onUpload={this.onUpload}
                    count={3}
                    formats={['jpg']}
                >
                    <div className={classList['FilesDragAndDrop__area']}>
                        Hey, drop me some files
                        <span
                            role='img'
                            aria-label='emoji'
                            className={classList['area__icon']}
                        >
                            &#128526;
                        </span>
                    </div>
                </FilesDragAndDrop>
            </div>
        );
    }
}
