import express from "express"
const router = express.Router()

import {createCategory,
    getAllCategories,
    getCategory,
    editCategory,
    deleteCategory} from "../controller/category.js"

import auth from "../middleware/auth"
import {check} from "express-validator"

// create category
router.post('/create', auth, [
    check('catname', 'Enter category field').not().isEmpty(),
] ,createCategory)

// get all category
router.get('/get-all-category',getAllCategories)

// get a category
router.get('/get-category/:catId',getCategory)

// update category
router.put('/edit-category/:catId', auth,editCategory)

// delete category
router.delete('/git', auth,deleteCategory)


module.exports = router