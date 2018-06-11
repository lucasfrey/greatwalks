import React from 'react';
import {Line} from 'react-chartjs-2';
import hut from './hut.js';

class Graph extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			dataHutBooked: [],
			dataHutCapacity: [],
			greatWalks: [],
			huts: [],
			selectedGreatWalks: '',
			selectedHut: '',
			yearSelected: '09'
		};
	}

	componentWillMount() {
		let splittedData = this.splitArray(hut);

		let dataHutBooked = this.formatData(splittedData[0]);
		let dataHutCapacity = this.formatData(splittedData[1]);

		this.setState({
			dataHutBooked,
			dataHutCapacity
		})
	}

	render() {
		return (
			<div>
				<h1>{this.state.selectedGreatWalks}</h1>
				{this.state.selectedGreatWalks ? '' : <p>Select a Great Walk</p>}
				{this.renderGreatWalkDropdown()}
				<br /><br />
				{this.state.selectedHut ? '' : <p>Select a Hut</p>}
				{this.renderHutDropdown()}
				<br /><br />
				<h2>20{this.renderYearInput()}</h2>
				<Line data={this.getGraphData(this.getMonthData()[0], this.getMonthData()[1])} options={this.getGraphOptions()} />
			</div>
		);
	}

	renderGreatWalkDropdown() {
		return (
			<select value={this.state.selectedGreatWalks} onChange={this.onChange.bind(null, 'selectedGreatWalks')}>
				<option value=""></option>
				{this.getGreatWalkOptions()}
			</select>
		)
	}

	renderHutDropdown() {
		return (
			<select value={this.state.selectedHut} onChange={this.onChange.bind(null, 'selectedHut')}>
				<option value=""></option>
				{this.getHutOptions()}
			</select>
		)
	}

	renderYearInput() {
		return (
			<select value={this.state.yearSelected} onChange={this.onChange.bind(null, 'yearSelected')}>
				<option value="05">05</option>
				<option value="06">06</option>
				<option value="07">07</option>
				<option value="08">08</option>
				<option value="09">09</option>
				<option value="10">10</option>
				<option value="11">11</option>
				<option value="12">12</option>
				<option value="13">13</option>
				<option value="14">14</option>
				<option value="15">15</option>
				<option value="16">16</option>
				<option value="17">17</option>
			</select>
		)
	}

	onChange = (name, e) => {
		this.setState({
			[name]: e.target.value
		})
	}

	getMonthData() {
		// default state
		let formattedBooked = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		let formattedCapacity = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
		let month = 0;
		let index = 0;
		let i = 0;
		
		if (this.state.selectedHut) {
			formattedBooked = [];
			formattedCapacity = [];

			for (i = 0; i < 12; i++) {
				index = i + 1;
			
				if (index < 10) {
					month = '0' + index
				} else {
					month = index;
				}
				
				formattedBooked.push(this.state.dataHutBooked[this.state.selectedHut]['1/' + month + '/' + this.state.yearSelected]);
				formattedCapacity.push(this.state.dataHutCapacity[this.state.selectedHut]['1/' + month + '/' + this.state.yearSelected]);
			}
		}

		return [
			formattedBooked,
			formattedCapacity
		]
	}

	getGreatWalkOptions() {
		return this.state.greatWalks.map((gw, index) => {
			return (
				<option key={gw} value={gw}>{gw}</option>
			);
		});
	}

	getHutOptions() {
		if (!this.state.selectedGreatWalks) {
			return null;
		}

		let allHuts = this.state.huts;
		let huts = allHuts[this.state.selectedGreatWalks];

		return huts.map((hut, index) => {
			return (
				<option key={hut} value={hut}>{hut}</option>
			);
		});
	}

	getGraphOptions() {
		return {
			gridLines: {
				display: false
			},
			elements: {
				point: {
					pointStyle: 'rectRot',
					pointHoverRadius: 50
				}
			}
		};
	}

	getGraphData(formattedBooked, formattedCapacity) {
		let labels = this.getGraphLabels();

		return {
			labels: labels,
			datasets: [
			  {
				label: 'Hut Booked',
				backgroundColor: 'rgba(255,50,132,0.2)',
				borderColor: 'rgba(255,50,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(255,50,132,0.4)',
				hoverBorderColor: 'rgba(255,50,132,1)',
				data: formattedBooked
			  },
			  {
				label: 'Hut Capacity',
				backgroundColor: 'rgba(25,99,132,0.2)',
				borderColor: 'rgba(25,99,132,1)',
				borderWidth: 1,
				hoverBackgroundColor: 'rgba(25,99,132,0.4)',
				hoverBorderColor: 'rgba(25,99,132,1)',
				data: formattedCapacity
			  }
			]
		};
	}

	getGraphLabels() {
		let labels = [];
		let months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sept', 'Oct', 'Nov', 'Dec']

		months.forEach(function(month) {
			labels.push (month + ' ' + this.state.yearSelected);
		}.bind(this));

		return labels;
	}

	/**
	 * @param data Array of huts
	 * @return Returns a formatted array that you cna use in a graph component
	*/
	formatData(data) {
		let i = 0;
		let hutsFormatted = [];
		let greatWalks = [];
		let huts = []

		for (i = 0; i < data.length; i++) {
			let dataHut = data[i];
		
			if (!hutsFormatted[dataHut.hut_or_campsite]) {
				hutsFormatted[dataHut.hut_or_campsite] = [];
			}
		
			if (!hutsFormatted[dataHut.hut_or_campsite][dataHut.date]) {
				hutsFormatted[dataHut.hut_or_campsite][dataHut.date] = [];
			}
		
			hutsFormatted[dataHut.hut_or_campsite][dataHut.date] = dataHut.count;

			// Fill the huts and great walks
			if (!greatWalks.includes(dataHut.great_walk)) {
				greatWalks.push(dataHut.great_walk);
			}

			if (!huts[dataHut.great_walk]) {
				huts[dataHut.great_walk] = [];
			} 
			if (!huts[dataHut.great_walk].includes(dataHut.hut_or_campsite)) {
				huts[dataHut.great_walk].push(dataHut.hut_or_campsite);
			}
		}

		this.setState({
			greatWalks: greatWalks,
			huts: huts
		});

		return hutsFormatted
	}

	/**
	 * @param candid Array of results
	 * @return Returns an array where index 0 = array of even ones, and index 1 = array of odd ones
	*/
	splitArray(candid) {
		var oddOnes = [],
			evenOnes = [];
		for (var i=0; i<candid.length; i++)
			(i % 2 == 0 ? evenOnes : oddOnes).push(candid[i]);
		return [evenOnes, oddOnes];
	}
}

export default Graph;
