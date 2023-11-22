import './UpdateUser.scss';

const UpdateUser = () => {
    return (
        <div className="updateUser">
            <div>
                <input type="text" placeholder="Name" />
            </div>
            <div>
                <input type="number" placeholder="Phone number" />
            </div>
            <div className='button_update'>
                <button className="reset" type="reset">Reset</button>
                <button className="submit" type="submit">Update</button>
            </div>
        </div>
    )
}

export default UpdateUser;