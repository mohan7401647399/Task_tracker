const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add a title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters'],
  },
  description: {
    type: String,
    maxlength: [500, 'Description cannot be more than 500 characters'],
  },
  status: {
    type: String,
    enum: ['Not Started', 'In Progress', 'Completed', 'On Hold'],
    default: 'Not Started',
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  completedAt: {
    type: Date,
  },
  project: {
    type: mongoose.Schema.ObjectId,
    ref: 'Project',
    required: true,
  },
});

// Set completedAt when status is changed to Completed
TaskSchema.pre('save', function (next) {
  if (this.isModified('status') && this.status === 'Completed') {
    this.completedAt = new Date();
  }
  next();
});

module.exports = mongoose.model('Task', TaskSchema);