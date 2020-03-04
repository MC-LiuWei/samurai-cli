const { readFileSync, writeFileSync } = require('fs');
const { join } = require('path');
const packageJsonStr = readFileSync(join(__dirname, '../package.json'), { encoding: 'utf-8' });
const packageJson = JSON.parse(packageJsonStr);

function updateVersion() {
    const { version } = packageJson;
    const versionParagraph = version.split('.').reverse();
    let isUpdate = false;
    versionParagraph.forEach((item, index) => {
        if (!isUpdate) {
            if (index !== (versionParagraph.length - 1) && item >= 99) {
                versionParagraph[index + 1] = Number(versionParagraph[index + 1]) + 1;
                versionParagraph[index] = '0';
            } else {
                versionParagraph[index] = Number(item) + 1;
            }
            isUpdate = !isUpdate;
        }
    });
    packageJson.version = versionParagraph.reverse().join('.');
    writeFileSync(join(__dirname, '../package.json'), JSON.stringify(packageJson), { encoding: 'utf-8' });
}

updateVersion();