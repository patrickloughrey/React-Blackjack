/* Require all libraries we need for testing */
import chai from 'chai';
import chaiImmutable from 'chai-immutable';
import chaiEnzyme from 'chai-enzyme';

/* Mocha knows to load this helper file because the test script is required in package.json */
chai.use(chaiImmutable);

/* Enzyme will allow us to be able to separate error logs independently amongst Components */
chai.use(chaiEnzyme);