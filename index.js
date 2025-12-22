const fs = require('node:fs');
const { createHash } = require('node:crypto');

(async () => {
    await fetch('https://sidestore.io/apps-v2.json/')
    .then((res) => res.text())
    .then((text) => fs.writeFileSync('./side.json', text, 'utf-8'))

    await fetch('https://raw.githubusercontent.com/LiveContainer/LiveContainer/refs/heads/main/apps.json')
    .then((res) => res.text())
    .then((text) => fs.writeFileSync('./lc.json', text, 'utf-8'))

    await fetch('https://github.com/LiveContainer/LiveContainer/releases/download/nightly/apps_nightly.json')
    .then((res) => res.text())
    .then((text) => fs.writeFileSync('./lcn.json', text, 'utf-8'))

    await fetch('https://github.com/suprdratts/LiveContainer/releases/download/stable/apps_nightly.json')
    .then((res) => res.text())
    .then((text) => fs.writeFileSync('./sslc.json', text, 'utf-8'))
    
    await fetch('https://github.com/suprdratts/LiveContainer/releases/download/nightly/apps_nightly.json')
    .then((res) => res.text())
    .then((text) => fs.writeFileSync('./sslcn.json', text, 'utf-8'))

    var sideJSON = JSON.parse(fs.readFileSync('./side.json', 'utf-8'));
    var lcJSON = JSON.parse(fs.readFileSync('./lc.json', 'utf-8'));
    var lcnJSON = JSON.parse(fs.readFileSync('./lcn.json', 'utf-8'));
    var sslcJSON = JSON.parse(fs.readFileSync('./sslc.json', 'utf-8'));
    var sslcnJSON = JSON.parse(fs.readFileSync('./sslcn.json', 'utf-8'));

    await fetch(sslcnJSON['apps'][0]['downloadURL'].replace('LiveContainer.ipa', 'LiveContainer+SideStore.ipa'))
    .then((res) => res.arrayBuffer())
    .then((data) => { 
        var hash = createHash('sha256').update(Buffer.from(data)).digest('hex'); 
        console.log(hash);

        var srcJSON = {}
        srcJSON['name'] = "LiveContainer + SideStore (unofficial nightly)";
        srcJSON['identifier'] = "com.SideStore.SideStore";
        srcJSON['website'] = 'https://github.com/suprdratts/LCSideStore';
        srcJSON['subtitle'] = 'LiveContainer + SideStore';
        srcJSON['description'] = "This is an unofficial AltStore Source for LiveContainer + SideStore (nightly).\n\n Run iOS apps without actually installing them!"
        srcJSON['tintColor'] = "#0784FC";
        srcJSON['iconURL'] = "https://raw.githubusercontent.com/suprdratts/LiveContainer/main/screenshots/AppIcon1024.png";
        srcJSON['headerURL'] = "https://raw.githubusercontent.com/suprdratts/LiveContainer/main/screenshots/header.png";
        srcJSON['apps'] = sslcnJSON['apps'];
        srcJSON['apps'][0]['name'] = "LiveContainer + SideStore (unofficial nightly)";
        srcJSON['apps'][0]['date'] = srcJSON['apps'][0]['versionDate'];
        srcJSON['apps'][0]['developerName'] = "LiveContainer Team + SideStore Team";
        srcJSON['apps'][0]['screenshotURLs'] = srcJSON['apps'][0]['screenshotURLs'].concat(sideJSON['apps'][0]['screenshotURLs']);
        srcJSON['apps'][0]['sha256'] = hash;
        srcJSON['apps'][0]['headline'] = 'This is a reminder that this is a third-party LiveContainer and SideStore build'
        srcJSON['apps'][0]['versions'][0]['headline'] = 'This is a reminder that this is a third-party LiveContainer and SideStore build'
        srcJSON['apps'][0]['versionDescription'] = `This is a reminder that this is a third-party LiveContainer and SideStore build. You will not receive support for these builds: no one from the LiveContainer team or the SideStore team will help you.

Description from SideStore ${sideJSON['apps'][0]['releaseChannels'][0]['releases'][0]['version']}:
${sideJSON['apps'][0]['releaseChannels'][0]['releases'][0]['localizedDescription']}

Description from LiveContainer ${lcnJSON['apps'][0]['version']} (${lcnJSON['apps'][0]['commit']}):
${lcnJSON['apps'][0]['versions'][0]['localizedDescription']}`
        srcJSON['apps'][0]['versions'][0]['localizedDescription'] = srcJSON['apps'][0]['versionDescription']

        srcJSON['apps'][0]['versions'][0]['releaseChannels'] = []
        var releaseChannel = {
            "releases": [
                {
                    "version": srcJSON['apps'][0]['versions'][0]['version'],
                    "date": srcJSON['apps'][0]['versionDate'],
                    "localizedDescription": srcJSON['apps'][0]['versionDescription'],
                    "downloadURL": srcJSON['apps'][0]['downloadURL'],
                    "size": srcJSON['apps'][0]['size'],
                    "sha256": hash
                }
            ]
        }
        srcJSON['apps'][0]['versions'][0]['releaseChannels'].push(releaseChannel);
        srcJSON['apps'][0]['permissions'] = sideJSON['apps'][0]['permissions'];
        let appEntitlements = []
        appEntitlements = appEntitlements.concat(srcJSON['apps'][0]['appPermissions']['entitlements'])
        sideJSON['apps'][0]['appPermissions']['entitlements'].forEach(entitlement => { appEntitlements.push(entitlement['name']) });
        appEntitlements = [...new Set(appEntitlements)];
        srcJSON['apps'][0]['appPermissions']['entitlements'] = []
        appEntitlements.forEach(entitlement => {
            srcJSON['apps'][0]['appPermissions']['entitlements'].push({
                "name": entitlement
            })
        })
        srcJSON['news'] = sideJSON['news'];
        srcJSON['news'] = srcJSON['news'].concat(lcJSON['news']);
        srcJSON['news'] = srcJSON['news'].concat(lcnJSON['news']);

        srcJSON['apps'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'].replaceAll('LiveContainer.ipa', 'LiveContainer+SideStore.ipa');
        srcJSON['apps'][0]['versions'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'];
        srcJSON['apps'][0]['versions'][0]['releaseChannels'][0]['releases'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'];
        srcJSON['apps'][0]['versions'][0]['releaseChannels'][0]['track'] = 'nightly';
        fs.writeFileSync('./src.json', JSON.stringify(srcJSON, null, 4), 'utf-8')
    })
    
    await fetch(lcnJSON['apps'][0]['downloadURL'].replace('LiveContainer.ipa', 'LiveContainer+SideStore.ipa'))
    .then((res) => res.arrayBuffer())
    .then((data) => { 
        var hash = createHash('sha256').update(Buffer.from(data)).digest('hex'); 
        console.log(hash);

        var srcJSON = lcnJSON;
        srcJSON['name'] = "LiveContainer + SideStore (nightly)";
        srcJSON['website'] = 'https://github.com/suprdratts/LCSideStore';
        srcJSON['subtitle'] = 'LiveContainer + SideStore';
        srcJSON['description'] = "This is an unofficial AltStore Source for LiveContainer + SideStore (nightly).\n\n Run iOS apps without actually installing them!"
        srcJSON['apps'][0]['name'] = "LiveContainer + SideStore (nightly)";
        srcJSON['apps'][0]['developerName'] = "LiveContainer Team + SideStore Team";
        srcJSON['apps'][0]['screenshotURLs'] = srcJSON['apps'][0]['screenshotURLs'].concat(sideJSON['apps'][0]['screenshotURLs']);
        srcJSON['apps'][0]['sha256'] = hash;
        srcJSON['apps'][0]['permissions'] = sideJSON['apps'][0]['permissions'];
        let appEntitlements = []
        appEntitlements = appEntitlements.concat(srcJSON['apps'][0]['appPermissions']['entitlements'])
        sideJSON['apps'][0]['appPermissions']['entitlements'].forEach(entitlement => { appEntitlements.push(entitlement['name']) });
        appEntitlements = [...new Set(appEntitlements)];
        srcJSON['apps'][0]['appPermissions']['entitlements'] = []
        appEntitlements.forEach(entitlement => {
            srcJSON['apps'][0]['appPermissions']['entitlements'].push({
                "name": entitlement
            })
        })
        srcJSON['news'] = sideJSON['news'];
        srcJSON['news'] = srcJSON['news'].concat(lcnJSON['news']);

        srcJSON['apps'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'].replaceAll('LiveContainer.ipa', 'LiveContainer+SideStore.ipa');
        srcJSON['apps'][0]['versions'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'];
        fs.writeFileSync('./official_nightly.json', JSON.stringify(srcJSON, null, 4), 'utf-8')
    })

    await fetch('https://github.com/suprdratts/LiveContainer/releases/download/stable/LiveContainer+SideStore.ipa')
    .then((res) => res.arrayBuffer())
    .then((data) => { 
        var hash = createHash('sha256').update(Buffer.from(data)).digest('hex'); 
        console.log(hash);

        var srcJSON = lcJSON;
        srcJSON['name'] = "LiveContainer + SideStore (unofficial stable)";
        srcJSON['website'] = 'https://github.com/suprdratts/LCSideStore';
        srcJSON['subtitle'] = 'LiveContainer + SideStore';
        srcJSON['description'] = "This is an unofficial AltStore Source for LiveContainer + SideStore.\n\n Run iOS apps without actually installing them!"
        srcJSON['tintColor'] = "#0784FC";
        srcJSON['apps'] = lcJSON['apps'];
        srcJSON['apps'][0]['name'] = "LiveContainer + SideStore (unofficial stable)";
        srcJSON['apps'][0]['date'] = srcJSON['apps'][0]['versionDate'];
        srcJSON['apps'][0]['developerName'] = "LiveContainer Team + SideStore Team";
        srcJSON['apps'][0]['screenshotURLs'] = srcJSON['apps'][0]['screenshotURLs'].concat(sideJSON['apps'][0]['screenshotURLs']);
        srcJSON['apps'][0]['sha256'] = hash;
        srcJSON['apps'][0]['headline'] = 'This is a reminder that this is a third-party LiveContainer and SideStore build'
        srcJSON['apps'][0]['versions'][0]['headline'] = 'This is a reminder that this is a third-party LiveContainer and SideStore build'
        srcJSON['apps'][0]['versionDescription'] = `This is a reminder that this is a third-party LiveContainer and SideStore build. You will not receive support for these builds: no one from the LiveContainer team or the SideStore team will help you.

Description from SideStore ${sideJSON['apps'][0]['versions'][0]['version']}:
${sideJSON['apps'][0]['versions'][0]['localizedDescription']}

Description from LiveContainer ${lcJSON['apps'][0]['version']}:
${lcJSON['apps'][0]['versions'][0]['localizedDescription']}`
        srcJSON['apps'][0]['versions'][0]['localizedDescription'] = srcJSON['apps'][0]['versionDescription']

        srcJSON['apps'][0]['versions'][0]['releaseChannels'] = []
        var releaseChannel = {
            "releases": [
                {
                    "version": srcJSON['apps'][0]['versions'][0]['version'],
                    "date": srcJSON['apps'][0]['versionDate'],
                    "localizedDescription": srcJSON['apps'][0]['versionDescription'],
                    "downloadURL": srcJSON['apps'][0]['downloadURL'],
                    "size": srcJSON['apps'][0]['size'],
                    "sha256": hash
                }
            ]
        }
        srcJSON['apps'][0]['versions'][0]['releaseChannels'].push(releaseChannel);
        srcJSON['apps'][0]['permissions'] = sideJSON['apps'][0]['permissions'];
        let appEntitlements = []
        appEntitlements = appEntitlements.concat(srcJSON['apps'][0]['appPermissions']['entitlements'])
        sideJSON['apps'][0]['appPermissions']['entitlements'].forEach(entitlement => { appEntitlements.push(entitlement['name']) });
        appEntitlements = [...new Set(appEntitlements)];
        srcJSON['apps'][0]['appPermissions']['entitlements'] = []
        appEntitlements.forEach(entitlement => {
            srcJSON['apps'][0]['appPermissions']['entitlements'].push({
                "name": entitlement
            })
        })
        srcJSON['news'] = sideJSON['news'];
        srcJSON['news'] = srcJSON['news'].concat(lcJSON['news']);

        srcJSON['apps'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'].replaceAll('LiveContainer.ipa', 'LiveContainer+SideStore.ipa');
        srcJSON['apps'][0]['versions'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'];
        srcJSON['apps'][0]['versions'][0]['releaseChannels'][0]['releases'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'];
        srcJSON['apps'][0]['versions'][0]['releaseChannels'][0]['track'] = 'nightly';
        fs.writeFileSync('./stable.json', JSON.stringify(srcJSON, null, 4), 'utf-8')
    })

    await fetch(lcJSON['apps'][0]['downloadURL'].replace('LiveContainer.ipa', 'LiveContainer+SideStore.ipa'))
    .then((res) => res.arrayBuffer())
    .then((data) => { 
        var hash = createHash('sha256').update(Buffer.from(data)).digest('hex'); 
        console.log(hash);

        var srcJSON = lcJSON;
        srcJSON['name'] = "LiveContainer + SideStore";
        srcJSON['website'] = 'https://github.com/suprdratts/LCSideStore';
        srcJSON['subtitle'] = 'LiveContainer + SideStore';
        srcJSON['description'] = "This is an unofficial AltStore Source for LiveContainer + SideStore.\n\n Run iOS apps without actually installing them!"
        srcJSON['apps'][0]['name'] = "LiveContainer + SideStore";
        srcJSON['apps'][0]['developerName'] = "LiveContainer Team + SideStore Team";
        srcJSON['apps'][0]['screenshotURLs'] = srcJSON['apps'][0]['screenshotURLs'].concat(sideJSON['apps'][0]['screenshotURLs']);
        srcJSON['apps'][0]['sha256'] = hash;
        srcJSON['apps'][0]['permissions'] = sideJSON['apps'][0]['permissions'];
        let appEntitlements = []
        appEntitlements = appEntitlements.concat(srcJSON['apps'][0]['appPermissions']['entitlements'])
        sideJSON['apps'][0]['appPermissions']['entitlements'].forEach(entitlement => { appEntitlements.push(entitlement['name']) });
        appEntitlements = [...new Set(appEntitlements)];
        srcJSON['apps'][0]['appPermissions']['entitlements'] = []
        appEntitlements.forEach(entitlement => {
            srcJSON['apps'][0]['appPermissions']['entitlements'].push({
                "name": entitlement
            })
        })
        srcJSON['news'] = sideJSON['news'];
        srcJSON['news'] = srcJSON['news'].concat(lcnJSON['news']);

        srcJSON['apps'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'].replaceAll('LiveContainer.ipa', 'LiveContainer+SideStore.ipa');
        srcJSON['apps'][0]['versions'][0]['downloadURL'] = srcJSON['apps'][0]['downloadURL'];
        fs.writeFileSync('./official_stable.json', JSON.stringify(srcJSON, null, 4), 'utf-8')
    })
})()
