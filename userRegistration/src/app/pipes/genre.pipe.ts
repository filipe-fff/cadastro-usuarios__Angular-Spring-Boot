import { inject, Pipe, PipeTransform } from "@angular/core";
import { GenresService } from "../services/genres.service";
import { GenresListResponse } from "../types/genres-list-response";

@Pipe({
    name: 'genre',
    standalone: true
})
export class GenrePipe implements PipeTransform {

    private readonly _genresService = inject(GenresService);

    transform(genreId: string | number, genresList: GenresListResponse): string {

        const genreDescription = genresList.find(genre => genre.id === genreId)?.description;

        return typeof genreId === "string" ? genreId : genreDescription ? genreDescription : "-";
    }
}