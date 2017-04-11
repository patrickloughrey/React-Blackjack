/* Require all libraries we need for testing */
import chai from 'chai';
import chaiImmutable from 'chai-immutable';

/* Mocha knows to load this helper file because the test script is required in package.json */
chai.use(chaiImmutable);