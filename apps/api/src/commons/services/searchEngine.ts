import { PrismaService } from '../../prisma.service';

interface IdRow {
  id: number;
}

export class SearchEngine {
  constructor(private prisma: PrismaService) {}

  clearSearchTerms(search: string): string {
    return search.toLowerCase().replaceAll(' ', ' AND ');
  }

  cleanResults(rows: IdRow[]): number[] {
    return rows.map((row) => Number(row.id));
  }

  async searchPosts(search: string): Promise<number[]> {
    const searchQuery = this.clearSearchTerms(search);
    const rows = await this.prisma.$queryRaw<
      IdRow[]
    >`SELECT id FROM post_fts WHERE title MATCH ${searchQuery} or content MATCH ${searchQuery} ORDER BY RANK LIMIT 50`;
    return this.cleanResults(rows);
  }

  async searchComments(search: string): Promise<number[]> {
    const rows = await this.prisma.$queryRaw<
      IdRow[]
    >`SELECT id FROM comment_fts WHERE content MATCH ${this.clearSearchTerms(
      search,
    )} ORDER BY RANK LIMIT 50`;
    return this.cleanResults(rows);
  }
}
