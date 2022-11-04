import { Application } from "express";
// import { TRoutesInput } from '../types/routes';
import UserController from "../controllers/consentController";

export default (app: Application) => {
  app.post("/consent/target", async (req, res) => {
    try {
      const consent = await UserController.CreateConsent({
        name: req.body.name,
        consentUrl: req.body.consent_url,
      });
      return res.send(consent);
    } catch (e) {
      console.log("bug");
    }
  });

  app.get("/consent/target/:targetId", async (req, res) => {
    try {
      const consent = await UserController.GetConsent(req.params.targetId);
      return res.send(consent);
    } catch (e) {
      if (e) {
        res.sendStatus(404);
      }
      // TODO: proper logging
      console.log(e);
    }
  });
};
