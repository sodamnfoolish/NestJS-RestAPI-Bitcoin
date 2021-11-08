import { Test, TestingModule } from '@nestjs/testing';
import { HttpStatus, INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { NETWORK } from "../src/config";

describe('create-raw-transaction', () => {
  let app: INestApplication;

  beforeAll(async () => {
      const moduleFixture: TestingModule = await Test.createTestingModule({
          imports: [AppModule],
      }).compile();
      app = moduleFixture.createNestApplication();
      await app.init();
  });

  describe('CREATE /create-raw-transaction', () => {
      const url = '/create-raw-transaction';

      const nock = require('nock');

      const bitcoreApi = nock('https://api.bitcore.io/api');
      const blockstreamApi = nock('https://blockstream.info');

      const CONST = {
          addressFrom: 'mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et',
          addressFromWif: 'cUrnQ6qZL7pXxAb98QjwSyghY6xqvk2aevb8DvNzMMk42543WpVU',
          addressTo: 'n1ufspXJwafVPxyHgYbTCdDq3S74m9zTV1',
          amount: 1000,

          nockBitcoreApiResponseBody: [
              {
                  _id: '61637de3a8e6754d23be2157',
                  chain: 'BTC',
                  network: NETWORK,
                  coinbase: false,
                  mintIndex: 1,
                  spentTxid: '',
                  mintTxid: '499804075c59befe501c29ec60747c54802396b5a64bd0d81e6cb471787b5a80',
                  mintHeight: 2098562,
                  spentHeight: -2,
                  address: 'mktfwcgbQUgPsHxkJt6BSqhaCopJXBG9et',
                  script: '76a9143af4213a8c4d691197a901ad3122b1ffb5885b7288ac',
                  value: 471214,
                  confirmations: -1
              }
          ],

          nockBlockstreamApiResponseBody: '02000000017e2a891b7cd3372cdfb2d1073a48cf824bcdc2405e375ee7118acbc9724f0136010000006a473044022006e02e97034dde2ff487e8425932de5f902461a63e3172dc32a4e25ab79597ed02201b598cafe4a8853eb0fa50c575f08f47586675d6708a48d5fdc7ade7d7fb601e012103df1764a3b18d66a95bb520c1714e8e2b0f315f7033c68983e617594852f071b2ffffffff0227270000000000001976a914dfae60bd2cb2698a7609a5c96741360e94795fef88acae300700000000001976a9143af4213a8c4d691197a901ad3122b1ffb5885b7288ac00000000',
      }

      beforeEach( () => {
          nock.cleanAll();

          bitcoreApi
              .get(`/BTC/${NETWORK}/address/${CONST.addressFrom}?unspent=true&limit=0`)
              .reply(HttpStatus.OK, CONST.nockBitcoreApiResponseBody);

          blockstreamApi
              .get(`/${NETWORK}/api/tx/${CONST.nockBitcoreApiResponseBody[0].mintTxid}/hex`)
              .reply(HttpStatus.OK, CONST.nockBlockstreamApiResponseBody);
      })

      it('success-signed', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.CREATED)
              .then(response => expect(response.body.hex).toEqual(expect.any(String)))
      })

      it('success-unsigned', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.CREATED)
              .then(response => expect(response.body.hex).toEqual(expect.any(String)))
      })

      it('fail-invalid-addressFrom', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: 'invalid',
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-addressFrom-is-number', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: 1000,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-addressFrom-is-array', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: [ 'invalid' ],
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-missed-addressFrom', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-addressFromWif', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: 'invalid',
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-addressFromWif-is-number', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: 1000,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-addressFromWif-is-array', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: [ 'invalid' ],
                  addressTo: CONST.addressTo,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-addressTo', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: 'invalid',
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-addressTo-is-number', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: 1000,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-addressTo-is-array', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: [ 'invalid' ],
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-missed-addressTo', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  amount: CONST.amount
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-amount-is-string', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: '1000'
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-type-of-amount-is-array', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: [ '1000' ]
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-amount-less-than-0', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: -1000000000000000
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-invalid-amount-greater-than-have', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: 1000000000000000
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-missed-amount', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

      it('fail-extra-object', () =>{
          return request(app.getHttpServer())
              .post(url)
              .send({
                  addressFrom: CONST.addressFrom,
                  addressFromWif: CONST.addressFromWif,
                  addressTo: CONST.addressTo,
                  amount: CONST.amount,
                  extra_object: 'extra_object'
              })
              .expect('Content-Type', /json/)
              .expect(HttpStatus.BAD_REQUEST)
      })

  })

});
