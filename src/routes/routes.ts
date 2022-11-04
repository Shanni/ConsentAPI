import { Application } from "express";
import UserController from "../controllers/consentController";

export default (app: Application) => {
  app.post("/consent/target", async (req, res, next) => {
    try {
      const consent = await UserController.createConsent({
        name: req.body.name,
        consentUrl: req.body.consent_url,
      });
      return res.send(consent);
    } catch (e) {
      next(e);
    }
  });

  app.patch("/consent/target/:targetId", async (req, res, next) => {
    try {
      const consent = await UserController.updateConsent(
        req.params.targetId,
        req.body.consent_url
      );
      res.send(consent);
    } catch (e) {
      next(e);
    }
  });

  app.get("/consent/target/:targetId", async (req, res, next) => {
    try {
      const consents = await UserController.getConsent(req.params.targetId);
      res.send(consents);
    } catch (e) {
      next(e);
    }
  });

  app.get("/consent/target", async (req, res, next) => {
    try {
      const consents = await UserController.getAllConsent();
      res.send(consents);
    } catch (e) {
      next(e);
    }
  });
};
