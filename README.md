# SnapSync

## NAVH 2023 - OH SNAP!

SnapSync leverages IPFS and Piñata to enable the backup and sharing of Metamask Snap states across multiple devices and browsers.

There are two Github repositories required to demonstrate the functionality.

1. This repo, which is the underlying snap that handles the connection to IPFS and can be included in other snaps as an npm package
2. The [demo repo](https://github.com/agencyenterprise/navh23-snapsync), which implements the snap and demonstrates saving and fetching the states.

![img](./snapsync-screenshot.png)

### Team

| Name              | Github                                             |
| ----------------- | -------------------------------------------------- |
| Daniel Cruz       | [@ddanielcruz](https://www.github.com/ddanielcruz) |
| Jonathan Bertoldi | [@jayremias](https://www.github.com/jayremias)     |
| Ruan Azevedo      | [@RuanAzevedo](https://www.github.com/ruanazevedo) |
| Steve Caldwell    | [@scald](https://www.github.com/scald)             |

## Getting Started

Clone this repo and run the following to launch the demo:

```shell
yarn install && yarn start
```

Access the demo at http://localhost:8000

You'll need a Pinata API Key to test the functionality of SnapSync.

1. Connect Metamask Flask
2. Enter your Pinata API key for saving and retrieving your Snap's state
3. Launch the [demo app](https://github.com/agencyenterprise/navh23-snapsync) which will leverage this installed Snap to retrive and persist the state in IPFS.

> Hackathon judges: a key was provided in the submission, but reach out to steve@ae.studio if you need any help getting started.

## Future plans

We’d like to build a hosted platform model for developers to securely manage their apps and IPFS providers. This will enable users to connect their wallet to the DAPP to generate a secure key for interacting with IPFS.

The platform will also support additional IPFS providers in the future, such as Infura and Filebase, giving developers more flexibility in configuring syncing for their Snaps.
