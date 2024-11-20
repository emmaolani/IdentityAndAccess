import { randomUUID } from "crypto";

class UUIDGenerator {
  generate(): string {
    return randomUUID();
  }
}

export default UUIDGenerator;
