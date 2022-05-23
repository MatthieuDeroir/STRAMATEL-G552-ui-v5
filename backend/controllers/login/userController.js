import mongoose from 'mongoose';
import {UserSchema} from '../../models/login/userModel';

const User = mongoose.model('User', UserSchema);

exports.allAccess = (req, res) => {
    res.status(200).send("Public Content")
}
exports.userBoard = (req, res) => {
    res.status(200).send("User Content")
}
exports.adminBoard = (req, res) => {
    res.status(200).send("Admin Content")
}
exports.superuserBoard = (req, res) => {
    res.status(200).send("Superuser Content")
}

export const addNewUser = (req, res) => {
    let newUser = new User(req.body);

    newUser.save((err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    })
}

export const getUsers = (req, res) => {
    User.find({}, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    })
}

export const getUserWithId = (req, res) => {
    User.findById(req.params.UserId, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    })
}

export const updateUser = (req, res) => {
    User.findOneAndUpdate({_id: req.params.UserId}, req.body, {new: true}, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json(User);
    })
}

export const deleteUser = (req, res) => {
    User.remove({_id: req.params.UserId}, (err, User) => {
        if (err) {
            res.send(err);
        }
        res.json({ message: 'Successfully deleted User'});
    })
}
