import { randomUUID } from "crypto";
import consentModel, { IConsent } from "../models/consent.model";
import { IConsentOnput } from "../types/consent";

interface ICreateConsentInput {
  name: string;
  consentUrl: string; // TODO: check URL format
}

async function createConsent({
  name,
  consentUrl,
}: ICreateConsentInput): Promise<IConsentOnput> {
  const consent = await consentModel.create({
    id: randomUUID(),
    name: name,
    consentUrl: consentUrl,
    version: 0,
  });

  return convertConsentOutput(consent);
}

async function updateConsent(
  targetId: string,
  consentUrl: string
): Promise<IConsentOnput> {
  const consent = await consentModel.findOne({
    id: targetId,
  });
  if (!consent) {
    throw new Error(`Consent not found, targetId: ${targetId}`);
  }

  if (!consentUrl) {
    throw new Error("Must provide a url.");
  }

  const consentNew = await consentModel.create({
    id: randomUUID(),
    name: consent.name,
    consentUrl: consentUrl,
    version: consent.version + 1,
  });

  return convertConsentOutput(consentNew);
}

async function getConsent(targetId: string): Promise<IConsentOnput[]> {
  const consents = await consentModel.find({
    id: targetId,
  });
  if (!consents) {
    throw new Error(`Consent not found, targetId: ${targetId}`);
  }
  return consents.map(convertConsentOutput);
}

async function getAllConsent(): Promise<IConsentOnput[]> {
  const consents = await consentModel.find();
  if (!consents) {
    throw new Error(`No consent is found`);
  }

  return consents.map(convertConsentOutput);
}

function convertConsentOutput(consent: IConsent): IConsentOnput {
  return {
    name: consent.name,
    consent_url: consent.consentUrl,
    version: consent.version,
    created_at: consent.createdAt.toLocaleDateString("en-ZA"),
  } as IConsentOnput;
}

export default {
  createConsent,
  updateConsent,
  getConsent,
  getAllConsent,
};
