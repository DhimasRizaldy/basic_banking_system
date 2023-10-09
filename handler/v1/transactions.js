const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers/pagination');

// Export Module Function In transactions
module.exports = {
    createTransactions: async (req, res, next) => {
        try {
            let { source_account_id, destination_account_id, amount } = req.body;

            let newTransactions = await prisma.transactions.create({
                data: {
                    source_account_id: source_account_id,
                    destination_account_id: destination_account_id,
                    amount: amount
                }
            });

            res.status(201).json({
                status: true,
                message: 'Created Successfuly!',
                data: newTransactions
            });
        } catch (err) {
            next(err);
        }
    },

    // get all bank accounts
    getAllTransactions: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let transactions = await prisma.transactions.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });

            const { _count } = await prisma.transactions.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, transactions }
            });

        } catch (err) {
            next(err);
        }
    },

    // get transactions detail data by:id
    getTransactionsDetail: async (req, res, next) => {
        try {
            let { id } = req.params;
            let transactions = await prisma.transactions.findUnique({ where: { id: Number(id) } });

            if (!transactions) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'No transactions Found With Id ' + id
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                data: transactions
            });

        } catch (err) {
            naxt(err);
        }
    },

    // update data transactions
    updateTransactions: async (req, res, next) => {
        try {
            let { id } = req.params;
            let { source_account_id, destination_account_id, amount } = req.body;

            let updateOperation = await prisma.transactions.update({
                where: { id: Number(id) },
                data: { source_account_id, destination_account_id, amount }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                data: updateOperation
            });

        } catch (err) {
            next(err);
        }
    },

    // delete transactions
    deleteTransactions: async (req, res, next) => {
        try {
            let { id } = req.params;

            let deleteOperation = await prisma.transactions.delete({
                where: { id: Number(id) }
            });

            res.status(200).json({
                status: true,
                message: 'OK',
                data: deleteOperation
            });

        } catch (err) {
            next(err);
        }
    }
};