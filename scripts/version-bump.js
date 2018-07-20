import {execSync} from 'child_process';

const newVersion = process.argv[2];
const execOpts = {stdio: 'inherit'};
execSync(`yarn readme-update-version ${newVersion}`, execOpts);
execSync(`yarn version --new-version ${newVersion}`, execOpts);
