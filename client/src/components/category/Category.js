import React from 'react'
import PropTypes from 'prop-types'
import './category.css'
import { connect} from 'react-redux';
import Loader from '../layout/Loader';
import { Link } from 'react-router-dom';
import { deleteCategory } from '../../action/category';

const Category = ({category: {loading, categories, error}, deleteCategory}) => {
    let srno = 1;

    return loading ? <Loader/> : (
        <div className="category-main-container">
            {/* <Link to="/category/add">Add category</Link> */}
            {/* {error ? <p>{error.msg}</p>  : null} */}
            <table className="striped centered responsive-table">
                <thead>
                <tr>
                    <th>Serial No.</th>
                    <th>Category</th>
                    <th>Delete</th>
                    <th>Edit</th>
                </tr>
                </thead>

                <tbody>
                    
                    {
                        categories && categories.length > 0 ? categories.map((category, index) => (
                            <tr key={category._id}>
                                <td>{index + srno}</td>
                                <td>{category.catname}</td>
                                <td onClick={() => deleteCategory(category._id)}><i class="trash alternate outline icon"></i></td>
                                <td><Link to={`/category/edit/${category._id}`}><i class="edit outline icon"></i></Link></td>
                            </tr>
                        )) : <p className="no-post">No Category Added</p>
                    }
                </tbody>
            </table>
            <div className="category-add-btn">
                <Link to="/category/add"><span className="btn-floating btn-large waves-effect waves-light red category-btn #42a5f5 blue lighten-1"><i class="plus circle icon"></i></span></Link>
            </div>
        </div>
    )
}

Category.propTypes = {
    deleteCategory: PropTypes.func.isRequired,
    error: PropTypes.object.isRequired,
}

const mapStateToProps = state => ({
    category: state.category
})

export default connect(mapStateToProps, {deleteCategory})(Category)
