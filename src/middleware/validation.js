export function validation(req, res, next) {
  const errors = [];

  if (!("title" in req.body)) return res.status(400).json({ error: "Invalid or missing data." });
  if (!("course" in req.body)) return res.status(400).json({ error: "Invalid or missing data." });
  if (!("completed" in req.body)) return res.status(400).json({ error: "Invalid or missing data." });

  const { title, course, completed } = req.body;

  if (title.trim().length <= 0) {
    return res.status(400).json({ error: "Invalid or missing data." });
  }
  if (course.trim().length <= 0) {
    return res.status(400).json({ error: "Invalid or missing data." });
  }
  if (typeof completed != "boolean") {
    return res.status(400).json({ error: "Invalid or missing data." });
  }
  next();
}