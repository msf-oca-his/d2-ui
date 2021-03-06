import React from 'react';
import OrgUnitTreeMultipleRoots from '../../src/org-unit-tree/OrgUnitTreeMultipleRoots.component';

export default class extends React.Component {
    constructor(...args) {
        super(...args);

        this.state = {
            selected: [],
        };

        this._selectionChanged = this._selectionChanged.bind(this);
    }

    _selectionChanged(event, selectedOu) {
        this.setState({
            selected: selectedOu.id,
        });
    }

    render() {
        return (
            <OrgUnitTreeMultipleRoots {...this.props} selected={this.state.selected} onClick={this._selectionChanged} />
        );
    }
}
