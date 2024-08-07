import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/proxy/proxy.module';
import { SearchController } from './search.controller';

@Module({
  imports: [ProxyModule],
  controllers: [SearchController],
})
export class SearchModule {}
