import request from 'supertest';
import app from '../..';
import { faker } from '@faker-js/faker';
import { Setting } from '../../entity/setting';

describe('Get Settings test suite', () => {
  it('should return 400 if clientId is not provided', async () => {
    const res = await request(app).get('/settings/invalid');
    expect(res.statusCode).toEqual(400);
  });
  it('should return the setting if found', async () => {
    const clientId = faker.number.int(100_000);
    const mockSetting: Partial<Setting> = {
      clientId,
      customerInfo: { active: true, addressInfo: false, basicInfo: true },
    };
    await request(app).put('/settings').send(mockSetting).expect(200);

    const res = await request(app).get(`/settings/${clientId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(mockSetting);
  });

  it('should return defaults if setting is not found', async () => {
    const clientId = faker.number.int(100_000);
    const res = await request(app).get(`/settings/${clientId}`);

    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject({ clientId, customerInfo: { active: false, addressInfo: false, basicInfo: false } });
  });
});
