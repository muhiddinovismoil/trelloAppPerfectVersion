import {
    deleteUserData,
    getUsersData,
    getUsersDataById,
    searchUsersData,
    updateUsersData,
} from "../services/index.js";
export async function getAllData(req, res, next) {
    try {
        const getData = await getUsersData();
        if (!getData) {
            return res
                .status(404)
                .send(
                    `Server could not find your users data or you didn't entered any datas before`
                );
        }
        res.status(200).send({
            status: "Success",
            data: getData,
        });
    } catch (error) {
        next(error);
    }
}

export async function searchData(req, res, next) {
    try {
        const { q } = req.query;
        const searchedData = await searchUsersData(q);
        if (!searchData) {
            return res.status(404).send(`Data not found`);
        }
        res.status(200).send({
            status: "Success",
            data: searchedData,
        });
    } catch (error) {
        next(error);
    }
}

export async function getById(req, res, next) {
    try {
        const id = req.params.id;
        const data = await getUsersDataById(id);
        if (!data) {
            return res.status(404).send(`Data not found`);
        }
        res.status(200).send({
            status: "Success",
            data: data,
        });
    } catch (error) {
        next(error);
    }
}

export async function updateData(req, res, next) {
    try {
        const id = req.params.id;
        const { name, email, password } = req.body;
        const updateUser = await updateUsersData(id, name, email, password);
        res.status(200).send({
            message: "Updated",
            data: updateUser,
        });
    } catch (error) {
        next(error);
    }
}

export async function removeData(req, res, next) {
    try {
        const id = req.params.id;
        const deletedData = await deleteUserData(id);
        res.status(200).send({
            status: "Deleted",
            user_id: deletedData,
        });
    } catch (error) {
        next(error);
    }
}
