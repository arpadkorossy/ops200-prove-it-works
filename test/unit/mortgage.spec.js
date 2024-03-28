const expect = require('chai').expect;
const assert = require('chai').assert;
const Mortgage = require('../../src/js/lib/Mortgage');

describe('Mortgage Calculator', () => {
    let calculator = null;

    beforeEach(() => {
        mortgage = new Mortgage(100000, 10, 30, 12);
    });
  
    it('should have a monthly payment function', () => {
        expect(mortgage.monthlyPayment).to.exist;
    });
  
    it('should have a principal variable', () => {
        expect(mortgage.principal).to.exist;
    });

    it('should have a interest variable', () => {
        expect(mortgage.interest).to.exist;
    });

    it('should have a term variable', () => {
        expect(mortgage.term).to.exist;
    });

    it('should have a period variable', () => {
        expect(mortgage.period).to.exist;
    });

    it('calculated monthly payment is a number', () => {
        assert.isNotNaN(mortgage.monthlyPayment(), 'monthly payment is not NaN');;
    });

    it('calculates monthly interest correctly', () => {
        assert.equal(mortgage.monthlyPayment(), '877.57', 'these numbers are equal');
    });
});

// constructor(principal, interest, term, period) {
// monthlyPayment() {
//     const monthlyInterestRate = (this.interest / 100) / this.period
//     const numberOfPayments = this.term * this.period
//     const compoundedInterestRate = Math.pow((1 + monthlyInterestRate), numberOfPayments)
//     const interestQuotient = (monthlyInterestRate * compoundedInterestRate) / ( (Math.pow((1 + monthlyInterestRate), numberOfPayments)) - 1)
//     const monthlyPayment = this.principal * interestQuotient
//     return monthlyPayment.toFixed(2)