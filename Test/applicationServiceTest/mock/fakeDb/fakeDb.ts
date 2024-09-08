import ITUAndISOSpec from "../../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import UserAccount from "../../../../src/domain/model/identity/userAccount/userAccount";
import UserAccountProfile from "../../../../src/domain/model/identity/userAccount/userAccountProfile/userAccountProfile";
import { Schema, ClassSchema } from "./schema";
import NewUserAccountCreated from "../../../../src/domain/model/identity/userAccount/newUserAccountCreated";
import NewUserAccountProfileCreated from "../../../../src/domain/model/identity/userAccount/userAccountProfile/newUserAccountProfileCreated";
import StoredEvent from "../storedEvents";

class FakeDb {
  private db: Map<string, Map<string, Schema>>;

  constructor() {
    this.db = new Map();
  }

  save(data: Schema): void {
    const tableName = this.getSchemaName(data);
    let table: Map<string, Schema> | undefined;

    if (data instanceof ITUAndISOSpec) {
      if (!this.doesTableExist(tableName)) this.createTable(tableName);
      table = this.db.get(tableName);
      table?.set(data["countryCode"], data);
      table?.set(data["id"]["iD"], data);
    } else if (data instanceof UserAccountProfile) {
      if (!this.doesTableExist(tableName)) this.createTable(tableName);
      table = this.db.get(tableName);
      table?.set(data["id"]["id"], data);
      table?.set(data["userAccountId"]["id"], data);
    } else if (data instanceof UserAccount) {
      if (!this.doesTableExist(tableName)) this.createTable(tableName);
      table = this.db.get(tableName);
      table?.set(data["id"]["id"], data);
      table?.set(data["username"]["value"], data);
    } else if (data instanceof StoredEvent) {
      if (!this.doesTableExist(tableName)) this.createTable(tableName);
      table = this.db.get(tableName);
      table?.set(data.getEventName(), data);
    }
  }

  remove(data: ClassSchema, aKey: string): void {
    const tableName = this.getClassSchemaName(data);
    let table: Map<string, Schema> | undefined;

    if (!this.doesTableExist(tableName)) return;
    table = this.db.get(tableName);
    table?.delete(aKey);
  }

  private createTable(aTableName: string) {
    this.db.set(aTableName, new Map());
  }

  private getSchemaName(obj: Schema): string {
    return new Object(obj).constructor.name;
  }

  find(data: ClassSchema, aKey: string): Schema | undefined {
    const tableName = this.getClassSchemaName(data);

    if (this.doesTableExist(tableName)) {
      const table = this.db.get(tableName);
      return table?.get(aKey);
    }
    return undefined;
  }

  private getClassSchemaName(data: ClassSchema): string {
    return data.name;
  }

  private doesTableExist(aTableName: string): boolean {
    if (this.db.has(aTableName)) return true;
    return false;
  }
}

export default FakeDb;
