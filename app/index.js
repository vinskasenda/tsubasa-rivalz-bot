import { Config } from './config/config.js';
import { proxyList } from './config/proxy_list.js';
import { Core } from './src/core/core.js';
import { Telegram } from './src/core/telegram.js';
import { Helper } from './src/utils/helper.js';
import a0_0x2bfd84 from './src/utils/logger.js';
import a0_0x15ab00 from './src/utils/twist.js';
async function operation(_0x4c218c, _0x394a6d, _0x37ad31, _0x42a401) {
  try {
    const _0x5b9cef = Config.USEAUTOTAP ?? true;
    const _0x5f0fe3 = Config.USEAUTOCOMPLETEMISSIONS ?? true;
    const _0xff54e3 = Config.USEAUTOUPGRADEBOOST ?? true;
    const _0x400643 = Config.USEAUTOLEVELUPRANDOMCARD ?? true;
    const _0x2ab6da = Config.CUSTOMDELAY ?? undefined;
    const _0x343704 = new Core(_0x4c218c, _0x394a6d, _0x37ad31, _0x42a401);
    await _0x343704.getUserInfo(true);
    await _0x343704.claimDaily();
    if (_0x5b9cef) {
      if (_0x343704.user.energy >= _0x343704.user.max_energy - Helper.random(0x64, 0x3e8)) {
        await _0x343704.tap(Math.floor(_0x343704.user.energy / _0x343704.stats.energy_decrease_per_tap));
      }
      await _0x343704.recoverEnergy();
      if (_0x343704.user.energy / _0x343704.stats.energy_decrease_per_tap > 0x0) {
        await _0x343704.tap(Math.floor(_0x343704.user.energy / _0x343704.stats.energy_decrease_per_tap));
      }
    }
    if (_0x5f0fe3) {
      for (const _0x4b33e3 of _0x343704.tasks) {
        if (_0x4b33e3.id != 0x5) {
          if (_0x4b33e3.status == 0x0) {
            await _0x343704.startTask(_0x4b33e3);
          } else if (_0x4b33e3.status == 0x1) {
            await _0x343704.claimTask(_0x4b33e3);
          }
        }
      }
    }
    if (_0xff54e3) {
      await _0x343704.levelUpTap();
      await _0x343704.levelUpEnergy();
    }
    if (_0x400643) {
      let _0x1f2558 = _0x343704.user.total_coins;
      const _0x3f545a = _0x343704.card.filter(_0xc035e0 => _0xc035e0.unlocked === true);
      if (_0x3f545a.length === 0x0) {
        return;
      }
      let _0x1508d9 = 0x0;
      while (_0x1508d9 < 0x5) {
        try {
          const _0x54342a = Math.floor(Math.random() * _0x3f545a.length);
          const _0x5524e7 = _0x3f545a[_0x54342a];
          const _0x52a63f = _0x5524e7.cost;
          if (_0x1f2558 >= _0x52a63f) {
            await _0x343704.levelUpCard(_0x5524e7);
            _0x343704.user.total_coins -= _0x52a63f;
            break;
          }
          _0x1508d9++;
        } catch (_0x34aded) {
          break;
        }
      }
    }
    const _0x344239 = Helper.random(0x2710, 0xea60);
    let _0x68eff8;
    if (_0x2ab6da) {
      _0x68eff8 = 0x3e8 * _0x2ab6da;
    } else {
      _0x68eff8 = _0x344239 + _0x343704.user.max_energy / _0x343704.stats.energy_recovery_per_second * 0x3e8;
    }
    await Helper.delay(_0x68eff8, _0x4c218c, "Account " + _0x4c218c.id + " Processing Complete, Restarting in " + Helper.msToTime(_0x68eff8), _0x343704);
    await operation(_0x4c218c, _0x394a6d, _0x37ad31, _0x42a401);
  } catch (_0x453689) {
    if (_0x453689.message.includes("401")) {
      if (_0x4c218c.type == "query") {
        await Helper.delay(0x3e8, _0x4c218c, "Error : " + _0x453689.message + ", Query Is Expired, Please Get New Query");
      } else {
        await Helper.delay(0x1388, _0x4c218c, "Error : " + _0x453689.message + ", Query Is Expired, Getting New Query in 5 Seconds");
        const _0x9908be = new Telegram();
        await _0x9908be.useSession(_0x4c218c.accounts, _0x42a401);
        const _0x2ac5b5 = await _0x9908be.client.getMe();
        _0x2ac5b5.type = "sessions";
        _0x2ac5b5.accounts = _0x4c218c.accounts;
        _0x2ac5b5.id = _0x2ac5b5.id.value;
        const _0x4745fb = await _0x9908be.resolvePeer().then(async () => {
          return await _0x9908be.initWebView();
        })["catch"](_0x5304dd => {
          throw _0x5304dd;
        });
        const _0x13ada4 = Helper.queryToJSON(_0x4745fb);
        await _0x9908be.disconnect();
        await Helper.delay(0x1388, _0x2ac5b5, "Successfully get new query");
        await operation(_0x2ac5b5, _0x4745fb, _0x13ada4, _0x42a401);
      }
    } else {
      await Helper.delay(0x1388, _0x4c218c, "Error : " + _0x453689.message + ", Retrying after 5 Seconds");
      await operation(_0x4c218c, _0x394a6d, _0x37ad31, _0x42a401);
    }
  }
}
let init = false;
async function startBot() {
  return new Promise(async (_0x3b0427, _0x58e2ee) => {
    try {
      a0_0x2bfd84.info("BOT STARTED");
      const _0x52ee12 = await new Telegram();
      if (init == false) {
        await _0x52ee12.init();
        init = true;
      }
      const _0x65b8b8 = Helper.getSession('accounts');
      const _0x3c5fd0 = [];
      if (proxyList.length > 0x0) {
        if (_0x65b8b8.length != proxyList.length) {
          _0x58e2ee("You have " + _0x65b8b8.length + " Session but you provide " + proxyList.length + " Proxy");
        }
      }
      for (const _0xb6ddfb of _0x65b8b8) {
        const _0x56dc8d = _0x65b8b8.indexOf(_0xb6ddfb);
        const _0x2c9718 = proxyList.length > 0x0 ? proxyList[_0x56dc8d] : undefined;
        if (!_0xb6ddfb.includes("query")) {
          await _0x52ee12.useSession("accounts/" + _0xb6ddfb, _0x2c9718);
          _0x52ee12.session = _0xb6ddfb;
          const _0x417484 = await _0x52ee12.client.getMe();
          _0x417484.type = "sessions";
          _0x417484.accounts = "accounts/" + _0xb6ddfb;
          _0x417484.id = _0x417484.id.value;
          const _0x164227 = await _0x52ee12.resolvePeer().then(async () => {
            return await _0x52ee12.initWebView();
          })["catch"](_0x4a2b2d => {
            throw _0x4a2b2d;
          });
          const _0x3b4b16 = Helper.queryToJSON(_0x164227);
          await _0x52ee12.disconnect();
          _0x3c5fd0.push([_0x417484, _0x164227, _0x3b4b16, _0x2c9718]);
        } else {
          let _0x547f49 = Helper.readQueryFile("accounts/" + _0xb6ddfb + '/query.txt');
          let _0xfaf35b = Helper.queryToJSON(_0x547f49);
          if (!_0xfaf35b.user) {
            _0xfaf35b = await Helper.queryToJSON(await Helper.launchParamToQuery(_0x547f49));
            _0x547f49 = await Helper.launchParamToQuery(_0x547f49);
          }
          const _0x3bb059 = _0xfaf35b.user;
          _0x3bb059.type = "query";
          _0x3bb059.firstName = _0x3bb059.first_name;
          _0x3bb059.lastName = _0x3bb059.last_name;
          _0x3c5fd0.push([_0x3bb059, _0x547f49, _0xfaf35b, _0x2c9718]);
        }
      }
      const _0x479355 = _0x3c5fd0.map(async _0x52726a => {
        await operation(_0x52726a[0x0], _0x52726a[0x1], _0x52726a[0x2], _0x52726a[0x3]);
      });
      await Promise.all(_0x479355);
      _0x3b0427();
    } catch (_0x3b2aa0) {
      a0_0x2bfd84.info("BOT STOPPED");
      a0_0x2bfd84.error(JSON.stringify(_0x3b2aa0));
      _0x58e2ee(_0x3b2aa0);
    }
  });
}
(async () => {
  try {
    a0_0x2bfd84.clear();
    a0_0x2bfd84.info('');
    a0_0x2bfd84.info("Application Started");
    console.log("Tsubasa Rivalz BOT");
    console.log("Join Channel : https://t.me/AirdropInsiderID");
    console.log("Dont forget to run git pull to keep up to date");
    console.log();
    console.log();
    Helper.showSkelLogo();
    await startBot();
  } catch (_0x21a766) {
    await a0_0x15ab00.clear();
    await a0_0x15ab00.clearInfo();
    console.log("Error During executing bot", _0x21a766);
    await startBot();
  }
})();