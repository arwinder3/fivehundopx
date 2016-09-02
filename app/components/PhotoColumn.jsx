import React from "react";

import Tile from "./Tile";

export default class PhotoColumn extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="photo-column">
                {
                    this.props.photos.map(photo => (
                        <Tile
                            key={photo.uuid}
                            favoritePhotoIds={this.props.favoritePhotoIds}
                            onToggleFavorite={this.props.onToggleFavorite}
                            {...photo} />
                        )
                    )
                }
            </div>
        );
    }
}
