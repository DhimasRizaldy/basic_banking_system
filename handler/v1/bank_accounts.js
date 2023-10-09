const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers/pagination');

// Export Module Function In bank_accounts
module.exports = {
    createBankAccounts: async (req, res, nex) => {
        try {
            let { user_id, bank_name, bank_account_number, balance } = req.body;

            let newBankAccounts = await prisma.bank_Accounts.create({
                data: {
                    user_id: user_id,
                    bank_name: bank_name,
                    bank_account_number: bank_account_number,
                    balance: balance
                }
            });

            res.status(201).json({
                status: true,
                message: 'Created Successfuly!',
                data: newBankAccounts
            });
        } catch (err) {
            next(err);
        }
    },

    // get all bank accounts
    getAllBankAccounts: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let bank_accounts = await prisma.bank_Accounts.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });

            const { _count } = await prisma.bank_Accounts.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, bank_accounts }
            });

        } catch (err) {
            next(err);
        }
    },

    // get bank_accounts detail data by:id
    getBankAccountsDetail: async (req, res, next) => {
        try {
            let { id } = req.params;
            let bank_accounts = await prisma.bank_Accounts.findUnique({ where: { id: Number(id) } });

            if (!bank_accounts) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'No bank_accounts Found With Id ' + id
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                data: bank_accounts
            });

        } catch (err) {
            naxt(err);
        }
    },

    // update data bank_accounts
    updateBankAccounts: async (req, res, next) => {
        try {
            let { id } = req.params;
            let { user_id, bank_name, bank_account_number, balance } = req.body;

            let updateOperation = await prisma.bank_Accounts.update({
                where: { id: Number(id) },
                data: { user_id, bank_name, bank_account_number, balance }
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

    // delete bank_accounts
    deleteBankAccounts: async (req, res, next) => {
        try {
            let { id } = req.params;

            let deleteOperation = await prisma.bank_Accounts.delete({
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