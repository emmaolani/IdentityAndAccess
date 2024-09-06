class FakeDb {
  private db = new Map();

  private initializeDbColumns(): void {
    this.db.set("ITUAndISOSpec", new Map());
    this.db.set("UserAccountProfile", new Map());
    this.db.set("UserAccount", new Map());
    this.db.set("EventStore", new Map());
  }

  checkIfKeyExists(key: string): boolean {
    return this.db.has(key);
  }

  save(key: string, value: any): void {
    if (this.isObject(value)) {
      const name = this.getClassName(value);
    }
    this.db.set(key, value);
  }

  private isObject(value: any): boolean {
    return typeof value === "object" && value !== null && !Array.isArray(value);
  }

  private getClassName(obj: Object): string {
    return obj.constructor.name;
  }

  getById(anId: string): any {
    return this.db.get(anId);
  }
}

export default FakeDb;
