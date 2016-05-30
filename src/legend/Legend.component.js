import React, { Component, PropTypes } from 'react';
import TextField from 'material-ui/lib/text-field';
import RaisedButton from 'material-ui/lib/raised-button';
import ColorScaleSelect from './ColorScaleSelect.component';
import LegendItems from './LegendItems.component';
import {scaleLinear} from 'd3-scale';


export default class Legend extends Component {
    constructor() {
        super();

        this.state = {
            startValue: 0,
            endValue: 100,
        };

        this.onColorScaleChange = this.onColorScaleChange.bind(this);
        this.createLegendItems = this.createLegendItems.bind(this);
        this.updateItem = this.updateItem.bind(this);
    }

    onColorScaleChange(colorScheme) {
        this.setState({colorScheme})
    }

    createLegendItems() {
        const {startValue, endValue, colorScheme} = this.state;
        const scale = scaleLinear().domain([startValue, endValue]).rangeRound([0, colorScheme.length]);

        const items = colorScheme.map((color, index) => {
            const startValue = scale.invert(index);
            const endValue = scale.invert(index + 1);

            return {
                name: `${startValue} — ${endValue}`,
                startValue,
                endValue,
                color
            };
        });

        this.props.onItemsChange(items);
    }

    updateItem(newItems) {
        this.props.onItemsChange(newItems);
    }

    render() {
        return (
            <div>
                <TextField hintText="Start value" value={this.state.startValue} onChange={(event, value) => this.setState({startValue: event.target.value})} />
                <TextField hintText="End value"  value={this.state.endValue} onChange={(event, value) => this.setState({endValue: event.target.value})} />
                <ColorScaleSelect onChange={this.onColorScaleChange} />
                <RaisedButton label="Create legend items" onClick={this.createLegendItems} />
                <LegendItems items={this.props.items} updateItem={this.updateItem} /> // If on is changed call this.props.onItemsChange(items);
            </div>
        );
    }
};
Legend.propTypes = {
    items: PropTypes.array.isRequired,
};