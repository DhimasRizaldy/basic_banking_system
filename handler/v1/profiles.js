const { PrismaClient } = require("@prisma/client")
const prisma = new PrismaClient();
const { getPagination } = require('../../helpers/pagination');

// Export Module Function In Profiles
module.exports = {
    // Create New Profiles
    createProfiles: async (req, res, next) => {
        try {
            let { user_id, identity_type, identity_number, address } = req.body;

            let newProfiles = await prisma.profiles.create({
                data: {
                    user_id: user_id,
                    identity_type: identity_type,
                    identity_number: identity_number,
                    address: address
                }
            });

            res.status(201).json({
                status: true,
                message: 'Created Successfuly!',
                data: newProfiles
            });
        } catch (err) {
            next(err);
        }
    },

    // get all profiles
    getAllProfiles: async (req, res, next) => {
        try {
            let { limit = 10, page = 1 } = req.query;
            limit = Number(limit);
            page = Number(page);

            let profiles = await prisma.profiles.findMany({
                skip: (page - 1) * limit,
                take: limit,
            });
            const { _count } = await prisma.profiles.aggregate({
                _count: { id: true }
            });

            let pagination = getPagination(req, _count.id, page, limit);

            res.status(200).json({
                status: true,
                message: 'OK',
                data: { pagination, profiles }
            });

        } catch (err) {
            next(err);
        }
    },

    // get profiles detail data by:id
    getProfilesDetail: async (req, res, next) => {
        try {
            let { id } = req.params;
            let profiles = await prisma.profiles.findUnique({ where: { id: Number(id) } });

            if (!profiles) {
                return res.status(400).json({
                    status: false,
                    message: 'Bad Request',
                    data: ' No Profiles Found With Id ' + id
                });
            }

            res.status(200).json({
                status: true,
                message: 'OK',
                data: profiles
            });
        } catch (err) {
            next(err);
        }
    },

    // update data profiles
    updateProfiles: async (req, res, next) => {
        try {
            let { id } = req.params;
            let { user_id, identity_type, identity_number, address } = req.body;

            let updateOperation = await prisma.profiles.update({
                where: { id: Number(id) },
                data: { user_id, identity_type, identity_number, address }
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

    // delete profiles
    deleteProfiles: async (req, res, next) => {
        try {
            let { id } = req.params;

            let deleteOperation = await prisma.profiles.delete({
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