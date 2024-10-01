import a1_0x473834 from 'axios';
import { HttpsProxyAgent } from 'https-proxy-agent';
import { Helper } from '../utils/helper.js';
import a1_0x58dfe8 from '../utils/logger.js';
import 'telegram/client/index.js';
export class API {
  constructor(_0x21673a, _0x5d2fb7, _0x1f284e, _0x292ee2, _0x8f16f8, _0x534ef7, _0x35b45f) {
    this.url = _0x292ee2;
    this.queryObj = _0x5d2fb7;
    this.host = _0x8f16f8;
    this.origin = _0x534ef7;
    this.referer = _0x35b45f;
    this.ua = Helper.randomUserAgent();
    this.query = _0x21673a;
    this.proxy = _0x1f284e;
    this.masterHash = undefined;
    this.axiosInstance = a1_0x473834.create({
      'baseURL': _0x292ee2,
      'headers': {}
    });
  }
  async ["generateHeaders"](_0x3c090a = this.query) {
    const _0x5c742a = {
      'Accept': "application/json, text/plain, */*",
      'Accept-Language': "en-US,en;q=0.9,id;q=0.8",
      'Content-Type': "application/json",
      'Sec-Fetch-Dest': "empty",
      'Sec-Fetch-Site': 'same-site',
      'Sec-Fetch-Mode': "cors",
      'User-Agent': this.ua,
      'Host': this.host,
      'Origin': this.origin,
      'Referer': this.referer,
      'X-Master-Hash': this.masterHash,
      'X-Player-Id': this.queryObj.user.id
    };
    if (_0x3c090a) {
      _0x5c742a.Authorization = "Initdata " + _0x3c090a;
    }
    return _0x5c742a;
  }
  async ["fetch"](_0x3f047f, _0x44b6a7 = "GET", _0x4b3f5c, _0xa31b1c = {}, _0x52d58a = {}) {
    try {
      const _0xeac257 = '' + this.url + _0x3f047f;
      const _0x1274fb = {
        ..._0x52d58a,
        ...(await this.generateHeaders(_0x4b3f5c))
      };
      a1_0x58dfe8.info(_0x44b6a7 + " : " + _0xeac257 + " " + (this.proxy ? this.proxy : ''));
      a1_0x58dfe8.info("Request Header : " + JSON.stringify(_0x1274fb));
      const _0x646766 = {
        'method': _0x44b6a7,
        'url': _0xeac257,
        'headers': _0x1274fb
      };
      if (this.proxy) {
        _0x646766.httpsAgent = new HttpsProxyAgent(this.proxy);
      }
      if (_0x44b6a7 !== 'GET') {
        _0x646766.data = _0xa31b1c;
        a1_0x58dfe8.info("Request Body : " + JSON.stringify(_0xa31b1c));
      }
      const _0x1535ad = await this.axiosInstance.request(_0x646766);
      const _0x52b940 = {
        'status': _0x1535ad.status,
        ..._0x1535ad.data
      };
      a1_0x58dfe8.info("Response : " + _0x1535ad.status + " " + _0x1535ad.statusText);
      let _0x39b1c9 = JSON.stringify(_0x1535ad.data);
      if (_0x39b1c9.length > 0x96) {
        _0x39b1c9 = _0x39b1c9.substring(0x0, 0x96) + "...";
      }
      a1_0x58dfe8.info("Response Data : " + _0x39b1c9);
      return _0x52b940;
    } catch (_0x2c218c) {
      a1_0x58dfe8.error("Error : " + _0x2c218c.message);
      if (_0x2c218c.response && _0x2c218c.status === 0x190) {
        const _0x5d64be = {
          'status': _0x2c218c.status,
          ..._0x2c218c.response.data
        };
        return _0x5d64be;
      } else {
        throw _0x2c218c;
      }
    }
  }
}