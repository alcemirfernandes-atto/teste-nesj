import { Controller, Get } from '@nestjs/common';
import { DashboardService } from './dashboard.service';
import { Auth } from '../auth/decorators/auth';

@Controller('stats')
export class DashboardController {
  constructor(private readonly dashboardService: DashboardService) {}

  @Auth()
  @Get()
  getStats() {
    return this.dashboardService.getStats();
  }
}
