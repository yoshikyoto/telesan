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

  setNetworkEnabled(value: boolean): void {
    if (value === true) {
      localStorage.setItem('networkEnabled', 'true');
    } else {
      localStorage.removeItem('networkEnabled');
    }
  }

  getNetworkEnabled(): boolean {
    return localStorage.getItem('networkEnabled') === 'true';
  }

  setName(value: string | null): void {
    if (value == null) {
      localStorage.removeItem('name');
    } else {
      localStorage.setItem('name', value);
    }
  }

  getName(): string | null {
    return localStorage.getItem('name');
  }

  setTeam(commaSeparatedNames: string): void {
    localStorage.setItem('team', commaSeparatedNames);
  }

  getTeam(): string {
    const value = localStorage.getItem('team');
    if (value == null) {
      return '';
    }
    return value;
  }
}

const storage = new LocalStorageWrapper();

export default storage;
