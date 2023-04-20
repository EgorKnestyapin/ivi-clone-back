import { Body, Controller } from '@nestjs/common';
import { ProfilesService } from './profiles.service';
import { Ctx, MessagePattern, RmqContext } from '@nestjs/microservices';
import { CreateUserProfileDto } from '@app/shared/dto/create-user-profile.dto';
import { REGISTRATION } from '@app/shared';

@Controller()
export class ProfilesController {
  constructor(private readonly profileService: ProfilesService) {}

  @MessagePattern({ cmd: 'get-profiles' })
  getProfiles(@Ctx() context: RmqContext) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.profileService.getAllProfiles();
  }

  @MessagePattern({ cmd: REGISTRATION })
  registration(
    @Body() userProfileDto: CreateUserProfileDto,
    @Ctx() context: RmqContext,
  ) {
    const channel = context.getChannelRef();
    const message = context.getMessage();
    channel.ack(message);

    return this.profileService.createUserProfile(userProfileDto);
  }
}
