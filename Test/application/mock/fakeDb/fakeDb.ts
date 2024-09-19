import ITUAndISOSpec from "../../../../src/domain/model/geographicEntities/ITUAndISOSpec";
import UserAccount from "../../../../src/domain/model/userAccount/userAccount";
import UserAccountProfile from "../../../../src/domain/model/userAccount/userAccountProfile/userAccountProfile";
import AuthenticationMethod from "../../../../src/domain/model/accountAccessControl/authenticationMethod/authenticationMethod";
import Restriction from "../../../../src/domain/model/accountAccessControl/restriction/restriction";
import { Instance, Class } from "./schema";
import StoredEventMock from "../storedEventMock";

class FakeDb {
  private db: Map<string, Map<string, Instance>>;

  constructor() {
    this.db = new Map();
  }

  save(data: Instance): void {
    let table: Map<string, Instance> | undefined;
    const tableName = this.getTableNameForInstance(data);

    if (!this.doesTableExist(tableName)) this.createTableFor(tableName);

    if (data instanceof ITUAndISOSpec) {
      table = this.db.get(tableName);
      table?.set(data["countryCode"], data);
      table?.set(data["id"]["id"], data);
    } else if (data instanceof UserAccountProfile) {
      table = this.db.get(tableName);
      table?.set(data["id"]["id"], data);
      table?.set(data["userAccountId"]["id"], data);
    } else if (data instanceof UserAccount) {
      table = this.db.get(tableName);
      table?.set(data["id"]["id"], data);
      table?.set(data["username"]["value"], data);
    } else if (data instanceof StoredEventMock) {
      table = this.db.get(tableName);
      table?.set(data.getEventName(), data);
    } else if (data instanceof AuthenticationMethod) {
      table = this.db.get(tableName);
      table?.set(data["id"]["id"], data);
      table?.set(data["type"], data);
    } else if (data instanceof Restriction) {
      table = this.db.get(tableName);
      table?.set(data["id"]["id"], data);
      table?.set(data["reason"], data);
    }
  }

  private getTableNameForInstance(obj: Instance): string {
    return new Object(obj).constructor.name;
  }

  private createTableFor(aTableName: string) {
    this.db.set(aTableName, new Map());
  }

  remove(data: Class, aKey: string): void {
    let table: Map<string, Instance> | undefined;
    const tableName = this.getTableNameForClass(data);

    if (!this.doesTableExist(tableName)) return;
    table = this.db.get(tableName);
    table?.delete(aKey);
  }

  find(data: Class, aKey: string): Instance | undefined {
    const tableName = this.getTableNameForClass(data);

    if (this.doesTableExist(tableName)) {
      const table = this.db.get(tableName);
      return table?.get(aKey);
    }
    return undefined;
  }

  private getTableNameForClass(data: Class): string {
    return data.name;
  }

  private doesTableExist(aTableName: string): boolean {
    if (this.db.has(aTableName)) return true;
    return false;
  }
}

export default FakeDb;
