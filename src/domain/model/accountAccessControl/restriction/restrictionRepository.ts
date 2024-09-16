import Restriction from "./restriction";

interface RestrictionRepository {
  save(restriction: Restriction): Promise<void>;
  getByReason(reason: string): Promise<Restriction>;
  remove(id: string): Promise<void>;
}

export default RestrictionRepository;
