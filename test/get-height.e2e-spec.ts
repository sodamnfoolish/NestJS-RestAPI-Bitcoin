import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NETWORK } from "../src/config";

describe('get-height', () => {
    let app: INestApplication;

    beforeAll(async () => {
        const moduleFixture: TestingModule =
            await Test.createTestingModule({
                imports: [AppModule],
            }).compile();

        app = moduleFixture.createNestApplication();
        await app.init();
    });

    describe('GET /get-height', () => {
        const url = '/get-height';

        const nock = require('nock');
        const bitcoreApi = nock('https://api.bitcore.io/api');
        let nockBodyResponse;

        beforeEach( () => {
            nock.cleanAll()

            nockBodyResponse = {
                height: Number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))   // рандомное число
            }
            const nockUrl = `/BTC/${NETWORK}/block/tip`;

            bitcoreApi
                .get(nockUrl)
                .reply(HttpStatus.OK, nockBodyResponse);
        })

        it('success', () => {
            return request(app.getHttpServer())
                .get(url)
                .expect(HttpStatus.OK)
                .expect('Content-Type', /json/)
                .then(response => expect(response.body.height).toEqual(nockBodyResponse.height));
        })
    })

});
