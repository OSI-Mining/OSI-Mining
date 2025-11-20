// Mobile menu toggle functionality
function toggleMobileMenu() {
  const menu = document.getElementById('mobile-menu');
  const button = document.querySelector('nav button i');
  menu.classList.toggle('hidden');
  const isOpen = !menu.classList.contains('hidden');
  button.dataset.feather = isOpen ? 'x' : 'menu';
  feather.replace();
}

document.addEventListener('click', (e) => {
  const menu = document.getElementById('mobile-menu');
  const button = document.querySelector('nav button');
  if (!menu.classList.contains('hidden') && !menu.contains(e.target) && !button.contains(e.target)) {
    menu.classList.add('hidden');
    const icon = button.querySelector('i');
    icon.dataset.feather = 'menu';
    feather.replace();
  }
});

// Initialize Supabase and attach form handlers
document.addEventListener("DOMContentLoaded", () => {
  const supabaseUrl = "https://jwqruidvfgueeybhmimp.supabase.co";
  const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp3cXJ1aWR2Zmd1ZWV5YmhtaW1wIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI2MjY1MjQsImV4cCI6MjA3ODIwMjUyNH0.IyunbSQVYaRfCnGqTCLTp4hubZNZG-xVsK3D5gun04M";
  const supabaseClient = supabase.createClient(supabaseUrl, supabaseKey);

  // Generic function to handle any contact form
  function handleContactForm(formSelector, tableName, selectMappings = {}) {
    const form = document.querySelector(formSelector);
    if (!form) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const fullName = form.querySelector('[placeholder*="full name"]').value;
      const email = form.querySelector('input[type="email"]').value;
      const company = form.querySelector('[placeholder*="company"]').value;
      const message = form.querySelector('textarea').value;

      const payload = { full_name: fullName, email, company, message };

      // handle selects
      for (const [columnName, selector] of Object.entries(selectMappings)) {
        const selectEl = form.querySelector(selector);
        if (selectEl) payload[columnName] = selectEl.value;
      }

      const { data, error } = await supabaseClient.from(tableName).insert([payload]);
      if (error) {
        alert("Submission failed: " + error.message);
      } else {
        alert("Submission successful!");
        form.reset();
      }
    });
  }

  // Attach handlers for both forms
  handleContactForm("#investorForm", "investor_inquiries", { interest: "#interest-select" });
  handleContactForm("#goldContactForm", "gold_inquiries", { weight: "#weight-select" });
});