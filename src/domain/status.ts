export default class Status {
  static readonly blank = new Status(0, 0, 0);

  static readonly initial = new Status(10, 10, 10);

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
