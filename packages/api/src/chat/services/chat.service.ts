import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { WsException } from '@nestjs/websockets';
import { parse } from 'cookie';
import { Socket } from 'socket.io';
import { AuthenticationService } from 'src/authentication';
import { BaseRepositoryService } from 'src/core';
import { Repository } from 'typeorm';
import { Message } from '../entities';

@Injectable()
export class ChatService extends BaseRepositoryService<Message> {
  constructor(
    private readonly authentication: AuthenticationService,
    @InjectRepository(Message)
    messagesRepository: Repository<Message>,
  ) {
    super(messagesRepository);
  }

  async saveMessage(content: Message['content'], author: Message['author']) {
    return await this.create({ content, author });
  }

  async getAllMessages() {
    return await this.getAll();
  }

  async getUserFromSocket(socket: Socket) {
    const { cookie } = socket.handshake.headers;
    const { Authentication: token } = parse(cookie);
    const user = await this.authentication.getUserFromAuthenticationToken(
      token,
    );

    if (!user) {
      throw new WsException('Invalid credentials.');
    }

    return user;
  }
}
