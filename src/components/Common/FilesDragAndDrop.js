import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import classList from '../../scss/components/Common/FilesDragAndDrop.scss';

export default class FilesDragAndDrop extends React.Component {
    static propTypes = {
        onUpload: PropTypes.func.isRequired,
        children: PropTypes.node.isRequired,
        count: PropTypes.number,
        formats: PropTypes.arrayOf(PropTypes.string),
    };

    state = {
        dragging: false,
        message: {
            show: false,
            text: null,
            type: null,
        },
    };

    componentDidMount() {
        this.dragCounter = 0;

        this.drop.addEventListener('dragover', this.handleDragOver);
        this.drop.addEventListener('drop', this.handleDrop);
        this.drop.addEventListener('dragenter', this.handleDragEnter);
        this.drop.addEventListener('dragleave', this.handleDragLeave);
    }

    componentWillUnmount() {
        this.drop.removeEventListener('dragover', this.handleDragOver);
        this.drop.removeEventListener('drop', this.handleDrop);
        this.drop.removeEventListener('dragenter', this.handleDragEnter);
        this.drop.removeEventListener('dragleave', this.handleDragLeave);
    }

    handleDragOver = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.setState({dragging: false});
        this.dragCounter = 0;

        const {count, formats} = this.props;

        const files = [...e.dataTransfer.files];

        if (count && count < files.length) {
            this.showMessage(`Nope, only ${count} file${count !== 1 ? 's' : ''} can be uploaded at a time`, 'error', 2000);
            return;
        }

        if (formats && files.some((file) => !formats.some((format) => file.name.toLowerCase().endsWith(format.toLowerCase())))) {
            this.showMessage(`Nope, only following file formats are acceptable: ${formats.join(', ')}`, 'error', 2000);
            return;
        }

        if (files && files.length) {
            this.showMessage('Yep, that\'s what I want', 'success', 1000);
            this.props.onUpload(files);
        }
    };

    handleDragEnter = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.dragCounter++;
        if (this.dragCounter === 1) {
            this.setState({dragging: true});
        }
    };

    handleDragLeave = (e) => {
        e.preventDefault();
        e.stopPropagation();

        this.dragCounter--;
        if (this.dragCounter === 0) {
            this.setState({dragging: false});
        }
    };

    showMessage = (text, type, timeout) => {
        this.setState({
            message: {
                show: true,
                text,
                type,
            },
        }, () => {
            setTimeout(() => this.setState({
                message: {
                    show: false,
                    text: null,
                    type: null,
                },
            }), timeout);
        });
    };

    initDrop = (drop) => {
        this.drop = drop;
    };

    render() {
        const {children} = this.props;
        const {dragging, message} = this.state;

        return (
            <div
                ref={this.initDrop}
                className={classList['FilesDragAndDrop']}
            >
                {message.show && (
                    <div
                        className={classNames(
                            classList['FilesDragAndDrop__placeholder'],
                            classList[`FilesDragAndDrop__placeholder--${message.type}`],
                        )}
                    >
                        {message.text}
                        <span
                            role='img'
                            aria-label='emoji'
                            className={classList['area__icon']}
                        >
                            {message.type === 'error' ? <>&#128546;</> : <>&#128536;</>}
                        </span>
                    </div>
                )}
                {dragging && (
                    <div className={classList['FilesDragAndDrop__placeholder']}>
                        Drop that file down low
                        <span
                            role='img'
                            aria-label='emoji'
                            className={classList['area__icon']}
                        >
                            &#128541;
                        </span>
                    </div>
                )}
                {children}
            </div>
        );
    }
}
