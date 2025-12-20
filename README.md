# LiveContainer + SideStore repository
This is an unofficial AltSource that allows you to use the latest LiveContainer nightly with the latest SideStore nightly.

Disclaimer that while I am a member of the SideStore team, this is a **third-party** LiveContainer *and* SideStore build. You will not receive support for these builds: no one from the LiveContainer team or the SideStore team will help you. I make these builds for myself and myself only.

## LiveContainer
- LiveContainer is an app launcher (not emulator or hypervisor) that allows you to run iOS apps inside it without actually installing them.
- Allows you to "install" unlimited apps (3 app/10 app id free developer account limit does not apply here) with only one app & app id. You can also have multiple versions of an app installed with multiple data containers.
- When JIT is available, codesign is entirely bypassed, no need to sign your apps before installing. Otherwise, your app will be signed with the same certificate used by LiveContainer.

Learn more about LiveContainer [here](https://livecontainer.github.io/docs/intro). *View the modified source code [here](https://github.com/suprdratts/LiveContainer).*

## SideStore
SideStore is an *untethered, community driven* alternative app store for non-jailbroken iOS devices.

SideStore is an iOS application that allows you to sideload apps onto your iOS device with just your Apple ID. SideStore resigns apps with your personal development certificate, and then uses a [specially designed VPN](https://github.com/jkcoxson/em_proxy) in order to trick iOS into installing them. SideStore will periodically "refresh" your apps in the background, to keep their normal 7-day development period from expiring.

SideStore's goal is to provide an untethered sideloading experience. It's a community driven fork of [AltStore](https://github.com/rileytestut/AltStore), and has already implemented some of the community's most-requested features.

Learn more about SideStore [here](https://sidestore.io/). *View the modified source code [here](https://github.com/suprdratts/SideStore).*

## Licenses
* SideStore and LiveContainer are both licensed under [GNU Affero General Public License, version 3 only](./LICENSE.AGPL).
* The code original to this repository is licensed under [the Unlicense](./UNLICENSE).
