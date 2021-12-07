import React from 'react';

//Exporto la calse 'Button'
export class Button extends React.Component {
	render() {
		return (
			<button 
				className={ this.props.light ? 'light-button' : 'dark-button' }>
				Refresh
			</button>
		);
	}
}
