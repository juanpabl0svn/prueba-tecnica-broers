import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Post('verify')
  verify(@Body() body: { token: string }) {
    return this.userService.verify(body.token);
  }
  @Get()
  findAll() {
    return this.userService.findAll();
  }


  @Post('auth')
  findOne(@Body() body: { email: string, password: string }) {
    console.log('entra')
    return this.userService.findOne(body.email, body.password);
  }

  @Get(':email')
  find(@Param('email') email: string) {
    return this.userService.find(email);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
