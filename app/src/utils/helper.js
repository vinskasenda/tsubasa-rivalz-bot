import a4_0x1d7c37 from 'moment-timezone';
import a4_0x312c1f from 'fs';
import a4_0x44c968 from 'path';
import { parse } from 'querystring';
import a4_0x4a456a from './twist.js';
export class Helper {
  static ["delay"] = (_0x161120, _0x14e9ab, _0x3a7e8a, _0x4bd53f) => {
    return new Promise(_0x13c59a => {
      let _0x429596 = _0x161120;
      if (_0x14e9ab != undefined) {
        a4_0x4a456a.log(_0x3a7e8a, _0x14e9ab, _0x4bd53f, "Delaying for " + this.msToTime(_0x161120));
      } else {
        a4_0x4a456a.info((_0x3a7e8a ?? '') + " - Delaying for " + this.msToTime(_0x161120));
      }
      const _0x283a10 = setInterval(() => {
        _0x429596 -= 0x3e8;
        if (_0x14e9ab != undefined) {
          a4_0x4a456a.log(_0x3a7e8a, _0x14e9ab, _0x4bd53f, "Delaying for " + this.msToTime(_0x429596));
        } else {
          a4_0x4a456a.info((_0x3a7e8a ?? '') + " - Delaying for " + this.msToTime(_0x429596));
        }
        if (_0x429596 <= 0x0) {
          clearInterval(_0x283a10);
          _0x13c59a();
        }
      }, 0x3e8);
      setTimeout(async () => {
        clearInterval(_0x283a10);
        await a4_0x4a456a.clearInfo();
        if (_0x14e9ab) {
          a4_0x4a456a.log(_0x3a7e8a, _0x14e9ab, _0x4bd53f);
        }
        _0x13c59a();
      }, _0x161120);
    });
  };
  static ["randomUserAgent"]() {
    const _0x47dbdb = ["Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) CriOS/125.0.6422.80 Mobile/15E148 Safari/604.1", "Mozilla/5.0 (iPhone; CPU iPhone OS 17_5_1 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.0 EdgiOS/125.2535.60 Mobile/15E148 Safari/605.1.15", "Mozilla/5.0 (Linux; Android 10; SM-G973F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; Pixel 3 XL) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 EdgA/124.0.2478.104", "Mozilla/5.0 (Linux; Android 10; VOG-L29) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374", "Mozilla/5.0 (Linux; Android 10; SM-N975F) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/125.0.6422.113 Mobile Safari/537.36 OPR/76.2.4027.73374"];
    return _0x47dbdb[Math.floor(Math.random() * _0x47dbdb.length)];
  }
  static ['readTime'](_0x12bc03) {
    const _0x21a4db = a4_0x1d7c37.unix(_0x12bc03);
    return _0x21a4db.format("YYYY-MM-DD HH:mm:ss");
  }
  static ["getCurrentTimestamp"]() {
    const _0x59cb20 = a4_0x1d7c37().tz('Asia/Singapore').unix();
    return _0x59cb20.toString();
  }
  static ['getSession'](_0x29a656) {
    try {
      if (!a4_0x312c1f.existsSync('accounts')) {
        a4_0x312c1f.mkdirSync('accounts');
      }
      const _0xa46ffd = a4_0x312c1f.readdirSync(a4_0x44c968.resolve(_0x29a656));
      const _0x2a91c3 = [];
      _0xa46ffd.forEach(_0x2b61b8 => {
        _0x2a91c3.push(_0x2b61b8);
      });
      return _0x2a91c3;
    } catch (_0x2db39e) {
      throw Error("Error reading sessions directory: " + _0x2db39e + ',');
    }
  }
  static ["resetAccounts"]() {
    try {
      const _0x235082 = a4_0x44c968.resolve("accounts");
      const _0x798205 = a4_0x312c1f.readdirSync(_0x235082);
      console.log("Deleting Accounts...");
      _0x798205.forEach(_0x51f502 => {
        const _0x577041 = a4_0x44c968.join(_0x235082, _0x51f502);
        console.log(_0x577041);
        a4_0x312c1f.rm(_0x577041, {
          'recursive': true,
          'force': true
        }, _0x410c70 => {
          if (_0x410c70) {
            console.error("Error deleting file " + _0x577041 + ':', _0x410c70);
          }
        });
      });
      console.info("Account reset successfully. Please restart the bot.");
    } catch (_0x15923c) {
      console.error("Error deleting accounts: " + _0x15923c);
      throw _0x15923c;
    }
  }
  static ["getTelegramQuery"](_0x2cffbe, _0x344ca3) {
    const _0x517804 = _0x2cffbe.indexOf('#');
    if (_0x517804 === -0x1) {
      throw new Error("No query string found in the URL.");
    }
    const _0x4573b3 = _0x2cffbe.substring(_0x517804 + 0x1);
    const _0x23e867 = _0x4573b3.split('&');
    const _0x5755bd = _0x23e867[0x0].split('&')[0x0].replace("tgWebAppData=", '');
    if (!_0x5755bd) {
      throw new Error("Param not found in the query string.");
    }
    if (_0x344ca3 == '1') {
      return _0x5755bd;
    } else {
      if (_0x344ca3 == '2') {
        return this.decodeQueryString(_0x5755bd);
      } else {
        const _0x4e9f32 = this.decodeQueryString(_0x5755bd);
        return this.jsonToInitParam(_0x4e9f32);
      }
    }
  }
  static ['getQueryFromUrl'](_0x5719d1) {
    var _0x34afce = decodeURIComponent(iframeElement.src);
    var _0x51a926 = _0x34afce.split('#')[0x1] || '';
    var _0x33a4ce = _0x51a926.split("tgWebAppData=")[0x1] || '';
    var _0x17a573 = _0x33a4ce.split('&');
    var _0x1f55eb = {};
    _0x17a573.forEach(_0x5d2c32 => {
      var [_0x97e838, _0x2842b4] = _0x5d2c32.split('=');
      if (_0x97e838 && _0x2842b4) {
        _0x1f55eb[_0x97e838] = _0x2842b4;
      }
    });
    var _0x5104c0 = Object.keys(_0x1f55eb).filter(_0x9bcc0a => !_0x9bcc0a.includes("tgWebApp")).map(_0x5944ae => _0x5944ae + '=' + _0x1f55eb[_0x5944ae]).join('&');
    return _0x5104c0;
  }
  static ["jsonToInitParam"](_0x54eaf3) {
    const _0x4502cb = parse(_0x54eaf3);
    if (_0x4502cb.user) {
      const _0x39e789 = JSON.parse(_0x4502cb.user);
      _0x4502cb.user = encodeURIComponent(JSON.stringify(_0x39e789));
    }
    const _0x430247 = [];
    for (const [_0x4b9d51, _0x2ae74] of Object.entries(_0x4502cb)) {
      _0x430247.push(_0x4b9d51 + '=' + _0x2ae74);
    }
    const _0x7730b7 = _0x430247.join('&');
    return _0x7730b7;
  }
  static ["decodeQueryString"](_0x1faadb) {
    const _0x36e819 = decodeURIComponent(_0x1faadb);
    const _0x2f1277 = _0x36e819.split('&');
    const _0x25f351 = {};
    _0x2f1277.forEach(_0x2b2ccf => {
      const [_0x3e7361, _0x14a63b] = _0x2b2ccf.split('=');
      if (_0x3e7361 === "user") {
        _0x25f351[_0x3e7361] = JSON.parse(decodeURIComponent(_0x14a63b));
      } else {
        _0x25f351[_0x3e7361] = _0x14a63b;
      }
    });
    const _0x46a130 = [];
    for (const [_0x593b1a, _0x4dfcef] of Object.entries(_0x25f351)) {
      if (_0x593b1a === "user") {
        _0x46a130.push(_0x593b1a + '=' + JSON.stringify(_0x4dfcef));
      } else {
        _0x46a130.push(_0x593b1a + '=' + _0x4dfcef);
      }
    }
    return _0x46a130.join('&');
  }
  static ['createDir'](_0x10b88b) {
    try {
      const _0x2bfb97 = a4_0x44c968.join("accounts", _0x10b88b);
      if (!a4_0x312c1f.existsSync("accounts")) {
        a4_0x312c1f.mkdirSync("accounts");
      }
      a4_0x312c1f.mkdirSync(_0x2bfb97, {
        'recursive': true
      });
      console.log(_0x2bfb97);
      return _0x2bfb97;
    } catch (_0x254202) {
      throw new Error("Error creating directory: " + _0x254202);
    }
  }
  static ["saveQueryFile"](_0x305f56, _0x2d767e) {
    const _0x26896a = a4_0x44c968.resolve(_0x305f56, "query.txt");
    a4_0x312c1f.writeFile(_0x26896a, _0x2d767e, 'utf8', _0x13a103 => {
      if (_0x13a103) {
        console.error("Error writing file:", _0x13a103);
      } else {
        console.log("Query File Created/Modified Successfully.");
      }
    });
  }
  static ["random"](_0x4bd682, _0x2c464a) {
    const _0x35fe50 = Math.floor(Math.random() * (_0x2c464a - _0x4bd682 + 0x1)) + _0x4bd682;
    return _0x35fe50;
  }
  static ['randomArr'](_0x5f5a5e) {
    return _0x5f5a5e[Math.floor(Math.random() * _0x5f5a5e.length)];
  }
  static ['msToTime'](_0x316c14) {
    const _0xa71cd5 = Math.floor(_0x316c14 / 3600000);
    const _0x1df613 = _0x316c14 % 3600000;
    const _0x178440 = Math.floor(_0x1df613 / 60000);
    const _0x2730a9 = _0x1df613 % 60000;
    const _0x4c1123 = Math.round(_0x2730a9 / 0x3e8);
    return _0xa71cd5 + " Hours " + _0x178440 + " Minutes " + _0x4c1123 + " Seconds";
  }
  static ["queryToJSON"](_0x2bdae5) {
    try {
      const _0x335507 = {};
      const _0x178ca8 = _0x2bdae5.split('&');
      _0x178ca8.forEach(_0xb4bc6c => {
        const [_0x19b92f, _0x147d58] = _0xb4bc6c.split('=');
        if (_0x19b92f === 'user') {
          _0x335507[_0x19b92f] = JSON.parse(decodeURIComponent(_0x147d58));
        } else {
          _0x335507[_0x19b92f] = decodeURIComponent(_0x147d58);
        }
      });
      return _0x335507;
    } catch (_0x56e42b) {
      throw Error("Invalid Query");
    }
  }
  static ["generateRandomString"](_0x50f10b) {
    let _0x38c4c9 = '';
    const _0x4208c4 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".length;
    for (let _0x2ff90b = 0x0; _0x2ff90b < _0x50f10b; _0x2ff90b++) {
      _0x38c4c9 += "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".charAt(Math.floor(Math.random() * _0x4208c4));
    }
    return _0x38c4c9;
  }
  static ["readQueryFile"](_0x27f9e0) {
    try {
      const _0x482a46 = a4_0x44c968.resolve(_0x27f9e0);
      const _0x19c9c1 = a4_0x312c1f.readFileSync(_0x482a46, 'utf8');
      return _0x19c9c1;
    } catch (_0x4fa90e) {
      console.log("No query.txt Files Found");
    }
  }
  static ['launchParamToQuery'](_0x2a51a0) {
    const _0x29cf7a = new URLSearchParams(_0x2a51a0);
    let _0x268e83 = decodeURIComponent(_0x29cf7a.get("tgWebAppData"));
    const _0x5e9860 = new URLSearchParams(_0x268e83);
    let _0x385747 = decodeURIComponent(_0x5e9860.get('user'));
    let _0x52f9eb = JSON.parse(_0x385747);
    const _0x3b26e3 = {
      'query_id': _0x5e9860.get('query_id'),
      'user': _0x52f9eb,
      'auth_date': _0x5e9860.get('auth_date'),
      'hash': _0x5e9860.get("hash")
    };
    const _0x5510e3 = JSON.stringify(_0x3b26e3.user);
    const _0x3a5275 = encodeURIComponent(_0x5510e3);
    let _0xcbe61a = '';
    if (_0x3b26e3.query_id) {
      _0xcbe61a += 'query_id=' + encodeURIComponent(_0x3b26e3.query_id) + '&';
    }
    _0xcbe61a += "user=" + _0x3a5275 + "&auth_date=" + encodeURIComponent(_0x3b26e3.auth_date) + "&hash=" + encodeURIComponent(_0x3b26e3.hash);
    return _0xcbe61a;
  }
  static ["showSkelLogo"]() {
    console.log("VIKITOSHI");
  }
}