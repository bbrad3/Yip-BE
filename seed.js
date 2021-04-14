'use strict';

module.exports = {
    up: async(queryInterface, Sequelize) => {
        /**
         * Add seed commands here.
         *
         * Example:
         * await queryInterface.bulkInsert('People', [{
         *   name: 'John Doe',
         *   isBetaMember: false
         * }], {});
         */
        await queryInterface.bulkInsert('companies', [{
                name: "Ben's Hardware",
                type: "Hardware",
                address: "1225 N Circle Dr, Colorado Springs, CO 80909",
                description: "Chain retailer stocking household tools, supplies & more (many family-run or independently owned).",
                image: "https://i.pinimg.com/236x/ce/88/a5/ce88a5eb796cd382b734c40ecacf7363.jpg",
                userId: 1,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Jisu's CPK",
                type: "Restaurant",
                address: "2430 NE 13th Ave # 3, Los Angeles, CA 33305",
                description: "Cozy space offering French cuisine such as sweet & savory crêpes plus a leafy outdoor patio.",
                image: "https://media.timeout.com/images/101505793/630/472/image.jpg",
                userId: 2,
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Sovan's Grocery",
                type: "Grocery",
                address: "1020 Alton Rd, Miami Beach, FL 33139",
                description: "Eco-minded chain with natural & organic grocery items, housewares & other products (most sell wine).",
                image: "https://i.pinimg.com/originals/f3/c0/4d/f3c04d435107a4c25ba23d4445acffdc.jpg",
                userId: 3,
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ])

        await queryInterface.bulkInsert('users', [{
                name: "Ben",
                email: "Ben@ben.com",
                password: "Ben",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Jisu",
                email: "Jisu@Jisu.com",
                password: "Jisu",
                createdAt: new Date(),
                updatedAt: new Date()
            },
            {
                name: "Sovan",
                email: "Sovan@Sovan.com",
                password: "Sovan",
                createdAt: new Date(),
                updatedAt: new Date()
            },

        ])
    },

    down: async(queryInterface, Sequelize) => {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */

        await queryInterface.bulkDelete('companies', null, {});

        await queryInterface.bulkDelete('users', null, {});
    }
};