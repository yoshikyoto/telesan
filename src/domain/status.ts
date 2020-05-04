export default class Status {
  /** HP */
  health: number;

  /** 攻撃力 */
  attack: number;

  /** 防御力 */
  defence: number;

  constructor(health: number, attack: number, defence: number) {
    this.health = health;
    this.attack = attack;
    this.defence = defence;
  }

  add(delta: Status) {
    return new Status(
      this.health + delta.health,
      this.attack + delta.attack,
      this.defence + delta.defence,
    );
  }
}
