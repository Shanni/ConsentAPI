#Consent API


Consent API captures consent data. Consent data is a record of user agreeing to something in an application. We need to be able to store what they agreed to, when they agreed to it, and if this agreement ever changes we need to be able to keep track of that.

An example of these agreements could be:

- A terms of service clause
- A data sharing agreement
- An agreement to send marketing information to a user.

#### Run:
    $ docker-compose up
    
And then, start the server with

    $ npm start


#### API Service:

- `POST` `/consent/target`
    
    ```jsx
    Request: "POST /consent/target"
    {
      "name": "pharmacy.allow_marketing_emails",
      "consent_url": "http://example.com/marketing_terms"
    }
    
    Response:
    {
      "id": "872df834-d084-4469-b9b5-7d7936ba281a",
    	"name": "pharmacy.allow_marketing_emails",
      "consent_url": "http://example.com/marketing_terms",
      "version": 0,
      "created_at": "2022/01/01"
    }
    
    ```
    
- `PATCH` `/consent/target/:targetId`
    - Update the latest version of `targetId`
        - A new target will be added to the target ledger with an incremented version
        - The date this new version was added will also be changed to reflect the date when the request was made.
        - The previous version will be unchanged
    
    ```jsx
    Request: "PATCH /consent/target/872df834-d084-4469-b9b5-7d7936ba281a"
    {
      "consent_url": "http://example.com/marketing_terms_updated"
    }
    
    Response:
    {
      "id": "872df834-d084-4469-b9b5-7d7936ba281a",
    	"name": "pharmacy.allow_marketing_emails",
      "consent_url": "http://example.com/marketing_terms_2",
      "version": 1,
      "created_at": "2022/01/02"
    }
    
    ```
    
- `GET` `/consent/target/:targetId`
    - Returns all version of a specific target
    
    ```jsx
    Request: "GET /consent/target/872df834-d084-4469-b9b5-7d7936ba281a"
    
    Response:
    [{
      "id": "872df834-d084-4469-b9b5-7d7936ba281a",
    	"name": "pharmacy.allow_marketing_emails",
      "consent_url": "http://example.com/marketing_terms",
      "version": 0,
      "created_at": "2022/01/01"
    },
    {
      "id": "872df834-d084-4469-b9b5-7d7936ba281a",
    	"name": "pharmacy.allow_marketing_emails",
      "consent_url": "http://example.com/marketing_terms_2",
      "version": 1,
      "created_at": "2022/01/02"
    }]
    ```
    
- `GET /consent/target`
    - Get all versions of all targets
    
    ```jsx
    Request: "GET /consent/target"
    
    Response:
    [{
      "id": "872df834-d084-4469-b9b5-7d7936ba281a",
    	"name": "pharmacy.allow_marketing_emails",
      "consent_url": "http://example.com/marketing_terms",
      "version": 0,
      "created_at": "2022/01/01"
    },
    {
      "id": "872df834-d084-4469-b9b5-7d7936ba281a",
    	"name": "pharmacy.allow_marketing_emails",
      "consent_url": "http://example.com/marketing_terms_2",
      "version": 1,
      "created_at": "2022/01/02"
    }]
    ```