class Basket {

    constructor (pricingRules = {}) {
        this.pricingRules = pricingRules;
        this.items = [];
    }

    add (item) {
        this.items.push(item);
    }

    total () {
        let total = 0;
        const groupedItems = this.getGroupedItems();

        for (let itemCode in groupedItems) {
            total += this.getItemTotal(groupedItems[itemCode]);
        };

        return total.toFixed(2);
    }

    getItemTotal (item) {
        let price = item.price;

        if (this.pricingRules.hasOwnProperty(item.code)) {
            const pricingRules = this.pricingRules[item.code];

            if (pricingRules.isBuyInBulk && item.quantity >= item.bulkPriceQuantity) {
                price = item.bulkPrice;
            }

            if (pricingRules.isBuyOneGetOneFree) {
                return (Math.floor(item.quantity / 2) + item.quantity % 2) * price;
            }
        }

        return item.quantity * price;
    }

    getGroupedItems () {
        let groups = {};

        this.items.forEach((item) => {
            if (groups[item.code]) {
                groups[item.code].quantity += 1;
                return;
            }

            item.quantity = 1;
            groups[item.code] = item;
        });

        return groups;
    }

}

module.exports = Basket;