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

    render() {
        return (
            <div className="site-header">
                <div className="menu-button-container"><i className="fa fa-bars"></i></div>
                <div className={this.getSiteTitleClassNames()}>FiveHundoPX</div>
                <div className="favorites-count-container"><i className="fa fa-heart"></i> {this.props.favoritesCount}</div>
            </div>
        );
    }

}
