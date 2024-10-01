import { Twisters } from 'twisters';
import a6_0x3fa294 from './logger.js';
import { Core } from '../core/core.js';
class Twist {
  constructor() {
    this.twisters = new Twisters();
  }
  ["log"](_0x1c390b = '', _0xc7af33 = '', _0x359d = new Core(), _0x1b6e06) {
    if (_0x1b6e06 == undefined) {
      a6_0x3fa294.info(_0xc7af33.id + " - " + _0x1c390b);
      _0x1b6e06 = '-';
    }
    const _0x2deefd = _0x359d.user ?? {};
    const _0x247626 = _0x2deefd.total_coins ?? '-';
    const _0x5e88dc = _0x2deefd.energy ?? '-';
    this.twisters.put(_0xc7af33.id, {
      'text': "\n================= Account " + _0xc7af33.id + " =============\nName         : " + (_0xc7af33.firstName ?? "Unamed") + " " + (_0xc7af33.lastName ?? '') + " \nCoins        : " + _0x247626 + "\nEnergy       : " + _0x5e88dc + "\n\nStatus : " + _0x1c390b + "\nDelay : " + _0x1b6e06 + "\n=============================================="
    });
  }
  ["info"](_0x5ac0aa = '') {
    this.twisters.put(0x2, {
      'text': "\n==============================================\nInfo : " + _0x5ac0aa + "\n=============================================="
    });
    return;
  }
  ["clearInfo"]() {
    this.twisters.remove(0x2);
  }
  async ["clear"](_0xea4402) {
    await this.twisters.flush();
  }
}
export default new Twist();