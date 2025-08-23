// This data is a sample of what a database would provide.
let ideas = [
    {
        title: "Eco-friendly Meal Kits",
        problem: "Food waste and lack of sustainable options in meal delivery services.",
        solution: "A subscription service that delivers pre-portioned ingredients and recipes in compostable packaging.",
        target_audience: "Environmentally-conscious individuals and families.",
        student_name: "Aarav Sharma",
        university: "Delhi University",
        category: "environment",
    },
    {
        title: "AI-powered Tutoring App",
        problem: "Students struggling with complex subjects and not having access to personalized help.",
        solution: "An app that uses AI to provide personalized study plans, instant feedback, and interactive lessons.",
        target_audience: "High school and college students.",
        student_name: "Priya Singh",
        university: "Indian Institute of Technology",
        category: "education",
    },
];

// Reference to DOM elements
const statsSection = document.getElementById("stats-section");
const submissionForm = document.getElementById("submission-form");
const ideasContainer = document.getElementById("ideas-container");

// Schema for form validation
const startupIdeaSchema = {
    name: "StartupIdea",
    type: "object",
    properties: {
        title: { type: "string", description: "The startup idea name/title" },
        problem: { type: "string", description: "The problem this startup solves" },
        solution: { type: "string", description: "How the startup solves the problem" },
        target_audience: { type: "string", description: "Who would use this product/service" },
        student_name: { type: "string", description: "Name of the student who submitted the idea" },
        university: { type: "string", description: "Student's university or school" },
        category: {
            type: "string",
            enum: ["technology", "healthcare", "education", "environment", "social", "finance", "retail", "entertainment", "other"],
            default: "other",
            description: "Category of the startup idea"
        }
    },
    required: ["title", "problem", "solution", "student_name"],
};

// Function to render the stats section
function renderStats() {
    const categories = ideas.map(idea => idea.category);
    const uniqueCategories = [...new Set(categories)];

    statsSection.innerHTML = `
    <div class="stat-item">
      <div class="stat-value">${ideas.length}</div>
      <div class="stat-label">Ideas Shared</div>
    </div>
    <div class="stat-item">
      <div class="stat-value">${uniqueCategories.length}</div>
      <div class="stat-label">Categories Covered</div>
    </div>
  `;
}

// Function to render the submission form
function renderForm() {
    const formHtml = `
    <h2>Submit Your Idea</h2>
    <form id="idea-form">
      <div class="form-field">
        <label for="title">Idea Title</label>
        <input type="text" id="title" name="title" placeholder="A catchy name for your idea" required />
      </div>
      <div class="form-field">
        <label for="problem">Problem</label>
        <textarea id="problem" name="problem" placeholder="Describe the problem you are solving" required></textarea>
      </div>
      <div class="form-field">
        <label for="solution">Solution</label>
        <textarea id="solution" name="solution" placeholder="Explain your solution in detail" required></textarea>
      </div>
      <div class="form-field">
        <label for="student_name">Your Name</label>
        <input type="text" id="student_name" name="student_name" placeholder="Your name" required />
      </div>
      <div class="form-field">
        <label for="university">University (Optional)</label>
        <input type="text" id="university" name="university" placeholder="Your university or school" />
      </div>
      <div class="form-field">
        <label for="category">Category (Optional)</label>
        <select id="category" name="category">
          ${startupIdeaSchema.properties.category.enum.map(cat => `<option value="${cat}">${cat.charAt(0).toUpperCase() + cat.slice(1)}</option>`).join('')}
        </select>
      </div>
      <button type="submit">Submit Idea</button>
    </form>
  `;
    submissionForm.innerHTML = formHtml;
    document.getElementById("idea-form").addEventListener("submit", handleFormSubmit);
}

// Function to render the idea cards
function renderIdeaCards() {
    ideasContainer.innerHTML = ideas.map(idea => `
    <div class="idea-card">
      <h3>${idea.title}</h3>
      <div class="card-content">
        <p><strong>Problem:</strong> ${idea.problem}</p>
        <p><strong>Solution:</strong> ${idea.solution}</p>
        <p><strong>Audience:</strong> ${idea.target_audience || "N/A"}</p>
        <p><strong>Submitted by:</strong> ${idea.student_name} (${idea.university || "N/A"})</p>
      </div>
      <span class="category">${idea.category.charAt(0).toUpperCase() + idea.category.slice(1)}</span>
    </div>
  `).join('');
}

// Form submission handler
function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const newIdea = {};
    new FormData(form).forEach((value, key) => {
        newIdea[key] = value;
    });

    // Validate required fields based on the schema
    const requiredFields = startupIdeaSchema.required;
    const hasRequiredFields = requiredFields.every(field => newIdea[field]);

    if (!hasRequiredFields) {
        alert("Please fill in all required fields: Title, Problem, Solution, and Your Name.");
        return;
    }

    // Add new idea to the array
    ideas.push(newIdea);

    // Re-render the UI
    renderStats();
    renderIdeaCards();

    // Clear the form
    form.reset();
}

// Initial render of the application
function initializeApp() {
    renderStats();
    renderForm();
    renderIdeaCards();
}

initializeApp();