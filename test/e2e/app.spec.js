const express = require('express');
const expect = require('chai').expect;
const path = require('path');
const Nightmare = require('nightmare');
const assert = require('assert');

const app = express();

app.use(express.static(path.join(__dirname, '../../public')));
app.use(express.static(path.join(__dirname, '../../dist')));

const url = 'http://localhost:8888';

const nightmare = new Nightmare();

//beforeEach(() => { nightmare = new Nightmare() })

let httpServer = null;
let pageObject = null;

before((done) => {
    httpServer = app.listen(8888);
    done();
});

beforeEach(() => {
    pageObject = nightmare.goto(url);
});

after((done) => {
    httpServer.close();
    done();
});

describe('End to End Tests', () => { 

    it('should return 200 status', function (done) {
        new Nightmare()
            .goto(url)
            .then(function (response) {
                expect(response.code).to.equal(200);
                done();
            });
    });

    it('should contain a <h1> element for the page title', () => { 
        return pageObject
            .evaluate(() => document.querySelector('h1').innerText)
            .then(headerText => {
                expect(headerText).to.not.be.null;
                expect(headerText).to.equal('Mortgage Calculator');
            });
    });

    it('should contain an <input> element named principal', () => { 
        return pageObject
            .evaluate(() => document.querySelector('input[name=principal]').name)
            .then(headerText => {
                expect(headerText).to.not.be.null;
                expect(headerText).to.equal('principal');
            });
    });

    it('should correctly calculate mortgage', () =>
        pageObject
            .wait()
            .type('input[name=principal]', 300000)
            .type('input[name=interestRate]', 3.75)
            .type('input[name=loanTerm]', 30)
            .select('select[name=period]', 12)
            .click('button#calculate')
            .wait('#output')
            .evaluate(() => document.querySelector('#output').innerText)
            .then((outputText) => {
                expect(outputText).to.equal('$1389.35');
            })
    ).timeout(6500);
})