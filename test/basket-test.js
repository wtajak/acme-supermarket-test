const expect = require('chai').expect;
const Basket = require('../basket');

const product1 = {
    code: 'FR1',
    name: 'Fruit tea',
    price: 3.11
};

const product2 = {
    code: 'SR1',
    name: 'Strawberries',
    price: 5.00,
    bulkPrice: 4.50,
    bulkPriceQuantity: 3
};

const product3 = {
    code: 'CF1',
    name: 'Coffee',
    price: 11.23
};

const pricingRules = {
    'FR1': {
        'isBuyOneGetOneFree': true,
        'isBuyInBulk': false
    },
    'SR1': {
        'isBuyOneGetOneFree': false,
        'isBuyInBulk': true
    },
    'CF1': {
        'isBuyOneGetOneFree': false,
        'isBuyInBulk': false
    }
};

describe('Shopping Basket', function() {

    it("returns total equal 0.00 when empty", function() {
        const basket = new Basket();
        expect(basket.total()).to.equal("0.00");
    });

    it("adds one item to basket and calculates total", function() {
        const basket = new Basket();
        basket.add(product1);
        expect(basket.total()).to.equal("3.11");
    });

    it("adds more than one item to basket and calculates total", function() {
        const basket = new Basket();
        basket.add(product1);
        basket.add(product2);
        expect(basket.total()).to.equal("8.11");
    });

    // FR1, FR1
    it("calculates buy one get one free", function() {
        const basket = new Basket(pricingRules);
        basket.add(product1);
        basket.add(product1);
        expect(basket.total()).to.equal("3.11");
    });

    it("calculates buy one get one free when added 4 times", function() {
        const basket = new Basket(pricingRules);
        basket.add(product1);
        basket.add(product1);
        basket.add(product1);
        basket.add(product1);
        expect(basket.total()).to.equal("6.22");
    });

    it("correctly calculates buy one get one free when added 3 times", function() {
        const basket = new Basket(pricingRules);
        basket.add(product1);
        basket.add(product1);
        basket.add(product1);
        expect(basket.total()).to.equal("6.22");
    });

    it("correctly calculates buy one get one free when added 5 times", function() {
        const basket = new Basket(pricingRules);
        basket.add(product1);
        basket.add(product1);
        basket.add(product1);
        basket.add(product1);
        basket.add(product1);
        expect(basket.total()).to.equal("9.33");
    });

    // FR1, SR1, FR1, CF1
    it("calculates buy one get one free only for relevant products", function() {
        const basket = new Basket(pricingRules);
        basket.add(product1);
        basket.add(product2);
        basket.add(product1);
        basket.add(product3);
        expect(basket.total()).to.equal("19.34");
    });

    it("calculates buy in bulk when buying a minimum amount to qualify for discount", function() {
        const basket = new Basket(pricingRules);
        basket.add(product2);
        basket.add(product2);
        basket.add(product2);
        expect(basket.total()).to.equal("13.50");
    });

    it("calculates buy in bulk when buying more than minimum amount", function() {
        const basket = new Basket(pricingRules);
        basket.add(product2);
        basket.add(product2);
        basket.add(product2);
        basket.add(product2);
        basket.add(product2);
        expect(basket.total()).to.equal("22.50");
    });

    // SR1, SR1, FR1, SR1
    it("calculates buy in bulk for relevant products", function() {
        const basket = new Basket(pricingRules);
        basket.add(product2);
        basket.add(product2);
        basket.add(product1);
        basket.add(product2);
        expect(basket.total()).to.equal("16.61");
    });

    it("combines buy in bulk price with buy one get one free", function() {
        const pricingRules = {
            'SR1': {
                'isBuyOneGetOneFree': true,
                'isBuyInBulk': true
            }
        };

        const basket = new Basket(pricingRules);
        basket.add(product2);
        basket.add(product2);
        basket.add(product2);
        basket.add(product2);
        basket.add(product2);
        expect(basket.total()).to.equal("13.50");
    });

});