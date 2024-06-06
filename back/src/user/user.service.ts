import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { ILike, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import * as jwt from 'jsonwebtoken'



@Injectable()
export class UserService {

  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>) { }

  async create(createUserDto: CreateUserDto) {
    createUserDto.password = await bcrypt.hash(createUserDto.password, 10);

    try {

      const user = this.userRepository.create(createUserDto);
      this.userRepository.save(user);

      return jwt.sign({ id_user: user.id_user }, 'secret', { expiresIn: '1h' })
    } catch (error) {
      return 'User already exists'
    }
  }

  findAll() {
    return this.userRepository.find();
  }


  find(email: string) {
    return this.userRepository.find({ where: { email: ILike(`%${email}%`) } })
  }

  async findOne(email: string, password: string) {

    const user = await this.userRepository.findOne({ where: { email } })

    if (!user) throw new NotFoundException('User not found')

    const samePassword = bcrypt.compare(password, user.password)

    if (!samePassword) throw new NotFoundException('Username or password incorrect')

    const token = jwt.sign({ id_user: user.id_user }, 'secret', { expiresIn: '1h' })


    return { token }

  }


  verify(token: string) {
    try {
      const isValid = jwt.verify(token, 'secret')
      if (!isValid) throw new NotFoundException('Token invalid')


      const { id_user } = isValid as { id_user: number }


      const user = this.userRepository.findOne({ where: { id_user } })

      return user

    } catch (error) {
      return { error: 'Token invalid' }
    }
  }

  async update(id_user: number, updateUserDto: UpdateUserDto) {

    const lastData = await this.userRepository.findOne({ where: { id_user } })

    if (updateUserDto.password !== lastData.password) updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);


    updateUserDto.password = bcrypt.hashSync(updateUserDto.password, 10);
    return this.userRepository.update({ id_user }, updateUserDto);
  }

  remove(id_user: number) {
    return this.userRepository.delete({ id_user })
  }
}
