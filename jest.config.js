const { readdirSync: readDir } = require('fs');

const files = readDir('./source');

/** @type {import('ts-jest/dist/types').InitialOptionsTsJest} */
module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  moduleNameMapper: files.reduce((current, file) => {
    if (file.endsWith('.ts')) {
      return current;
    }

    return { ...current, [`${file}/(.*)`]: `<rootDir>/source/${file}/$1` };
  }, {}),
};
