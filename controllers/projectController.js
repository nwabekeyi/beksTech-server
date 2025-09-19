const Project = require('../models/Project');

// GET all projects
const getAllProjects = async (req, res) => {
  try {
    console.log("📥 GET /api/projects hit");
    const projects = await Project.find().sort({ createdAt: -1 });
    res.status(200).json(projects);
  } catch (err) {
    console.error("❌ Error in getAllProjects:", err.message); // ADD THIS
    res.status(500).json({ error: "Server error" });
  }
};


// CREATE project
const createProject = async (req, res) => {
    try {
    const { title, image, description, tech, link } = req.body;
    const newProject = new Project({ title, image, description, tech, link });
    await newProject.save();
    res.status(201).json(newProject);
  } catch (err) {
    res.status(400).json({ error: 'Failed to create project' });
  }
};

// UPDATE project
const updateProject = async (req, res) => {
  try {
    const updated = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// DELETE project
const deleteProject = async (req, res) => {
  try {
    await Project.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
module.exports = {
  getAllProjects,
  createProject,
  updateProject,
  deleteProject
} 