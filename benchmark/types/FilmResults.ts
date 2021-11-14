import { Property } from '../../lib/decorators/property'

class FilmResult {
  @Property() id: number
  @Property() title: string
  @Property() adult: boolean
  @Property() overview: string
  @Property({ name: 'release_date' }) releaseDate: Date
  @Property({ name: 'vote_count' }) voteCount: number
  @Property({ name: 'poster_path', nullable: true }) posterPath?: string
}

class PaginatedData {
  @Property() page: number
  @Property({ name: 'total_results' }) totalResults: number
  @Property({ name: 'total_pages' }) totalPages: 4
}

export class FilmResults extends PaginatedData {
  @Property({ type: FilmResult }) results: FilmResult[]
}
