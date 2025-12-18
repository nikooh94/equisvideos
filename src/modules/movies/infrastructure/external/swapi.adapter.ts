import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { IStarWarsApiPort, StarWarsMovieData } from '../../domain/star-wars-api.port';

@Injectable()
export class SwapiAdapter implements IStarWarsApiPort {
    private readonly baseUrl = 'https://www.swapi.tech/api/films';

    constructor(private readonly httpService: HttpService) { }

    async getMovies(): Promise<StarWarsMovieData[]> {
        // Hacemos la petición a SWAPI
        const { data } = await firstValueFrom(this.httpService.get(this.baseUrl));

        // Mapeamos los datos para que coincidan con nuestro dominio local
        // Nota: SWAPI.tech devuelve una estructura específica dentro de 'result'
        return data.result.map((item: any) => ({
            title: item.properties.title,
            director: item.properties.director,
            producer: item.properties.producer,
            opening_crawl: item.properties.opening_crawl,
            release_date: item.properties.release_date,
        }));
    }
}