const Task = require('../models/Task');
const Project = require('../models/Project');
const ErrorResponse = require('../utils/errorResponse');
const asyncHandler = require('../middleware/async');

// @desc    Get all tasks for a project
// @route   GET /api/projects/:projectId/tasks
// @access  Private
exports.getTasks = asyncHandler(async (req, res, next) => {
  // Check if project exists and belongs to user
  const project = await Project.findOne({
    _id: req.params.projectId,
    owner: req.user.id,
  });

  if (!project) {
    return next(
      new ErrorResponse(
        `Project not found with id of ${req.params.projectId}`,
        404
      )
    );
  }

  const tasks = await Task.find({ project: req.params.projectId });

  res.status(200).json({
    success: true,
    count: tasks.length,
    data: tasks,
  });
});

// @desc    Get single task
// @route   GET /api/tasks/:id
// @access  Private
exports.getTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate({
    path: 'project',
    select: 'title owner',
  });

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.project.owner.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to access this task`,
        401
      )
    );
  }

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Create new task
// @route   POST /api/projects/:projectId/tasks
// @access  Private
exports.createTask = asyncHandler(async (req, res, next) => {
  // Check if project exists and belongs to user
  const project = await Project.findOne({
    _id: req.params.projectId,
    owner: req.user.id,
  });

  if (!project) {
    return next(
      new ErrorResponse(
        `Project not found with id of ${req.params.projectId}`,
        404
      )
    );
  }

  // Add project to req.body
  req.body.project = req.params.projectId;

  const task = await Task.create(req.body);

  res.status(201).json({
    success: true,
    data: task,
  });
});

// @desc    Update task
// @route   PUT /api/tasks/:id
// @access  Private
exports.updateTask = asyncHandler(async (req, res, next) => {
  let task = await Task.findById(req.params.id).populate({
    path: 'project',
    select: 'owner',
  });

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.project.owner.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to update this task`,
        401
      )
    );
  }

  task = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    success: true,
    data: task,
  });
});

// @desc    Delete task
// @route   DELETE /api/tasks/:id
// @access  Private
exports.deleteTask = asyncHandler(async (req, res, next) => {
  const task = await Task.findById(req.params.id).populate({
    path: 'project',
    select: 'owner',
  });

  if (!task) {
    return next(
      new ErrorResponse(`Task not found with id of ${req.params.id}`, 404)
    );
  }

  // Make sure user is task owner
  if (task.project.owner.toString() !== req.user.id) {
    return next(
      new ErrorResponse(
        `User ${req.user.id} is not authorized to delete this task`,
        401
      )
    );
  }

  await task.remove();

  res.status(200).json({
    success: true,
    data: {},
  });
});