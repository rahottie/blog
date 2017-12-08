//import { Date } from 'core-js/library/web/timers';

const mongoose = require('mongoose')

const BlogpostSchema = mongoose.Schema({
    author: { //username or _id 
        type: String,
        require: true
    },
    date: {
        type: String,
        require: true
    },
    title: {
        type: String,
        require: true
    },
    content: {
        type: String,
        require: true
    },
    public: {
        type: Boolean,
    }
})

const Blogpost = module.exports = mongoose.model('Blogpost', BlogpostSchema)

//get
const getPublicBlogposts = module.exports.getPublicBlogposts = (author, callback) => {
    let query = {}
    query.public = true;
    if(author) query.author = author

    Blogpost.find(query, callback)
}

const getAllBlogposts = module.exports.getAllBlogposts = (author, callback) => {
    let query = {}
    if(author) query.author = author

    Blogpost.find(query, callback)
}

const getBlogpost = module.exports.getBlogpost = (id, callback) => {
    if(!id) callback(new Error('id cannot be null'))
    Blogpost.findById(id, callback)
}

const getBlogpostByTitle = (title, callback) => {
    if(!title) callback(new Error('Title cannot be null'))
    Blogpost.findOne({title: title}, callback)
}
// search?

//put
const putBlogpost = module.exports.putBlogpost = (newBlogpost, callback) => {
    getBlogpostByTitle(newBlogpost.title, (err, blogpost) => {
        if(err) handleError(err)
        if(!blogpost){
            console.log('Adding post to database')
            newBlogpost.save(callback)
        } else {
            console.log('Could not add to database - title exists already')
            callback(new Error(newBlogpost.title +' already exists, please use a different title.'))
        }
    })
    
}
//update

//delete??



const handleError = (err) => {
    console.log(err.message);
}