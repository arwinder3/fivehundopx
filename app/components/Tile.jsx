import React from "react";

export default class Tile extends React.Component {
    constructor(props) {
        super(props);

        this.handleToggleFavorite = this.handleToggleFavorite.bind(this);
    }

    componentDidMount() {
        this.refs.image.style.height = this.props.height *
            this.getWidthPercentage(this.props.width, this.refs.tileContainer.offsetWidth) + "px";
    }

    getTileClassNames() {
        const classNames = ["tile"];

        if (this.props.favoritePhotoIds.indexOf(this.props.id) > -1) {
            classNames.push("favorite");
        }

        return classNames.join(" ");
    }

    getWidthPercentage(imageWidth, renderedWidth) {
        return ((100 / imageWidth) * renderedWidth) / 100;
    }

    handleToggleFavorite() {
        this.props.onToggleFavorite(this.props.id);
    }

    render() {
        return (
            <div className={this.getTileClassNames()} ref="tileContainer" onClick={this.handleToggleFavorite}>
                <div className="tile-image-container">
                    <span className="times-viewed">Times Viewed: {this.props.times_viewed}</span>
                    <img
                        ref="image"
                        width="100%"
                        src={this.props.image_url} />
                </div>
                <h2 className="tile-heading">{this.props.name}</h2>
            </div>
        );
    }
}
