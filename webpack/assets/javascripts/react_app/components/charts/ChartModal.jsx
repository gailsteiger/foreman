import React from 'react';
import {Modal} from 'react-bootstrap';
import Component from '../common/BindingComponent';

export default class extends Component {
    constructor(props) {
        super(props);
        this.bind(
            'init',
            'onHide'
        );
    }
    init() {
        this.props.drawChart();
    }

    onHide() {
        this.props.onHide();
    }

    render() {
        return (
            <Modal show={this.props.show}
                   enforceFocus={true}
                   onHide={this.onHide}
                   onEnter={this.init}>
                <Modal.Header closeButton>
                    <Modal.Title>{this.props.title}</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div id={this.props.id + 'ModalChart'}></div>
                </Modal.Body>
            </Modal>
        );
    }
}
