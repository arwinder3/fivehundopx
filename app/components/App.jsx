import React from "react";

import uuid from "node-uuid";

import PhotoColumn from "./PhotoColumn";
import SiteHeader from "./SiteHeader";

import {getPhotos} from "../services/FiveHundredService";

export default class App extends React.Component {

    constructor(props) {
        super(props);

        this.photoColumnsNum = 4;

        this.state = {
            feature: "popular",
            currentPage: 1,
            photoSets: [[], [], [], []],
            favoritePhotoIds: [],
            scrollTopHeight: 0
        };

        this.updateInitiated = false;
        this.previousScrollTop = 0;

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

    loadPhotos() {
        const updatedPhotoSets = this.state.photoSets.slice(0);
        return getPhotos(this.state.feature, this.state.currentPage)
            .then(data => {
                data.photos.forEach((photo, index) => {
                    const photoSetIndex =
                        (data.photos.length + index) % this.photoColumnsNum;
                    photo.uuid = uuid.v4();
                    updatedPhotoSets[photoSetIndex].push(photo);
                });
                this.setState({
                    photoSets: updatedPhotoSets,
                    currentPage: this.state.currentPage + 1
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

        if (this.determineScrollDirection(e.srcElement.scrollTop) !== 1) {
            this.previousScrollTop = e.srcElement.scrollTop;
            return;
        } else {
            this.previousScrollTop = e.srcElement.scrollTop;
        }

        const scrolledArea = e.srcElement.scrollTop + e.srcElement.clientHeight,
            totalScrollableArea = e.srcElement.scrollHeight,
            percentageScrolled = (100 / totalScrollableArea) * scrolledArea;

        if (percentageScrolled >= 88 && !this.updateInitiated) {
            this.updateInitiated = true;
            setTimeout(() => {
                this.loadPhotos()
                    .then(() => {
                        this.updateInitiated = false;
                    });
            }, 100);
        }

    }

    /*
        Returns
            1: UP
            0: DOWN
    */
    determineScrollDirection(currentScrollTop) {
        return (this.previousScrollTop < currentScrollTop) ? 1 : 0;
    }

    render() {
        return (
            <div className="app-wrapper">
                <SiteHeader
                    favoritesCount={this.state.favoritePhotoIds.length}
                    scrollTopHeight={this.state.scrollTopHeight}/>

                <div className="app-container" ref="appContainer">
                    {
                        this.state.photoSets.map((photoSet, index) => (
                            <PhotoColumn
                                key={index}
                                photos={photoSet}
                                favoritePhotoIds={this.state.favoritePhotoIds}
                                onToggleFavorite={this.onToggleFavorite} />
                        ))
                    }
                </div>

            </div>
        );
    }

}
