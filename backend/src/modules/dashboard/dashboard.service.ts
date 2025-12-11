import { Injectable } from '@nestjs/common';
import { DashboardRepository } from './repositories/dashboard.repository';
import { stats } from './interface/stats';

@Injectable()
export class DashboardService {
  constructor(private readonly repo: DashboardRepository) {}

  private async countUsers(): Promise<number> {
    return await this.repo.countUsers();
  }

  private async countProdutos(): Promise<number> {
    return await this.repo.countProdutos();
  }
  private async countEstoque(): Promise<number> {
    return await this.repo.countEstoque();
  }

  async getStats(): Promise<stats> {
    return {
      users: await this.countUsers(),
      sales: 4530,
      produts: await this.countProdutos(),
      estoqueTotal: await this.countEstoque(),
    };
  }
}
