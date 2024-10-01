import a3_0x1bdaf5 from 'input';
import { Helper } from '../utils/helper.js';
import { Api, TelegramClient } from 'telegram';
import { StoreSession } from 'telegram/sessions/StoreSession.js';
import a3_0x493cb5 from '../utils/logger.js';
import { FloodWaitError } from 'telegram/errors/RPCErrorList.js';
import { Config } from '../../config/config.js';
import { HttpsProxyAgent } from 'https-proxy-agent';
export class Telegram {
  ['storeSession'];
  constructor() {
    this.accountName = "accounts";
    this.url = "https://app.ton.tsubasa-rivals.com/";
    this.bot = "TsubasaRivalsBot";
  }
  async ["init"]() {
    try {
      await this.onBoarding();
    } catch (_0x59f1da) {
      console.log(_0x59f1da);
      a3_0x493cb5.error('' + JSON.stringify(_0x59f1da));
      throw _0x59f1da;
    }
  }
  async ["onBoarding"]() {
    try {
      let _0x22a91f = "Welcome to Bot \nBy : Widiskel \n \nLets getting started.\n \nYour Session List:\n";
      const _0x462698 = Helper.getSession("accounts");
      if (_0x462698.length == 0x0) {
        _0x22a91f += "<empty>";
      } else {
        for (const _0x5e099d of _0x462698) {
          _0x22a91f += "- " + _0x5e099d + "\n";
        }
      }
      _0x22a91f += "\n \nPlease Choose a menu: \n";
      _0x22a91f += "\n \n1. Create Account \n2. Reset Account \n3. Start Bot\n4. Query modification\n \nInput your choice :";
      const _0x21903e = await a3_0x1bdaf5.text(_0x22a91f);
      if (_0x21903e == 0x1) {
        await this.accountType();
      } else {
        if (_0x21903e == 0x2) {
          Helper.resetAccounts();
          await Helper.delay(0xbb8);
          await this.onBoarding();
        } else {
          if (_0x21903e == 0x3) {
            if (Helper.getSession(this.accountName)?.["length"] == 0x0) {
              console.info("You don't have any Accounts, please create first");
              await this.onBoarding();
            }
          } else if (_0x21903e == 0x4) {
            await this.queryModificaiton();
          } else {
            console.error("Invalid input, Please try again");
            await this.onBoarding();
          }
        }
      }
    } catch (_0x223f59) {
      throw _0x223f59;
    }
  }
  async ["queryModificaiton"]() {
    try {
      const _0x225e55 = Helper.getSession("accounts");
      const _0x18a368 = _0x225e55.filter(_0x5dc7fe => _0x5dc7fe.includes("query"));
      let _0x575f41 = "Your Query Account List :\n \n";
      for (const _0x2ff765 of _0x18a368) {
        _0x575f41 += _0x225e55.indexOf(_0x2ff765) + 0x1 + ". " + _0x2ff765 + "\n";
      }
      if (_0x18a368.length == 0x0) {
        console.log("You dont have any Query Account.");
        await this.onBoarding();
      } else {
        _0x575f41 += "\n \nPlease Select Query Account for modification:";
      }
      const _0x132185 = await a3_0x1bdaf5.text(_0x575f41);
      if (_0x18a368[_0x132185 - 0x1] != undefined) {
        const _0x19a54c = _0x18a368[_0x132185 - 0x1];
        this.accountName = "accounts/" + _0x19a54c;
        const _0x118e85 = "Old Query : " + Helper.readQueryFile(this.accountName + "/query.txt") + "\n \nPlease Enter New Query ";
        const _0x31ea3c = await a3_0x1bdaf5.text(_0x118e85);
        await Helper.saveQueryFile(this.accountName, _0x31ea3c);
        await Helper.delay(0xbb8);
        await this.onBoarding();
      } else {
        console.error("Invalid input, Please try again");
        await this.queryModificaiton();
      }
    } catch (_0x272236) {
      throw _0x272236;
    }
  }
  async ["sessionCreation"]() {
    try {
      if (Config.TELEGRAM_APP_ID == undefined || Config.TELEGRAM_APP_HASH == undefined) {
        throw new Error("Please configure your TELEGRAM_APP_ID and TELEGRAM_APP_HASH first");
      }
      const _0x448d11 = Helper.getSession("accounts");
      let _0x52e441 = "Your Account List :\n \n";
      for (const _0x5a2ecc of _0x448d11) {
        _0x52e441 += _0x448d11.indexOf(_0x5a2ecc) + 0x1 + ". " + _0x5a2ecc + "\n";
      }
      if (_0x448d11.length == 0x0) {
        _0x52e441 += "<empty> \n \nPlease enter Session Name :";
      } else {
        _0x52e441 += "\n \nYou already have sessions, cancel(CTRL+C) or create new Session :";
      }
      const _0x4ee323 = await a3_0x1bdaf5.text(_0x52e441);
      this.accountName = Helper.createDir("sessions-" + _0x4ee323);
      await this.useSession(this.accountName);
      await this.disconnect();
      a3_0x493cb5.info("Session " + this.accountName + " - Created");
      console.log("Session " + _0x4ee323 + " - Created, Please Restart The Bot Again");
      this.storeSession.save();
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x2f1fee) {
      throw _0x2f1fee;
    }
  }
  async ["queryCreation"]() {
    try {
      const _0x1af793 = Helper.getSession("accounts");
      let _0x4d3c90 = "Your Account List :\n \n";
      for (const _0x3af5f5 of _0x1af793) {
        _0x4d3c90 += _0x1af793.indexOf(_0x3af5f5) + 0x1 + ". " + _0x3af5f5 + "\n";
      }
      if (_0x1af793.length == 0x0) {
        _0x4d3c90 += "<empty> \n \nPlease enter Account Name :";
      } else {
        _0x4d3c90 += "\n \nYou already have Account, cancel(CTRL+C) or create new Account :";
      }
      const _0xa5e978 = await a3_0x1bdaf5.text(_0x4d3c90);
      this.accountName = Helper.createDir('query-' + _0xa5e978);
      const _0x1c85bd = await a3_0x1bdaf5.text("Please Enter Telegram Query : ");
      await Helper.saveQueryFile(this.accountName, _0x1c85bd);
      a3_0x493cb5.info("Query " + this.accountName + " - Created");
      console.log("Query " + _0xa5e978 + " - Created, Please Restart The Bot Again");
      await Helper.delay(0xbb8);
      process.exit();
    } catch (_0x159a83) {
      throw _0x159a83;
    }
  }
  async ['accountType']() {
    try {
      const _0x2cd6d3 = Helper.getSession("accounts");
      let _0x16c119 = "Your Account List :\n \n";
      if (_0x2cd6d3.length > 0x0) {
        for (const _0x78c052 of _0x2cd6d3) {
          _0x16c119 += _0x2cd6d3.indexOf(_0x78c052) + 0x1 + ". " + _0x78c052 + "\n";
        }
      } else {
        _0x16c119 += "<empty>\n";
      }
      _0x16c119 += "\n \nAvailable Account Type: \n1. Session \n2. Query\n \nPlease Entery Your Choice : ";
      const _0x281aee = await a3_0x1bdaf5.text(_0x16c119);
      if (_0x281aee == 0x1) {
        await this.sessionCreation();
      } else if (_0x281aee == 0x2) {
        await this.queryCreation();
      } else {
        console.log("Invalid Input");
        await this.accountType();
      }
    } catch (_0x553948) {
      throw _0x553948;
    }
  }
  async ["useSession"](_0x25595a, _0x30430c) {
    try {
      this.proxy = _0x30430c;
      const _0x3bfc7c = {
        'connectionRetries': 0x5
      };
      if (this.proxy) {
        _0x3bfc7c.agent = new HttpsProxyAgent(this.proxy);
      }
      this.storeSession = new StoreSession(_0x25595a);
      this.client = new TelegramClient(this.storeSession, Config.TELEGRAM_APP_ID, Config.TELEGRAM_APP_HASH, _0x3bfc7c);
      this.storeSession.save();
      await this.client.start({
        'phoneNumber': async () => await a3_0x1bdaf5.text("Enter your Telegram Phone Number ?"),
        'password': async () => await a3_0x1bdaf5.text("Enter your Telegram Password?"),
        'phoneCode': async () => await a3_0x1bdaf5.text("Enter your Telegram Verification Code ?"),
        'onError': _0x11ca69 => {
          console.log(_0x11ca69.message);
        }
      });
    } catch (_0x43eaaa) {
      throw _0x43eaaa;
    }
  }
  async ["resolvePeer"]() {
    try {
      a3_0x493cb5.info("Session " + this.session + " - Resolving Peer");
      while (this.peer == undefined) {
        try {
          this.peer = await this.client.getEntity(this.bot);
          break;
        } catch (_0x4c6f97) {
          if (_0x4c6f97 instanceof FloodWaitError) {
            const _0x343f8b = _0x4c6f97.seconds;
            a3_0x493cb5.warn(this.client.session.serverAddress + " | FloodWait " + _0x4c6f97);
            a3_0x493cb5.info(this.client.session.serverAddress + " | Sleep " + _0x343f8b + 's');
            await Helper.delay((_0x343f8b + 0x3) * 0x3e8);
          } else {
            throw _0x4c6f97;
          }
        }
      }
    } catch (_0xd7d361) {
      throw _0xd7d361;
    }
  }
  async ["disconnect"]() {
    await this.client.disconnect();
    await this.client.destroy();
    this.peer = undefined;
    this.accountName = undefined;
  }
  async ["initWebView"]() {
    try {
      const _0x4afaa0 = await this.client.invoke(new Api.messages.RequestWebView({
        'peer': this.peer,
        'bot': this.peer,
        'fromBotMenu': true,
        'url': this.url,
        'platform': "android"
      }));
      a3_0x493cb5.info("Session " + this.session + " - Webview Connected");
      const _0x4ef42c = _0x4afaa0.url;
      return Helper.getTelegramQuery(_0x4ef42c, 0x3);
    } catch (_0xdf5884) {
      throw _0xdf5884;
    }
  }
}