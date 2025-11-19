import request from 'supertest';
import app from '../..';
import { faker } from '@faker-js/faker';
import { Setting } from '../../entity/setting';

describe('Update Settings test suite', () => {
  it('should return 400 if clientId is missing from the request body', async () => {
    const res = await request(app)
      .put('/settings')
      .send({
        customerInfo: { active: true, addressInfo: false, basicInfo: true },
      });
    expect(res.statusCode).toEqual(400);
  });

  it('should update existing setting', async () => {
    const clientId = faker.number.int(100_000);
    const initialSetting: Partial<Setting> = {
      clientId,
      customerInfo: { active: true, addressInfo: false, basicInfo: true },
    };
    // Create initial setting
    await request(app).put('/settings').send(initialSetting).expect(200);

    const updatedSetting: Partial<Setting> = {
      clientId,
      customerInfo: { active: false, addressInfo: true, basicInfo: false },
    };
    // Update the setting
    await request(app).put('/settings').send(updatedSetting).expect(200);

    // Verify the update
    const res = await request(app).get(`/settings/${clientId}`);
    expect(res.statusCode).toEqual(200);
    expect(res.body).toMatchObject(updatedSetting);
  });
});
