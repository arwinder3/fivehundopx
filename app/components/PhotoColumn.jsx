import React from "react";

/* Components */
import Tile from "./Tile";

export default class PhotoColumn extends React.Component {
    constructor(props) {
        super(props);
    }

    getPhotoColumnClassNames() {
        return `photo-column-${this.props.photoColumnNum}`;
    }

    render() {
        return (
            <div className={this.getPhotoColumnClassNames()}>
                {
                    this.props.photos.map(photo => (
                        <Tile
                            key={photo.uuid}
                            favoritePhotoIds={this.props.favoritePhotoIds}
                            onToggleFavorite={this.props.onToggleFavorite}
                            latestPhotoSetUUIDs={this.props.latestPhotoSetUUIDs}
                            {...photo} />
                        )
                    )
                }
            </div>
        );
    }
}
