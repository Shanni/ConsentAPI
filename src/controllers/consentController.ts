import { randomUUID } from "crypto";
import consentModel, { IConsent } from "../models/consent.model";

interface ICreateConsentInput {
  name: string;
  consentUrl: string; // TODO: check URL format
}

async function CreateConsent({
  name,
  consentUrl,
}: ICreateConsentInput): Promise<IConsent> {
  return await consentModel.create({
    id: randomUUID(),
    name: name,
    consentUrl: consentUrl,
    version: 0,
  });
}

async function GetConsent(targetId: string): Promise<IConsent> {
  const consent = await consentModel.findOne({
    id: targetId,
  });
  if (!consent) {
    throw new Error(`Consent not found, targetId: ${targetId}`);
  }
  return consent;
}

export default {
  CreateConsent,
  GetConsent,
};
