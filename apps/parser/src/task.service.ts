import { Inject, Injectable, Logger } from '@nestjs/common';
import { Cron } from '@nestjs/schedule';
import { ParserService } from './parser.service';
import { ClientProxy } from '@nestjs/microservices';
import { PARSER } from '@app/rabbit/queues';
import { PARSE_DATA } from '@app/rabbit/events';

@Injectable()
export class TasksService {
  private readonly logger = new Logger(TasksService.name);

  constructor(
    private readonly parserService: ParserService,
    @Inject(PARSER)
    private readonly client: ClientProxy,
  ) {}

  @Cron('0/30 * * * * *')
  async handleCron() {
    this.logger.debug('Called every 30 seconds');

    const res = await this.parserService.parse();

    if (res.status === 'ok') {
      this.client.emit(PARSE_DATA, res.value);
    }
  }
}
