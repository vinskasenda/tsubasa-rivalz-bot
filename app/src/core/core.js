import { API } from '../api/api.js';
import { Helper } from '../utils/helper.js';
export class Core extends API {
  constructor(_0x13686d, _0x34fa8a, _0x33d4ba, _0x1c9d3f) {
    super(_0x34fa8a, _0x33d4ba, _0x1c9d3f, "https://app.ton.tsubasa-rivals.com", 'app.ton.tsubasa-rivals.com', "https://app.ton.tsubasa-rivals.com", "https://app.ton.tsubasa-rivals.com/?tgWebAppStartParam=inviter_id-5703822759");
    this.account = _0x13686d;
    this.query = _0x34fa8a;
    this.queryObj = _0x33d4ba;
    this.colorList = ["#e46e6e", "#FFD635", '#7EED56', "#00CCC0", "#51E9F4", '#94B3FF', "#E4ABFF", "#FF99AA", "#FF99AA"];
    this.completeGameErrorCount = 0x0;
    this.upgradable = {
      'reChargeSpeed': true,
      'energyLimit': true,
      'paintReward': true
    };
  }
  async ["getUserInfo"](_0x32a53a = false) {
    try {
      if (_0x32a53a) {
        await Helper.delay(0x3e8, this.account, "Getting Game Information...", this);
      }
      const _0x5f3d23 = {
        'lang_code': 'en',
        'initData': this.query
      };
      const _0x474580 = await this.fetch("/api/start", 'POST', undefined, _0x5f3d23);
      if (_0x474580.status == 0xc8) {
        this.user = _0x474580.game_data.user;
        this.stats = _0x474580.game_data.constants;
        this.masterHash = _0x474580.master_hash;
        this.tasks = _0x474580.task_info;
        this.card = [];
        for (const _0x9a07a7 of _0x474580.card_info) {
          this.card.push(..._0x9a07a7.card_list);
        }
        if (_0x32a53a) {
          await Helper.delay(0x3e8, this.account, "Successfully Get User Information", this);
        }
      } else {
        throw Error("Failed To Get Game Information");
      }
    } catch (_0x203bb2) {
      throw _0x203bb2;
    }
  }
  async ['tap'](_0x36ed66) {
    try {
      await Helper.delay(0x3e8, this.account, "Tapping for " + _0x36ed66 + '...', this);
      const _0x3084fd = {
        'tapCount': _0x36ed66,
        'initData': this.query
      };
      const _0x533e0f = await this.fetch("/api/tap", "POST", undefined, _0x3084fd);
      if (_0x533e0f.status == 0xc8) {
        this.user = _0x533e0f.game_data.user;
        this.stats = _0x533e0f.game_data.constants;
        await Helper.delay(0x3e8, this.account, "Successfully Tapping for " + _0x36ed66 + " Times", this);
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Tap " + _0x533e0f.message, this);
      }
    } catch (_0x62873) {
      throw _0x62873;
    }
  }
  async ["claimDaily"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Claiming Daily Reward...", this);
      const _0x1e93a2 = {
        'initData': this.query
      };
      const _0x2bf960 = await this.fetch('/api/daily_reward/claim', "POST", undefined, _0x1e93a2);
      if (_0x2bf960.status == 0xc8) {
        this.user = _0x2bf960.game_data.user;
        this.stats = _0x2bf960.game_data.constants;
        await Helper.delay(0x3e8, this.account, "Successfully Claim Daily Reward", this);
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Claim Daily Reward " + _0x2bf960.message, this);
      }
    } catch (_0x4d1ce4) {
      throw _0x4d1ce4;
    }
  }
  async ["recoverEnergy"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Try To Recover Energy...", this);
      const _0x560e46 = {
        'initData': this.query
      };
      const _0x2df00a = await this.fetch('/api/energy/recovery', "POST", undefined, _0x560e46);
      if (_0x2df00a.status == 0xc8) {
        this.user = _0x2df00a.game_data.user;
        this.stats = _0x2df00a.game_data.constants;
        await Helper.delay(0x3e8, this.account, "Successfully Recover Energy", this);
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Recover Energy " + _0x2df00a.message, this);
      }
    } catch (_0xa49647) {
      throw _0xa49647;
    }
  }
  async ['levelUpTap']() {
    try {
      await Helper.delay(0x3e8, this.account, "Try To Leveling Up Tap...", this);
      const _0x5cc3ab = {
        'initData': this.query
      };
      const _0x233193 = await this.fetch("/api/tap/levelup", "POST", undefined, _0x5cc3ab);
      if (_0x233193.status == 0xc8) {
        this.user = _0x233193.game_data.user;
        this.stats = _0x233193.game_data.constants;
        await Helper.delay(0x3e8, this.account, "Successfully Leveling Up Tap", this);
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Leveling Up Tap " + _0x233193.message, this);
      }
    } catch (_0x417c39) {
      throw _0x417c39;
    }
  }
  async ["levelUpEnergy"]() {
    try {
      await Helper.delay(0x3e8, this.account, "Try To Leveling Up Energy...", this);
      const _0x2e43e5 = {
        'initData': this.query
      };
      const _0x13395d = await this.fetch('/api/energy/levelup', "POST", undefined, _0x2e43e5);
      if (_0x13395d.status == 0xc8) {
        this.user = _0x13395d.game_data.user;
        this.stats = _0x13395d.game_data.constants;
        await Helper.delay(0x3e8, this.account, "Successfully Leveling Up Energy", this);
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Leveling Up Energy " + _0x13395d.message, this);
      }
    } catch (_0x3d8e5a) {
      throw _0x3d8e5a;
    }
  }
  async ['levelUpCard'](_0x566596) {
    try {
      await Helper.delay(0x3e8, this.account, "Try To Leveling Up Card " + _0x566596.name + '...', this);
      const _0xd70a38 = {
        'category_id': _0x566596.category,
        'card_id': _0x566596.id,
        'initData': this.query
      };
      const _0x54f191 = await this.fetch("/api/card/levelup", "POST", undefined, _0xd70a38);
      if (_0x54f191.status == 0xc8) {
        this.user = _0x54f191.game_data.user;
        this.stats = _0x54f191.game_data.constants;
        await Helper.delay(0x3e8, this.account, "Successfully Leveling Up Card", this);
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Leveling Up Card " + _0x54f191.message, this);
      }
    } catch (_0x592eac) {
      throw _0x592eac;
    }
  }
  async ["startTask"](_0x45085c) {
    try {
      await Helper.delay(0x3e8, this.account, "Starting Tasks " + _0x45085c.title + '...', this);
      const _0x15099b = {
        'task_id': _0x45085c.id,
        'initData': this.query
      };
      const _0x2ed0c5 = await this.fetch('/api/task/execute', "POST", undefined, _0x15099b);
      if (_0x2ed0c5.status == 0xc8) {
        await Helper.delay(0x3e8, this.account, "Successfully Starting Task " + _0x45085c.title, this);
        await this.claimTask(_0x45085c);
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Starting Task " + _0x2ed0c5.message, this);
      }
    } catch (_0x3a7c77) {
      throw _0x3a7c77;
    }
  }
  async ["claimTask"](_0x1f2912) {
    try {
      await Helper.delay(0x3e8, this.account, "Claiming Tasks " + _0x1f2912.title + '...', this);
      const _0x3b8c84 = {
        'task_id': _0x1f2912.id,
        'initData': this.query
      };
      const _0x48d64e = await this.fetch("/api/task/achievement", "POST", undefined, _0x3b8c84);
      if (_0x48d64e.status == 0xc8) {
        if (_0x48d64e.update) {
          this.user = _0x48d64e.game_data.user;
          this.stats = _0x48d64e.game_data.constants;
          await Helper.delay(0x3e8, this.account, "Successfully Claim Task " + _0x1f2912.title, this);
        } else {
          await Helper.delay(0x3e8, this.account, "Failed to Claim Task " + _0x1f2912.title + " - Requirements Not Meet", this);
        }
      } else {
        await Helper.delay(0x7d0, this.account, "Failed to Starting Task " + _0x48d64e.message, this);
      }
    } catch (_0x3537b7) {
      throw _0x3537b7;
    }
  }
}