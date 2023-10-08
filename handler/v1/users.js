const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers/pagination');

// Export Modul Function In users
module.exports = {
    // Create New Users
    createUsers: async (req, res, next) => {
        try {
            let { name, email, password } = req.body;

            let newUsers = await prisma.users.create({
                data: {
                    name: name,
                    email: email,
                    password: password
                }
            });

            res.status(201).json({
                status: true,
                message: 'Created Succsessfuly!',
                data: newUsers
            });
        } catch (err) {
            next(err)
        }
    },

    // get all users
    getAllUsers: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let users = await prisma.users.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });
            const { _count } = await prisma.users.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, users }
            });

        } catch (err) {
            next(err);
        }
    },

    // get users detail data by:id
    getUsersDetail: async (req, res, next) => {
        try {
            let { id } = req.params;
            let users = await prisma.users.findUnique({ where: { id: Number(id) } });

            if (!users) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: 'No Users Found With Id ' + id
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                data: users
            });
        } catch (err) {
            next(err);
        }
    },

    // update data users
    updateUsers: async (req, res, next) => {
        try {
            let { id } = req.params;
            let { name, email, password } = req.body;

            let updateOperation = await prisma.users.update({
                where: { id: Number(id) },
                data: { name, email, password }
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

    // detele users
    deleteUsers: async (req, res, next) => {
        try {
            let { id } = req.params;

            let deleteOperation = await prisma.users.delete({
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