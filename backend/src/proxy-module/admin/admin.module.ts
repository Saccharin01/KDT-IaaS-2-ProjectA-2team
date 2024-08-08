import { Module } from '@nestjs/common';
import { AdminController } from './admin.controller';
import { ProxyModule } from 'src/proxy/proxy.module';

@Module({
  imports: [ProxyModule],
  controllers: [AdminController],
})
export class AdminModule {}
