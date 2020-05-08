import activeWin from 'active-win';
import store from '../../store/activeWindow';
import statusStore from '../../store/status';

class ActiveWindow {
  name: string;
  title: string;
  windowSize: WindowSize;

  constructor(name: string, title: string, windowSize: WindowSize) {
    this.name = name;
    this.title = title;
    this.windowSize = windowSize;
  }
}

class WindowSize {
  height: number;
  width: number;

  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
}

class ActiveWindowChecker {
  static readonly INTERVAL_SECONDS = 60;
  start() {
    // 60秒おきにチェック
    setInterval(() => {
      this.check();
    }, ActiveWindowChecker.INTERVAL_SECONDS * 1000);
  }

  async check() {
    activeWin().then(result => {
      console.log(result);
      if (result === undefined) {
        return;
      }
      const window = new ActiveWindow(
        result.owner.name,
        result.title,
        new WindowSize(result.bounds.height, result.bounds.width),
      );

      // ポイントを振る
      store.addActiveWindow(window.name, window.title, 1);
      if (analyzer.isCoding(window)) {
        store.addPointsInInterval(1, 0, 0);
      } else if (analyzer.isMeeting(window)) {
        store.addPointsInInterval(0, 1, 0);
      } else if (analyzer.isCommunication(window)) {
        store.addPointsInInterval(0, 0, 1);
      } else if (analyzer.isBorwser(window)) {
        store.addPointsInInterval(1, 0, 0);
      }

      // ポイントを割り振る
      if (store.countInInterval >= 10) {
        const statusDelta = store.statusDelta;
        store.startNextInterval();
        statusStore.addStatus(statusDelta);
      }
    });
  }
}

class ActiveWindowAnalyzer {
  isCoding(window: ActiveWindow) {
    if (window.name.indexOf('ターミナル') >= 0) {
      return true;
    }
    if (window.name.indexOf('iTerm2') >= 0) {
      return true;
    }
    if (window.name.indexOf('IDEA') >= 0) {
      return true;
    }
    return false;
  }

  isMeeting(window: ActiveWindow) {
    if (window.title.indexOf('Meet') === 0) {
      return true;
    }
    if (window.name.indexOf('zoom') >= 0) {
      return true;
    }
    return false;
  }

  isCommunication(window: ActiveWindow) {
    if (window.name.indexOf('Slack') >= 0) {
      return true;
    }
    if (window.title.indexOf('Slack') >= 0) {
      return true;
    }
    return false;
  }

  isBorwser(window: ActiveWindow) {
    if (window.name.indexOf('Chrome') >= 0) {
      return true;
    }
    if (window.name.indexOf('Firefox') >= 0) {
      return true;
    }
    return false;
  }
}

const analyzer = new ActiveWindowAnalyzer();

const checker = new ActiveWindowChecker();

export default checker;
