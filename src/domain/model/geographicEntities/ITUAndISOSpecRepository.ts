import ITUAndISOSpec from "./ITUAndISOSpec";

interface ITUAndISOSpecRepository {
  getSpecByCountryCode(aCountryCode: string): Promise<ITUAndISOSpec>;
}

export default ITUAndISOSpecRepository;
