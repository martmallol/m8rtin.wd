// test/models/quote-test.js
// Importo paquetes de chai y mongoose
const {assert} = require('chai');
const {mongoose, databaseUrl, options} = require('../../database');
// Importo mi Quote model
const Quote = require('../../models/quote');
// Importo mis hooks
const {connectAndDrop, disconnect} = require('../../database');

describe('The Quote', () => {
  // Defino mis hooks (lo que va a pasar antes y despues de cada test)
  beforeEach(connectAndDrop);
  afterEach(disconnect);

  // Ya habiendo definido mis hooks, empieza el testeo 
  // Testing sobre el elemento con id=quote
  describe('#quote', () => {
    it('is a String', () => {
      const citation = new Quote({quote: 'Animate a proceder'});
    });
  });
  
  // Testing sobre el elemento con id=attributed
  describe('#attributed', () => {
    it('is a String', () => {
      const citation = new Quote({attributed: 'Morebrass'});
      assert.isString(citation.attributed);
      assert.strictEqual(citation.attributed, 'Morebrass');
    });
  });

  // Testing sobre el elemento con id=source
  describe('#source', () => {
    it('is a String', () => {
      const citation = new Quote({source: 'My twitter profile'});
      assert.isString(citation.source);
      assert.strictEqual(citation.source, 'My twitter profile');
    });
  });

});