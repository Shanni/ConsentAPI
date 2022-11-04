import connect from "../../src/connect";
import consentModel from "../../src/models/consent.model";

describe("Consent Model", function () {
  it("should return -1 when the value is not present", function () {
    run().catch((err) => console.log(err));

    async function run() {
      await connect("mongodb://localhost:27017/test");

      const consent = new consentModel({
        name: "Bill",
        consentUrl: "URL",
      });
      await consent.save();

      console.log(consent);
    }
  });
});
