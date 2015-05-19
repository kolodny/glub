var assert = require('assert');
var glub = require('rek')('');

console.log(__dirname)
process.chdir(__dirname)
var testCases = [
  {
    glub: ['*'],
    desc: 'can match wildcards',
    matches: [
      'another.txt',
      'file.txt',
      'index.js',
      'noext',
      'sub',
    ]
  },
  {
    glub: ['.*'],
    desc: 'can match hidden files',
    matches: [
      '.private',
    ]
  },
  {
    glub: ['**/*'],
    desc: 'can match stars recursively',
    matches: [
      'another.txt',
      'file.txt',
      'index.js',
      'noext',
      'sub',
      'sub/afileinsub.txt',
      'sub/subsub',
      'sub/subsub/subsubyo.js'
    ]
  },
  {
    glub: ['**/*.txt'],
    desc: 'can match stars recursively',
    matches: [
      'another.txt',
      'file.txt',
      'sub/afileinsub.txt',
    ]
  },
];

describe('glub', function() {
  describe('is a async function that', function() {
    testCases.forEach(function(testCase) {
      it(testCase.desc, function(done) {
        glub(testCase.glub, function(err, matches) {
          assert.deepEqual(matches, testCase.matches)
          done();
        });
      });
    });
  });
});

describe('glub', function() {
  describe('is a async function that', function() {
    testCases.forEach(function(testCase) {
      it(testCase.desc, function() {
        var matches = glub.sync(testCase.glub);
        assert.deepEqual(matches, testCase.matches)
      });
    });
  });
});
