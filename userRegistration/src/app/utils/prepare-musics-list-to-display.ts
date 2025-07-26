import { IMusicToDisplay } from "../interfaces/music-to-display.interface"
import { IMusic } from "../interfaces/user/music.interface";
import { MusicsList } from "../types/musics-list";

export const prepareMusicsListToDisplay = (toDisplay: boolean, musicsList: MusicsList, callback:(music: IMusicToDisplay) => void) => {

    if (!musicsList) return;

    const musicLength = musicsList.length;

    for (let m=0; m < 4; m++) {
        let music;

        if (toDisplay) music = musicFormat(musicsList[m]);
        else music = musicFormEdit(musicsList[m]);

        callback ({
            ...music
        });
    }
};

const musicFormat = (music: IMusic | undefined): IMusicToDisplay => {

    if (!music) {
        return ({
            title: "-",
            band: "-",
            genre: "-",
            isFavorite: "-"
        });
    }

    return ({
        ...music
    });
};

const musicFormEdit = (music: IMusic | undefined): IMusicToDisplay => {

    if (!music) {
        return ({
            title: "",
            band: "",
            genre: 0,
            isFavorite: ""
        });
    }

    return ({
        ...music
    });
};