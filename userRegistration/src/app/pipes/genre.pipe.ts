import { inject, Pipe, PipeTransform } from "@angular/core";
import { GenresService } from "../services/genres.service";
import { GenresListResponse } from "../types/genres-list-response";

@Pipe({
    name: 'genre',
    standalone: true
})
export class GenrePipe implements PipeTransform {

    private readonly _genresService = inject(GenresService);

    transform(genreId: number, genresList: GenresListResponse): string {

        const genreDescription = genresList.find(genre => genre.id === genreId)?.description;

        console.log(genreDescription);

        return genreDescription ? genreDescription : "";
    }
}