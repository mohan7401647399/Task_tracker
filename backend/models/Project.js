const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [50, 'Title cannot be more than 50 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  owner: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Prevent user from having more than 4 projects
ProjectSchema.pre('save', async function (next) {
  const projectsCount = await this.model('Project').countDocuments({
    owner: this.owner,
  });
  
  if (projectsCount >= 4) {
    throw new Error('User cannot have more than 4 projects');
  }
  
  next();
});

module.exports = mongoose.model('Project', ProjectSchema);