export abstract class StorageService<T extends string> {
  private readonly storage: Storage;

  protected constructor(getStorage = (): Storage => localStorage) {
    this.storage = getStorage();
  }

  protected get(key: T): string | null {
    return this.storage?.getItem(key);
  }

  protected set(key: T, value: string) {
    this.storage?.setItem(key, value);
  }

  protected clearItem(key: T) {
    this.storage?.removeItem(key);
  }

  protected clearItems(keys: T[]) {
    keys.forEach((key) => this.clearItem(key));
  }
}
