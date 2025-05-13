const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getForms = async (req, res) => {
  try {
    const forms = await prisma.form.findMany({
      include: {
        questions: true,
        responses: true,
      },
    });
    res.json(forms);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.createForm = async (req, res) => {
  try {
    const { title, questions } = req.body;
    const formattedQuestions = questions.map((q) => ({
      label: q.label,
      type: q.type,
      options: q.options || null,
    }));

    const form = await prisma.form.create({
      data: {
        title,
        questions: {
          create: formattedQuestions,
        },
      },
      include: { questions: true },
    });

    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getFormById = async (req, res) => {
  try {
    const { id } = req.params;
    const form = await prisma.form.findUnique({
      where: { id: parseInt(id) },
      include: { questions: true },
    });

    if (!form) return res.status(404).json({ error: "Form not found" });

    res.json(form);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.submitResponse = async (req, res) => {
  try {
    const { id } = req.params;
    const { answers } = req.body;

    const response = await prisma.response.create({
      data: {
        formId: parseInt(id),
        answers: JSON.stringify(answers),
      },
    });

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
