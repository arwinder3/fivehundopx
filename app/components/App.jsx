import React from "react";

/* Third-party imports */
import uuid from "node-uuid";

/* Components */
import PhotoColumn from "./PhotoColumn";
import SiteHeader from "./SiteHeader";

/* Services */
import {getPhotos} from "../services/FiveHundredService";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.photoColumnNum = this.determinePhotoColumnsNum();
        const initialPhotoSet = this.getInitialPhotoSet(this.photoColumnNum);

        this.state = {
            feature: "popular",
            currentPage: 1,
            photoSets: initialPhotoSet,
            favoritePhotoIds: [],
            scrollTopHeight: 0,
            latestPhotoSetUUIDs: [],
            updateInitiated: false
        };

        this.previousScrollTop = 0;     // determines scroll direction to improve infinite load

        this.loadPhotos = this.loadPhotos.bind(this);
        this.onToggleFavorite = this.onToggleFavorite.bind(this);
        this.handleScroll = this.handleScroll.bind(this);
        this.determineScrollDirection = this.determineScrollDirection.bind(this);
    }

    componentWillMount() {
        this.loadPhotos();
    }

    componentDidMount() {
        this.refs.appContainer.addEventListener("scroll", this.handleScroll);
    }

    componentWillUnmount() {
        this.refs.appContainer.removeEventListener("scroll", this.handleScroll);
    }

    determinePhotoColumnsNum() {
        if (this.props.browserWidth > 1200) {
            return 4;
        } else if (this.props.browserWidth > 992) {
            return 3;
        } else if (this.props.browserWidth > 768) {
            return 2;
        }
        return 1;
    }

    getInitialPhotoSet(columns) {
        const initialPhotoSet = [];
        for (let i = 0; i < columns; i++) {
            initialPhotoSet.push([]);
        }
        return initialPhotoSet;
    }

    loadPhotos() {
        // TODO: Keep track of total page numbers so we don't request more pages after we hit the last one
        const updatedPhotoSets = this.state.photoSets.slice(0);
        return getPhotos(this.state.feature, this.state.currentPage)
            .then(data => {
                data.photos.forEach((photo, index) => {
                    const photoSetIndex =
                        (data.photos.length + index) % this.photoColumnNum;
                    photo.uuid = uuid.v4();
                    updatedPhotoSets[photoSetIndex].push(photo);
                });
                const latestPhotoSetUUIDs = data.photos.map(latestPhoto => latestPhoto.uuid);
                this.setState({
                    photoSets: updatedPhotoSets,
                    currentPage: this.state.currentPage + 1,
                    latestPhotoSetUUIDs: latestPhotoSetUUIDs
                });
            });
    }

    onToggleFavorite(photoId) {
        let updatedFavoritePhotoIds = this.state.favoritePhotoIds.slice(0);

        if (this.state.favoritePhotoIds.indexOf(photoId) > -1) {
            updatedFavoritePhotoIds = updatedFavoritePhotoIds.filter(filterPhotoId => filterPhotoId !== photoId);
        } else {
            updatedFavoritePhotoIds.push(photoId);
        }

        this.setState({
            favoritePhotoIds: updatedFavoritePhotoIds
        });
    }

    handleScroll(e) {
        this.setState({
            scrollTopHeight: e.srcElement.scrollTop
        });

        // Only want to load more if the user is scrolling down
        // This is to prevent us from scrolling up when being within load more section
        // at the bottom of the page, which would trigger more photos to be loaded.
        if (this.determineScrollDirection(e.srcElement.scrollTop) !== 1) {
            this.previousScrollTop = e.srcElement.scrollTop;
            return;
        } else {
            this.previousScrollTop = e.srcElement.scrollTop;
        }

        const scrolledArea = e.srcElement.scrollTop + e.srcElement.clientHeight,
            totalScrollableArea = e.srcElement.scrollHeight,
            percentageScrolled = (100 / totalScrollableArea) * scrolledArea;

        if (percentageScrolled >= 88 && !this.state.updateInitiated) {
            this.setState({
                updateInitiated: true
            }, () => {
                this.loadPhotos()
                    .then(() => {
                        this.setState({
                            updateInitiated: false
                        });
                    });
            });
        }
    }

    // Returns: 1 = UP, 0 = DOWN
    determineScrollDirection(currentScrollTop) {
        return (this.previousScrollTop < currentScrollTop) ? 1 : 0;
    }

    render() {
        return (
            <div className="app-wrapper">
                <SiteHeader
                    favoritesCount={this.state.favoritePhotoIds.length}
                    scrollTopHeight={this.state.scrollTopHeight}
                    updateInitiated={this.state.updateInitiated}/>

                <div className="app-container" ref="appContainer">
                    {
                        this.state.photoSets.map((photoSet, index) => (
                            <PhotoColumn
                                key={index}
                                photos={photoSet}
                                favoritePhotoIds={this.state.favoritePhotoIds}
                                onToggleFavorite={this.onToggleFavorite}
                                photoColumnNum={this.photoColumnNum}
                                latestPhotoSetUUIDs={this.state.latestPhotoSetUUIDs}/>
                        ))
                    }
                </div>

            </div>
        );
    }

}
