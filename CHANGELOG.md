

## [0.4.0](https://github.com/aeviterna/imperia/compare/0.3.3...0.4.0) (2023-04-25)


### Features

* **AccountCommand:** add account command ([af3f75b](https://github.com/aeviterna/imperia/commit/af3f75b9ead1d24d7441bad91fec543bbda4a80e))
* **ChatInputCommandDenied:** add a listener for command denied ([08f1601](https://github.com/aeviterna/imperia/commit/08f1601a06d3b859680038d7220683f0433fcc8b))
* **ImperiaClient:** add a database connection checking feature ([10aac27](https://github.com/aeviterna/imperia/commit/10aac279e4f84404f80327a5c11bb644e0609d7c))
* **prisma:** add cards and rarities migration ([4823926](https://github.com/aeviterna/imperia/commit/4823926f68416d52d1218a6b3a36e856e3242be4))
* **prisma:** add user cards migration ([be06430](https://github.com/aeviterna/imperia/commit/be064306d509023a4c974fdcce019563cfaca6d1))


### Bug Fixes

* **RegisteredUserOnly:** precondition not throwing a error ([467814c](https://github.com/aeviterna/imperia/commit/467814c3ff1c61622aaa63e48d483bb89dc5e71e))


### Code Refactoring

* **UserInfoCommand:** add a proper page pagination ([bc942e5](https://github.com/aeviterna/imperia/commit/bc942e5c4e5f28eb825e4037cad8f03f11046869))
* **UserInfoCommand:** dont paginate if user roles is less than 3 ([25cb828](https://github.com/aeviterna/imperia/commit/25cb8288f3dd94e310f5ebdeb8b2da24dedac498))
* **UserInfoCommand:** use paginated message for list of roles (half progress) ([dcdc0e6](https://github.com/aeviterna/imperia/commit/dcdc0e6b7158d4abbd220b7f1e20d8722600df3d))

## [0.3.3](https://github.com/aeviterna/imperia/compare/0.3.2...0.3.3) (2023-04-20)


### Bug Fixes

* **deps:** update dependency @sapphire/discord.js-utilities to v6.0.6 ([0dd019b](https://github.com/aeviterna/imperia/commit/0dd019b471bce578e94b102a064d584801061357))
* **deps:** update dependency @sapphire/framework to v4.4.1 ([#29](https://github.com/aeviterna/imperia/issues/29)) ([52206f3](https://github.com/aeviterna/imperia/commit/52206f3bd1cce6026aaf8f06d1cdc2d1775c9d5f))
* **deps:** update dependency @sapphire/result to v2.6.2 ([c409e6a](https://github.com/aeviterna/imperia/commit/c409e6a61535f7ccd03dc643b0534852967c01af))
* **deps:** update prisma monorepo to v4.13.0 ([#30](https://github.com/aeviterna/imperia/issues/30)) ([8b3a607](https://github.com/aeviterna/imperia/commit/8b3a6071aae713e183b6bea8628d43f7ce6e65d0))


### Features

* **UserInfoCommand:** add user info command ([0166b2c](https://github.com/aeviterna/imperia/commit/0166b2cd1523ae282ed764466958751758cef626))

## [0.3.2](https://github.com/aeviterna/imperia/compare/0.3.1...0.3.2) (2023-04-17)


### Bug Fixes

* **deps:** update dependency colorette to v2.0.20 ([#25](https://github.com/aeviterna/imperia/issues/25)) ([f3e1ef4](https://github.com/aeviterna/imperia/commit/f3e1ef497ebf1371320aa87b76fd4285b2cc99e3))


### Features

* **Command:** add a account registration command ([b8204a3](https://github.com/aeviterna/imperia/commit/b8204a317b02b41d6716ecfccebb5f542c70305b))
* **command:** add a command to unregister and delete user ([22412da](https://github.com/aeviterna/imperia/commit/22412daf2962a3e66fbc76aa2658b2afbb976486))
* **Precondition:** add a precondition to check for registered user ([41722e1](https://github.com/aeviterna/imperia/commit/41722e1660ad617829383c146ed4115bdfebc48b))

## [0.3.1](https://github.com/aeviterna/imperia/compare/0.3.0...0.3.1) (2023-04-15)


### Bug Fixes

* **Augmentation:** add `DeveloperOnly` into Sapphire preconditions ([ebf6c87](https://github.com/aeviterna/imperia/commit/ebf6c871bac1d233d8f0cedc492a0c65f27401d6))


### Features

* **Command:** add a command to evaluate javascript code ([2a3613c](https://github.com/aeviterna/imperia/commit/2a3613c415221addda881a2cca460b853f000f8c))
* **constants:** add a list of development server ids ([351b157](https://github.com/aeviterna/imperia/commit/351b157a7f85302924b701959c66069cd848af34))
* **constants:** add developer discord user ids ([1b7328f](https://github.com/aeviterna/imperia/commit/1b7328f2e6feb82bb5be4000a7793801066a372c))
* **Precondition:** add a developer only precondition ([d82b8fb](https://github.com/aeviterna/imperia/commit/d82b8fb3ff3c45ebe68908c9d73f829581ac1ba1))

# [0.3.0](https://github.com/aeviterna/imperia/compare/0.2.0...0.3.0) (2023-04-15)


### Bug Fixes

* **ci:** falling ci ([86c6002](https://github.com/aeviterna/imperia/commit/86c60028cf531c3f4c12af702f2fd152c7fbe122))
* **deps:** update dependency @sapphire/framework to v4.3.1 ([#17](https://github.com/aeviterna/imperia/issues/17)) ([cda251d](https://github.com/aeviterna/imperia/commit/cda251d7ce1c144fb172da0695e32895b444ae22))
* **deps:** update dependency @sapphire/framework to v4.4.0 ([bcf8f85](https://github.com/aeviterna/imperia/commit/bcf8f85f605648ff89b74e87f15e6ac4862099cd))
* **deps:** update dependency @sapphire/plugin-logger to v3.0.3 ([#15](https://github.com/aeviterna/imperia/issues/15)) ([5d56fe5](https://github.com/aeviterna/imperia/commit/5d56fe53460d2c5176bbd557e3e770b84e405ffe))
* **swc:** fix wrong schema for swc configuration ([d064812](https://github.com/aeviterna/imperia/commit/d064812873b4802bab50fd00b8d201a07b46a710))
* **utilites:** add plugin utilities store register ([8d6aaea](https://github.com/aeviterna/imperia/commit/8d6aaea68075f8e4d482b0251a52c6aacaf34688))
* **utilities:** param descriptions ([707ec4e](https://github.com/aeviterna/imperia/commit/707ec4e9ac8dc89dae331c9d596f80c0aeef8bc6))


### Features

* **AboutCommand:** add a hello imperia starting command ([4919cc9](https://github.com/aeviterna/imperia/commit/4919cc97953bffd622362eb2baf6aeb50ac049d6))
* **AvatarCommand:** add avatar command to display user's avatar ([47f936c](https://github.com/aeviterna/imperia/commit/47f936c150cb51971279f80b07fc5bf866a9717b))
* **CommandsListCommand:** implement a command to list commands ([70ee738](https://github.com/aeviterna/imperia/commit/70ee738f186a2cbab49c37b49f1264a683b38651))
* **Database:** add prisma client into container ([013dee6](https://github.com/aeviterna/imperia/commit/013dee635bdc16f0d2938b12944ab6e5975ebd94))
* **HelpCommand:** a help command boiler code ([734857b](https://github.com/aeviterna/imperia/commit/734857ba9c62326a26cbece47e54a3b67dc47fea))
* **HelpCommand:** rename commands to help and add a primary page ([5614965](https://github.com/aeviterna/imperia/commit/5614965b1a958db9c4e9b66ec2ad0101e0f6eaa2))
* **ImperiaCommand:** implement a command class with subcommands support ([cc0bba9](https://github.com/aeviterna/imperia/commit/cc0bba9f2a0fc81e247af0d223d98f8b6898af0f))
* implement tsconfig import aliases ([ae343b9](https://github.com/aeviterna/imperia/commit/ae343b9ff1a20bbbde047035beeae7bb00040b97))
* **PingCommand:** add a command to check the bot's ping ([8f59f49](https://github.com/aeviterna/imperia/commit/8f59f49bf8621abd2a47f1d25c1d1047a23780f7))
* **ServerinfoCommand:** add Serverinfo command to get information about the server. ([053625a](https://github.com/aeviterna/imperia/commit/053625a4dc683e0194f336eddd9cc77038552628))
* **utilities:** add some utility function with sapphire plugin utilities store ([5066ad3](https://github.com/aeviterna/imperia/commit/5066ad3061d67c718c092c7057b83715f45e099a))

# 0.2.0 (2023-04-04)


### Features

* **initial:** initial project bootstrap ([141389a](https://github.com/aeviterna/imperia/commit/141389ab0a12b54d23268156673054fc4961bcc9))
* **prisma:** add prisma and db user migration ([f7e300a](https://github.com/aeviterna/imperia/commit/f7e300a38db60edd9dbfe5b26ce7386e28f79fec))