import { SearchTablesT, SearchTables } from '../enums/searchTables';
import { PrismaService } from '../../prisma.service';

export class SearchEngine {
  constructor(
    private prisma: PrismaService,
    private searchTable: SearchTablesT,
  ) {}

  async search(search: string): Promise<number[]> {
    const searchQuery = search.toLowerCase();
    console.log(
      `SELECT id FROM ${this.searchTable} WHERE document MATCH '${searchQuery}'`,
    );
    return this.prisma
      .$queryRaw`SELECT id FROM ${this.searchTable} WHERE document MATCH '${searchQuery}'`;
  }
}
