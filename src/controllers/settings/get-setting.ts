import { Router } from 'express';
import { SettingDAL } from '../../dal/settings.dal';

export const createGetSettingHandler = (settingDAL: SettingDAL) =>
  Router().get('/:clientId', async (req, res) => {
    const clientId = parseInt(req.params.clientId);
    if (!clientId) return res.status(400).end();

    const setting = await settingDAL.get(clientId);
    return res.json(setting);
  });
