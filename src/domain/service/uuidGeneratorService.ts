import { v4 as uuidv4 } from "uuid";

class UUIDGeneratorService {
  generateUUID(): string {
    return uuidv4();
  }
}

export default UUIDGeneratorService;