# Implementations Schema

## Description

Implementation metadata is stored in
https://github.com/w3c/vc-test-suite-implementations
and
https://github.com/w3c-ccg/vc-test-suite-implementations

`_data/implementations.js` aggregates the vendor and implementation details into
an object keyed by the vendor name. Key names, consequently, are human-readable
and may contain spaces.

## Example

```json
{
  "The Vendor": {
    "settings": {
      "name": "The Vendor",
      "implementation": "Super Cool Implementation",
      "verifiers": [
        {
          "id": "https://verifier.example.com/",
          "endpoint": "https://verifier.example.com/credentials/verify",
          "supportedEcdsaKeyTypes": [
            "P-256",
            "P-384"
          ],
          "tags": [
            "Ed25519Signature2020",
            "vc2.0",
            "eddsa-rdfc-2022",
            "ecdsa-rdfc-2019",
            "ecdsa-sd-2023"
          ]
        }
      ],
      "issuers": [
        {
          "id": "https://issuer.example.com/?suite=ecdsa-sd-2023",
          "endpoint": "https://issuer.example.com/credentials/issue?suite=ecdsa-sd-2023",
          "supportedEcdsaKeyTypes": [
            "P-256"
          ],
          "tags": [
            "ecdsa-sd-2023"
          ]
        }
      ],
      "vpVerifiers": [
        {
          "id": "https://vpverifier.example.com/vp/verifier",
          "endpoint": "https://vpverifier.example.com/presentations/verify",
          "tags": [
            "Ed25519Signature2020",
            "vc2.0",
            "eddsa-rdfc-2022",
            "ecdsa-rdfc-2019",
            "ecdsa-sd-2023"
          ]
        }
      ],
      "vcHolders": [
        {
          "id": "https://holder.example.com",
          "endpoint": "https://holder.example.com/credentials/derive",
          "tags": [
            "vcHolder",
            "vc2.0",
            "ecdsa-sd-2023"
          ]
        }
      ]
    }
  }
}
```
