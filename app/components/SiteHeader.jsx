import React from "react";

export default class SiteHeader extends React.Component {
    constructor(props) {
        super(props);
    }

    getSiteTitleClassNames() {
        const classNames = ["site-header-middle"];

        if (this.props.scrollTopHeight > 50) {
            classNames.push("scrolled");
        }

        return classNames.join(" ");
    }

    getSiteHeaderClassNames() {
        const classNames = ["site-header"];

        if (this.props.updateInitiated) {
            classNames.push("updating");
        }

        return classNames.join(" ");
    }

    render() {
        return (
            <div className={this.getSiteHeaderClassNames()}>
                <div className="menu-button-container">
                    <i className="fa fa-bars"></i>
                </div>
                <div className={this.getSiteTitleClassNames()}>
                    <h1 className="site-title">FiveHundoPX</h1>
                </div>
                <div className="favorites-count-container">
                    <i className="fa fa-heart"></i> {this.props.favoritesCount}
                </div>
            </div>
        );
    }

}
