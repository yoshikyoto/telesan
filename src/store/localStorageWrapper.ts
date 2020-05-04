class LocalStorageWrapper {
  setUpdateIntervalMinute(value: number): void {
    localStorage.setItem('updateIntervalMinute', String(value));
  }

  getUpdateIntervalMinute(defaultValue: number): number {
    const value = localStorage.getItem('updateIntervalMinute');
    if (value == null) {
      return defaultValue;
    }

    const intValue = Number(value);
    if (isNaN(intValue)) {
      return defaultValue;
    }

    return intValue;
  }

  setGitHubToken(value: string | null) {
    if (value == null) {
      localStorage.removeItem('githubToken');
    } else {
      localStorage.setItem('githubToken', value);
    }
  }

  getGitHubToken(): string | null {
    return localStorage.getItem('githubToken');
  }

  setGitHubEndpoint(value: string | null): void {
    if (value == null) {
      localStorage.removeItem('githubEndpoint');
    } else {
      localStorage.setItem('githubEndpoint', value);
    }
  }

  getGitHubEndpoint(): string | null {
    return localStorage.getItem('githubEndpoint');
  }

  setSlackToken(value: string | null) {
    if (value == null) {
      localStorage.removeItem('slackToken');
    } else {
      localStorage.setItem('slackToken', value);
    }
  }

  getSlackToken(): string | null {
    return localStorage.getItem('slackToken');
  }
}

const storage = new LocalStorageWrapper();

export default storage;
