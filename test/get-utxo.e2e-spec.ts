import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NETWORK } from "../src/config";

describe('get-utxo', () => {
    let app: INestApplication;

    beforeAll( async () => {
        const moduleFixture: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();
        app = moduleFixture.createNestApplication();
        await app.init();
    })

    describe('GET /get-utxo', () => {

        const crypto = require("crypto");
        const bitcoin = require('bitcoinjs-lib');
        const network = bitcoin.networks[NETWORK];
        const nock = require('nock');
        const bitcoreApi = nock('https://api.bitcore.io/api');

        let nockResponseBody, appResponseBody, url;

        beforeEach( () => {

            nock.cleanAll();

            const keyPair = bitcoin.ECPair.makeRandom({  // генерируем рандомный ECPair
                network: network,
            })

            const { address } = bitcoin.payments.p2pkh({  // получаем с него адрес
                pubkey: keyPair.publicKey,
                network: network
            });

            nockResponseBody = []; // массив обьектов который будут мокаться
            appResponseBody = [];  // массив обьектов, это будет нашим правильным ответом
            url = `/get-utxo/${address}`; // т.к. у нас всего лишь 2 теста это можно и не использовать

            for (let index = 0; index <= Number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)) % 10; index++) {  // генерация рандомного количества обьектов с рандомным набором значений переменных
                nockResponseBody.push({
                    mintTxid: crypto.randomBytes(20).toString('hex'),
                    mintIndex: Number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)),
                    value: Number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER)),
                    address: address,
                    script: crypto.randomBytes(20).toString('hex'),
                    confirmations: Number(Math.floor(Math.random() * Number.MAX_SAFE_INTEGER))
                })
                appResponseBody.push({
                    txId: nockResponseBody[index].mintTxid,
                    vout: nockResponseBody[index].mintIndex,
                    value: nockResponseBody[index].value,
                    address: nockResponseBody[index].address,
                    scriptPubKey: nockResponseBody[index].script,
                    confirmations: nockResponseBody[index].confirmations
                })
            }

            appResponseBody.sort(function (first, second) { // сортируем, т.к. наш ответ должен быть отсортирован по value в порядке убывания
                return second.value - first.value;
            });

            const nockUrl = `/BTC/${NETWORK}/address/${address}?unspent=true&limit=0`;

            bitcoreApi
                .get(nockUrl)
                .reply(HttpStatus.OK, nockResponseBody);

        });

        it('success', () => {
            return request(app.getHttpServer())
                .get(url)
                .expect(HttpStatus.OK)
                .expect('Content-Type', /json/)
                .then(response => {
                    expect(response.body).toEqual(appResponseBody);
                    console.log(response.body);
                });
        });

        it('fail - invalid param', () => {
            return request(app.getHttpServer())
                .get('/get-utxo/invalid')            // invalid param
                .expect(HttpStatus.BAD_REQUEST)
                .expect('Content-Type', /json/)
        });
    })

});
