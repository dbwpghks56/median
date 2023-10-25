import { ArgumentsHost, Catch, ExceptionFilter, HttpStatus } from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import {Prisma} from '@prisma/client'
import {Response} from 'express'

@Catch(Prisma.PrismaClientKnownRequestError)
export class PrismaClientExceptionFilter extends BaseExceptionFilter {
  catch(exception: Prisma.PrismaClientKnownRequestError, host: ArgumentsHost) {
    console.error(exception.message);

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const message = exception.message.replace(/\n/g, '');

    switch(exception.code) {
      case 'P2002' : {
        const status = HttpStatus.CONFLICT;
        response.status(status).json({
          statusCode: status,
          message: message
        });
        break;
      }
      default:
        super.catch(exception, host);
        break;
    }
  }

}

/**
 * 여기서는 다음과 같이 변경했습니다.
이 필터가 유형의 예외를 포착하도록 하기 위해 PrismaClientKnownRequestError이를 데코레이터에 추가했습니다 @Catch.
예외 필터는 BaseExceptionFilterNestJS 코어 패키지에서 클래스를 확장합니다. catch이 클래스는 사용자에게 "내부 서버 오류" 
응답을 반환하는 메서드 에 대한 기본 구현을 제공합니다 . NestJS 문서에서 이에 대해 자세히 알아볼 수 있습니다 .
console.error콘솔에 오류 메시지를 기록하는 명령문을 추가했습니다 . 
이는 디버깅 목적에 유용합니다.
 */
