import ITUAndISOSpec from "./ITUAndISOSpec";

interface ITUAndISOSpecRepository {
  getSpecByCountryCode(aCountryCode: string): Promise<ITUAndISOSpec>;
  save(data: ITUAndISOSpec): Promise<void>;
  remove(id: string): Promise<void>;
}

export default ITUAndISOSpecRepository;
