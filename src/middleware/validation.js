export function validation(req, res) {
  const { title, course, completed } = req.body;
  const errors = [];

  if (!title) errors.push("Title is required.");
  if (!course) errors.push("Course is required.");
  if (!completed) errors.push("Completion status is required.");

  if (title.trim().length <= 0) {
    errors.push("Title is required.");
  }
  if (course.trim().length <= 0) {
    errors.push("Course is required.");
  }
  if (typeof completed != "boolean") {
    errors.push("Completion status must be of type boolean.");
  }

  if (errors.length > 0) {
    return res.status(400).json({ error: "Invalid or missing data." });
  }

  next();
}